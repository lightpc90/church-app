import PageHero from "@/components/site/PageHero";
import FormSplit, { Assurances } from "@/components/site/FormSplit";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import NewConvertForm from "@/components/UILayouts/New-convert-form";
import salvationImage from "../../../public/images/salvation.jpg";

export const metadata = {
  title: "How Can I Be Saved?",
  description: "Salvation is God's gift of grace to all who seek Him. Discover how to begin a relationship with Jesus.",
};

const steps = [
  { title: "Acknowledge", body: "We have all sinned and are in need of God's mercy.", ref: "Romans 3:23" },
  { title: "Repent", body: "Turn away from sin: a heartfelt change of mind and direction.", ref: "Acts 3:19" },
  { title: "Believe", body: "Jesus Christ is the Son of God, who died for your sins and rose again to give you new life.", ref: "John 3:16" },
  { title: "Confess", body: "Declare Him as your Lord and Saviour, surrendering your life to His will.", ref: "Romans 10:9–10" },
  { title: "Receive", body: "Through His grace you are forgiven, redeemed and welcomed into God's family, not by works but by faith.", ref: "Ephesians 2:8–9" },
];

export default function Page() {
  return (
    <>
      <PageHero
        image={salvationImage}
        eyebrow="How can I be saved?"
        title="While we were yet sinners, Christ died for us"
        description="Salvation is God's gift of grace to all who seek Him with a sincere heart. The Bible gives us a clear path."
      />

      <Section>
        <Container>
          <Reveal>
            <SectionHeading align="center" eyebrow="The path" title="Five steps into new life" />
          </Reveal>
          <ol className="mx-auto mt-16 max-w-3xl">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05}>
                <li className="relative flex gap-6 pb-12 last:pb-0">
                  {i < steps.length - 1 && (
                    <span className="absolute top-14 bottom-0 left-7 w-px bg-line" aria-hidden />
                  )}
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-ink font-display text-2xl text-gold">
                    {i + 1}
                  </span>
                  <div className="pt-2">
                    <h3 className="font-display text-2xl font-medium text-ink">{step.title}</h3>
                    <p className="mt-2 text-lg leading-relaxed text-stone">{step.body}</p>
                    <p className="mt-2 text-sm font-semibold tracking-wide text-royal">{step.ref}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <p className="mx-auto mt-16 max-w-2xl text-center font-display text-2xl leading-snug text-ink sm:text-3xl">
              Take this step today and experience the transforming love of God in your life.
            </p>
          </Reveal>
        </Container>
      </Section>

      <div className="bg-sand">
        <FormSplit
          id="meet-pastor"
          formTitle="I've made a decision"
          formDescription="Fill in your details and our follow-up team will reach out to you."
          intro={
            <>
              <SectionHeading
                eyebrow="Next steps"
                title="Welcome to the family"
                description="If you've given your life to Jesus, or want to talk with someone about it, we'd love to walk with you."
              />
              <Assurances
                items={[
                  { title: "Meet a pastor", body: "Someone will call to pray with you and answer your questions." },
                  { title: "Join a house fellowship", body: "Grow alongside believers who live near you." },
                  { title: "Get planted", body: "Join a group or ministry and find your place in the family." },
                ]}
              />
            </>
          }
        >
          <NewConvertForm />
        </FormSplit>
      </div>
    </>
  );
}
