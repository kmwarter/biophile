# Thing - Health Data Architecture

## Overview

Thing is a consumer health tracking app that displays lab results, biomarkers, and health insights. This document explains the architecture for integrating with lab data sources, focusing on FHIR (Fast Healthcare Interoperability Resources) as the standardized approach.

---

## The Problem: Lab Data Fragmentation

Lab results come from many sources:
- **Quest Diagnostics** - Uses proprietary biomarker codes (e.g., `30005500`)
- **LabCorp** - Uses different proprietary codes
- **Hospital systems** - Epic, Cerner, etc.
- **International labs** - Various formats

Building integrations for each lab individually is:
- Expensive (separate business relationships, APIs, mappings)
- Non-scalable (100s of labs worldwide)
- Fragile (proprietary formats change)

---

## The Solution: FHIR + LOINC

### What is FHIR?

**FHIR (Fast Healthcare Interoperability Resources)** is the healthcare industry standard for exchanging health data. It's mandated by the 21st Century Cures Act in the US - all healthcare providers must offer patient access via FHIR.

Key FHIR resources for lab data:

| Resource | Purpose | Example |
|----------|---------|---------|
| `Patient` | Demographics | Name, DOB, sex |
| `Observation` | Individual lab result | TSH = 2.1 mIU/L |
| `DiagnosticReport` | Lab report grouping observations | "Comprehensive Metabolic Panel" |
| `ServiceRequest` | Lab order/requisition | Order for CBC |

### What is LOINC?

**LOINC (Logical Observation Identifiers Names and Codes)** is the universal language for lab tests. Every lab test has a unique LOINC code that's the same regardless of which lab performs it.

Examples:
| LOINC Code | Test Name | Component |
|------------|-----------|-----------|
| `3016-3` | TSH | Thyroid Stimulating Hormone |
| `2093-3` | Total Cholesterol | Cholesterol |
| `2571-8` | Triglycerides | Triglycerides |
| `2085-9` | HDL Cholesterol | HDL |
| `13457-7` | LDL Cholesterol (calculated) | LDL |
| `4548-4` | Hemoglobin A1c | HbA1c |
| `1742-6` | ALT | Alanine Aminotransferase |
| `1920-8` | AST | Aspartate Aminotransferase |

### How They Work Together

```
Lab performs test
       ↓
Result stored with LOINC code (e.g., 3016-3 = TSH)
       ↓
Exposed via FHIR API as Observation resource
       ↓
Your app fetches Observation, reads LOINC code
       ↓
Maps LOINC → your biomarker definition (name, ranges, category)
       ↓
Displays to user
```

---

## Alternative Approach: Proprietary Integration (What Others Do)

Some health apps (like the one we analyzed) use a different model:

### Their Architecture

```
1. Company acts as "referring physician"
2. Partners directly with Quest Diagnostics (B2B contract)
3. User books test through the app
4. Quest sends results directly to company's backend
5. Company stores results with Quest-proprietary codes
6. Company maintains Quest code → biomarker mapping
```

### Data Structure (from their API)

```json
{
  "questBiomarkerId": "30005500",
  "biomarkerName": "Color - Urine",
  "labProvider": "quest",
  "testResult": "DARK YELLOW",
  "questReferenceRange": "YELLOW"
}
```

### Problems with This Approach

1. **Vendor lock-in** - Only works with Quest
2. **Business complexity** - Requires B2B contracts with each lab
3. **No portability** - Can't import data from other sources
4. **Proprietary codes** - `30005500` means nothing outside Quest

---

## Our Architecture: FHIR-First

### Design Principles

1. **FHIR as the source of truth** - All lab data comes via FHIR
2. **LOINC for identification** - Map LOINC codes to biomarker definitions
3. **Lab-agnostic** - Works with any FHIR-enabled provider
4. **User-controlled** - Data stays on user's device, user authorizes access

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     User's Device                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   FHIR       │    │   LOINC      │    │   UI         │  │
│  │   Client     │───▶│   Mapper     │───▶│   State      │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                   │                    │          │
│         │                   │                    ▼          │
│         │                   │           ┌──────────────┐   │
│         │                   │           │   Health     │   │
│         │                   │           │   Views      │   │
│         │                   │           └──────────────┘   │
│         │                   │                              │
└─────────│───────────────────│──────────────────────────────┘
          │                   │
          ▼                   ▼
