import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Experiment Plan | Checkout Rescue",
  description:
    "A/B testing and rollout plan for validating Checkout Rescue product impact.",
};

const experimentDesign = [
  {
    title: "Control",
    items: [
      "Generic payment failure message.",
      "User must manually choose another payment method.",
      "No contextual recovery recommendation.",
    ],
  },
  {
    title: "Variant",
    items: [
      "Clear failure reason.",
      "Recommended next-best payment method.",
      "One-tap recovery action.",
      "Recovery reason explanation.",
    ],
  },
];

const targetSegment = [
  "Users who reach checkout.",
  "Users whose first payment attempt fails.",
  "Mobile web and desktop users.",
  "Exclude suspicious/fraud-flagged orders.",
  "Exclude payment methods unavailable in the user's location.",
];

const secondaryMetrics = [
  "Checkout completion rate.",
  "Revenue rescued.",
  "Average recovery time.",
  "Payment retry rate.",
  "Support contact rate after payment failure.",
];

const guardrailMetrics = [
  "Duplicate order rate.",
  "Refund/cancellation rate.",
  "Payment error repeat rate.",
  "User complaint rate.",
  "COD abuse or failed delivery rate.",
];

const eventTracking = [
  {
    event: "checkout_started",
    measures: "A shopper has entered the checkout flow.",
    properties: ["user_type", "cart_value", "device_type"],
  },
  {
    event: "payment_method_selected",
    measures: "The shopper selected or changed a payment method.",
    properties: ["user_type", "cart_value", "payment_method", "device_type"],
  },
  {
    event: "payment_attempted",
    measures: "A payment attempt was submitted.",
    properties: ["cart_value", "payment_method", "device_type"],
  },
  {
    event: "payment_failed",
    measures: "The first payment attempt failed.",
    properties: ["payment_method", "failure_reason", "cart_value"],
  },
  {
    event: "recovery_option_shown",
    measures: "The recovery recommendation was shown to the shopper.",
    properties: [
      "failure_reason",
      "recommended_method",
      "payment_method",
      "device_type",
    ],
  },
  {
    event: "recovery_option_clicked",
    measures: "The shopper clicked the recommended recovery action.",
    properties: ["recommended_method", "failure_reason", "cart_value"],
  },
  {
    event: "recovery_completed",
    measures: "The failed checkout was recovered into a completed payment path.",
    properties: ["recommended_method", "cart_value", "user_type"],
  },
  {
    event: "order_completed",
    measures: "The order was completed after checkout or recovery.",
    properties: ["payment_method", "recommended_method", "cart_value"],
  },
  {
    event: "support_contact_started",
    measures: "The shopper started a support contact after payment failure.",
    properties: ["failure_reason", "payment_method", "device_type"],
  },
];

const samplePlan = [
  "Run for 2 weeks or until enough failed-payment sessions are collected.",
  "Analyze by payment method, cart value, customer type, and device.",
  "Avoid calling a winner too early because payment failures are a smaller subset of all checkouts.",
];

const rolloutPlan = [
  {
    stage: "5%",
    description: "Internal/low-risk traffic",
  },
  {
    stage: "25%",
    description: "Eligible failed-payment sessions",
  },
  {
    stage: "50%",
    description: "Rollout if guardrails are stable",
  },
  {
    stage: "100%",
    description:
      "Rollout after success metric improves and guardrails remain healthy",
  },
];

const decisionRules = [
  "Ship if recovery rate improves meaningfully and guardrails remain stable.",
  "Iterate if recovery improves but support tickets or cancellations increase.",
  "Roll back if duplicate orders, complaints, or failed deliveries increase.",
  "Segment further if only some payment methods improve.",
];

const pmNotes = [
  "This experiment validates product impact, not just UI preference.",
  "The biggest risk is improving short-term completion while creating operational problems.",
  "Guardrails are important because payment recovery touches trust, fraud, logistics, and support.",
];

