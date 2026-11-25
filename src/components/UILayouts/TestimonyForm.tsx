import SiteForm, { type FieldDef } from "../forms/SiteForm";

const fields: FieldDef[] = [
  { name: "fullname", label: "Full name", placeholder: "John Doe", required: true, autoComplete: "name" },
  { name: "phone", label: "Phone number", type: "tel", placeholder: "0812 345 6789", required: true, autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email", full: true },
  { name: "testimony", label: "Your testimony", type: "textarea", placeholder: "Tell us what the Lord has done…", required: true },
];

const TestimonyForm = () => (
  <SiteForm
    endpoint="/api/testimony"
    fields={fields}
    submitLabel="Share testimony"
    consent="I agree that RCCG Beautiful Gate may keep my testimony and contact details and contact me about it."
    successText="Thank you for sharing your testimony! God is good."
  />
);

export default TestimonyForm;