┌──────────────┐    ┌──────────────────────┐
│  Lab FHIR    │    │  LOINC Definitions   │
│  Endpoints   │    │  (open-source repo)  │
│  - Quest     │    │  - biomarker name    │
│  - LabCorp   │    │  - categories        │
│  - Epic      │    │  - optimal ranges    │
│  - Cerner    │    │  - descriptions      │
└──────────────┘    └──────────────────────┘
```

### Data Flow

1. **User connects lab account**
   - OAuth2 flow with Quest MyQuest, LabCorp, or hospital portal
   - App receives access token

2. **Fetch FHIR Observations**
   ```
   GET /fhir/r4/Observation?patient={patientId}&category=laboratory
   ```

3. **Parse FHIR response**
   ```json
   {
     "resourceType": "Observation",
     "code": {
       "coding": [{
         "system": "http://loinc.org",
         "code": "3016-3",
         "display": "TSH"
       }]
     },
     "valueQuantity": {
       "value": 2.1,
       "unit": "mIU/L"
     },
     "referenceRange": [{
       "low": { "value": 0.4 },
       "high": { "value": 4.0 }
     }],
     "effectiveDateTime": "2025-05-14"
   }
   ```

4. **Map LOINC to biomarker definition**
   ```typescript
   // Our LOINC mapping
   {
     "3016-3": {
       id: "tsh",
       name: "Thyroid Stimulating Hormone",
       shortName: "TSH",
       categoryId: "thyroid",
       optimalRange: { low: 1.0, high: 2.5 },
       description: "Controls thyroid hormone production",
       whyItMatters: "TSH tells your thyroid how much hormone to make..."
     }
   }
   ```

5. **Transform to UI model**
   ```typescript
   {
     id: "tsh",
     name: "Thyroid Stimulating Hormone",
     value: 2.1,
     unit: "mIU/L",
     status: "in_range",
     range: { low: 0.4, high: 4.0, optimalLow: 1.0, optimalHigh: 2.5 },
     // ... rest of UI model
   }
   ```

---

## FHIR Endpoints by Provider

### Quest Diagnostics (MyQuest)

```
Base URL: https://www.myquest.com/fhir/r4
Auth: OAuth 2.0 / SMART on FHIR
Docs: https://www.questdiagnostics.com/our-company/about-us/interoperability
```

### LabCorp

```
Base URL: https://patientportal.labcorp.com/fhir/r4
Auth: OAuth 2.0 / SMART on FHIR
Docs: https://www.labcorp.com/interoperability
```

### Epic MyChart

```
Base URL: Varies by health system
Auth: OAuth 2.0 / SMART on FHIR
Discovery: /.well-known/smart-configuration
```

### Apple Health (HealthKit)

Apple Health stores FHIR data from connected sources:
- Clinical records (labs, medications, conditions)
- Can be read via HealthKit API on iOS
- Exports as FHIR JSON

---

## LOINC Mapping Strategy

### Mapping File Structure

```typescript
// /api/app/health/loinc-mappings.ts

export interface LoincMapping {
  loincCode: string;
  biomarkerId: string;
  name: string;
  shortName?: string;
  categoryId: CategoryId;
  unit: string;
  optimalRange?: {
    low: number | null;
    high: number | null;
  };
  description: string;
  whyItMatters?: string;
}

