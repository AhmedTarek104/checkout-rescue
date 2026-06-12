# Checkout Rescue

Checkout Rescue is a product management portfolio case study for reducing checkout drop-off after failed payment attempts. It combines a case study homepage, an interactive checkout recovery simulator, a product analytics dashboard, a PRD, and an experiment plan.

## Problem

Failed payments often turn high-intent shoppers into abandoned checkouts. Users may see unclear error messages, restart checkout, retry the same payment method, or contact support because they do not know what went wrong or what to do next.

This creates lost revenue, lower conversion, and reduced trust in the checkout experience.

## Solution

Checkout Rescue proposes a smart recovery layer for failed payments. When a payment fails, the flow explains the failure reason in clear language and recommends a one-tap alternative payment method based on checkout context such as cart value, delivery urgency, customer type, and wallet balance.

## Key Features

- Product case study homepage with problem, hypothesis, MVP scope, and portfolio navigation.
- Interactive checkout simulator with context-aware recovery recommendations.
- Static product analytics dashboard with KPIs, funnel metrics, failure reasons, and recovery method performance.
- Product Requirements Document covering goals, scope, requirements, target users, risks, and success metrics.
- Experiment plan covering hypothesis, A/B design, event tracking, rollout, guardrails, and decision rules.
- Shared navigation and footer across all routes.

## Routes

- `/` - Case study homepage
- `/simulator` - Interactive checkout recovery simulator
- `/dashboard` - Checkout Health Dashboard
- `/prd` - Product Requirements Document
- `/experiment` - A/B testing and rollout plan

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS

No external chart or UI libraries are used.

## How To Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Run quality checks:

```bash
npm run lint
npm run build
```

## PM Skills Demonstrated

- Product discovery and problem framing
- Checkout recovery user experience
- Context-aware recommendation logic
- Funnel and event instrumentation thinking
- Product analytics and KPI definition
- PRD writing and MVP scoping
- Experiment design, rollout planning, and guardrail metrics

## Disclaimer

This is an independent portfolio case study and is not affiliated with Noon.
