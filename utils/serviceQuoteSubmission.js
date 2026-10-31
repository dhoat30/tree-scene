export function buildServiceQuotePayload(values, config, source) {
  const details = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, String(value || '').trim()]));
  const message = [
    `Service required: ${config.serviceLabel}`,
    `First name: ${details.firstname}`,
    `Last name: ${details.lastname}`,
    `Email: ${details.email}`,
    `Phone: ${details.phone}`,
    `Property address: ${details.address || 'Not supplied'}`,
    `Message: ${details.message || 'Not supplied'}`,
    `Landing page: ${source}`,
  ].join('\n');
  return {
    email: details.email,
    formName: config.formName,
    message,
    portalID: '46904146',
    hubspotFormID: '5eccc66d-d077-4485-91ca-ec74f81b9e1c',
    hubspotFormObject: [
      ...['firstname', 'lastname', 'email', 'phone', 'address'].map((name) => ({ name, value: details[name] })),
      { name: 'services_required', value: config.crmService },
      { name: 'message', value: `${config.serviceLabel}\n${details.message || 'No additional details supplied.'}\nLanding page: ${source}` },
    ],
  };
}

// The existing HubSpot endpoint can wrap an upstream error in an HTTP 200.
export function leadResponseSucceeded(httpOk, body) {
  return httpOk && body?.success === true && body?.data?.status !== 'error' && !body?.data?.errors;
}
