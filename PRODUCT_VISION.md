# Biophile - Product Vision

## Overview
Biophile is a **consumer-first private health tracking app** that makes comprehensive lab testing accessible to everyone. Users own their health data - it never touches our servers.

## Business Model
- **Free tier**: Basic health data visualization and tracking
- **Premium**: Advanced insights, trend analysis, AI-powered recommendations
- **Lab orders**: Commission on lab test orders through Quest/LabCorp

## Core Features

### 1. Lab Data Tracking
- Connect to Quest, LabCorp, or any FHIR-enabled provider
- View 100+ biomarkers across 17 categories
- Track changes over time with historical trends
- LOINC-based standardization for interoperability

### 2. Biological Age
- Calculate your biological age from biomarkers
- Track improvements over time
- Understand contributing factors

### 3. AI-Powered Insights (BYOK)
- Bring your own API key (Anthropic, OpenAI, etc.)
- Get personalized health insights
- Understand what your results mean
- Your data stays on your device

### 4. Privacy-First Architecture
- Zero-knowledge design
- Data flows directly from lab → your device
- End-to-end encryption
- Open-source FHIR parsing rules

## Design Philosophy
- Warm cream background (`#FEF9EF`)
- Clean, premium aesthetic
- Serif headlines for elegance
- Teal for positive/in-range, orange for attention
- Emphasis on privacy and data ownership

## Technical Architecture

### Frontend (`/ui/`)
- Next.js 15 with React 19
- Tailwind CSS for styling
- Radix UI primitives
- TypeScript throughout

### Backend (`/api/`)
- Next.js API routes with Hono
- FHIR + LOINC integration layer
- AI providers: Anthropic, OpenAI, xAI, OpenRouter
- Streaming chat for real-time AI responses

### State Management
- `HealthContext` for user health data
- API-driven data fetching
- Future: Local-first with optional cloud sync

## File Structure

```
/biophile/
├── /api/                      (Next.js API on port 3001)
│   └── /app/
│       ├── /api/[...route]/   (Hono router)
│       └── /health/           (Health data & LOINC mappings)
├── /ui/                       (Next.js frontend on port 3000)
│   └── /src/
│       ├── /app/
│       │   ├── /health/       (Consumer health app)
│       │   └── /blog/         (Marketing blog)
│       ├── /components/
│       │   ├── /context/health-context/
│       │   ├── /views/        (Health views)
│       │   ├── /shared/       (Health UI components)
│       │   └── /ui/           (Base UI components)
│       └── /types/            (TypeScript types)
```

## Key Routes

- `/` - Landing page
- `/health` - Health app home
- `/health/data` - Categories grid
- `/health/data/[category]` - Category detail with biomarkers
- `/health/data/[category]/[biomarker]` - Biomarker detail
- `/health/profile` - User profile & settings
- `/health/chat` - AI chat
- `/health/protocols` - Health protocols
- `/health/tests` - Lab test scheduling
- `/blog` - Marketing blog

## Health Categories
- Thyroid
- Autoimmunity
- Blood
- Electrolytes
- Environmental Toxins
- Heart
- Immune Regulation
- Kidney
- Liver
- Male Health / Female Health
- Metabolic
- Nutrients
- Pancreas
- Stress & Aging
- Urine
- Biological Age
- Daily Metrics

## Data Types

### Biomarker
- id, name, shortName, value, unit
- status ('in_range', 'out_of_range', 'other')
- categoryId, range (low, high, optimal)
- history (date, value, status)[]
- description, whyItMatters, foodsToEat

### Category
- id, name, icon, description
- statusCounts (inRange, outOfRange, other)
- biomarkerIds

### BiologicalAge
- value, calendarAge, difference
- contributingFactors[]

## Development

### Running Locally
```bash
# API (port 3001)
cd api && pnpm dev

# UI (port 3000)
cd ui && pnpm dev
```

### Mock Data
- 100+ biomarkers with realistic values
- Serves from API for development
- Production will use real FHIR data

---

## Roadmap

### Phase 1 (Current)
- ✅ Home view with biomarkers summary
- ✅ Categories grid
- ✅ Biomarker detail view
- ✅ User profile
- ✅ AI chat (BYOK)
- ✅ LOINC mapping layer

### Phase 2
- [ ] Quest/LabCorp OAuth integration
- [ ] Real FHIR data parsing
- [ ] Lab test ordering
- [ ] Health questionnaire

### Phase 3
- [ ] Biological age algorithm
- [ ] Trend analysis & alerts
- [ ] Recommendations engine
- [ ] Apple Health / Google Fit sync

### Phase 4
- [ ] Premium subscription
- [ ] Advanced AI insights
- [ ] Provider sharing
- [ ] Mobile apps
