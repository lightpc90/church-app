import PageHero from "@/components/site/PageHero";
import FormSplit, { Assurances } from "@/components/site/FormSplit";
import { SectionHeading } from "@/components/site/primitives";
import PrayerRequestForm from "@/components/UILayouts/PrayerRequestForm";
import prayerImage from "../../../public/headers/testimony.jpg";

export const metadata = {
  title: "Prayer Request",
  description: "Share your prayer request with RCCG Beautiful Gate. Our pastors and prayer team would love to pray with you.",
};

export default function Page() {
  return (
    <>
      <PageHero
        image={prayerImage}
        eyebrow="Prayer request"
        title="Let's pray with you"
        description="It's what we've been called to do. Whatever you're facing, you don't have to face it alone."
      />
      <FormSplit
        formTitle="Share your request"
        formDescription="Your request is kept confidential and shared only with our pastoral and prayer team."
        intro={
          <>
            <SectionHeading
              eyebrow="You're not alone"
              title="A team on your side"
              description="Life can be overwhelming. In those moments you need people beside you to cheer you on in hope, hold your hand and lead you to the One who always stands ready to listen."
            />
            <Assurances
              items={[
                { title: "Share what's on your heart", body: "As much or as little as you're comfortable with." },
                { title: "We pray with you", body: "Our pastors and prayer team bring your request before God." },
                { title: "We follow up", body: "If you'd like, someone will reach out to encourage you." },
              ]}
            />
          </>
        }
      >
        <PrayerRequestForm />
      </FormSplit>
    </>
  );
}
