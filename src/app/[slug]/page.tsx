import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AthleteView } from "@/components/athlete/AthleteView";
import { resolveAthleteSiteMetadata } from "@/lib/athleteMetadata";
import { getAthleteBySlug, getAthleteSlugs } from "@/lib/loadAthlete";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAthleteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getAthleteBySlug(slug);
  if (!data) return {};
  return {
    title: data.meta.title,
    description: data.meta.description,
    ...resolveAthleteSiteMetadata(data),
  };
}

export default async function AthletePage({ params }: Props) {
  const { slug } = await params;
  const data = getAthleteBySlug(slug);
  if (!data) notFound();
  return <AthleteView data={data} />;
}
