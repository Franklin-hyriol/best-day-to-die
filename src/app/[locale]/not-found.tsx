import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFoundPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "NotFoundPage" });

  return (
    <section className="flex flex-col items-center justify-center gap-6 text-text-main min-h-[calc(100vh-48px)]">
      <h1 className="font-bangers tracking-wider text-6xl md:text-9xl text-accent drop-shadow-[0_4px_0_rgba(255,0,168,0.8)] transform -rotate-3">
        404
      </h1>

      <div className="flex flex-col gap-3 max-w-lg text-center">
        <p className="text-text-main tracking-tight text-3xl md:text-4xl font-bold leading-tight">
          {t("headline")}
        </p>
        <p className="text-text-secondary text-base font-normal leading-normal">
          {t("description")}
        </p>
      </div>

      <Link
        href="/"
        className="btn-irregular cursor-pointer font-comic text-xl bg-primary text-[#1E1E2A] px-6 py-3 tracking-wide border-accent shadow-[0_0_20px_var(--color-primary)] active:scale-95"
      >
        {t("backButton")}
      </Link>
    </section>
  );
}
