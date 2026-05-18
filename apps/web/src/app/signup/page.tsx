import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div className="force-light relative flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--color-background)_70%)]"
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-brand-500">
              <span className="text-lg font-bold text-white">T</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Teamly</span>
          </a>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
