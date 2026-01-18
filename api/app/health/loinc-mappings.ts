/**
 * LOINC Code Mappings
 *
 * Maps LOINC codes to biomarker definitions. This is the translation layer
 * between FHIR Observation resources and our internal biomarker model.
 *
 * LOINC (Logical Observation Identifiers Names and Codes) is the universal
 * standard for identifying lab tests. Every lab (Quest, LabCorp, etc.) uses
 * LOINC codes in their FHIR APIs.
 *
 * Reference: https://loinc.org/
 */

import type { CategoryId } from './types';

// ============================================================================
// Types
// ============================================================================

export interface LoincMapping {
  /** LOINC code (e.g., "3016-3") */
  loincCode: string;

  /** Our internal biomarker ID */
  biomarkerId: string;

  /** Full biomarker name */
  name: string;

  /** Short display name */
  shortName?: string;

  /** Category this biomarker belongs to */
  categoryId: CategoryId;

  /** Unit of measurement */
  unit: string;

  /** Standard reference range (from labs) */
  referenceRange?: {
    low: number | null;
    high: number | null;
  };

  /** Optimal range (for health optimization) */
  optimalRange?: {
    low: number | null;
    high: number | null;
  };

  /** Brief description */
  description: string;

  /** Why this marker matters for health */
  whyItMatters?: string;

  /** Alternative LOINC codes that map to the same biomarker */
  alternativeCodes?: string[];
}

// ============================================================================
// LOINC Mappings by Category
// ============================================================================

// ----------------------------------------------------------------------------
// Thyroid
// ----------------------------------------------------------------------------

const thyroidMappings: LoincMapping[] = [
  {
    loincCode: '3016-3',
    biomarkerId: 'tsh',
    name: 'Thyroid Stimulating Hormone',
    shortName: 'TSH',
    categoryId: 'thyroid',
    unit: 'mIU/L',
    referenceRange: { low: 0.4, high: 4.0 },
    optimalRange: { low: 1.0, high: 2.5 },
    description: 'Controls thyroid hormone production',
    whyItMatters:
      'TSH tells your thyroid how much hormone to make. High levels may indicate an underactive thyroid, while low levels may suggest overactivity.',
    alternativeCodes: ['11580-8', '3015-5'],
  },
  {
    loincCode: '3053-6',
    biomarkerId: 't3-free',
    name: 'Free T3',
    shortName: 'Free T3',
    categoryId: 'thyroid',
    unit: 'pg/mL',
    referenceRange: { low: 2.3, high: 4.2 },
    optimalRange: { low: 3.0, high: 4.0 },
    description: 'Active thyroid hormone',
    whyItMatters:
      'Free T3 is the active form of thyroid hormone that directly affects metabolism, energy, and body temperature.',
    alternativeCodes: ['14928-3'],
  },
  {
    loincCode: '3024-7',
    biomarkerId: 't4-free',
    name: 'Free T4',
    shortName: 'Free T4',
    categoryId: 'thyroid',
    unit: 'ng/dL',
    referenceRange: { low: 0.8, high: 1.8 },
    optimalRange: { low: 1.0, high: 1.5 },
    description: 'Main thyroid hormone',
    whyItMatters:
      'Free T4 is the primary hormone produced by the thyroid. It converts to T3 in tissues throughout the body.',
    alternativeCodes: ['14920-0'],
  },
];

// ----------------------------------------------------------------------------
// Heart / Cardiovascular
// ----------------------------------------------------------------------------

