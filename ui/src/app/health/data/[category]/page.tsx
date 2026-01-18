import { CategoryDetailView } from "@/components/views/health-data";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  return <CategoryDetailView categoryId={category} />;
}
