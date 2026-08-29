"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Input from "@/components/UI/Forms/InputFields/Input";
import LoadingBtn from "@/components/UI/Buttons/LoadingBtn";
import GoogleMapsLoader from "@/components/GoogleMaps/GoogleMapsLoader";
import GoogleAutocomplete from "@/components/GoogleMaps/GoogleAutoComplete";
import { treeRemovalQuoteFormData } from "@/utils/treeRemovalQuoteFormData";
import styles from "./TreeRemovalQuotePage.module.css";

const initialForm = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  address: "",
  message: "",
};

export default function TreeRemovalQuoteForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [mapsLoaded, setMapsLoaded] = useState(false);

  const updateField = (id, value) => {
    setFormData((current) => ({ ...current, [id]: value }));
    if (errors[id]) {
      setErrors((current) => ({ ...current, [id]: false }));
    }
  };

  const handleBlur = (field) => {
    if (field.required && !field.validation(formData[field.id])) {
      setErrors((current) => ({ ...current, [field.id]: true }));
    }
  };

  const handleAddressSelect = useCallback((address) => {
    setFormData((current) => ({ ...current, address }));
  }, []);

  const handleMapsLoad = useCallback(() => setMapsLoaded(true), []);

  const submitForm = async (event) => {
    event.preventDefault();

    const nextErrors = {};
    treeRemovalQuoteFormData.forEach((field) => {
      if (field.required && !field.validation(formData[field.id])) {
        nextErrors[field.id] = true;
      }
    });

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setStatus("loading");
    const source = window.location.href;
    const message = [
      `First name: ${formData.firstname}`,
      `Last name: ${formData.lastname}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Property address: ${formData.address || "Not supplied"}`,
      `Message: ${formData.message || "Not supplied"}`,
      "Service required: Tree Removal",
      `Landing page: ${source}`,
    ].join("\n");

    const payload = {
      email: formData.email,
      formName: "Tree Removal Landing Page — Free Site Visit",
      message,
      portalID: "46904146",
      hubspotFormID: "5eccc66d-d077-4485-91ca-ec74f81b9e1c",
      hubspotFormObject: [
        { name: "firstname", value: formData.firstname },
        { name: "lastname", value: formData.lastname },
        { name: "email", value: formData.email },
        { name: "phone", value: formData.phone },
        { name: "address", value: formData.address },
        { name: "services_required", value: "Tree Removal Tauranga" },
        { name: "message", value: formData.message },
      ],
    };

    try {
      const requests = await Promise.allSettled([
        fetch("/api/submit-hubspot-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        fetch("/api/sendmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        fetch("/api/facebook-conversion-api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: {
              event: "Lead",
              firstName: formData.firstname,
              email: formData.email,
              phone: formData.phone,
              county: "Bay of Plenty",
              eventSourceUrl: source,
              serviceRequested: "Tree Removal",
            },
          }),
        }),
      ]);

      const leadRequestSucceeded = requests.slice(0, 2).some(
        (request) => request.status === "fulfilled" && request.value.ok,
      );

      if (!leadRequestSucceeded) {
        throw new Error("Lead delivery failed");
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "tree_removal_lead",
        form_name: "Tree Removal Landing Page — Free Site Visit",
        service: "Tree Removal",
      });
      router.push("/form-submitted/thank-you");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className={styles.quoteForm} onSubmit={submitForm} noValidate>
      <div className={styles.formHeading}>
        <span>Free, no-obligation site visit</span>
        <h2>Request your tree removal quote</h2>
        <p>We’ll contact you to arrange the next available site visit.</p>
      </div>

      <div className={styles.formProgress}>
        <strong>Your details</strong>
        <span>Fast, straightforward quote request</span>
        <i aria-hidden="true" />
      </div>

      <div className={styles.nameFields}>
        {treeRemovalQuoteFormData.slice(0, 2).map((field) => (
          <Input
            key={field.id}
            lightTheme
            label={field.label}
            type={field.type}
            value={formData[field.id]}
            onChange={(event) => updateField(field.id, event.target.value)}
            onBlur={() => handleBlur(field)}
            required={field.required}
            autoComplete={field.autoComplete}
            isInvalid={errors[field.id]}
            errorMessage={field.errorMessage}
          />
        ))}
      </div>

      {treeRemovalQuoteFormData.slice(2, 4).map((field) => (
        <Input
          key={field.id}
          lightTheme
          label={field.label}
          type={field.type}
          value={formData[field.id]}
          onChange={(event) => updateField(field.id, event.target.value)}
          onBlur={() => handleBlur(field)}
          required={field.required}
          autoComplete={field.autoComplete}
          isInvalid={errors[field.id]}
          errorMessage={field.errorMessage}
        />
      ))}

      {!mapsLoaded && <GoogleMapsLoader onLoad={handleMapsLoad} />}
      {mapsLoaded ? (
        <GoogleAutocomplete
          className={styles.muiAddressField}
          label="Property address (optional)"
          value={formData.address}
          onChange={(value) => updateField("address", value)}
          onSelect={handleAddressSelect}
          required={false}
          autoComplete="street-address"
          error={false}
          helperText=""
        />
      ) : (
        <Input
          lightTheme
          label="Property address (optional)"
          type="text"
          value={formData.address}
          onChange={(event) => updateField("address", event.target.value)}
          required={false}
          autoComplete="street-address"
        />
      )}

      <Input
        lightTheme
        label="Message (optional)"
        type="textarea"
        value={formData.message}
        onChange={(event) => updateField("message", event.target.value)}
        required={false}
      />

      <LoadingBtn
        className={styles.formSubmit}
        onClick={submitForm}
        isLoading={status === "loading"}
        isSuccess={false}
        newSubmission={status === "error"}
      >
        Request my free site visit →
      </LoadingBtn>

      <p className={styles.formMicrocopy}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 10V8a5 5 0 0 1 10 0v2M5 10h14v11H5z" />
        </svg>
        Your details stay private. No spam and no sales pressure.
      </p>

      <div className={styles.formAssurance}>
        <span>$2M insured</span>
        <span>Certified arborists</span>
        <span>Free site visit</span>
      </div>

      {status === "error" && (
        <Alert severity="error">
          We couldn’t send that form. Please call us on{" "}
          <a href="tel:+64212420305">021 242 0305</a>.
        </Alert>
      )}
    </form>
  );
}