const heartMappings: LoincMapping[] = [
  {
    loincCode: '13457-7',
    biomarkerId: 'ldl',
    name: 'LDL Cholesterol',
    shortName: 'LDL',
    categoryId: 'heart',
    unit: 'mg/dL',
    referenceRange: { low: 0, high: 100 },
    optimalRange: { low: 0, high: 70 },
    description: 'Low-density lipoprotein, often called "bad" cholesterol',
    whyItMatters:
      'High LDL can build up in artery walls, increasing risk of heart disease and stroke.',
    alternativeCodes: ['2089-1', '18262-6'], // 2089-1 is direct measurement
  },
  {
    loincCode: '2085-9',
    biomarkerId: 'hdl',
    name: 'HDL Cholesterol',
    shortName: 'HDL',
    categoryId: 'heart',
    unit: 'mg/dL',
    referenceRange: { low: 40, high: 100 },
    optimalRange: { low: 60, high: 100 },
    description: 'High-density lipoprotein, "good" cholesterol',
    whyItMatters:
      'HDL helps remove other forms of cholesterol from your bloodstream. Higher levels are protective against heart disease.',
  },
  {
    loincCode: '2571-8',
    biomarkerId: 'triglycerides',
    name: 'Triglycerides',
    shortName: 'TG',
    categoryId: 'heart',
    unit: 'mg/dL',
    referenceRange: { low: 0, high: 150 },
    optimalRange: { low: 0, high: 100 },
    description: 'Type of fat in your blood',
    whyItMatters:
      'High triglycerides can contribute to hardening of arteries and increase risk of heart disease, especially combined with high LDL or low HDL.',
    alternativeCodes: ['12951-0'],
  },
  {
    loincCode: '1869-7',
    biomarkerId: 'apob',
    name: 'Apolipoprotein B',
    shortName: 'ApoB',
    categoryId: 'heart',
    unit: 'mg/dL',
    referenceRange: { low: 0, high: 90 },
    optimalRange: { low: 0, high: 70 },
    description: 'Protein that carries cholesterol in the blood',
    whyItMatters:
      'ApoB is considered a more accurate predictor of heart disease risk than LDL alone. Each atherogenic particle has one ApoB molecule.',
  },
  {
    loincCode: '30522-7',
    biomarkerId: 'hscrp',
    name: 'High-Sensitivity C-Reactive Protein',
    shortName: 'hs-CRP',
    categoryId: 'heart',
    unit: 'mg/L',
    referenceRange: { low: 0, high: 3.0 },
    optimalRange: { low: 0, high: 1.0 },
    description: 'Marker of inflammation in the body',
    whyItMatters:
      'Elevated hs-CRP indicates systemic inflammation which can damage blood vessels and increase cardiovascular risk.',
    alternativeCodes: ['71426-1'],
  },
];

// ----------------------------------------------------------------------------
// Blood / Hematology
// ----------------------------------------------------------------------------

const bloodMappings: LoincMapping[] = [
  {
    loincCode: '789-8',
    biomarkerId: 'rbc',
    name: 'Red Blood Cells',
    shortName: 'RBC',
    categoryId: 'blood',
    unit: 'M/uL',
    referenceRange: { low: 4.2, high: 5.8 },
    optimalRange: { low: 4.5, high: 5.5 },
    description: 'Oxygen-carrying cells',
    whyItMatters:
      'Red blood cells carry oxygen throughout your body. Low levels may indicate anemia; high levels may suggest dehydration or other conditions.',
    alternativeCodes: ['26453-1'],
  },
  {
    loincCode: '718-7',
    biomarkerId: 'hemoglobin',
    name: 'Hemoglobin',
    shortName: 'Hb',
    categoryId: 'blood',
    unit: 'g/dL',
    referenceRange: { low: 13.5, high: 17.5 },
    optimalRange: { low: 14.0, high: 16.5 },
    description: 'Oxygen-carrying protein in red blood cells',
    whyItMatters:
      'Hemoglobin is the protein in red blood cells that carries oxygen. Low levels indicate anemia and can cause fatigue.',
    alternativeCodes: ['20509-6'],
  },
  {
    loincCode: '4544-3',
    biomarkerId: 'hematocrit',
    name: 'Hematocrit',
    shortName: 'Hct',
    categoryId: 'blood',
    unit: '%',
    referenceRange: { low: 38, high: 50 },
    optimalRange: { low: 40, high: 48 },
    description: 'Percentage of blood that is red blood cells',
    whyItMatters:
      'Hematocrit shows what portion of your blood is red blood cells. Abnormal levels can indicate anemia, dehydration, or blood disorders.',
    alternativeCodes: ['20570-8'],
  },
  {
    loincCode: '777-3',
    biomarkerId: 'platelets',
    name: 'Platelets',
    shortName: 'PLT',
    categoryId: 'blood',
    unit: 'K/uL',
    referenceRange: { low: 150, high: 400 },
    optimalRange: { low: 175, high: 350 },
    description: 'Cells that help blood clot',
    whyItMatters:
      'Platelets are essential for blood clotting. Low levels increase bleeding risk; high levels may increase clotting risk.',
    alternativeCodes: ['26515-7'],
  },
];

