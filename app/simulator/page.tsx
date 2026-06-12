import type { Metadata } from "next";
import Link from "next/link";
import CheckoutSimulator from "./simulator";

export const metadata: Metadata = {
  title: "Checkout Simulator | Checkout Rescue",
  description:
    "Interactive checkout recovery prototype for Checkout Rescue.",
};

export default function SimulatorPage() {
  return (
    <main className="min-h-screen bg-[#12100b] text-zinc-100">
      <section className="relative isolate overflow-hidden border-b border-yellow-400/10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_34%),linear-gradient(135deg,rgba(39,39,42,0.78),rgba(18,16,11,1)_58%)]" />
        <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-10 lg:px-12">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-yellow-300/70 hover:text-yellow-100"
          >
            Back to case study
          </Link>

          <div className="mt-12 max-w-4xl pb-10">
            <p className="mb-5 inline-flex rounded-full border border-yellow-300/30 bg-yellow-300/10 px-4 py-2 text-sm font-medium text-yellow-200">
              Interactive prototype
            </p>
            <h1 className="text-5xl font-semibold tracking-normal text-white sm:text-7xl">
              Checkout Simulator
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300 sm:text-xl">
              Test how a failed payment can be recovered using a clear failure
              reason and a one-tap alternative payment method.
            </p>
          </div>
        </div>
      </section>

      <CheckoutSimulator />
    </main>
  );
}
