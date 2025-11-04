import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { PredictionForm } from "@/components/PredictionForm/PredictionForm";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'PredictionForm'});

  return (
    <>
      <Header title={t('title')} />
      <PredictionForm locale={locale} />
      <Footer />
    </>
  );
}