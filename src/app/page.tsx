import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Cross,
  Gift,
  HandHeart,
  MapPin,
  MessageSquareQuote,
  PlayCircle,
  Navigation,
} from "lucide-react";

import churchFront from "../../public/images/church-front.jpg";
import congregation from "../../public/7.jpg";
import celebration from "../../public/randomChurchPic2.jpg";
import choir from "../../public/fullChoir.jpg";
import wordWorshipPrayer from "../../public/images/word-worship-prayer.jpg";
import pastor from "../../public/images/pastor-preaching.jpg";

import HeroSlideshow from "@/components/home/HeroSlideshow";
import { ButtonLink, Container, IconBadge, Section, SectionHeading } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import LiveProgram from "@/components/livestream/LiveProgram";
import InstagramFeed from "@/components/instagramFeed/InstagramFeed";
import InstagramProfile from "@/components/instagramFeed/InstagramProfile";
import MapComponent from "@/components/map/GoogleMap";
import ContactInfo from "@/components/contactInfo/ContactInfo";
import SocialMedia from "@/components/social-media/SocialMedia";
import { directionsUrl, monthlyPrograms, site, weeklyServices } from "@/lib/site";
import { ChurchWelcomeParagraph } from "@/components/data/Data";

const slides = [
  { src: churchFront, position: "center 40%" },
  { src: congregation, position: "center 30%" },
  { src: celebration, position: "center 25%" },
  { src: choir, position: "center" },
];

const nextSteps = [
  {
    icon: <Cross />,
    title: "How can I be saved?",
    body: "The most important question you will ever ask: one that matters for eternity.",
    href: "/how-can-i-be-saved",
    cta: "Learn more",
  },
  {
    icon: <PlayCircle />,
    title: "Online church & sermons",
    body: "Worship with us live, or catch up on messages from our pastors.",
    href: "/online-church",
    cta: "Watch now",
  },
  {
    icon: <HandHeart />,
    title: "Request prayer",
    body: "Whatever you are facing, our pastors and prayer team would love to pray with you.",
    href: "/prayer-request",
    cta: "Send a request",
  },
  {
    icon: <MessageSquareQuote />,
    title: "Share a testimony",
    body: "Tell us what the Lord has done for you, and encourage someone else's faith.",
    href: "/testimony",
    cta: "Share yours",
  },
  {
    icon: <Gift />,
    title: "Giving & partnership",
    body: "“Give, and it will be given to you: a good measure, pressed down…” Luke 6:38",
    href: "/online-giving",
    cta: "Give online",
  },
];