// ----------------------------------------------------------------------------
// Metabolic
// ----------------------------------------------------------------------------

const metabolicMappings: LoincMapping[] = [
  {
    loincCode: '1558-6',
    biomarkerId: 'glucose',
    name: 'Glucose, Fasting',
    shortName: 'Glucose',
    categoryId: 'metabolic',
    unit: 'mg/dL',
    referenceRange: { low: 65, high: 99 },
    optimalRange: { low: 70, high: 90 },
    description: 'Blood sugar level (fasting)',
    whyItMatters:
      'Fasting glucose reflects how well your body regulates blood sugar. Elevated levels may indicate prediabetes or diabetes.',
    alternativeCodes: ['2345-7', '2339-0'], // 2345-7 is random glucose
  },
  {
    loincCode: '4548-4',
    biomarkerId: 'hba1c',
    name: 'Hemoglobin A1c',
    shortName: 'HbA1c',
    categoryId: 'metabolic',
    unit: '%',
    referenceRange: { low: 4.0, high: 5.6 },
    optimalRange: { low: 4.5, high: 5.3 },
    description: 'Average blood sugar over 2-3 months',
    whyItMatters:
      'HbA1c reflects your average blood sugar over the past 2-3 months. It\'s used to diagnose and monitor diabetes.',
    alternativeCodes: ['4549-2', '17856-6'],
  },
  {
    loincCode: '2484-4',
    biomarkerId: 'insulin',
    name: 'Insulin, Fasting',
    shortName: 'Insulin',
    categoryId: 'metabolic',
    unit: 'uIU/mL',
    referenceRange: { low: 2.0, high: 19.6 },
    optimalRange: { low: 2.0, high: 8.0 },
    description: 'Hormone that regulates blood sugar',
    whyItMatters:
      'Elevated fasting insulin can be an early sign of insulin resistance, even when blood sugar is still normal.',
    alternativeCodes: ['20448-7'],
  },
];

// ----------------------------------------------------------------------------
// Nutrients
// ----------------------------------------------------------------------------

const nutrientMappings: LoincMapping[] = [
  {
    loincCode: '1989-3',
    biomarkerId: 'vitamin-d',
    name: 'Vitamin D, 25-Hydroxy',
    shortName: 'Vitamin D',
    categoryId: 'nutrients',
    unit: 'ng/mL',
    referenceRange: { low: 30, high: 100 },
    optimalRange: { low: 50, high: 80 },
    description: 'Essential vitamin for bone health and immune function',
    whyItMatters:
      'Vitamin D is crucial for bone health, immune function, and mood. Deficiency is common and linked to many health issues.',
    alternativeCodes: ['62292-8', '35365-6'],
  },
  {
    loincCode: '2132-9',
    biomarkerId: 'b12',
    name: 'Vitamin B12',
    shortName: 'B12',
    categoryId: 'nutrients',
    unit: 'pg/mL',
    referenceRange: { low: 200, high: 900 },
    optimalRange: { low: 500, high: 800 },
    description: 'Essential for nerve function and red blood cell formation',
    whyItMatters:
      'B12 is essential for nerve health and DNA synthesis. Deficiency can cause fatigue, weakness, and neurological problems.',
    alternativeCodes: ['16695-9'],
  },
  {
    loincCode: '2155-0',
    biomarkerId: 'homocysteine',
    name: 'Homocysteine',
    shortName: 'Hcy',
    categoryId: 'nutrients',
    unit: 'umol/L',
    referenceRange: { low: 0, high: 15 },
    optimalRange: { low: 0, high: 7.0 },
    description: 'Amino acid linked to heart and brain health',
    whyItMatters:
      'Elevated homocysteine can damage blood vessels and is associated with higher cardiovascular and cognitive disease risk. Often improved with B vitamins.',
    alternativeCodes: ['13965-9'],
  },
  {
    loincCode: '86907-5',
    biomarkerId: 'omega3',
    name: 'Omega-3 Index',
    shortName: 'Omega-3',
    categoryId: 'nutrients',
    unit: '%',
    referenceRange: { low: 4, high: 12 },
    optimalRange: { low: 8, high: 12 },
    description: 'Percentage of omega-3 fatty acids in red blood cells',
    whyItMatters:
      'The Omega-3 Index reflects long-term omega-3 intake. Low levels are associated with inflammation and increased cardiovascular risk.',
  },
];

