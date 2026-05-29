# KoinX - Tax Loss Harvesting Tool

A responsive React application that helps crypto investors identify tax-loss harvesting opportunities by visualizing capital gains before and after potential asset sales.

## Live Demo

[https://koinx-tax-loss-harvesting-blue.vercel.app/](https://koinx-tax-loss-harvesting-blue.vercel.app/)

## Features

- **Capital Gains Dashboard** — Side-by-side view of pre-harvesting and after-harvesting capital gains
- **Interactive Holdings Table** — Select individual or all holdings to see real-time impact on capital gains
- **Smart Savings Calculator** — Automatically calculates and displays potential tax savings
- **Responsive Design** — Optimized for desktop, tablet, and mobile viewports
- **Loading States** — Skeleton loading animation while data is being fetched
- **Error Handling** — Graceful error display with retry functionality
- **View All/Less** — Paginated holdings list with toggle

## Tech Stack

- **React 19** — UI framework
- **Vite** — Build tool and dev server
- **Vanilla CSS** — Custom styling with CSS variables for theming
- **React Context + useReducer** — State management

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- npm (v9+)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/koinx-tax-loss-harvesting.git
cd koinx-tax-loss-harvesting

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── api/
│   └── mockApi.js              # Mock API functions with simulated delays
├── context/
│   └── HarvestingContext.jsx    # React Context for global state management
├── components/
│   ├── Header/                 # KoinX branded header bar
│   ├── Disclaimer/             # Collapsible tax notes section
│   ├── CapitalGainsCard/       # Reusable card (pre/post harvesting)
│   ├── HoldingsTable/          # Interactive holdings table with checkboxes
│   └── Loader/                 # Loading skeleton and error states
├── utils/
│   └── formatters.js           # Currency & number formatting utilities
├── App.jsx                     # Main application layout
├── App.css                     # Application-level styles
├── index.css                   # Design tokens & global styles
└── main.jsx                    # Entry point
```

## Business Logic

### Tax Loss Harvesting Calculation

When a user selects a holding:

1. If the holding's short-term gain is **positive** → added to short-term **profits**
2. If the holding's short-term gain is **negative** → added to short-term **losses**
3. Same logic applies for long-term gains
4. **Net Capital Gains** = Profits − Losses (computed separately for short-term and long-term)
5. **Realised Capital Gains** = Net Short-Term + Net Long-Term
6. **Savings** = Pre-harvesting Realised Gains − Post-harvesting Effective Gains
7. Savings message shown only when savings > 0

### API Mocking

Two mock APIs simulate network requests with `setTimeout`:
- **Holdings API** (800ms delay) — Returns 25 crypto holdings with current prices, buy prices, and gain/loss data
- **Capital Gains API** (500ms delay) — Returns baseline short-term and long-term capital gains

## Design

- **Dark theme** matching KoinX brand identity
- **Color palette**: Navy background (#0D1421), Blue cards (#0141CF), Green profits (#00B386), Red losses (#EB4E4E)
- **Typography**: Inter font family (Google Fonts)
- **Responsive breakpoints**: Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px)

## Assumptions

1. Currency is displayed in Indian Rupees (₹) with Indian number formatting
2. Holdings are sorted by absolute total gain (descending) for maximum relevance
3. The "Amount to Sell" column shows the total holding amount when a row is selected
4. Initially, 8 holdings are visible with a "View all" toggle for the rest
5. The unique identifier for each holding is the combination of `coin` + `coinName`

## License

MIT
