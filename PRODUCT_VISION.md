# Thing - Product Vision

## Overview
Thing is a **consumer-first private health tracking app** that makes comprehensive lab testing accessible to everyone. The consumer app serves as a trojan horse for paid provider tools.

## Business Model

### Consumer App (Free / Freemium)
- Accessible health data visualization and tracking
- Open-source FHIR data parsing rules
- Users own their data - never touches our servers
- Connect to Quest, LabCorp, or any FHIR-enabled provider
- AI-powered insights (bring your own API key)

### Provider Tools (Paid B2B)
Target market: Start with **dentists**, expand to **doctors**

1. **AI Receptionist**
   - Auto-text patients after missed calls
   - Natural conversation via SMS
   - Books appointments directly into PMS
   - Handles after-hours inquiries

2. **EOB Automation**
   - Fetch EOBs from insurance portals
   - Auto-parse payment details
   - Post to PMS (Open Dental, Dentrix, Eaglesoft, etc.)
   - Flag discrepancies for review

3. **Aggregated Intelligence**
   - Use anonymized data from calls across practices
   - Train and improve AI responses for everyone
   - Benchmarking and insights

## Design Philosophy
- Warm cream background (`#FEF9EF` or similar)
- Clean, premium aesthetic
- Fonts: Serif headlines, Inter (body), DM Mono (data)
- Emphasis on privacy and data ownership

## Technical Approach
- **Open-source FHIR parsing rules** - anyone can contribute
- Local-first data processing
- Zero-knowledge architecture for consumer app
- Provider tools require account/subscription

## Key Differentiators
1. **Accessible pricing** - comprehensive lab tracking for everyone
2. **Open-source rules** - transparent data parsing
3. **Provider marketplace** - find providers who accept your insurance
4. **B2B revenue** - providers pay, consumers benefit

## File Structure Notes
- Consumer app views: `/app/` routes for health tracking
- Provider app views: `/app/dashboard`, `/app/calls`, `/app/billing`, `/app/settings`
- Marketing: Landing page serves both audiences

---

## UI Design Reference

### Navigation (Left Sidebar)
- Home (house icon)
- Data (chart icon)
- Chat (AI icon)
- Protocols (clipboard icon)
- Docs (document icon)
- Tests (grid icon)
- Invite (person+ icon)

### Color Palette
- **Background**: Warm cream/off-white (`#FEF9EF` or similar)
- **In Range/Positive**: Teal/Green (`#4CAF50` or similar)
- **Out of Range/Attention**: Orange/Rust (`#D97706` or similar)
- **Other/Neutral**: Muted gray-green
- **Primary buttons**: Black with white text
- **Cards**: White with subtle shadow

### Typography
- **Headlines**: Serif font - "Long live [Name].", "Profile & Settings"
- **Body**: Sans-serif (Inter)
- **Data/Mono**: Monospace (DM Mono) for values

### Home Page Components
1. **Welcome Greeting**: Serif, "Long live Keith."
2. **Action Cards**:
   - Schedule Follow-Up Test
   - Health History (Complete to receive tailored insights)
3. **Biomarkers Summary Card**:
   - "116 Biomarkers" title
   - Bar chart: 84 In Range (teal), 18 Out of Range (orange), 14 Other (gray)
4. **Biological Age Card**:
   - Dark teal/slate background
   - Large number: "34.9"
   - "Biological Age" subtitle
   - "1.9 years younger than my calendar age"
   - Share button

### Categories Grid
Each category shows:
- Icon (line art style)
- Category name
- Mini bar chart showing status distribution
- Numbers: green (in range), orange (out), gray (other)

Categories: Autoimmunity, Biological Age, Blood, Daily Metrics, Electrolytes, Environmental Toxins, Heart, Immune Regulation, Kidney, Liver, Male Health, Metabolic, Nutrients, Pancreas, Stress & Aging, Thyroid, Urine

### Biomarker Detail Page
- Breadcrumb: Data | Category
- Biomarker name (serif)
- Status badge: "● In Range · 52 cells/uL"
- Description text
- Range visualization chart (vertical bands)
- Historical trend line with data points
- Lab Reference Range note
- **Clinician Notes**: Date, expandable text
- **Tabs**: Why it matters, Summary, Foods to eat

### Profile & Settings
- Health Data section:
  - Health History (progress: X OF 15 COMPLETE)
  - Connected Apps (NEW badge)
  - Lab Questionnaire