// ----------------------------------------------------------------------------
// Liver
// ----------------------------------------------------------------------------

const liverMappings: LoincMapping[] = [
  {
    loincCode: '1742-6',
    biomarkerId: 'alt',
    name: 'Alanine Aminotransferase',
    shortName: 'ALT',
    categoryId: 'liver',
    unit: 'U/L',
    referenceRange: { low: 0, high: 44 },
    optimalRange: { low: 0, high: 25 },
    description: 'Liver enzyme indicating liver cell health',
    whyItMatters:
      'ALT is primarily found in the liver. Elevated levels can indicate liver inflammation, damage, or disease.',
    alternativeCodes: ['1743-4', '1744-2'],
  },
  {
    loincCode: '1920-8',
    biomarkerId: 'ast',
    name: 'Aspartate Aminotransferase',
    shortName: 'AST',
    categoryId: 'liver',
    unit: 'U/L',
    referenceRange: { low: 0, high: 40 },
    optimalRange: { low: 0, high: 25 },
    description: 'Enzyme found in liver and other tissues',
    whyItMatters:
      'AST is found in liver, heart, and muscle. Elevated levels can indicate liver damage but are less specific than ALT.',
    alternativeCodes: ['1918-2'],
  },
];

// ----------------------------------------------------------------------------
// Kidney
// ----------------------------------------------------------------------------

const kidneyMappings: LoincMapping[] = [
  {
    loincCode: '2160-0',
    biomarkerId: 'creatinine',
    name: 'Creatinine',
    shortName: 'Cr',
    categoryId: 'kidney',
    unit: 'mg/dL',
    referenceRange: { low: 0.7, high: 1.3 },
    optimalRange: { low: 0.8, high: 1.2 },
    description: 'Waste product filtered by kidneys',
    whyItMatters:
      'Creatinine is a waste product from muscle metabolism. Elevated levels indicate the kidneys are not filtering effectively.',
    alternativeCodes: ['38483-4'],
  },
  {
    loincCode: '33914-3',
    biomarkerId: 'egfr',
    name: 'Estimated GFR',
    shortName: 'eGFR',
    categoryId: 'kidney',
    unit: 'mL/min/1.73m2',
    referenceRange: { low: 90, high: 120 },
    optimalRange: { low: 90, high: 120 },
    description: 'Estimated kidney filtration rate',
    whyItMatters:
      'eGFR estimates how well your kidneys filter waste. Lower values indicate reduced kidney function and are used to stage chronic kidney disease.',
    alternativeCodes: ['88293-6', '48642-3', '48643-1'],
  },
];

// ----------------------------------------------------------------------------
// Male Health (Hormones)
// ----------------------------------------------------------------------------

