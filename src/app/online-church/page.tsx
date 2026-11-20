import { Headphones } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import LiveProgram from "@/components/livestream/LiveProgram";
import SocialMedia from "@/components/social-media/SocialMedia";
import VideoPlayer from "./VideoPlayer";
import { getPlaylistVideos } from "@/lib/youtube";
import { weeklyServices } from "@/lib/site";
import onlineChurch from "../../../public/images/word-worship-prayer.jpg";

export const metadata = {
  title: "Online Church",
  description: "Watch RCCG Beautiful Gate services live and explore our sermon archive.",
};

export default async function Page() {
  const videoMessages = (await getPlaylistVideos()) ?? [];

  return (
    <>
      <PageHero
        image={onlineChurch}
        eyebrow="Online church"
        title="Worship with us, wherever you are"
        description="Join our services live on YouTube, and grow in the Word through our sermon archive."
      />

      <Section tone="ink" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -right-40 -bottom-40 size-[34rem] rounded-full bg-royal/40 blur-3xl" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              invert
              eyebrow="Watch live"
              title="Service stream"
              description="When we're live, the service plays here automatically. Otherwise you'll see our most recent service."
            />
            <ul className="mt-8 space-y-2 text-white/70">
              {weeklyServices.flatMap((d) =>
                d.items
                  .filter((i) => !i.name.includes("House"))
                  .map((i) => (
                    <li key={d.day + i.name} className="flex justify-between gap-4 border-b border-white/10 pb-2">
                      <span>
                        {d.day} · {i.name}
                      </span>
                      <span className="shrink-0 text-gold">{i.time}</span>
                    </li>
                  ))
              )}
            </ul>
            <SocialMedia className="mt-8 text-white/80" />
          </div>
          <div className="lg:col-span-8">
            <div className="rounded-[2rem] bg-white/5 p-2 ring-1 ring-white/10 sm:p-3">
              <LiveProgram />
            </div>
          </div>
        </Container>
      </Section>

      <Section id="sermons">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Sermon archive"
              title="Video messages"
              description="Search past messages from our pastors and pick up where you left off."
            />
          </Reveal>
          <div className="mt-12">
            <VideoPlayer videos={videoMessages} />
          </div>
        </Container>
      </Section>

      <Section tone="sand" id="audio" className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-start gap-5 rounded-3xl border border-line bg-white p-8 shadow-soft sm:flex-row sm:items-center">
            <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gold-soft text-ink">
              <Headphones className="size-6" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-2xl font-medium text-ink">Audio messages are coming soon</h2>
              <p className="mt-1 text-stone">
                We&apos;re preparing an audio library so you can listen on the go. In the meantime, every message is on our YouTube channel.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