- Account Settings:
  - Avatar with name
  - Email, Phone, DOB (locked with padlock icon)
  - Address, Preferred Name (editable with pencil icon)
  - Appearance toggle (system/light/dark icons)
- Payment Method section
- Membership renewal info
- Payment History (with HSA/FSA note)

### UI Patterns
1. Warm cream background throughout
2. Cards with subtle shadows, rounded corners (2xl)
3. Serif fonts for main headings only
4. Status indicators: green dot for good, orange for attention
5. Mini bar charts for category summaries
6. Expandable sections with "Read more"
7. Clean iconography (line art style)
8. Breadcrumb navigation on detail pages
9. Tabs for different content views
10. Action buttons are black/dark with rounded corners

### Data Model
- **Requisition**: Lab test order with visit dates, physician info
- **Categories**: Thyroid, Autoimmunity, Blood, Electrolytes, Environmental Toxins, Heart, Immune Regulation, Kidney, Liver, Male Health, Metabolic, Nutrients, Pancreas, Stress & Aging, Urine
- **Notes**: AI-generated clinician notes per category
- **Recommendations**: Supplements and lifestyle changes linked to biomarkers
- **Biomarkers**: 100+ individual markers with values, ranges, history

---

## Next Steps (Build Tasks)

### What Already Exists
- ✅ Landing page (consumer-focused with "For Providers" CTA)
- ✅ Marketing header
- ✅ Provider tools: Dashboard, Receptionist (calls), Billing (EOBs), Settings
- ✅ Dental context with mock data
- ✅ Brand colors configured (teal, orange, cream)

### What Needs to Be Built (Consumer Health App)

#### 1. Health Types (`/ui/src/types/health.ts`)
Create types for:
- `Biomarker` (id, name, value, unit, status, range, category, history)
- `Category` (id, name, icon, biomarkers count by status)
- `LabResult` (requisition, visits, results)
- `HealthNote` (category, note text, date)
- `Recommendation` (name, type, linked biomarkers)

#### 2. Health Context (`/ui/src/components/context/health-context/`)
- Store biomarkers, categories, lab results
- Mock data generator for development
- Methods to filter by category, status, date range

#### 3. Consumer App Navigation
Sidebar navigation:
- Home, Data, Chat, Protocols, Docs, Tests, Invite

#### 4. Consumer Views to Build

**Home View** (`/ui/src/components/views/health-home/`)
- Welcome greeting with serif font
- Action cards (Schedule Test, Health History)
- Biomarkers summary card with bar chart
- Biological Age card
- Categories grid with mini status bars

**Data/Categories View** (`/ui/src/components/views/health-data/`)
- Grid of all categories
- Each shows icon, name, status bar chart
- Click to drill into category

**Biomarker Detail View** (`/ui/src/components/views/biomarker-detail/`)
- Breadcrumb navigation
- Biomarker name, status, value
- Range visualization (vertical bands)
- Historical trend chart
- Clinician Notes section
- Tabs: Why it matters, Summary, Foods to eat

**Profile View** (`/ui/src/components/views/health-profile/`)
- Health Data section (History, Connected Apps, Questionnaire)
- Account Settings (editable fields)
- Appearance toggle
- Payment/membership info

#### 5. Routes to Create
- `/health` - Consumer app home (or just `/` after login)
- `/health/data` - Categories grid
- `/health/data/[category]` - Category detail
- `/health/data/[category]/[biomarker]` - Biomarker detail
- `/health/profile` - Profile & settings
- `/health/chat` - AI chat (future)

#### 6. Shared Components Needed
- `StatusBadge` - Green/orange/gray dot with label
- `MiniBarChart` - Horizontal stacked bar for category summaries
- `RangeChart` - Vertical bands showing Above/In/Below range
- `TrendChart` - Historical line chart with data points
- `CategoryCard` - Icon + name + status bar
- `ActionCard` - Icon + title + description + CTA button

### Build Order Recommendation
1. Types and context with mock data
2. Consumer app layout with sidebar navigation
3. Home view with summary cards
4. Categories grid view
5. Biomarker detail view
6. Profile view

### Notes for Implementation
- Use the warm cream aesthetic (`bg-brand-cream-50`)
- Serif font for main headlines only (Playfair Display or similar)
- Keep provider tools separate at `/dashboard`, `/calls`, `/billing`, `/settings`
- Consumer app should feel premium and accessible
