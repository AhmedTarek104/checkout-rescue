import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout Health Dashboard | Checkout Rescue",
  description:
    "Product analytics dashboard for monitoring Checkout Rescue performance.",
};

const kpis = [
  {
    label: "Checkout completion rate",
    value: "78.4%",
  },
  {
    label: "Payment failure rate",
    value: "14.8%",
  },
  {
    label: "Recovery rate",
    value: "42.6%",
  },
  {
    label: "Revenue rescued",
    value: "38,420 AED",
  },
  {
    label: "Avg recovery time",
    value: "31 sec",
  },
];

const funnelSteps = [
  {
    label: "Checkout started",
    value: 12400,
  },
  {
    label: "Payment attempted",
    value: 10920,
  },
  {
    label: "Payment failed",
    value: 1616,
  },
  {
    label: "Recovery shown",
    value: 1616,
  },
  {
    label: "Recovery completed",
    value: 688,
  },
  {
    label: "Order completed",
    value: 9992,
  },
];

const failureReasons = [
  {
    label: "3D Secure timeout",
    value: 38,
  },
  {
    label: "Insufficient funds",
    value: 24,
  },
  {
    label: "Bank declined transaction",
    value: 18,
  },
  {
    label: "BNPL approval timeout",
    value: 12,
  },
  {
    label: "Wallet insufficient balance",
    value: 8,
  },
];

const recoveryMethods = [
  {
    label: "Cash on Delivery",
    value: 51,
  },
  {
    label: "Wallet",
    value: 46,
  },
  {
    label: "BNPL",
    value: 39,
  },
  {
    label: "Card retry",
    value: 22,
  },
];

const insights = [
  "3D Secure timeout is the largest recoverable failure.",
  "Cash on Delivery performs best for urgent same-day orders.",
  "BNPL is useful for higher-value carts but should not be the default for every user.",
  "Wallet recovery performs well when balance is sufficient and user trust is already established.",
];

const nextActions = [
  "Prioritize 3D Secure timeout recovery.",
  "A/B test recovery messages.",
  "Add event tracking to measure recovery_completed.",
  "Segment results by customer type, device, and cart value.",
];

const maxFunnelValue = Math.max(...funnelSteps.map((step) => step.value));

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export default function DashboardPage() {
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
          </div>

          <div className="mt-12 max-w-4xl pb-10">
            <p className="mb-5 inline-flex rounded-full border border-yellow-300/30 bg-yellow-300/10 px-4 py-2 text-sm font-medium text-yellow-200">
              Product analytics
            </p>
            <h1 className="text-5xl font-semibold tracking-normal text-white sm:text-7xl">
              Checkout Health Dashboard
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300 sm:text-xl">
              A product analytics view for monitoring failed payments, recovery
              performance, and rescued revenue.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {kpis.map((kpi) => (
              <article
                key={kpi.label}
                className="rounded-lg border border-yellow-300/20 bg-[#1b1810] p-6"
              >
                <p className="text-sm leading-6 text-zinc-400">{kpi.label}</p>
                <p className="mt-4 text-3xl font-semibold text-yellow-200">
                  {kpi.value}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <section className="rounded-lg border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                  Funnel
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Checkout recovery flow
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                {funnelSteps.map((step) => (
                  <div key={step.label}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-semibold text-zinc-100">{step.label}</p>
                      <p className="text-sm font-semibold text-yellow-100">
                        {formatNumber(step.value)}
                      </p>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-900">
                      <div
                        className="h-full rounded-full bg-yellow-300"
                        style={{
                          width: `${(step.value / maxFunnelValue) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-yellow-300/20 bg-yellow-300/[0.06] p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                PM Insights
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                What the data suggests
              </h2>
              <div className="mt-6 space-y-3">
                {insights.map((insight) => (
                  <div
                    key={insight}
                    className="rounded-md border border-white/10 bg-[#12100b]/70 p-4"
                  >
                    <p className="text-sm leading-6 text-zinc-300">{insight}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <MetricBars
              eyebrow="Failure Reasons"
              title="Where payments break"
              items={failureReasons}
            />
            <MetricBars
              eyebrow="Recovery Methods"
              title="Which options recover orders"
              items={recoveryMethods}
              suffix=" recovery rate"
            />
          </div>

          <section className="mt-6 rounded-lg border border-white/10 bg-zinc-950/45 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
              PM Decision
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              What I would do next as PM
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {nextActions.map((action) => (
                <div
                  key={action}
                  className="rounded-md border border-white/10 bg-white/[0.04] p-4"
                >
                  <p className="text-sm leading-6 text-zinc-300">{action}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function MetricBars({
  eyebrow,
  title,
  items,
  suffix = "",
}: {
  eyebrow: string;
  title: string;
  items: {
    label: string;
    value: number;
  }[];
  suffix?: string;
}) {
  return (
    <section className="rounded-lg border border-white/10 bg-[#1b1810] p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white">{title}</h2>

      <div className="mt-6 space-y-5">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold text-zinc-100">{item.label}</p>
              <p className="text-sm font-semibold text-yellow-100">
                {item.value}%{suffix}
              </p>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-950">
              <div
                className="h-full rounded-full bg-yellow-300"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
