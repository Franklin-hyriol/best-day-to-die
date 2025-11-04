import { getMessages, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Space_Grotesk, Bangers } from "next/font/google";
import "../globals.css";
import LanguageToggle from "@/components/LanguageToggle/LanguageToggle";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bangers",
});

export const metadata: Metadata = {
  title: "BDTD - Best Day To Die",
  description:
    "Best Day to Die est une application web humoristique qui prédit de façon absurde le meilleur jour pour mourir d’un utilisateur, avec des explications drôles et sarcastiques, et des interactions ludiques comme des compte-à-rebours et des boutons pour rejouer ou accepter la prédiction.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

import { notFound } from "next/navigation";

// ... (other imports)

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;

  if (!["fr", "en"].includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${bangers.variable} font-display bg-background-dark text-text-main antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <main className="relative h-auto min-h-screen w-full overflow-x-hidden p-4 md:p-6 flex flex-col items-center gap-10">
            <LanguageToggle />
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