export default function Home() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink pt-32 pb-16 text-white sm:pb-24">
        <HeroSlideshow slides={slides} />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/55 to-ink/30" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-ink/80 via-ink/30 to-transparent" />

        <Container>
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-gold" aria-hidden />
              {site.tagline}
            </p>
            <h1 className="mt-7 font-display text-5xl leading-[1.02] font-medium tracking-tight sm:text-7xl">
              Experience God&apos;s love through{" "}
              <em className="text-gold not-italic sm:italic">worship</em> and fellowship.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
              A welcoming family in Lakowe, devoted to the Word, worship and prayer. Whoever you are,
              there&apos;s a seat for you here.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="#visit" variant="gold" size="lg">
                Plan your visit <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/online-church" variant="light" size="lg">
                <PlayCircle /> Watch online
              </ButtonLink>
            </div>
          </div>

          {/* service times strip */}
          <dl className="mt-14 grid max-w-3xl grid-cols-1 overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl sm:grid-cols-3">
            {[
              { day: "Sundays", time: "8:00 & 10:00 AM" },
              { day: "Tuesdays", time: "6:00 PM · Digging Deep" },
              { day: "Thursdays", time: "6:00 PM · Faith Clinic" },
            ].map((s, i) => (
              <div
                key={s.day}
                className={`px-6 py-4 ${i > 0 ? "border-t border-white/10 sm:border-t-0 sm:border-l" : ""}`}
              >
                <dt className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{s.day}</dt>
                <dd className="mt-1 font-medium">{s.time}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ─── Welcome ──────────────────────────────────────────── */}
      <Section id="welcome">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="absolute -top-5 -left-5 hidden h-full w-full rounded-[2rem] border-2 border-gold/50 sm:block" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
              <Image
                src={pastor}
                alt="Our pastor ministering during a service"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                placeholder="blur"
                className="object-cover object-[50%_20%]"
              />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-full bg-ink px-6 py-3 text-white shadow-lift sm:left-auto sm:-right-6">
              <p className="font-display text-lg whitespace-nowrap text-gold">Word · Worship · Prayer</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Welcome home" title={ChurchWelcomeParagraph.title} />
            <p className="mt-6 text-lg leading-relaxed text-stone">{ChurchWelcomeParagraph.paragraph}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/about-us" variant="primary">
                Our story <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/how-can-i-be-saved" variant="outline">
                New here? Start here
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ─── Next steps ───────────────────────────────────────── */}
      <Section tone="sand">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Find your next step"
              title="Wherever you are on your journey"
              description="Whether you're exploring faith for the first time or looking for a church family, here's how to take the next step with us."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {nextSteps.map((step, i) => (
              <Reveal key={step.href} delay={i * 0.06} className={i === 0 ? "lg:row-span-2" : ""}>
                <Link
                  href={step.href}
                  className={`group flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                    i === 0
                      ? "border-transparent bg-ink text-white"
                      : "border-line bg-white text-ink shadow-soft"
                  }`}
                >
                  <IconBadge className={i === 0 ? "bg-gold text-ink" : ""}>{step.icon}</IconBadge>
                  <h3 className={`mt-6 font-display text-2xl font-medium ${i === 0 ? "sm:text-4xl" : ""}`}>
                    {step.title}
                  </h3>
                  <p className={`mt-3 leading-relaxed ${i === 0 ? "text-white/70 sm:text-lg" : "text-stone"}`}>
                    {step.body}
                  </p>
                  <span
                    className={`mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold ${
                      i === 0 ? "text-gold" : "text-royal"
                    }`}
                  >
                    {step.cta}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── Services ─────────────────────────────────────────── */}
      <Section tone="ink" id="services" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 size-[30rem] rounded-full bg-royal/40 blur-3xl" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              invert
              eyebrow="Worship with us"
              title="Weekly services"
              description="Join us in person at the church auditorium in Lakowe. Every gathering is open to everyone."
            />
          </Reveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {weeklyServices.map((service, i) => (
              <Reveal key={service.day} delay={i * 0.08} className={i === 0 ? "lg:row-span-2" : "lg:col-span-2"}>
                <article className="group relative flex h-full min-h-[16rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink-soft p-7">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/75 to-ink/10" />
                  <div className="relative">
                    <h3 className="font-display text-3xl font-medium">{service.day}</h3>
                    <ul className="mt-5 space-y-4">
                      {service.items.map((item) => (
                        <li key={item.name} className="border-t border-white/10 pt-4">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-gold">{item.time}</p>
                          {item.note && <p className="mt-0.5 text-sm text-white/55">{item.note}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20">
            <h3 className="flex items-center gap-3 font-display text-3xl font-medium">
              <CalendarDays className="size-7 text-gold" aria-hidden /> Monthly programmes
            </h3>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {monthlyPrograms.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <article className="flex items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-4 pr-6 backdrop-blur">
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl">
                    <Image src={p.image} alt="" fill sizes="96px" className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{p.name}</h4>
                    <p className="mt-1 text-sm text-gold">{p.when}</p>
                    <p className="text-sm text-white/60">{p.time}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── Watch ────────────────────────────────────────────── */}
      <Section id="connect">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              eyebrow="Online church"
              title="Wherever you are, worship with us"
              description="Join our services live on YouTube, or explore the sermon archive and grow in the Word through the week."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/online-church#sermons" variant="primary">
                Sermon archive <ArrowRight />
              </ButtonLink>
            </div>
            <div className="mt-10">
              <p className="text-sm font-semibold text-stone">Follow along</p>
              <SocialMedia className="mt-3 text-ink" showHandle />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="overflow-hidden rounded-[2rem] bg-ink p-2 shadow-lift sm:p-3">
              <LiveProgram />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ─── Community / Instagram ────────────────────────────── */}
      <Section tone="sand">
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Life at Beautiful Gate"
                title="Moments from our church family"
                description={`Catch the latest from services, outreaches and celebrations on Instagram ${site.socials.handle}.`}
              />
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-soft">
                <Image
                  src={wordWorshipPrayer}
                  alt="Ministers on stage beneath the Word, Worship, Prayer banner"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
          <div className="mt-12">
            <InstagramProfile />
            <InstagramFeed />
          </div>
        </Container>
      </Section>

      {/* ─── Visit ────────────────────────────────────────────── */}
      <Section id="visit">
        <Container className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="Plan your visit"
              title="We'd love to meet you"
              description="First time? Come as you are. Our ushers will welcome you at the door and help you find a seat."
            />
            <ContactInfo className="mt-10" />
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-ink-soft"
              >
                <Navigation className="size-4" aria-hidden /> Get directions
              </a>
              <ButtonLink href="/contact-us" variant="outline">
                <MapPin /> Contact us
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="h-[28rem] overflow-hidden rounded-[2rem] border border-line bg-sand shadow-soft lg:h-full lg:min-h-[32rem]">
              <MapComponent />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
