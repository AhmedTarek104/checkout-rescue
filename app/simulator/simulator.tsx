"use client";

import { useState } from "react";

type PaymentMethod = "Card" | "Cash on Delivery" | "BNPL" | "Wallet";
type CustomerType = "New customer" | "Returning customer";
type DeliveryUrgency = "Same-day delivery" | "Standard delivery";
type CartValue = 149 | 249 | 699;
type WalletBalance = 0 | 100 | 300;

type FailureReason =
  | "3D Secure timeout"
  | "Insufficient funds"
  | "Bank declined transaction"
  | "Approval timeout"
  | "User not eligible for BNPL"
  | "Wallet insufficient balance";

type CheckoutEvent =
  | "checkout_started"
  | "checkout_context_updated"
  | "payment_method_selected"
  | "payment_attempted"
  | "payment_failed"
  | "recovery_option_shown"
  | "recovery_completed"
  | "order_completed";

type EventLogEntry = {
  id: number;
  event: CheckoutEvent;
  detail: string;
};

type FlowState = "checkout" | "recovery" | "success";

type CheckoutContext = {
  customerType: CustomerType;
  deliveryUrgency: DeliveryUrgency;
  cartValue: CartValue;
  walletBalance: WalletBalance;
};

type RecoveryRecommendation = {
  method: PaymentMethod;
  reason: string;
};

const paymentMethods: PaymentMethod[] = [
  "Card",
  "Cash on Delivery",
  "BNPL",
  "Wallet",
];

const customerTypes: CustomerType[] = ["New customer", "Returning customer"];
const deliveryOptions: DeliveryUrgency[] = [
  "Same-day delivery",
  "Standard delivery",
];
const cartValues: CartValue[] = [149, 249, 699];
const walletBalances: WalletBalance[] = [0, 100, 300];

const defaultContext: CheckoutContext = {
  customerType: "New customer",
  deliveryUrgency: "Same-day delivery",
  cartValue: 249,
  walletBalance: 100,
};

const pmNotes = [
  {
    title: "What problem this solves",
    body: "Recoverable payment failures that currently push high-intent shoppers out of checkout.",
  },
  {
    title: "What user friction it removes",
    body: "Guessing what went wrong, restarting checkout, and re-entering payment details.",
  },
  {
    title: "What metric it should improve",
    body: "Payment recovery rate, checkout completion rate, and revenue rescued.",
  },
];

const decisionRules = [
  "Failed payment reason determines which recovery path is safe to show.",
  "User context changes the recommended payment method.",
  "Available payment methods are checked against cart value and wallet balance.",
  "The next best action is shown as a one-tap completion path.",
];

const initialEventLog: EventLogEntry[] = [
  {
    id: 1,
    event: "checkout_started",
    detail:
      "Cart opened with Card selected, 249 AED cart value, and same-day delivery.",
  },
];

function summarizeContext(context: CheckoutContext) {
  return `${context.customerType}, ${context.deliveryUrgency}, ${context.cartValue} AED cart, ${context.walletBalance} AED wallet balance`;
}

function getFailureReason(
  method: PaymentMethod,
  context: CheckoutContext,
): FailureReason | null {
  if (method === "Card") {
    if (context.cartValue === 149) {
      return "3D Secure timeout";
    }

    if (context.cartValue === 249) {
      return "Insufficient funds";
    }

    return "Bank declined transaction";
  }

  if (method === "BNPL") {
    return context.customerType === "Returning customer"
      ? "Approval timeout"
      : "User not eligible for BNPL";
  }

  if (method === "Wallet" && context.walletBalance < context.cartValue) {
    return "Wallet insufficient balance";
  }

  return null;
}

function getFailureMessage(method: PaymentMethod, reason: FailureReason) {
  if (method === "Card" && reason === "3D Secure timeout") {
    return "Your card payment could not be completed because 3D Secure timed out.";
  }

  if (method === "Card" && reason === "Insufficient funds") {
    return "Your card payment could not be completed because the bank reported insufficient funds.";
  }

  if (method === "Card" && reason === "Bank declined transaction") {
    return "Your card payment could not be completed because the bank declined the transaction.";
  }

  if (method === "BNPL" && reason === "Approval timeout") {
    return "BNPL approval timed out before the checkout session could be confirmed.";
  }

  if (method === "BNPL" && reason === "User not eligible for BNPL") {
    return "BNPL could not be completed because this customer is not eligible for installment approval.";
  }

  return "Wallet payment could not be completed because the wallet balance is lower than the cart value.";
}

