/**
 * Mock Health Data
 * Example biomarker data for development
 */

import type {
  User,
  Category,
  CategoryId,
  Biomarker,
  Note,
  RecommendationGroup,
  Requisition,
  BiologicalAge,
  QuestionnaireStatus,
} from './types';

// ============================================================================
// User
// ============================================================================

export const mockUser: User = {
  id: 'user-1',
  firstName: 'Keith',
  lastName: 'Warter',
  preferredName: 'Keith',
  email: 'keith@example.com',
  phone: '+1 805 720 6173',
  biologicalSex: 'male',
  dateOfBirth: '1988-06-15',
  address: {
    street: '669 Kirkwood Ave SE',
    city: 'Atlanta',
    state: 'GA',
    zip: '30316',
  },
  membership: 'active',
  memberSince: '2025-05-05',
};

// ============================================================================
// Biomarkers
// ============================================================================

export const mockBiomarkers: Biomarker[] = [
  // Thyroid
  {
    id: 'tsh',
    name: 'Thyroid Stimulating Hormone',
    shortName: 'TSH',
    value: 2.1,
    unit: 'mIU/L',
    status: 'in_range',
    categoryId: 'thyroid',
    range: { low: 0.4, high: 4.0, optimalLow: 1.0, optimalHigh: 2.5 },
    description: 'Controls thyroid hormone production',
    whyItMatters: 'TSH tells your thyroid how much hormone to make. High levels may indicate an underactive thyroid, while low levels may suggest overactivity.',
    history: [
      { date: '2025-05-14', value: 2.1, status: 'in_range' },
      { date: '2024-11-10', value: 2.4, status: 'in_range' },
    ],
    lastUpdated: '2025-05-14',
    improving: true,
  },
  {
    id: 't3-free',
    name: 'Free T3',
    value: 3.2,
    unit: 'pg/mL',
    status: 'in_range',
    categoryId: 'thyroid',
    range: { low: 2.3, high: 4.2, optimalLow: 3.0, optimalHigh: 4.0 },
    description: 'Active thyroid hormone',
    history: [{ date: '2025-05-14', value: 3.2, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },
  {
    id: 't4-free',
    name: 'Free T4',
    value: 1.3,
    unit: 'ng/dL',
    status: 'in_range',
    categoryId: 'thyroid',
    range: { low: 0.8, high: 1.8, optimalLow: 1.0, optimalHigh: 1.5 },
    description: 'Main thyroid hormone',
    history: [{ date: '2025-05-14', value: 1.3, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },

  // Heart
  {
    id: 'ldl',
    name: 'LDL Cholesterol',
    shortName: 'LDL',
    value: 142,
    unit: 'mg/dL',
    status: 'out_of_range',
    categoryId: 'heart',
    range: { low: 0, high: 100, optimalLow: 0, optimalHigh: 70 },
    description: 'Low-density lipoprotein, often called "bad" cholesterol',
    whyItMatters: 'High LDL can build up in artery walls, increasing risk of heart disease and stroke.',
    history: [
      { date: '2025-05-14', value: 142, status: 'out_of_range' },
      { date: '2024-11-10', value: 156, status: 'out_of_range' },
    ],
    lastUpdated: '2025-05-14',
    improving: true,
  },
  {
    id: 'hdl',
    name: 'HDL Cholesterol',
    shortName: 'HDL',
    value: 52,
    unit: 'mg/dL',
    status: 'in_range',
    categoryId: 'heart',
    range: { low: 40, high: 100, optimalLow: 60, optimalHigh: 100 },
    description: 'High-density lipoprotein, "good" cholesterol',
    history: [{ date: '2025-05-14', value: 52, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },
  {
    id: 'triglycerides',
    name: 'Triglycerides',
    value: 98,
    unit: 'mg/dL',
    status: 'in_range',
    categoryId: 'heart',
    range: { low: 0, high: 150, optimalLow: 0, optimalHigh: 100 },
    description: 'Type of fat in your blood',
    history: [{ date: '2025-05-14', value: 98, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },
  {
    id: 'apob',
    name: 'Apolipoprotein B',
    shortName: 'ApoB',
    value: 118,
    unit: 'mg/dL',
    status: 'out_of_range',
    categoryId: 'heart',
    range: { low: 0, high: 90, optimalLow: 0, optimalHigh: 70 },
    description: 'Protein that carries cholesterol in the blood',
    whyItMatters: 'ApoB is considered a more accurate predictor of heart disease risk than LDL alone.',
    history: [{ date: '2025-05-14', value: 118, status: 'out_of_range' }],
    lastUpdated: '2025-05-14',
  },
  {
    id: 'hscrp',
    name: 'High-Sensitivity C-Reactive Protein',
    shortName: 'hs-CRP',
    value: 2.8,
    unit: 'mg/L',
    status: 'out_of_range',
    categoryId: 'heart',
    range: { low: 0, high: 1.0, optimalLow: 0, optimalHigh: 0.5 },
    description: 'Marker of inflammation in the body',
    whyItMatters: 'Elevated hs-CRP indicates inflammation which can damage blood vessels.',
    history: [{ date: '2025-05-14', value: 2.8, status: 'out_of_range' }],
    lastUpdated: '2025-05-14',
  },

  // Blood
  {
    id: 'rbc',
    name: 'Red Blood Cells',
    shortName: 'RBC',
    value: 4.9,
    unit: 'M/uL',
    status: 'in_range',
    categoryId: 'blood',
    range: { low: 4.2, high: 5.8, optimalLow: 4.5, optimalHigh: 5.5 },
    description: 'Oxygen-carrying cells',
    history: [{ date: '2025-05-14', value: 4.9, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },
  {
    id: 'hemoglobin',
    name: 'Hemoglobin',
    shortName: 'Hb',
    value: 15.2,
    unit: 'g/dL',
    status: 'in_range',
    categoryId: 'blood',
    range: { low: 13.5, high: 17.5, optimalLow: 14.0, optimalHigh: 16.5 },
    description: 'Oxygen-carrying protein in red blood cells',
    history: [{ date: '2025-05-14', value: 15.2, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },
  {
    id: 'hematocrit',
    name: 'Hematocrit',
    shortName: 'Hct',
    value: 45,
    unit: '%',
    status: 'in_range',
    categoryId: 'blood',
    range: { low: 38, high: 50, optimalLow: 40, optimalHigh: 48 },
    description: 'Percentage of blood that is red blood cells',
    history: [{ date: '2025-05-14', value: 45, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },
  {
    id: 'platelets',
    name: 'Platelets',
    value: 245,
    unit: 'K/uL',
    status: 'in_range',
    categoryId: 'blood',
    range: { low: 150, high: 400, optimalLow: 175, optimalHigh: 350 },
    description: 'Cells that help blood clot',
    history: [{ date: '2025-05-14', value: 245, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },

  // Metabolic
  {
    id: 'glucose',
    name: 'Glucose',
    value: 92,
    unit: 'mg/dL',
    status: 'in_range',
    categoryId: 'metabolic',
    range: { low: 65, high: 99, optimalLow: 70, optimalHigh: 90 },
    description: 'Blood sugar level',
    history: [{ date: '2025-05-14', value: 92, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },
  {
    id: 'hba1c',
    name: 'Hemoglobin A1c',
    shortName: 'HbA1c',
    value: 5.4,
    unit: '%',
    status: 'in_range',
    categoryId: 'metabolic',
    range: { low: 4.0, high: 5.6, optimalLow: 4.5, optimalHigh: 5.3 },
    description: 'Average blood sugar over 2-3 months',
    history: [{ date: '2025-05-14', value: 5.4, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },
  {
    id: 'insulin',
    name: 'Insulin',
    value: 12.5,
    unit: 'uIU/mL',
    status: 'out_of_range',
    categoryId: 'metabolic',
    range: { low: 2.0, high: 19.6, optimalLow: 2.0, optimalHigh: 8.0 },
    description: 'Hormone that regulates blood sugar',
    whyItMatters: 'Elevated insulin can be an early sign of insulin resistance, even when blood sugar is normal.',
    history: [{ date: '2025-05-14', value: 12.5, status: 'out_of_range' }],
    lastUpdated: '2025-05-14',
  },

  // Nutrients
  {
    id: 'vitamin-d',
    name: 'Vitamin D, 25-Hydroxy',
    shortName: 'Vitamin D',
    value: 23,
    unit: 'ng/mL',
    status: 'out_of_range',
    categoryId: 'nutrients',
    range: { low: 30, high: 100, optimalLow: 50, optimalHigh: 80 },
    description: 'Essential vitamin for bone health and immune function',
    whyItMatters: 'Low vitamin D is linked to bone weakness, immune dysfunction, and mood issues.',
    history: [{ date: '2025-05-14', value: 23, status: 'out_of_range' }],
    lastUpdated: '2025-05-14',
  },
  {
    id: 'b12',
    name: 'Vitamin B12',
    value: 485,
    unit: 'pg/mL',
    status: 'in_range',
    categoryId: 'nutrients',
    range: { low: 200, high: 900, optimalLow: 500, optimalHigh: 800 },
    description: 'Essential for nerve function and red blood cell formation',
    history: [{ date: '2025-05-14', value: 485, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },
  {
    id: 'homocysteine',
    name: 'Homocysteine',
    value: 12.7,
    unit: 'umol/L',
    status: 'out_of_range',
    categoryId: 'nutrients',
    range: { low: 0, high: 10.4, optimalLow: 0, optimalHigh: 7.0 },
    description: 'Amino acid linked to heart and brain health',
    whyItMatters: 'Elevated homocysteine can stress blood vessels and is associated with higher cardiovascular risk.',
    history: [{ date: '2025-05-14', value: 12.7, status: 'out_of_range' }],
    lastUpdated: '2025-05-14',
  },
  {
    id: 'omega3',
    name: 'Omega-3 Index',
    value: 4.0,
    unit: '%',
    status: 'out_of_range',
    categoryId: 'nutrients',
    range: { low: 8, high: 12, optimalLow: 8, optimalHigh: 12 },
    description: 'Percentage of omega-3 fatty acids in red blood cells',
    whyItMatters: 'Low omega-3 levels are associated with inflammation and cardiovascular risk.',
    history: [{ date: '2025-05-14', value: 4.0, status: 'out_of_range' }],
    lastUpdated: '2025-05-14',
  },

  // Liver
  {
    id: 'alt',
    name: 'ALT',
    value: 28,
    unit: 'U/L',
    status: 'in_range',
    categoryId: 'liver',
    range: { low: 0, high: 44, optimalLow: 0, optimalHigh: 25 },
    description: 'Liver enzyme',
    history: [{ date: '2025-05-14', value: 28, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },
  {
    id: 'ast',
    name: 'AST',
    value: 24,
    unit: 'U/L',
    status: 'in_range',
    categoryId: 'liver',
    range: { low: 0, high: 40, optimalLow: 0, optimalHigh: 25 },
    description: 'Liver enzyme',
    history: [{ date: '2025-05-14', value: 24, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },

  // Kidney
  {
    id: 'creatinine',
    name: 'Creatinine',
    value: 1.1,
    unit: 'mg/dL',
    status: 'in_range',
    categoryId: 'kidney',
    range: { low: 0.7, high: 1.3, optimalLow: 0.8, optimalHigh: 1.2 },
    description: 'Waste product filtered by kidneys',
    history: [{ date: '2025-05-14', value: 1.1, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },
  {
    id: 'egfr',
    name: 'eGFR',
    value: 95,
    unit: 'mL/min/1.73m2',
    status: 'in_range',
    categoryId: 'kidney',
    range: { low: 90, high: 120, optimalLow: 90, optimalHigh: 120 },
    description: 'Estimated kidney filtration rate',
    history: [{ date: '2025-05-14', value: 95, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },

  // Male Health
  {
    id: 'testosterone',
    name: 'Testosterone, Total',
    value: 585,
    unit: 'ng/dL',
    status: 'in_range',
    categoryId: 'male-health',
    range: { low: 264, high: 916, optimalLow: 500, optimalHigh: 800 },
    description: 'Primary male sex hormone',
    history: [{ date: '2025-05-14', value: 585, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },
  {
    id: 'estradiol',
    name: 'Estradiol',
    value: 48,
    unit: 'pg/mL',
    status: 'out_of_range',
    categoryId: 'male-health',
    range: { low: 10, high: 40, optimalLow: 20, optimalHigh: 35 },
    description: 'Estrogen hormone',
    whyItMatters: 'Elevated estradiol in men can affect mood, energy, and body composition.',
    history: [{ date: '2025-05-14', value: 48, status: 'out_of_range' }],
    lastUpdated: '2025-05-14',
  },

  // Stress
  {
    id: 'cortisol',
    name: 'Cortisol, AM',
    value: 14.2,
    unit: 'ug/dL',
    status: 'in_range',
    categoryId: 'stress',
    range: { low: 6.2, high: 19.4, optimalLow: 10, optimalHigh: 18 },
    description: 'Primary stress hormone',
    history: [{ date: '2025-05-14', value: 14.2, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },
  {
    id: 'dheas',
    name: 'DHEA-S',
    value: 320,
    unit: 'ug/dL',
    status: 'in_range',
    categoryId: 'stress',
    range: { low: 138, high: 475, optimalLow: 250, optimalHigh: 400 },
    description: 'Hormone precursor related to aging and stress',
    history: [{ date: '2025-05-14', value: 320, status: 'in_range' }],
    lastUpdated: '2025-05-14',
  },
];

// ============================================================================
// Categories (computed from biomarkers)
// ============================================================================

const categoryMeta: Record<CategoryId, { name: string; description: string }> = {
  'thyroid': { name: 'Thyroid', description: 'Thyroid hormone levels and function' },
  'autoimmunity': { name: 'Autoimmunity', description: 'Immune system self-targeting markers' },
  'blood': { name: 'Blood', description: 'Red blood cells, hemoglobin, and blood health' },
  'electrolytes': { name: 'Electrolytes', description: 'Essential minerals for body function' },
  'toxins': { name: 'Environmental Toxins', description: 'Heavy metals and environmental exposures' },
  'heart': { name: 'Heart', description: 'Cardiovascular health markers' },
  'immune': { name: 'Immune Regulation', description: 'Immune system function and inflammation' },
  'kidney': { name: 'Kidney', description: 'Kidney function and waste filtration' },
  'liver': { name: 'Liver', description: 'Liver enzymes and detoxification' },
  'male-health': { name: 'Male Health', description: 'Male reproductive hormone balance' },
  'female-health': { name: 'Female Health', description: 'Female reproductive hormone balance' },
  'metabolic': { name: 'Metabolic', description: 'Blood sugar and metabolism' },
  'nutrients': { name: 'Nutrients', description: 'Vitamins, minerals, and essential nutrients' },
  'pancreas': { name: 'Pancreas', description: 'Digestive enzyme production' },
  'stress': { name: 'Stress & Aging', description: 'Stress hormones and aging markers' },
  'urine': { name: 'Urine', description: 'Urinalysis results' },
};

export function getCategories(): Category[] {
  const categoryIds = Object.keys(categoryMeta) as CategoryId[];

  return categoryIds.map((id) => {
    const biomarkers = mockBiomarkers.filter((b) => b.categoryId === id);
    return {
      id,
      name: categoryMeta[id].name,
      description: categoryMeta[id].description,
      biomarkerCount: biomarkers.length,
      statusCounts: {
        inRange: biomarkers.filter((b) => b.status === 'in_range').length,
        outOfRange: biomarkers.filter((b) => b.status === 'out_of_range').length,
        other: biomarkers.filter((b) => b.status === 'other').length,
      },
    };
  }).filter((c) => c.biomarkerCount > 0);
}

// ============================================================================
// Notes
// ============================================================================

export const mockNotes: Note[] = [
  {
    id: 'note-thyroid',
    categoryId: 'thyroid',
    categoryName: 'Thyroid',
    content: 'Your thyroid hormones are within normal ranges, indicating that your thyroid is functioning properly. This suggests that your metabolism, energy, and mood are likely well-regulated.',
    date: '2025-06-17',
  },
  {
    id: 'note-heart',
    categoryId: 'heart',
    categoryName: 'Heart',
    content: 'Your test results indicate that inflammation and an imbalance in your cholesterol particles may increase your risk for heart issues. An elevated hs-CRP level suggests increased inflammation. Taking proactive measures to improve your cholesterol profile can help reduce your risk.',
    date: '2025-06-17',
  },
  {
    id: 'note-metabolic',
    categoryId: 'metabolic',
    categoryName: 'Metabolic',
    content: 'Your blood sugar and HbA1c indicate efficient blood sugar control. However, your insulin level is higher than optimal, which can be an early sign of insulin resistance. Adjustments in diet and exercise habits may help optimize metabolic health.',
    date: '2025-06-17',
  },
  {
    id: 'note-nutrients',
    categoryId: 'nutrients',
    categoryName: 'Nutrients',
    content: 'Your nutritional profile indicates areas where adjustments may enhance your overall health. Low vitamin D, elevated homocysteine, and low Omega-3 levels suggest opportunities to improve through diet and supplementation.',
    date: '2025-06-17',
  },
];

// ============================================================================
// Recommendations
// ============================================================================

export const mockRecommendations: RecommendationGroup[] = [
  {
    type: 'supplement',
    displayName: 'Supplements',
    items: [
      { id: 'rec-1', name: 'Omega-3 fatty acids', type: 'supplement', linkedBiomarkerIds: ['omega3', 'hscrp', 'ldl'] },
      { id: 'rec-2', name: 'Vitamin D3', type: 'supplement', linkedBiomarkerIds: ['vitamin-d'] },
      { id: 'rec-3', name: 'Coenzyme Q10 (ubiquinol)', type: 'supplement', linkedBiomarkerIds: ['ldl', 'apob'] },
      { id: 'rec-4', name: 'Berberine', type: 'supplement', linkedBiomarkerIds: ['insulin', 'ldl', 'glucose'] },
      { id: 'rec-5', name: 'B-Complex with Methylfolate', type: 'supplement', linkedBiomarkerIds: ['homocysteine', 'b12'] },
    ],
  },
  {
    type: 'food',
    displayName: 'Foods',
    items: [
      { id: 'rec-6', name: 'Fatty fish (salmon, mackerel, sardines)', type: 'food', linkedBiomarkerIds: ['omega3', 'vitamin-d'] },
      { id: 'rec-7', name: 'Leafy greens (spinach, kale)', type: 'food', linkedBiomarkerIds: ['homocysteine'] },
      { id: 'rec-8', name: 'Nuts and seeds', type: 'food', linkedBiomarkerIds: ['ldl', 'hdl'] },
      { id: 'rec-9', name: 'Olive oil', type: 'food', linkedBiomarkerIds: ['ldl', 'hscrp'] },
    ],
  },
  {
    type: 'lifestyle',
    displayName: 'Lifestyle',
    items: [
      { id: 'rec-10', name: 'Regular aerobic exercise (30 min, 5x/week)', type: 'lifestyle', linkedBiomarkerIds: ['insulin', 'ldl', 'hdl'] },
      { id: 'rec-11', name: 'Strength training (2-3x/week)', type: 'lifestyle', linkedBiomarkerIds: ['testosterone', 'insulin'] },
      { id: 'rec-12', name: 'Sun exposure (15-20 min daily)', type: 'lifestyle', linkedBiomarkerIds: ['vitamin-d'] },
      { id: 'rec-13', name: 'Stress management (meditation, sleep)', type: 'lifestyle', linkedBiomarkerIds: ['cortisol', 'hscrp'] },
    ],
  },
];

// ============================================================================
// Requisitions
// ============================================================================

export const mockRequisitions: Requisition[] = [
  {
    id: 'req-1',
    type: 'annual',
    status: 'completed',
    createdAt: '2025-05-05',
    visits: [
      {
        id: 'visit-1',
        date: '2025-05-06T17:40:00Z',
        location: 'Quest Diagnostics',
        address: '1640 Valencia St Ste 1B',
        city: 'San Francisco',
        state: 'CA',
        confirmationCode: 'RDKBPW',
        completed: true,
      },
      {
        id: 'visit-2',
        date: '2025-05-14T16:40:00Z',
        location: 'Quest Diagnostics',
        address: '1640 Valencia St Ste 1B',
        city: 'San Francisco',
        state: 'CA',
        confirmationCode: 'ROBPPS',
        completed: true,
      },
    ],
    pdfUrls: [],
  },
];

// ============================================================================
// Biological Age
// ============================================================================

export const mockBiologicalAge: BiologicalAge = {
  value: 34,
  calendarAge: 36,
  difference: -2,
  calculatedAt: '2025-05-14',
};

// ============================================================================
// Questionnaire
// ============================================================================

export const mockQuestionnaireStatus: QuestionnaireStatus = {
  requiredComplete: false,
  allComplete: false,
  sections: [
    { id: 'foundational', name: 'Foundational Health', required: true, completed: false },
    { id: 'medical-history', name: 'Medical History', required: true, completed: false },
    { id: 'hormone', name: 'Hormone Health', required: true, completed: false },
    { id: 'nutrition', name: 'Nutrition', required: true, completed: false },
    { id: 'life-experience', name: 'Life Experience', required: true, completed: false },
    { id: 'movement', name: 'Movement', required: true, completed: false },
    { id: 'sleep', name: 'Sleep', required: true, completed: false },
    { id: 'symptom-review', name: 'Symptom Review', required: true, completed: false },
    { id: 'family-history', name: 'Family History', required: false, completed: false },
    { id: 'early-medical', name: 'Early Medical History', required: false, completed: false },
    { id: 'social-history', name: 'Social History', required: false, completed: false },
  ],
};
