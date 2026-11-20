import PageHero from "@/components/site/PageHero";
import FormSplit from "@/components/site/FormSplit";
import { SectionHeading } from "@/components/site/primitives";
import TestimonyForm from "@/components/UILayouts/TestimonyForm";
import testimonyImage from "../../../public/randomChurchPic2.jpg";

export const metadata = {
  title: "Share a Testimony",
  description: "Tell RCCG Beautiful Gate what the Lord has done for you.",
};

export default function Page() {
  return (
    <>
      <PageHero
        image={testimonyImage}
        eyebrow="Testimonies"
        title="The Lord is good, and His mercy endures forever"
        description="Tell us what God has done for you. Your story could be the encouragement someone else needs today."
      />
      <FormSplit
        formTitle="Share your testimony"
        formDescription="We may reach out to you before sharing it with the church family."
        intro={
          <>
            <SectionHeading
              eyebrow="Give thanks"
              title="Every testimony glorifies God"
              description="Healing, provision, breakthrough, peace in the storm: big or small, we want to celebrate with you."
            />
            <blockquote className="mt-10 border-l-2 border-gold pl-6">
              <p className="font-display text-2xl leading-snug text-ink">
                “And they overcame him by the blood of the Lamb, and by the word of their testimony.”
              </p>
              <cite className="mt-3 block text-sm font-semibold text-stone not-italic">Revelation 12:11</cite>
            </blockquote>
          </>
        }
      >
        <TestimonyForm />
      </FormSplit>
    </>
  );
}
