import SiteForm, { type FieldDef } from "../forms/SiteForm";

const fields: FieldDef[] = [
  { name: "name", label: "Full name", placeholder: "John Doe", required: true, autoComplete: "name" },
  { name: "phone", label: "Phone number", type: "tel", placeholder: "0812 345 6789", required: true, autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email", full: true },
  { name: "address", label: "Home address", type: "textarea", placeholder: "1, Simpson Street, Lakowe Phase 2", required: true },
];

const NewConvertForm = () => (
  <SiteForm
    endpoint="/api/followUps"
    fields={fields}
    submitLabel="Connect with a pastor"
    successText="Welcome to the family! Someone from our follow-up team will reach out to you soon."
  />
);

export default NewConvertForm;
