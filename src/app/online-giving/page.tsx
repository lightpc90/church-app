import Image from "next/image";
import { Building2, HeartHandshake, Church, Globe2, Sparkles } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import { Card, Container, IconBadge, Section } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import { AccountData } from "@/components/data/Data";
import CopyButton from "./CopyButton";
import givingImage from "../../../public/headers/offering.png";
import bankLogo from "../../../public/headers/zenith-logo.jpg";

export const metadata = {
  title: "Giving & Partnership",
  description: "Give your tithes, offerings and seeds to RCCG Beautiful Gate Parish by bank transfer.",
};

// Accounts still holding a placeholder number are hidden so nobody transfers to the wrong account.
const PLACEHOLDER_ACCOUNT_NUMBERS = new Set([1234567890]);

const funds = [
  { key: "titheAndOffering", title: "Tithes & Offerings", icon: <Church />, body: "Honour the Lord with your substance and the firstfruits of your increase." },
  { key: "building", title: "Building Fund", icon: <Building2 />, body: "Partner with us as we build a house for God's people." },
  { key: "welfare", title: "Welfare", icon: <HeartHandshake />, body: "Care for members and neighbours in need." },
  { key: "mission", title: "Missions", icon: <Globe2 />, body: "Take the Gospel beyond our walls." },
  { key: "youth", title: "Youth", icon: <Sparkles />, body: "Invest in the next generation." },
] as const;

export default function Page() {
  const visibleFunds = funds
    .map((fund) => ({
      ...fund,
      accounts: AccountData[fund.key].filter((a) => !PLACEHOLDER_ACCOUNT_NUMBERS.has(a.accountNumber)),
    }))
    .filter((fund) => fund.accounts.length > 0);

  return (
    <>
      <PageHero
        image={givingImage}
        soft
        eyebrow="Giving & partnership"
        title="Give generously, joyfully"
        description="Thank you for partnering with us to advance the Kingdom. Give securely by bank transfer to any of the accounts below."
      />

      <Section>
        <Container>
          <Reveal>
            <blockquote className="mx-auto max-w-3xl text-center">
              <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">
                “Give, and it will be given to you. A good measure, pressed down, shaken together and running over,
                will be poured into your lap.”
              </p>
              <cite className="mt-4 block text-sm font-semibold tracking-[0.18em] text-gold uppercase not-italic">
                Luke 6:38
              </cite>
            </blockquote>
          </Reveal>

          <div className="mt-20 grid gap-6 md:grid-cols-2">
            {visibleFunds.map((fund, i) => (
              <Reveal key={fund.key} delay={i * 0.06} className={i === 0 ? "md:col-span-2" : ""}>
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <IconBadge>{fund.icon}</IconBadge>
                    <div>
                      <h2 className="font-display text-2xl font-medium text-ink">{fund.title}</h2>
                      <p className="mt-1 text-stone">{fund.body}</p>
                    </div>
                  </div>
                  <div className={`mt-6 grid gap-4 ${i === 0 ? "lg:grid-cols-2" : ""}`}>
                    {fund.accounts.map((account) => {
                      const number = String(account.accountNumber);
                      return (
                        <div key={number + account.type} className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl bg-sand p-4">
                          <Image src={bankLogo} alt={account.bank} width={48} height={48} className="size-12 rounded-xl bg-white object-contain p-1" />
                          <div className="min-w-[11rem] flex-1">
                            <p className="text-xs font-semibold tracking-wider text-stone uppercase">
                              {account.bank} · {account.type}
                            </p>
                            <p className="mt-0.5 font-display text-2xl tracking-wider whitespace-nowrap text-ink tabular-nums">{number}</p>
                            <p className="truncate text-sm text-stone">{account.accountName}</p>
                          </div>
                          <CopyButton value={number} label={`${fund.title} account number`} />
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-stone">
            Please include a short description with your transfer (e.g. &ldquo;Tithe&rdquo; or &ldquo;Building&rdquo;). For
            other ways to give, contact the church office.
          </p>
        </Container>
      </Section>
    </>
  );
}
