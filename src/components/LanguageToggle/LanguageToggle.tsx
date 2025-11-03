"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleClick = (lang: 'en' | 'fr') => {
    router.replace(pathname, { locale: lang });
  };

  return (
    <div className="absolute top-4 right-4 z-10 md:top-6 md:right-6">
      <div className="flex items-center space-x-2 rounded-full border-2 border-primary/50 bg-[#2D2D3E] p-1 text-sm font-bold shadow-md shadow-primary/20">
        <button
          className={`cursor-pointer rounded-full px-3 py-1 ${locale === "fr" ? "bg-accent text-background-dark" : "text-text-secondary transition-colors hover:text-text-main"}`}
          onClick={() => handleClick("fr")}
        >
          FR
        </button>
        <button
          className={`cursor-pointer rounded-full px-3 py-1 ${locale === "en" ? "bg-accent text-background-dark" : "text-text-secondary transition-colors hover:text-text-main"}`}
          onClick={() => handleClick("en")}
        >
          EN
        </button>
      </div>
    </div>
  );
}

export default LanguageToggle;