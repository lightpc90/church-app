import Image from "next/image";
import { BookOpen, Music, HandHeart, ArrowRight } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import { ButtonLink, Card, Container, IconBadge, Section, SectionHeading } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import { AboutUs } from "@/components/data/Data";
import churchFront from "../../../public/images/church-front.jpg";
import congregation from "../../../public/7.jpg";

export const metadata = {
  title: "About Us",
  description: "RCCG Beautiful Gate Parish is the Lagos Province 114 Headquarters of the Redeemed Christian Church of God in Lakowe, Lagos.",
};

const values = [
  { icon: <BookOpen />, title: "The Word", body: "Teaching that is rooted in Scripture and practical for everyday life." },
  { icon: <Music />, title: "Worship", body: "Vibrant, heartfelt worship that brings us into God's presence." },
  { icon: <HandHeart />, title: "Prayer", body: "A praying church that believes God hears and answers." },
];

// Replace `image` with a real portrait (e.g. "/pastors/egra.jpg") when available.
const pastors: { name: string; role?: string; image?: string }[] = [
  { name: "Pastor Egra Akpofure", role: "PICP" },
  { name: "Pastor Deji Adeniyi", role: "APICP" },
  { name: "Pastor Oluseye Opasanya" },
];

const initials = (name: string) =>
  name
    .replace(/^Pastor\s+/i, "")
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

export default function Page() {
  return (
    <>
      <PageHero
        image={churchFront}
        imagePosition="center 40%"
        eyebrow="About us"
        title="A house of faith, fellowship and love"
        description="A parish of the Redeemed Christian Church of God and the Lagos Province 114 Headquarters, in Lakowe, Lagos."
      />

      <Section>
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Our story" title="Welcome to Beautiful Gate" />
            <p className="mt-6 text-lg leading-relaxed whitespace-pre-line text-stone">{AboutUs.body.trim().replace(/\n/g, " ")}</p>
            <ButtonLink href="/contact-us" variant="primary" className="mt-10">
              Plan a visit <ArrowRight />
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
              <Image src={congregation} alt="Members of the congregation during a service" fill placeholder="blur" sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <Reveal>
            <SectionHeading align="center" eyebrow="What we're about" title="Word, worship and prayer" />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <Card className="h-full">
                  <IconBadge>{v.icon}</IconBadge>
                  <h3 className="mt-6 font-display text-2xl font-medium text-ink">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-stone">{v.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading align="center" eyebrow="Leadership" title="Meet our pastors" />
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pastors.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <figure className="group text-center">
                  <div className="relative mx-auto aspect-[4/5] overflow-hidden rounded-[2rem] bg-linear-to-br from-ink to-royal shadow-soft">
                    {p.image ? (
                      <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center font-display text-8xl text-gold/80" aria-hidden>
                        {initials(p.name)}
                      </span>
                    )}
                  </div>
                  <figcaption className="mt-5">
                    <p className="font-display text-2xl text-ink">{p.name}</p>
                    {p.role && <p className="mt-1 text-sm font-semibold tracking-[0.18em] text-gold uppercase">{p.role}</p>}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
