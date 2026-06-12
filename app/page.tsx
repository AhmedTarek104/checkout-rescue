import Link from "next/link";

const solutionCards = [
  {
    title: "Smart Payment Retry",
    description:
      "Detects recoverable payment failures and keeps shoppers in the checkout flow with a guided retry path.",
  },
  {
    title: "Clear Failure Reason",
    description:
      "Translates payment errors into plain-language guidance so users know what happened and what to do next.",
  },
  {
    title: "One-Tap Alternative Payment",
    description:
      "Surfaces a preferred backup payment method without forcing users to restart checkout or re-enter details.",
  },
  {
    title: "Checkout Health Dashboard",
    description:
      "Tracks failure patterns, recovery funnels, and operational signals for product and payment teams.",
  },
];

const keyMetrics = [
  "Checkout completion rate",
  "Payment failure rate",
  "Recovery rate",
  "Revenue rescued",
];

const projectDemonstrations = [
  {
    title: "Product discovery",
    description:
      "Frames a checkout failure problem, user pain points, and the product hypothesis behind the recovery flow.",
  },
  {
    title: "Checkout recovery UX",
    description:
      "Shows how clear failure messaging and a focused next action can reduce abandonment after payment errors.",
  },
  {
    title: "Context-aware recommendation logic",
    description:
      "Uses customer, cart, delivery, and wallet context to recommend the next best payment method.",
  },
  {
    title: "Product analytics dashboard",
    description:
      "Connects checkout events to recovery metrics, funnel performance, and rescued revenue.",
  },
  {
    title: "PRD and experiment planning",
    description:
      "Documents requirements, tradeoffs, risks, and an A/B testing plan for validating product impact.",
  },
];

const upcomingPages = [
  {
    title: "Checkout Simulator",
    href: "/simulator",
    status: "Live prototype",
  },
  {
    title: "Analytics Dashboard",
    href: "/dashboard",
    status: "Live prototype",
  },
  {
    title: "PRD",
    href: "/prd",
    status: "Live prototype",
  },
  {
    title: "Experiment Plan",
    href: "/experiment",
    status: "Live prototype",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#12100b] text-zinc-100">
      <section className="relative isolate overflow-hidden border-b border-yellow-400/10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_34%),linear-gradient(135deg,rgba(39,39,42,0.78),rgba(18,16,11,1)_58%)]" />
        <div className="mx-auto flex min-h-[88vh] w-full max-w-7xl flex-col justify-center px-6 py-20 sm:px-10 lg:px-12">
          <div className="max-w-4xl">
            <p className="mb-5 inline-flex rounded-full border border-yellow-300/30 bg-yellow-300/10 px-4 py-2 text-sm font-medium text-yellow-200">
              Product management portfolio case study
            </p>
            <h1 className="text-5xl font-semibold tracking-normal text-white sm:text-7xl lg:text-8xl">
              Checkout Rescue
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
              A Noon-style product case study for reducing checkout drop-off
              after payment failure.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#problem"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-yellow-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-yellow-200"
              >
                Explore the product case
              </a>
              <a
                href="#mvp"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-zinc-600 px-6 py-3 text-sm font-semibold text-zinc-100 transition hover:border-yellow-300/70 hover:text-yellow-100"
              >
                View MVP scope
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="border-b border-white/10 px-6 py-20 sm:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
              Problem
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Failed payments turn intent into abandonment.
            </h2>
          </div>
          <p className="text-lg leading-8 text-zinc-300">
            Users often abandon checkout after failed payments because the
            recovery path is unclear, slow, or frustrating. Instead of receiving
            a useful explanation and a fast next step, shoppers are pushed into
            repeated retries, vague errors, or a checkout restart that breaks
            purchase momentum.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-7xl rounded-lg border border-yellow-300/20 bg-yellow-300/[0.06] p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
            Product Hypothesis
          </p>
          <blockquote className="mt-5 max-w-5xl text-2xl font-medium leading-10 text-white sm:text-3xl">
            &quot;If users receive a clear failure reason and a one-tap alternative
            payment option, more failed checkouts can be recovered into
            completed orders.&quot;
          </blockquote>
        </div>
      </section>

      <section id="mvp" className="border-y border-white/10 bg-zinc-950/35 px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
              MVP Solution
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              A focused recovery layer for checkout failures.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solutionCards.map((card) => (
              <article
                key={card.title}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
              Key Metrics
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Signals that show whether recovery is working.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {keyMetrics.map((metric) => (
              <div
                key={metric}
                className="rounded-lg border border-yellow-300/20 bg-[#1b1810] p-6"
              >
                <div className="mb-5 h-1 w-12 rounded-full bg-yellow-300" />
                <p className="text-base font-semibold text-zinc-100">{metric}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-zinc-950/35 px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
              Portfolio Value
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              What this project demonstrates
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {projectDemonstrations.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
              Coming Next
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Future portfolio pages planned for this case study.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {upcomingPages.map((page) =>
              page.href ? (
                <Link
                  key={page.title}
                  href={page.href}
                  className="rounded-lg border border-yellow-300/30 bg-yellow-300/[0.07] p-6 text-zinc-100 transition hover:-translate-y-0.5 hover:border-yellow-300/70 hover:bg-yellow-300/[0.1]"
                >
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-yellow-300">
                    {page.status}
                  </p>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {page.title}
                  </h3>
                </Link>
              ) : (
                <div
                  key={page.title}
                  aria-disabled="true"
                  className="rounded-lg border border-dashed border-zinc-700 bg-zinc-900/35 p-6 text-zinc-500"
                >
                  <p className="text-sm font-medium uppercase tracking-[0.16em]">
                    {page.status}
                  </p>
                  <h3 className="mt-4 text-lg font-semibold text-zinc-400">
                    {page.title}
                  </h3>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
