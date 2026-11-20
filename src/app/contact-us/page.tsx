import { Navigation } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import FormSplit from "@/components/site/FormSplit";
import { Container, SectionHeading } from "@/components/site/primitives";
import EnquiryForm from "@/components/UILayouts/EnquiryForm";
import ContactInfo from "@/components/contactInfo/ContactInfo";
import SocialMedia from "@/components/social-media/SocialMedia";
import MapComponent from "@/components/map/GoogleMap";
import { directionsUrl } from "@/lib/site";
import headerImage from "../../../public/headers/contact-us.jpg";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with RCCG Beautiful Gate Parish, Lakowe, or find directions to the church.",
};

export default function Page() {
  return (
    <>
      <PageHero
        image={headerImage}
        eyebrow="Contact us"
        title="We'd love to hear from you"
        description="RCCG Beautiful Gate is home for all. Send us a message, give us a call, or come and visit."
      />
      <FormSplit
        formTitle="Send us a message"
        formDescription="We usually respond within a couple of days."
        intro={
          <>
            <SectionHeading eyebrow="Get in touch" title="Visit, call or write" />
            <ContactInfo className="mt-10 text-base" />
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-royal hover:underline"
            >
              <Navigation className="size-4" aria-hidden /> Get directions
            </a>
            <div className="mt-10">
              <p className="text-sm font-semibold text-stone">Follow us</p>
              <SocialMedia className="mt-3 text-ink" showHandle />
            </div>
          </>
        }
      >
        <EnquiryForm />
      </FormSplit>
      <Container className="pb-24">
        <div className="h-[28rem] overflow-hidden rounded-[2rem] border border-line bg-sand shadow-soft">
          <MapComponent />
        </div>
      </Container>
    </>
  );
}