const maleHealthMappings: LoincMapping[] = [
  {
    loincCode: '2986-8',
    biomarkerId: 'testosterone',
    name: 'Testosterone, Total',
    shortName: 'Testosterone',
    categoryId: 'male-health',
    unit: 'ng/dL',
    referenceRange: { low: 264, high: 916 },
    optimalRange: { low: 500, high: 800 },
    description: 'Primary male sex hormone',
    whyItMatters:
      'Testosterone affects muscle mass, bone density, mood, and libido. Low levels can cause fatigue, depression, and reduced quality of life.',
    alternativeCodes: ['49041-7', '14913-5'],
  },
  {
    loincCode: '2243-4',
    biomarkerId: 'estradiol',
    name: 'Estradiol',
    shortName: 'E2',
    categoryId: 'male-health', // Also used in female-health
    unit: 'pg/mL',
    referenceRange: { low: 10, high: 40 },
    optimalRange: { low: 20, high: 35 },
    description: 'Primary estrogen hormone',
    whyItMatters:
      'In men, estradiol affects bone health and libido. Elevated levels can cause gynecomastia, mood changes, and affect body composition.',
    alternativeCodes: ['14715-4'],
  },
];

// ----------------------------------------------------------------------------
// Stress & Aging
// ----------------------------------------------------------------------------

const stressMappings: LoincMapping[] = [
  {
    loincCode: '2143-6',
    biomarkerId: 'cortisol',
    name: 'Cortisol, Morning',
    shortName: 'Cortisol',
    categoryId: 'stress',
    unit: 'ug/dL',
    referenceRange: { low: 6.2, high: 19.4 },
    optimalRange: { low: 10, high: 18 },
    description: 'Primary stress hormone (AM measurement)',
    whyItMatters:
      'Cortisol follows a daily rhythm, highest in the morning. Abnormal levels can indicate adrenal dysfunction, chronic stress, or other conditions.',
    alternativeCodes: ['2142-8', '14675-0'],
  },
  {
    loincCode: '2191-5',
    biomarkerId: 'dheas',
    name: 'DHEA Sulfate',
    shortName: 'DHEA-S',
    categoryId: 'stress',
    unit: 'ug/dL',
    referenceRange: { low: 138, high: 475 },
    optimalRange: { low: 250, high: 400 },
    description: 'Hormone precursor related to aging and stress',
    whyItMatters:
      'DHEA-S is produced by the adrenal glands and declines with age. It\'s a precursor to sex hormones and may affect energy, mood, and immune function.',
  },
];

// ============================================================================
// Combined Mappings
// ============================================================================

export const allLoincMappings: LoincMapping[] = [
  ...thyroidMappings,
  ...heartMappings,
  ...bloodMappings,
  ...metabolicMappings,
  ...nutrientMappings,
  ...liverMappings,
  ...kidneyMappings,
  ...maleHealthMappings,
  ...stressMappings,
];

// ============================================================================
// Lookup Functions
// ============================================================================

/**
 * Map from LOINC code to mapping definition
 * Includes alternative codes for the same biomarker
 */
export const loincCodeMap: Map<string, LoincMapping> = new Map();

// Build the map, including alternative codes
allLoincMappings.forEach((mapping) => {
  loincCodeMap.set(mapping.loincCode, mapping);
  mapping.alternativeCodes?.forEach((altCode) => {
    loincCodeMap.set(altCode, mapping);
  });
});

/**
 * Map from our biomarker ID to mapping definition
 */
export const biomarkerIdMap: Map<string, LoincMapping> = new Map(
  allLoincMappings.map((m) => [m.biomarkerId, m])
);

/**
 * Look up a mapping by LOINC code
 */
export function getByLoincCode(loincCode: string): LoincMapping | undefined {
  return loincCodeMap.get(loincCode);
}

/**
 * Look up a mapping by our internal biomarker ID
 */
export function getByBiomarkerId(biomarkerId: string): LoincMapping | undefined {
  return biomarkerIdMap.get(biomarkerId);
}

/**
 * Get all mappings for a category
 */
export function getMappingsByCategory(categoryId: CategoryId): LoincMapping[] {
  return allLoincMappings.filter((m) => m.categoryId === categoryId);
}

/**
 * Check if a LOINC code is one we recognize
 */
export function isKnownLoincCode(loincCode: string): boolean {
  return loincCodeMap.has(loincCode);
}
