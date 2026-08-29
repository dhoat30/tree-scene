const validName = (value) =>
  typeof value === "string" && value.trim().length >= 2;

export const treeRemovalQuoteFormData = [
  {
    id: "firstname",
    label: "First name",
    type: "text",
    required: true,
    autoComplete: "given-name",
    validation: validName,
    errorMessage: "Please enter your first name",
  },
  {
    id: "lastname",
    label: "Last name",
    type: "text",
    required: true,
    autoComplete: "family-name",
    validation: validName,
    errorMessage: "Please enter your last name",
  },
  {
    id: "email",
    label: "Email address",
    type: "email",
    required: true,
    autoComplete: "email",
    validation: (value) => /\S+@\S+\.\S+/.test(value),
    errorMessage: "Please enter a valid email address",
  },
  {
    id: "phone",
    label: "Phone number",
    type: "tel",
    required: true,
    autoComplete: "tel",
    validation: (value) => (value || "").replace(/\D/g, "").length > 6,
    errorMessage: "Please enter a valid phone number",
  },
  {
    id: "address",
    label: "Property address (optional)",
    type: "text",
    required: false,
    autoComplete: "street-address",
  },
  {
    id: "message",
    label: "Message (optional)",
    type: "textarea",
    required: false,
  },
];
