"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useHealth, type BiomarkerDetail, type CategoryDetail } from "@/components/context/health-context";
import {
  StatusBadge,
  RangeChart,
  TrendChart,
} from "@/components/shared/health-ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface BiomarkerDetailViewProps {
  categoryId: string;
  biomarkerId: string;
}

export function BiomarkerDetailView({
  categoryId,
  biomarkerId,
}: BiomarkerDetailViewProps) {
  const { fetchBiomarkerDetail, fetchCategoryDetail } = useHealth();
  const [biomarkerData, setBiomarkerData] = useState<BiomarkerDetail | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const [bResult, cResult] = await Promise.all([
        fetchBiomarkerDetail(biomarkerId),
        fetchCategoryDetail(categoryId),
      ]);
      setBiomarkerData(bResult);
      setCategoryData(cResult);
      setIsLoading(false);
    }
    load();
  }, [biomarkerId, categoryId, fetchBiomarkerDetail, fetchCategoryDetail]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!biomarkerData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Biomarker not found</p>
        <Link
          href={`/health/data/${categoryId}`}
          className="mt-4 inline-flex items-center text-brand-teal-600 hover:text-brand-teal-700"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          Back to Category
        </Link>
      </div>
    );
  }

  const { biomarker, recommendations } = biomarkerData;
  const category = categoryData?.category;

  // Get food recommendations
  const foodRecommendations = recommendations.filter((r) => r.type === "food");

  // Get supplement recommendations
  const supplementRecommendations = recommendations.filter(
    (r) => r.type === "supplement"
  );

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm flex-wrap">
        <Link
          href="/health/data"
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          Data
        </Link>
        <ChevronLeftIcon className="w-4 h-4 text-gray-400 rotate-180" />
        <Link
          href={`/health/data/${categoryId}`}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          {category?.name || "Category"}
        </Link>
        <ChevronLeftIcon className="w-4 h-4 text-gray-400 rotate-180" />
        <span className="text-gray-900 font-medium">
          {biomarker.shortName || biomarker.name}
        </span>
      </nav>

      {/* Biomarker header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-serif text-gray-900 mb-2">
          {biomarker.name}
        </h1>
        <div className="flex items-center gap-3 mb-4">
          <StatusBadge
            status={biomarker.status}
            value={
              typeof biomarker.value === "number"
                ? biomarker.value.toLocaleString()
                : biomarker.value || undefined
            }
            unit={biomarker.unit}
            size="md"
          />
        </div>
        {biomarker.description && (
          <p className="text-gray-600 leading-relaxed">{biomarker.description}</p>
        )}
      </div>

      {/* Range visualization */}
      {typeof biomarker.value === "number" && biomarker.range && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Reference Range
          </h2>
          <RangeChart
            value={biomarker.value}
            range={biomarker.range}
            status={biomarker.status}
          />
        </div>
      )}

      {/* Historical trend */}
      {biomarker.history && biomarker.history.length > 1 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Historical Trend
          </h2>
          <TrendChart
            history={biomarker.history}
            range={biomarker.range}
            height={150}
          />
        </div>
      )}

      {/* Tabs for additional info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <Tabs defaultValue="why-it-matters">
          <TabsList className="w-full justify-start bg-gray-100 p-1 rounded-lg">
            <TabsTrigger
              value="why-it-matters"
              className="flex-1 data-[state=active]:bg-white"
            >
              Why it matters
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="flex-1 data-[state=active]:bg-white"
            >
              Recommendations
            </TabsTrigger>
            <TabsTrigger
              value="foods"
              className="flex-1 data-[state=active]:bg-white"
            >
              Foods to eat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="why-it-matters" className="mt-4">
            <div className="prose prose-gray max-w-none">
              {biomarker.whyItMatters ? (
                <p className="text-gray-600 leading-relaxed">
                  {biomarker.whyItMatters}
                </p>
              ) : (
                <div className="text-gray-600 leading-relaxed space-y-3">
                  <p>
                    {biomarker.name} is an important marker in the{" "}
                    {category?.name?.toLowerCase() || "health"} category.
                  </p>
                  {biomarker.status === "out_of_range" && (
                    <p>
                      Your current level of{" "}
                      <span className="font-medium">
                        {biomarker.value} {biomarker.unit}
                      </span>{" "}
                      is outside the optimal range (
                      {biomarker.range.low !== null && biomarker.range.low}-
                      {biomarker.range.high} {biomarker.unit}). Consider
                      discussing this with your healthcare provider.
                    </p>
                  )}
                  {biomarker.status === "in_range" && (
                    <p>
                      Your current level of{" "}
                      <span className="font-medium">
                        {biomarker.value} {biomarker.unit}
                      </span>{" "}
                      is within the optimal range. Keep up the good work!
                    </p>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-4">
            {supplementRecommendations.length > 0 ? (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  Suggested Supplements
                </h3>
                <ul className="space-y-2">
                  {supplementRecommendations.map((rec) => (
                    <li
                      key={rec.id}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="w-2 h-2 mt-2 rounded-full bg-brand-teal-500 flex-shrink-0" />
                      <span className="font-medium text-gray-900">
                        {rec.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 italic">
                  Always consult with a healthcare provider before starting any
                  new supplement regimen.
                </p>
              </div>
            ) : (
              <p className="text-gray-500">
                No specific supplement recommendations for this biomarker at this
                time.
              </p>
            )}
          </TabsContent>

          <TabsContent value="foods" className="mt-4">
            {foodRecommendations.length > 0 ? (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  Foods That May Help
                </h3>
                <ul className="space-y-2">
                  {foodRecommendations.map((rec) => (
                    <li
                      key={rec.id}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="w-2 h-2 mt-2 rounded-full bg-brand-teal-500 flex-shrink-0" />
                      <span className="text-gray-900">{rec.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500">
                No specific food recommendations for this biomarker at this time.
                A balanced, whole-foods diet is generally recommended.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Last updated */}
      <div className="text-center text-sm text-gray-400">
        Last updated:{" "}
        {new Date(biomarker.lastUpdated).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    </div>
  );
}
