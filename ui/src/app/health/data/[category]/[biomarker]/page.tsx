import { BiomarkerDetailView } from "@/components/views/biomarker-detail";

interface BiomarkerPageProps {
  params: Promise<{
    category: string;
    biomarker: string;
  }>;
}

export default async function BiomarkerPage({ params }: BiomarkerPageProps) {
  const { category, biomarker } = await params;
  return <BiomarkerDetailView categoryId={category} biomarkerId={biomarker} />;
}