export default function ExperimentPage() {
  return (
    <main className="min-h-screen bg-[#12100b] text-zinc-100">
      <section className="relative isolate overflow-hidden border-b border-yellow-400/10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_34%),linear-gradient(135deg,rgba(39,39,42,0.78),rgba(18,16,11,1)_58%)]" />
        <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-10 lg:px-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
            <Link
              href="/prd"
              className="inline-flex min-h-10 items-center justify-center rounded-md border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-yellow-300/70 hover:text-yellow-100"
            >
              Read PRD
            </Link>
          </div>

          <div className="mt-12 max-w-4xl pb-10">
            <p className="mb-5 inline-flex rounded-full border border-yellow-300/30 bg-yellow-300/10 px-4 py-2 text-sm font-medium text-yellow-200">
              Validation plan
            </p>
            <h1 className="text-5xl font-semibold tracking-normal text-white sm:text-7xl">
              Experiment Plan
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300 sm:text-xl">
              Validating whether smart payment recovery increases completed
              orders after failed checkout attempts.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl space-y-6">
          <section className="rounded-lg border border-yellow-300/20 bg-yellow-300/[0.06] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
              Hypothesis
            </p>
            <blockquote className="mt-5 max-w-5xl text-2xl font-medium leading-10 text-white">
              &quot;If users see a clear payment failure reason and a one-tap
              alternative payment option, the recovery rate from failed payments
              will increase without increasing support tickets or duplicate
              orders.&quot;
            </blockquote>
          </section>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-lg border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Experiment Design
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                Control vs variant
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {experimentDesign.map((group) => (
                  <article
                    key={group.title}
                    className="rounded-lg border border-white/10 bg-[#1b1810] p-5"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {group.title}
                    </h3>
                    <BulletList items={group.items} />
                  </article>
                ))}
              </div>
            </section>

            <ListPanel
              eyebrow="Target Segment"
              title="Eligible traffic"
              items={targetSegment}
              muted
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <section className="rounded-lg border border-yellow-300/20 bg-[#1b1810] p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Primary Metric
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                Recovery rate from failed payments
              </h2>
              <p className="mt-5 text-sm leading-6 text-zinc-400">
                The core success signal is whether more failed payment sessions
                become completed orders.
              </p>
            </section>
            <ListPanel
              eyebrow="Secondary Metrics"
              title="Supporting signals"
              items={secondaryMetrics}
            />
            <ListPanel
              eyebrow="Guardrails"
              title="Do no harm"
              items={guardrailMetrics}
              muted
            />
          </div>

          <section className="rounded-lg border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
              Event Tracking Plan
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Instrumentation needed for the experiment
            </h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {eventTracking.map((entry) => (
                <article
                  key={entry.event}
                  className="rounded-lg border border-white/10 bg-[#1b1810] p-5"
                >
                  <h3 className="font-mono text-sm font-semibold text-yellow-100">
                    {entry.event}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {entry.measures}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.properties.map((property) => (
                      <span
                        key={property}
                        className="rounded-md border border-yellow-300/20 bg-yellow-300/[0.08] px-2.5 py-1 text-xs font-semibold text-yellow-100"
                      >
                        {property}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <ListPanel
              eyebrow="Sample Size / Duration"
              title="How long to run"
              items={samplePlan}
            />
            <section className="rounded-lg border border-white/10 bg-zinc-950/45 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Rollout Plan
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                Staged launch
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {rolloutPlan.map((stage) => (
                  <article
                    key={stage.stage}
                    className="rounded-md border border-white/10 bg-white/[0.04] p-4"
                  >
                    <p className="text-3xl font-semibold text-yellow-200">
                      {stage.stage}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      {stage.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <ListPanel
              eyebrow="Decision Rules"
              title="How to interpret results"
              items={decisionRules}
            />
            <ListPanel
              eyebrow="PM Notes"
              title="What this experiment protects"
              items={pmNotes}
              muted
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-300">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-yellow-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
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
      <BulletList items={items} />
    </section>
  );
}