function getRecoveryRecommendation(
  context: CheckoutContext,
  failedMethod: PaymentMethod,
  failureReason: FailureReason,
): RecoveryRecommendation {
  if (failedMethod === "Card" && failureReason === "3D Secure timeout") {
    if (context.deliveryUrgency === "Same-day delivery") {
      return {
        method: "Cash on Delivery",
        reason:
          "Cash on Delivery is recommended because the card failed during 3D Secure and the order uses same-day delivery, so the fastest recovery option is to avoid another online authorization step.",
      };
    }

    if (context.walletBalance >= context.cartValue) {
      return {
        method: "Wallet",
        reason:
          "Wallet is recommended because the card failed during 3D Secure, delivery is not urgent, and the wallet balance can cover the full cart value.",
      };
    }
  }

  if (failedMethod === "Card" && failureReason === "Insufficient funds") {
    if (context.cartValue >= 249) {
      return {
        method: "BNPL",
        reason:
          "BNPL is recommended because the card failed due to insufficient funds and the cart value is high enough for an installment-style recovery path.",
      };
    }

    return {
      method: "Cash on Delivery",
      reason:
        "Cash on Delivery is recommended because the card failed due to insufficient funds and the cart value is too low to prioritize BNPL.",
    };
  }

  if (failedMethod === "Card" && failureReason === "Bank declined transaction") {
    return {
      method: "Cash on Delivery",
      reason:
        "Cash on Delivery is recommended because the bank declined the card transaction, so the recovery path should avoid another card authorization attempt.",
    };
  }

  if (failedMethod === "BNPL" && failureReason === "Approval timeout") {
    if (context.walletBalance >= context.cartValue) {
      return {
        method: "Wallet",
        reason:
          "Wallet is recommended because BNPL approval timed out and the wallet balance is enough to complete the order immediately.",
      };
    }

    return {
      method: "Cash on Delivery",
      reason:
        "Cash on Delivery is recommended because BNPL approval timed out and the wallet balance cannot cover the cart value.",
    };
  }

  if (failedMethod === "BNPL" && failureReason === "User not eligible for BNPL") {
    if (context.customerType === "Returning customer") {
      return {
        method: "Card",
        reason:
          "Card is recommended because this returning customer is not eligible for BNPL but may still have a familiar saved card path available.",
      };
    }

    return {
      method: "Cash on Delivery",
      reason:
        "Cash on Delivery is recommended because a new customer is not eligible for BNPL and the lowest-friction recovery path should avoid another online approval step.",
    };
  }

  if (
    failedMethod === "Wallet" &&
    failureReason === "Wallet insufficient balance"
  ) {
    if (context.cartValue >= 249) {
      return {
        method: "BNPL",
        reason:
          "BNPL is recommended because the wallet balance is too low and the cart value is high enough to make installment approval a useful backup.",
      };
    }

    return {
      method: "Card",
      reason:
        "Card is recommended because the wallet balance is too low and the lower cart value does not need a BNPL recovery path.",
    };
  }

  return {
    method: "Cash on Delivery",
    reason:
      "Cash on Delivery is recommended as the fallback because it avoids online authorization and keeps the checkout moving.",
  };
}

function formatCurrency(value: number) {
  return `${value} AED`;
}