export const loincMappings: Record<string, LoincMapping> = {
  // Thyroid
  "3016-3": {
    loincCode: "3016-3",
    biomarkerId: "tsh",
    name: "Thyroid Stimulating Hormone",
    shortName: "TSH",
    categoryId: "thyroid",
    unit: "mIU/L",
    optimalRange: { low: 1.0, high: 2.5 },
    description: "Controls thyroid hormone production",
    whyItMatters: "TSH tells your thyroid how much hormone to make..."
  },

  // Lipids
  "2093-3": {
    loincCode: "2093-3",
    biomarkerId: "total-cholesterol",
    name: "Total Cholesterol",
    categoryId: "heart",
    unit: "mg/dL",
    optimalRange: { low: null, high: 200 },
    description: "Total cholesterol in blood"
  },

  // ... 100+ more mappings
};
```

### Building the Mapping Database

Sources for LOINC mappings:
1. **LOINC.org** - Official database (free registration)
2. **Common lab panels** - Start with CBC, CMP, lipid panel, thyroid panel
3. **Open-source projects** - Many FHIR projects have partial mappings

### Implemented Biomarkers

See `/api/app/health/loinc-mappings.ts` for the complete mapping file. Currently mapped:

| Category | Biomarkers | LOINC Codes |
|----------|------------|-------------|
| Thyroid | TSH, Free T3, Free T4 | 3016-3, 3053-6, 3024-7 |
| Heart | LDL, HDL, Triglycerides, ApoB, hs-CRP | 13457-7, 2085-9, 2571-8, 1869-7, 30522-7 |
| Blood | RBC, Hemoglobin, Hematocrit, Platelets | 789-8, 718-7, 4544-3, 777-3 |
| Metabolic | Glucose, HbA1c, Insulin | 1558-6, 4548-4, 2484-4 |
| Nutrients | Vitamin D, B12, Homocysteine, Omega-3 | 1989-3, 2132-9, 2155-0, 86907-5 |
| Liver | ALT, AST | 1742-6, 1920-8 |
| Kidney | Creatinine, eGFR | 2160-0, 33914-3 |
| Male Health | Testosterone, Estradiol | 2986-8, 2243-4 |
| Stress | Cortisol, DHEA-S | 2143-6, 2191-5 |

---

## Implementation Phases

### Phase 1: Mock FHIR Data (Current)
- API returns mock biomarker data
- UI displays data correctly
- No real FHIR integration yet

### Phase 2: LOINC Mapping Layer
- Create LOINC → biomarker mapping file
- Parse incoming FHIR Observations
- Transform to UI model

### Phase 3: FHIR Client
- Implement SMART on FHIR OAuth flow
- Connect to Quest MyQuest sandbox
- Fetch real Observations

### Phase 4: Multi-Provider Support
- Add LabCorp connection
- Add Epic MyChart connection
- Handle provider-specific quirks

### Phase 5: Local-First Storage
- Store fetched data locally (IndexedDB)
- Sync incrementally
- Work offline

---

## Security & Privacy

### Zero-Knowledge Architecture

1. **No backend storage of health data** - Data stays on device
2. **Token-based auth** - We only handle OAuth tokens temporarily
3. **Client-side processing** - FHIR parsing happens in browser/app
4. **User revocable** - User can disconnect any time

### Token Handling

```typescript
// Tokens stored in secure storage (Keychain/Keystore)
// Never sent to our backend
// Refreshed client-side

interface LabConnection {
  provider: 'quest' | 'labcorp' | 'epic';
  accessToken: string; // encrypted at rest
  refreshToken: string;
  expiresAt: Date;
  patientId: string;
}
```

---

## File Structure

```
/api/app/health/
├── types.ts              # API types (Biomarker, Category, etc.)
├── mock-data.ts          # Mock data for development
├── loinc-mappings.ts     # LOINC code → biomarker definitions ✓
├── fhir/
│   ├── types.ts          # FHIR resource types (TODO)
│   ├── parser.ts         # Parse FHIR Observations (TODO)
│   └── client.ts         # FHIR API client (TODO)
└── routes.ts             # Health API endpoints

/ui/src/
├── components/
│   └── context/
│       └── health-context/
│           └── health-context.tsx  # State management, API calls
└── lib/
    └── fhir/
        ├── client.ts     # SMART on FHIR client (TODO)
        └── oauth.ts      # OAuth flow handling (TODO)
```

---

## References

- [FHIR R4 Specification](https://hl7.org/fhir/R4/)
- [SMART on FHIR](https://docs.smarthealthit.org/)
- [LOINC Database](https://loinc.org/)
- [Quest FHIR API](https://www.questdiagnostics.com/our-company/about-us/interoperability)
- [LabCorp FHIR API](https://www.labcorp.com/interoperability)
- [21st Century Cures Act - Patient Access](https://www.healthit.gov/topic/onc-rulemaking/patient-access-api)

---

## Appendix: Quest Biomarker Code Reference

For reference, here are some Quest-proprietary codes observed in competitor data. These are **not** LOINC codes but may help cross-reference:

| Quest Code | Biomarker Name |
|------------|----------------|
| 30005500 | Color - Urine |
| 30005600 | Appearance - Urine |
| 30006000 | Specific Gravity - Urine |
| 30006200 | pH - Urine |
| 25000100 | (Blood marker - needs mapping) |

When implementing FHIR, we will use LOINC codes instead, which are universal across all labs.
