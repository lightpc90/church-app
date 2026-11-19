import PageHero from "@/components/site/PageHero";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import GroupLayout from "@/components/UILayouts/GroupLayout";
import { QuickLinks } from "@/components/data/Data";
import headerImage from "../../../public/images/neo-light.jpg";

export const metadata = {
  title: "Groups & Ministries",
  description: "Find your people: join one of our natural groups or ministries at RCCG Beautiful Gate.",
};

function GroupGrid({ eyebrow, title, description, groups }: {
  eyebrow: string;
  title: string;
  description: string;
  groups: typeof QuickLinks;
}) {
  return (
    <div>
      <Reveal>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      </Reveal>
      <div
        className={`mt-12 grid gap-6 sm:grid-cols-2 ${
          groups.length % 4 === 0 ? "lg:grid-cols-4" : groups.length === 2 ? "lg:max-w-4xl" : "lg:grid-cols-3"
        }`}
      >
        {groups.map((group, i) => (
          <Reveal key={group.name} delay={i * 0.06}>
            <GroupLayout group={group} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const naturalGroups = QuickLinks.filter((link) => link.category === "Natural Groups");
  const ministries = QuickLinks.filter((link) => link.category === "Ministries");

  return (
    <>
      <PageHero
        image={headerImage}
        eyebrow="Groups & ministries"
        title="Find your people"
        description="Church is better together. Join a natural group for your season of life, or register your teens and children in our ministries."
      />
      <Section>
        <Container className="space-y-24">
          <GroupGrid
            eyebrow="Natural groups"
            title="Grow with others in your season"
            description="Fellowship, mentoring and friendship with people walking the same road."
            groups={naturalGroups}
          />
          <GroupGrid
            eyebrow="Ministries"
            title="For the next generation"
            description="Safe, fun and faith-filled programmes for teens and children."
            groups={ministries}
          />
        </Container>
      </Section>
    </>
  );
}
