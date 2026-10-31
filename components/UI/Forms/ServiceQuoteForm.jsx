"use client";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import Input from "./InputFields/Input";
import GoogleMapsLoader from "@/components/GoogleMaps/GoogleMapsLoader";
import GoogleAutocomplete from "@/components/GoogleMaps/GoogleAutoComplete";
import { treeRemovalQuoteFormData as fields } from "@/utils/treeRemovalQuoteFormData";
import { buildServiceQuotePayload, leadResponseSucceeded } from "@/utils/serviceQuoteSubmission";
import styles from "../Layout/Sections/QuoteRequest/QuoteRequest.module.scss";

const initialForm = { firstname: '', lastname: '', email: '', phone: '', address: '', message: '' };

export default function ServiceQuoteForm({ config }) {
  const router = useRouter();
  const formRef = useRef(null);
  const submitting = useRef(false);
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const handleMapsLoad = useCallback(() => setMapsLoaded(true), []);
  const handleAddressSelect = useCallback((address) => {
    setValues((current) => ({ ...current, address }));
  }, []);

  function update(id, value) {
    setValues((current) => ({ ...current, [id]: value }));
    setErrors((current) => ({ ...current, [id]: false }));
  }

  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const invalid = Object.fromEntries(fields.filter((field) => field.required && !field.validation(values[field.id])).map((field) => [field.id, true]));
    setErrors(invalid);
    if (Object.keys(invalid).length) {
      const first = fields.findIndex((field) => invalid[field.id]);
      formRef.current?.querySelectorAll('input, textarea')[first]?.focus();
      return;
    }
    submitting.current = true;
    setStatus('loading');
    const source = window.location.href;
    const payload = buildServiceQuotePayload(values, config, source);
    try {
      const results = await Promise.allSettled(['/api/submit-hubspot-form', '/api/sendmail'].map(async (url) => {
        const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const body = await response.json();
        return leadResponseSucceeded(response.ok, body);
      }));
      if (!results.some((result) => result.status === 'fulfilled' && result.value)) throw new Error('Lead delivery failed');
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: config.eventName, form_name: config.formName, service: config.serviceLabel });
      void fetch('/api/facebook-conversion-api', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true,
        body: JSON.stringify({ data: { event: 'Lead', firstName: values.firstname, email: values.email, phone: values.phone, county: 'Bay of Plenty', eventSourceUrl: source, serviceRequested: config.serviceLabel } }),
      }).catch(() => {});
      setStatus('success');
      router.push('/form-submitted/thank-you');
    } catch {
      submitting.current = false;
      setStatus('error');
    }
  }

  const renderField = (field) => {
    if (field.id === 'address' && mapsLoaded) {
      return (
        <GoogleAutocomplete
          key={field.id}
          label={field.label}
          value={values.address}
          onChange={(value) => update('address', value)}
          onSelect={handleAddressSelect}
          required={false}
          autoComplete="street-address"
          error={false}
          helperText=""
        />
      );
    }
    return (
    <Input key={field.id} lightTheme label={field.id === 'message' ? config.messageLabel : field.label}
      type={field.type} required={field.required} autoComplete={field.autoComplete}
      value={values[field.id]} onChange={(event) => update(field.id, event.target.value)}
      onBlur={() => field.required && setErrors((current) => ({ ...current, [field.id]: !field.validation(values[field.id]) }))}
      isInvalid={errors[field.id]} errorMessage={field.errorMessage} />
    );
  };

  return (
    <div className={styles.formCard} id="quote-form">
      <div className={styles.formHeading}>
        <h2>Get Your Free Quote</h2>
        <p>A quick request. No obligation.</p>
      </div>
      <div className={styles.formBanner}><ScheduleOutlinedIcon aria-hidden="true" /><span>{config.banner}</span></div>
      <form ref={formRef} onSubmit={submit} noValidate className={styles.formBody} aria-label={`${config.serviceLabel} quote request`} aria-busy={status === 'loading'}>
        {!mapsLoaded && <GoogleMapsLoader onLoad={handleMapsLoad} />}
        <div className={styles.nameFields}>{fields.slice(0, 2).map(renderField)}</div>
        {fields.slice(2).map(renderField)}
        <Button type="submit" variant="contained" size="large" fullWidth loading={status === 'loading'} disabled={status === 'success'} endIcon={<ArrowForwardIcon />}>
          {status === 'success' ? 'Request sent' : 'Request my free quote'}
        </Button>
        <p className={styles.privacy}><LockOutlinedIcon aria-hidden="true" />We use your details to respond to your enquiry.</p>
        <p className={styles.talk}>Prefer to talk? <a href="tel:0212420305">021 242 0305</a></p>
        <div className={styles.assurances}><span>$2M insured</span><span>Qualified arborists</span><span>No-obligation quote</span></div>
        {status === 'error' && <Alert severity="error">We couldn’t send your request. Please try again or call <a href="tel:0212420305">021 242 0305</a>.</Alert>}
        {status === 'success' && <Alert severity="success">Your request has been sent. Taking you to the confirmation page…</Alert>}
      </form>
    </div>
  );
}
