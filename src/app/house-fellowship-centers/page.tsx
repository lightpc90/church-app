import PageHero from "@/components/site/PageHero";
import { Container, Section } from "@/components/site/primitives";
import HeaderImage from "../../../public/randomChurchPic.jpg";
import prisma from "@/lib/prisma";
import HfcDirectory from "./HfcDirectory";

export const metadata = {
  title: "House Fellowship Centers",
  description: "Find a RCCG Beautiful Gate house fellowship center near you. We meet every Sunday at 5 PM.",
};

// Always read fresh from the database (admins add centers from the dashboard).
export const dynamic = "force-dynamic";

async function getCenters() {
  try {
    return await prisma.houseFellowship.findMany({
      orderBy: [{ zone: "asc" }, { center: "asc" }],
      select: {
        id: true,
        center: true,
        zone: true,
        address: true,
        host: true,
        host_phone: true,
        teacher: true,
        teacher_phone: true,
      },
    });
  } catch (e) {
    console.error("[house-fellowship-centers] failed to load centers:", e);
    return null;
  }
}

const Page = async () => {
  const centers = await getCenters();

  return (
    <>
      <PageHero
        image={HeaderImage}
        eyebrow="House fellowships"
        title="Church in your neighbourhood"
        description="Every Sunday at 5 PM, believers gather in homes across our zones for worship, teaching and fellowship. Find a center near you."
      />
      <Section>
        <Container>
          {centers === null ? (
            <p role="alert" className="rounded-3xl bg-red-50 p-6 text-red-900">
              We couldn&apos;t load the house fellowship centers right now. Please try again later.
            </p>
          ) : (
            <HfcDirectory centers={centers} />
          )}
        </Container>
      </Section>
    </>
  );
};

export default Page;
