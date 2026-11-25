import { BookOpen, HandHeart, Home, MessageCircle, Users } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import { ButtonLink, Card, Container, IconBadge, Section, SectionHeading } from "@/components/site/primitives";
import ContactInfo from "@/components/contactInfo/ContactInfo";
import { site, weeklyServices } from "@/lib/site";
import { whatsappNumber } from "@/lib/phone";
import HeaderImage from "../../../public/randomChurchPic.jpg";

export const metadata = {
  title: "House Fellowship Centers",
  description: "Join a RCCG Beautiful Gate house fellowship near you. We meet every Sunday evening. Contact the church to be connected.",
};

// Center addresses and hosts' phone numbers are private, so they're no longer listed publicly.
// Admins still manage centers on the dashboard, and the church connects people to the nearest one.

const fellowshipTime =
  weeklyServices.flatMap((d) => d.items.map((i) => ({ day: d.day, ...i }))).find((i) => i.name === "House Fellowship") ??
  null;

const expect = [
  { icon: <BookOpen />, title: "Bible study", body: "A short, practical study of God's Word you can apply through the week." },
  { icon: <HandHeart />, title: "Prayer", body: "Praying for one another, our families and our community." },
  { icon: <Users />, title: "Friendship", body: "A small, welcoming group of neighbours who look out for each other." },
];

export default function Page() {
  const whatsapp = site.phones[0];

  return (
    <>
      <PageHero
        image={HeaderImage}
        eyebrow="House fellowships"
        title="Church in your neighbourhood"
        description={`Every Sunday${fellowshipTime ? ` at ${fellowshipTime.time.split(" –")[0]}` : " evening"}, believers gather in homes across our zones for worship, teaching and fellowship.`}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="What to expect"
                title="Small groups, big family"
                description="House fellowships are where church becomes personal: a place to be known, prayed for and encouraged during the week."
              />
              <ul className="mt-10 grid gap-4 sm:grid-cols-3">
                {expect.map((e) => (
                  <li key={e.title}>
                    <Card className="h-full p-6">
                      <IconBadge>{e.icon}</IconBadge>
                      <h3 className="mt-5 font-display text-xl font-medium text-ink">{e.title}</h3>
                      <p className="mt-2 text-stone">{e.body}</p>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="p-7 sm:p-8 lg:col-span-5">
              <IconBadge>
                <Home />
              </IconBadge>
              <h2 className="mt-5 font-display text-2xl font-medium text-ink">Find a fellowship near you</h2>
              <p className="mt-3 text-stone">
                We have centers in many neighbourhoods. To keep our hosts&apos; homes and details private, we don&apos;t
                list them online. Contact the church and we&apos;ll connect you with the center closest to you.
              </p>
              <ContactInfo className="mt-6" />
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/contact-us" size="lg">
                  Send us a message
                </ButtonLink>
                <ButtonLink
                  href={`https://wa.me/${whatsappNumber(whatsapp)}?text=${encodeURIComponent("Hello, I'd like to join a house fellowship near me.")}`}
                  variant="outline"
                  size="lg"
                >
                  <MessageCircle aria-hidden /> WhatsApp
                </ButtonLink>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
