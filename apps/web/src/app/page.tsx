import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="force-light flex min-h-screen flex-col bg-background text-foreground">
      {/* Header — 1:1 Teamly */}
      <header className="fixed top-0 right-0 left-0 z-50 bg-transparent backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-brand-500">
              <span className="text-sm font-bold text-white">T</span>
            </div>
            <span className="text-lg font-bold tracking-tight">Teamly</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <a
              href="#how-it-works"
              className="rounded-md px-4 py-2 font-pixel text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="rounded-md px-4 py-2 font-pixel text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="rounded-md border border-border/60 px-4 py-2 font-pixel text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-brand-500/40 hover:text-foreground"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-md border border-brand-500/30 bg-brand-500/10 px-4 py-2 font-pixel text-[9px] uppercase tracking-wider text-brand-500 transition-all hover:bg-brand-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero — 1:1 Teamly */}
      <main className="flex-1">
        <section className="relative flex flex-col items-center justify-center px-4 pt-32 pb-20 text-center">
          {/* Grid background */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-brand-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-brand-200)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 font-pixel text-[8px] uppercase tracking-wider text-brand-600">
              Your AI Team, Managed
            </div>

            <h1 className="font-pixel text-3xl leading-tight tracking-tight md:text-5xl">
              AI Agents That
              <br />
              <span className="text-brand-500">Work While You Sleep</span>
            </h1>

            <p className="mx-auto max-w-xl text-base text-muted-foreground">
              Managed hosting for AI agents. Deploy autonomous teammates that
              research, write, code, and coordinate — all from a single
              dashboard.
            </p>

            <div className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-center">
              <Link
                href="/signup"
                className="rounded-md bg-brand-500 px-6 py-3 font-pixel text-[10px] uppercase tracking-wider text-white transition-colors hover:bg-brand-600"
              >
                Deploy Your First Agent
              </Link>
              <Link
                href="#how-it-works"
                className="rounded-md border border-border/60 px-6 py-3 font-pixel text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                See How It Works
              </Link>
            </div>

            <p className="pt-2 font-pixel text-[8px] uppercase tracking-wider text-muted-foreground/60">
              No credit card required · 14-day free trial
            </p>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="mx-auto max-w-5xl px-6 py-24"
        >
          <div className="mb-12 text-center">
            <h2 className="font-pixel text-lg uppercase tracking-wider text-foreground">
              How It Works
            </h2>
            <p className="mt-2 text-muted-foreground">
              Three steps to your first AI colleague
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Pick Your Agents",
                desc: "Choose from a catalog of pre-built specialists — researcher, writer, QA, project manager — or define your own.",
              },
              {
                step: "02",
                title: "Connect Your Tools",
                desc: "Plug into Slack, Gmail, Google Calendar, Notion, and 50+ other apps through our integration layer.",
              },
              {
                step: "03",
                title: "Watch Them Work",
                desc: "The Pixel Department shows every agent action in real-time. Reasoning, tool calls, and results — fully transparent.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-brand-200"
              >
                <div className="mb-3 font-pixel text-[10px] uppercase tracking-wider text-brand-500">
                  {item.step}
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pixel Department preview */}
        <section className="mx-auto max-w-5xl px-6 py-24">
          <div className="rounded-2xl border border-border bg-gradient-to-b from-brand-50/50 to-transparent p-8 md:p-12">
            <div className="mb-6 text-center">
              <h2 className="font-pixel text-lg uppercase tracking-wider text-foreground">
                The Pixel Department
              </h2>
              <p className="mt-2 text-muted-foreground">
                Watch your AI team collaborate in real-time
              </p>
            </div>

            {/* Simulated agent feed */}
            <div className="mx-auto max-w-2xl space-y-3">
              {[
                {
                  agent: "Scout",
                  role: "Content Analyst",
                  action: "Researching top 5 competitors in project management space...",
                  time: "12:01",
                },
                {
                  agent: "Marcus",
                  role: "Copywriter",
                  action: "Drafting competitive analysis report...",
                  time: "12:03",
                },
                {
                  agent: "Vera",
                  role: "QA Manager",
                  action: "Reviewing draft for accuracy and tone...",
                  time: "12:05",
                },
                {
                  agent: "Coordinator",
                  role: "Lead",
                  action: "Delivering final report to user",
                  time: "12:06",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-border/40 bg-background/80 px-4 py-3 backdrop-blur-sm"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-100 font-pixel text-[8px] text-brand-700">
                    {item.agent[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {item.agent}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {item.role}
                      </span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {item.action}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] text-muted-foreground/60">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-5xl px-6 py-24">
          <div className="mb-12 text-center">
            <h2 className="font-pixel text-lg uppercase tracking-wider text-foreground">
              Pricing
            </h2>
            <p className="mt-2 text-muted-foreground">
              Start free, scale when you're ready
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "$0",
                period: "forever",
                desc: "For solo operators testing the waters",
                features: [
                  "1 agent",
                  "10 tool calls/day",
                  "Community support",
                  "Pixel Department lite",
                ],
              },
              {
                name: "Pro",
                price: "$29",
                period: "/month",
                desc: "For professionals deploying real workflows",
                features: [
                  "5 agents",
                  "500 tool calls/month",
                  "All integrations",
                  "Full Pixel Department",
                  "Priority support",
                ],
                highlighted: true,
              },
              {
                name: "Team",
                price: "$99",
                period: "/month",
                desc: "For teams running multiple agents in production",
                features: [
                  "Unlimited agents",
                  "5,000 tool calls/month",
                  "Custom agent catalog",
                  "SSO + audit logs",
                  "Dedicated support",
                ],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 transition-colors ${
                  plan.highlighted
                    ? "border-brand-500/40 bg-brand-50/30"
                    : "border-border/60 bg-card"
                }`}
              >
                <h3 className="font-pixel text-sm uppercase tracking-wider text-foreground">
                  {plan.name}
                </h3>
                <div className="mt-3">
                  <span className="text-2xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {plan.desc}
                </p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <svg
                        className="size-3.5 shrink-0 text-brand-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`mt-6 block rounded-md px-4 py-2 text-center font-pixel text-[9px] uppercase tracking-wider transition-colors ${
                    plan.highlighted
                      ? "bg-brand-500 text-white hover:bg-brand-600"
                      : "border border-border/60 text-muted-foreground hover:border-brand-500/40 hover:text-foreground"
                  }`}
                >
                  {plan.price === "$0" ? "Get Started" : "Start Free Trial"}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded bg-brand-500">
              <span className="text-[8px] font-bold text-white">T</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              Teamly
            </span>
          </div>
          <p className="font-pixel text-[7px] uppercase tracking-wider text-muted-foreground/60">
            © 2025 Teamly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