export default function CheckoutSimulator() {
  const [context, setContext] = useState<CheckoutContext>(defaultContext);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("Card");
  const [flowState, setFlowState] = useState<FlowState>("checkout");
  const [failedMethod, setFailedMethod] = useState<PaymentMethod | null>(null);
  const [recoveredMethod, setRecoveredMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [failureReason, setFailureReason] = useState<FailureReason | null>(null);
  const [failureMessage, setFailureMessage] = useState("");
  const [recommendation, setRecommendation] =
    useState<RecoveryRecommendation | null>(null);
  const [eventLog, setEventLog] = useState<EventLogEntry[]>(initialEventLog);

  const cartSummary = [
    ["Product", "Wireless Headphones"],
    ["Quantity", "1"],
    ["Cart value", formatCurrency(context.cartValue)],
    ["Delivery", context.deliveryUrgency],
    ["Initial payment method", "Card"],
  ];

  function track(event: CheckoutEvent, detail: string) {
    setEventLog((currentLog) => [
      ...currentLog,
      {
        id: currentLog.length + 1,
        event,
        detail,
      },
    ]);
  }

  function updateContext<Key extends keyof CheckoutContext>(
    key: Key,
    value: CheckoutContext[Key],
  ) {
    const updatedContext = {
      ...context,
      [key]: value,
    };

    setContext(updatedContext);
    track(
      "checkout_context_updated",
      `Updated ${key} to ${value}. Current context: ${summarizeContext(updatedContext)}.`,
    );
  }

  function selectPaymentMethod(method: PaymentMethod) {
    setSelectedMethod(method);
    track(
      "payment_method_selected",
      `${method} selected for ${summarizeContext(context)}.`,
    );
  }

  function completeOrder(method: PaymentMethod) {
    setRecoveredMethod(method);
    setFlowState("success");
    track(
      "order_completed",
      `Order completed with ${method}. Revenue rescued: ${formatCurrency(context.cartValue)}. Context: ${summarizeContext(context)}.`,
    );
  }

  function attemptPayment() {
    track(
      "payment_attempted",
      `Payment attempted with ${selectedMethod}. Context: ${summarizeContext(context)}.`,
    );

    const simulatedFailureReason = getFailureReason(selectedMethod, context);

    if (simulatedFailureReason) {
      const simulatedFailureMessage = getFailureMessage(
        selectedMethod,
        simulatedFailureReason,
      );
      const nextRecommendation = getRecoveryRecommendation(
        context,
        selectedMethod,
        simulatedFailureReason,
      );

      setFailedMethod(selectedMethod);
      setFailureReason(simulatedFailureReason);
      setFailureMessage(simulatedFailureMessage);
      setRecommendation(nextRecommendation);
      setFlowState("recovery");
      track(
        "payment_failed",
        `${selectedMethod} failed: ${simulatedFailureReason}.`,
      );
      track(
        "recovery_option_shown",
        `${nextRecommendation.method} recommended because ${nextRecommendation.reason}`,
      );
      return;
    }

    completeOrder(selectedMethod);
  }

  function recoverOrder() {
    if (!recommendation) {
      return;
    }

    track(
      "recovery_completed",
      `Customer accepted ${recommendation.method} after ${failedMethod} failed with ${failureReason}.`,
    );
    completeOrder(recommendation.method);
  }

  function resetSimulator() {
    setContext(defaultContext);
    setSelectedMethod("Card");
    setFlowState("checkout");
    setFailedMethod(null);
    setRecoveredMethod(null);
    setFailureReason(null);
    setFailureMessage("");
    setRecommendation(null);
    setEventLog(initialEventLog);
  }

  return (
    <section className="px-6 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 sm:p-8">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                  Cart Summary
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Wireless Headphones
                </h2>
              </div>
              <div className="rounded-md border border-yellow-300/20 bg-yellow-300/[0.08] px-4 py-3 text-right">
                <p className="text-sm text-zinc-400">Cart value</p>
                <p className="text-2xl font-semibold text-yellow-200">
                  {formatCurrency(context.cartValue)}
                </p>
              </div>
            </div>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {cartSummary.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-md border border-white/10 bg-zinc-950/35 p-4"
                >
                  <dt className="text-sm text-zinc-500">{label}</dt>
                  <dd className="mt-1 font-semibold text-zinc-100">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {flowState === "checkout" ? (
            <div className="rounded-lg border border-white/10 bg-[#1b1810] p-6 sm:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                  Checkout Context
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Tune the recovery signal
                </h2>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <ContextControl
                  label="Customer type"
                  options={customerTypes}
                  value={context.customerType}
                  onChange={(value) => updateContext("customerType", value)}
                />
                <ContextControl
                  label="Delivery urgency"
                  options={deliveryOptions}
                  value={context.deliveryUrgency}
                  onChange={(value) => updateContext("deliveryUrgency", value)}
                />
                <ContextControl
                  label="Cart value scenario"
                  options={cartValues}
                  value={context.cartValue}
                  formatOption={formatCurrency}
                  onChange={(value) => updateContext("cartValue", value)}
                />
                <ContextControl
                  label="Wallet balance"
                  options={walletBalances}
                  value={context.walletBalance}
                  formatOption={formatCurrency}
                  onChange={(value) => updateContext("walletBalance", value)}
                />
              </div>
            </div>
          ) : null}

          <div className="rounded-lg border border-white/10 bg-[#1b1810] p-6 sm:p-8">
            {flowState === "checkout" ? (
              <div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                      Payment Method
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-white">
                      Choose how to pay
                    </h2>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Card, BNPL, and low-balance Wallet paths can fail.
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => selectPaymentMethod(method)}
                      className={`min-h-20 rounded-md border p-4 text-left transition ${
                        selectedMethod === method
                          ? "border-yellow-300 bg-yellow-300/[0.12] text-yellow-100"
                          : "border-white/10 bg-white/[0.04] text-zinc-300 hover:border-yellow-300/50 hover:text-white"
                      }`}
                    >
                      <span className="block text-base font-semibold">
                        {method}
                      </span>
                      <span className="mt-2 block text-sm text-zinc-500">
                        {method === "Card" &&
                          "Deterministic failure varies by cart value."}
                        {method === "Cash on Delivery" &&
                          "Completes directly as an offline fallback."}
                        {method === "BNPL" &&
                          "Failure varies by customer type."}
                        {method === "Wallet" &&
                          "Completes when balance covers the cart."}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={attemptPayment}
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-yellow-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-yellow-200 sm:w-auto"
                >
                  Pay now
                </button>
              </div>
            ) : null}

            {flowState === "recovery" && recommendation ? (
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                  Recovery Screen
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Keep the order moving
                </h2>
                <div className="mt-6 rounded-lg border border-yellow-300/30 bg-yellow-300/[0.08] p-5">
                  <p className="text-lg leading-8 text-yellow-50">
                    {failureMessage} Complete this order now with{" "}
                    <span className="font-semibold">
                      {recommendation.method}
                    </span>
                    .
                  </p>
                </div>
                <div className="mt-4 rounded-md border border-white/10 bg-white/[0.04] p-4">
                  <h3 className="font-semibold text-white">
                    Why this recommendation?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {recommendation.reason}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={recoverOrder}
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-yellow-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-yellow-200 sm:w-auto"
                >
                  Complete with {recommendation.method}
                </button>
              </div>
            ) : null}

            {flowState === "success" ? (
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                  Success Screen
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Order completed
                </h2>
                <p className="mt-5 text-2xl font-semibold text-yellow-200">
                  Revenue rescued: {formatCurrency(context.cartValue)}
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <SummaryTile
                    label="Original failed method"
                    value={failedMethod ?? "None"}
                  />
                  <SummaryTile
                    label="Failure reason"
                    value={failureReason ?? "None"}
                  />
                  <SummaryTile
                    label="Recovered method"
                    value={recoveredMethod ?? selectedMethod}
                  />
                  <SummaryTile
                    label="Checkout context"
                    value={summarizeContext(context)}
                  />
                </div>
              </div>
            ) : null}

            <button
              type="button"
              onClick={resetSimulator}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-600 px-5 py-2 text-sm font-semibold text-zinc-100 transition hover:border-yellow-300/70 hover:text-yellow-100"
            >
              Reset simulator
            </button>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border border-white/10 bg-zinc-950/45 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
              Event Tracking
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Event log
            </h2>
            <ol className="mt-6 space-y-3">
              {eventLog.map((entry) => (
                <li
                  key={entry.id}
                  className="rounded-md border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-yellow-300 text-xs font-bold text-zinc-950">
                      {entry.id}
                    </span>
                    <p className="font-mono text-sm font-semibold text-yellow-100">
                      {entry.event}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {entry.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-lg border border-white/10 bg-zinc-950/45 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
              Decision Rules
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Smart recovery inputs
            </h2>
            <div className="mt-6 space-y-3">
              {decisionRules.map((rule) => (
                <div
                  key={rule}
                  className="rounded-md border border-white/10 bg-white/[0.04] p-4"
                >
                  <p className="text-sm leading-6 text-zinc-300">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-yellow-300/20 bg-yellow-300/[0.06] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
              PM Notes
            </p>
            <div className="mt-6 space-y-4">
              {pmNotes.map((note) => (
                <article
                  key={note.title}
                  className="rounded-md border border-white/10 bg-[#12100b]/70 p-4"
                >
                  <h3 className="font-semibold text-white">{note.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {note.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

type ContextControlProps<Option extends string | number> = {
  label: string;
  options: Option[];
  value: Option;
  formatOption?: (value: Option) => string;
  onChange: (value: Option) => void;
};

function ContextControl<Option extends string | number>({
  label,
  options,
  value,
  formatOption,
  onChange,
}: ContextControlProps<Option>) {
  return (
    <div>
      <p className="text-sm font-semibold text-zinc-300">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const optionLabel = formatOption ? formatOption(option) : String(option);
          const isSelected = option === value;

          return (
            <button
              key={String(option)}
              type="button"
              onClick={() => onChange(option)}
              className={`min-h-10 rounded-md border px-3 py-2 text-sm font-semibold transition ${
                isSelected
                  ? "border-yellow-300 bg-yellow-300/[0.12] text-yellow-100"
                  : "border-white/10 bg-white/[0.04] text-zinc-400 hover:border-yellow-300/50 hover:text-white"
              }`}
            >
              {optionLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SummaryTile({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-1 font-semibold leading-6 text-zinc-100">{value}</p>
    </div>
  );
}
