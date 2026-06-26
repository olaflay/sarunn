import React from "react";
import NetworkStatusBar from "@/components/NetworkStatusBar";

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }) {
  return (
    <main className="min-h-[100dvh] bg-[radial-gradient(circle_at_top,_rgba(27,43,69,0.12),_transparent_40%),linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto flex w-full max-w-md flex-col">
        <NetworkStatusBar />
        <div className="mb-8 text-center sm:mb-10">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[20px] bg-primary shadow-[0_8px_24px_rgba(30,124,255,0.24)]">
            <Icon className="h-7 w-7 text-primary-foreground" aria-hidden="true" />
          </div>
          <h1 className="text-[2rem] font-semibold tracking-tight text-foreground sm:text-[2.25rem]">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
        </div>
        <section className="rounded-[28px] border border-border/70 bg-card p-6 shadow-[0_12px_36px_rgba(15,23,42,0.08)] sm:p-8">
          {children}
        </section>
        {footer && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {footer}
          </p>
        )}
      </div>
    </main>
  );
}
