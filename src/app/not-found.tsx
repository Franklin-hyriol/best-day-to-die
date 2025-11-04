"use client";

import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="font-display bg-background-dark">
        <main className="relative h-auto min-h-screen w-full overflow-x-hidden p-4 md:p-6 flex flex-col items-center gap-10">
          <section className="flex flex-col items-center justify-center gap-6 text-text-main min-h-[calc(100vh-48px)]">
            <h1 className="font-bangers tracking-wider text-6xl md:text-9xl text-accent drop-shadow-[0_4px_0_rgba(255,0,168,0.8)] transform -rotate-3">
              404
            </h1>

            <Link
              href="/"
              className="btn-irregular cursor-pointer font-comic text-xl bg-primary text-[#1E1E2A] px-6 py-3 tracking-wide border-accent shadow-[0_0_20px_var(--color-primary)] active:scale-95"
            >
              Back Home
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
