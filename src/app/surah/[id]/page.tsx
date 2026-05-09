import { SurahPageClient } from "./SurahPageClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({ id: String(i + 1) }));
}

export default async function SurahPage({ params }: Props) {
  const { id } = await params;
  return <SurahPageClient surahId={parseInt(id)} />;
}