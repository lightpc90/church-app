import SiteForm, { type FieldDef } from "../forms/SiteForm";

const fields: FieldDef[] = [
  { name: "fullname", label: "Full name", placeholder: "John Doe", required: true, autoComplete: "name" },
  { name: "phone", label: "Phone number", type: "tel", placeholder: "0812 345 6789", required: true, autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email", full: true },
  { name: "enquiry", label: "Your message", type: "textarea", placeholder: "How can we help?", required: true },
];

const EnquiryForm = () => (
  <SiteForm
    endpoint="/api/enquiry"
    fields={fields}
    submitLabel="Send message"
    successText="Thank you. We've received your message and will get back to you soon."
  />
);

export default EnquiryForm;
