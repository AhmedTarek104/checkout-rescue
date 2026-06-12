import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Product Requirements Document | Checkout Rescue",
  description:
    "Product Requirements Document for the Checkout Rescue portfolio case study.",
};

const goals = [
  "Reduce checkout abandonment after payment failure.",
  "Increase recovery rate from failed payment attempts.",
  "Improve user clarity and trust during payment errors.",
  "Give product and payment teams visibility into failure patterns.",
];

const nonGoals = [
  "Replacing the payment gateway.",
  "Building a full payment processor.",
  "Changing pricing, promotions, or inventory logic.",
  "Supporting every possible payment edge case in MVP.",
];

const targetUsers = [
  {
    title: "Shopper",
    description:
      "Needs a clear, fast way to recover from a payment failure without restarting checkout.",
  },
  {
    title: "Product Manager",
    description:
      "Needs measurable recovery events and funnel visibility to evaluate product impact.",
  },
  {
    title: "Payment Operations Team",
    description:
      "Needs failure reason patterns to identify payment method, gateway, or provider issues.",
  },
  {
    title: "Customer Support Team",
    description:
      "Needs clearer user-facing messages so fewer shoppers contact support after failed payments.",
  },
];

const userStories = [
  "As a shopper, I want to understand why my payment failed so I know what to do next.",
  "As a shopper, I want a one-tap alternative payment option so I can complete my order quickly.",
  "As a returning customer, I want the recovery option to match my available payment methods.",
  "As a PM, I want to track recovery_completed events so I can measure product impact.",
  "As a payments team member, I want to see top failure reasons so I can identify gateway or method issues.",
  "As support, I want clearer failure messages so users contact support less often.",
];

const mvpScope = [
  {
    title: "Must-have",
    items: [
      "Detect failed payment event.",
      "Show clear failure reason.",
      "Recommend one alternative payment method.",
      "Track recovery events.",
      "Show completed recovery state.",
    ],
  },
  {
    title: "Should-have",
    items: [
      "Context-aware recommendation rules.",
      "Segment dashboard by payment method.",
      "Recovery reason explanation.",
    ],
  },
  {
    title: "Could-have",
    items: [
      "Personalized recovery based on customer history.",
      "Multi-language Arabic/English messages.",
      "Automated alerting for gateway issues.",
    ],
  },
];

const functionalRequirements = [
  "User can select a payment method.",
  "System detects payment failure reason.",
  "System recommends next best payment method.",
  "User can complete order through recovery action.",
  "System logs events for analytics.",
  "PM can view dashboard metrics.",
];

const nonFunctionalRequirements = [
  "Recovery screen should load quickly.",
  "Messages should be simple and understandable.",
  "Flow should work on mobile.",
  "Event tracking should be reliable.",
  "Recommendation logic should be explainable.",
  "Payment recovery should not create duplicate orders.",
];

const successMetrics = [
  "Recovery rate",
  "Checkout completion rate",
  "Payment failure rate",
  "Revenue rescued",
  "Average recovery time",
  "Support tickets related to failed payments",
];

const risksAndAssumptions = [
  "Payment failure reasons may not always be available from providers.",
  "Some users may still prefer to abandon after failure.",
  "COD availability depends on location/order rules.",
  "BNPL eligibility is controlled by provider logic.",
  "Simulated data is used for this portfolio version.",
];

export default function PrdPage() {
  return (
    <main className="min-h-screen bg-[#12100b] text-zinc-100">
      <section className="relative isolate overflow-hidden border-b border-yellow-400/10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_34%),linear-gradient(135deg,rgba(39,39,42,0.78),rgba(18,16,11,1)_58%)]" />
        <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-10 lg:px-12">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-10 items-center justify-center rounded-md border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-yellow-300/70 hover:text-yellow-100"
            >
              Back to case study
            </Link>
            <Link
              href="/simulator"
              className="inline-flex min-h-10 items-center justify-center rounded-md bg-yellow-300 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-yellow-200"
            >
              Try the simulator
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex min-h-10 items-center justify-center rounded-md border border-yellow-300/40 px-4 py-2 text-sm font-semibold text-yellow-100 transition hover:border-yellow-300/80"
            >
              View dashboard
            </Link>
          </div>

          <div className="mt-12 max-w-4xl pb-10">
            <p className="mb-5 inline-flex rounded-full border border-yellow-300/30 bg-yellow-300/10 px-4 py-2 text-sm font-medium text-yellow-200">
              Product requirements
            </p>
            <h1 className="text-5xl font-semibold tracking-normal text-white sm:text-7xl">
              Product Requirements Document
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300 sm:text-xl">
              Checkout Rescue: reducing checkout drop-off after failed payments.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-10 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-6">
            <TextPanel eyebrow="Overview" title="Product overview">
              Checkout Rescue is a smart recovery flow that helps users complete
              orders after payment failures by showing clear failure reasons and
              one-tap alternative payment options.
            </TextPanel>

            <TextPanel eyebrow="Problem" title="Problem statement">
              Users often abandon checkout after failed payments because the
              recovery path is unclear, slow, or frustrating. This creates lost
              revenue, lower conversion, and reduced trust in the checkout
              experience.
            </TextPanel>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <ListPanel eyebrow="Goals" title="What success means" items={goals} />
            <ListPanel
              eyebrow="Non-goals"
              title="What MVP will not solve"
              items={nonGoals}
              muted
            />
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-7xl">
          <section className="rounded-lg border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
              Target Users
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Who this product serves
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {targetUsers.map((user) => (
                <article
                  key={user.title}
                  className="rounded-lg border border-white/10 bg-[#1b1810] p-5"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {user.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {user.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="mx-auto mt-6 grid max-w-7xl gap-6 lg:grid-cols-2">
          <ListPanel
            eyebrow="User Stories"
            title="Jobs the product must support"
            items={userStories}
          />
          <section className="rounded-lg border border-yellow-300/20 bg-yellow-300/[0.06] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
              MVP Scope
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Prioritized delivery plan
            </h2>
            <div className="mt-6 space-y-4">
              {mvpScope.map((scope) => (
                <article
                  key={scope.title}
                  className="rounded-md border border-white/10 bg-[#12100b]/70 p-4"
                >
                  <h3 className="font-semibold text-white">{scope.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {scope.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-6 text-zinc-300"
                      >
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-yellow-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="mx-auto mt-6 grid max-w-7xl gap-6 lg:grid-cols-2">
          <ListPanel
            eyebrow="Functional Requirements"
            title="What the system must do"
            items={functionalRequirements}
          />
          <ListPanel
            eyebrow="Non-functional Requirements"
            title="Quality bar for the flow"
            items={nonFunctionalRequirements}
          />
        </div>

        <div className="mx-auto mt-6 grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <ListPanel
            eyebrow="Success Metrics"
            title="How impact will be measured"
            items={successMetrics}
          />
          <ListPanel
            eyebrow="Risks and Assumptions"
            title="What needs validation"
            items={risksAndAssumptions}
            muted
          />
        </div>
      </section>
    </main>
  );
}

function TextPanel({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-5 text-base leading-8 text-zinc-300">{children}</p>
    </section>
  );
}

function ListPanel({
  eyebrow,
  title,
  items,
  muted = false,
}: {
  eyebrow: string;
  title: string;
  items: string[];
  muted?: boolean;
}) {
  return (
    <section
      className={`rounded-lg border p-6 sm:p-8 ${
        muted
          ? "border-white/10 bg-zinc-950/45"
          : "border-white/10 bg-[#1b1810]"
      }`}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white">{title}</h2>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-300">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-yellow-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
