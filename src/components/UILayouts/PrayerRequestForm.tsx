import SiteForm, { type FieldDef } from "../forms/SiteForm";

const fields: FieldDef[] = [
  { name: "fullname", label: "Full name", placeholder: "John Doe", required: true, autoComplete: "name" },
  { name: "phone", label: "Phone number", type: "tel", placeholder: "0812 345 6789", required: true, autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email", full: true },
  { name: "prayerRequest", label: "Your prayer request", type: "textarea", placeholder: "Share what you would like us to pray about…", required: true },
];

const PrayerRequestForm = () => (
  <SiteForm
    endpoint="/api/prayer-request"
    fields={fields}
    submitLabel="Send prayer request"
    consent="I agree that RCCG Beautiful Gate may keep my prayer request and contact details so the pastoral and prayer team can pray for me and get in touch."
    successText="Thank you. Your request has been received, and our prayer team is praying with you."
  />
);

export default PrayerRequestForm;
