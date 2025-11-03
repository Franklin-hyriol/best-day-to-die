"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePredictionStore } from "@/store/predictionStore";
import Header from "@/components/Header/Header";
import { useTranslations } from "next-intl";

function BestTime() {
  const t = useTranslations('BestTimePage');
  const tError = useTranslations('Error');
  const { date, texte, clearPrediction } = usePredictionStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRestart = () => {
    clearPrediction();
  };

  if (!isClient) {
    return null;
  }

  if (!date || !texte) {
    return (
      <div className="text-center">
        <p className="text-2xl mb-4">{tError('noPrediction')}</p>
        <Link href="/" className="text-accent hover:underline">
          {tError('backToForm')}
        </Link>
      </div>
    );
  }

  return (
    <>
      <Header title={t('title')} />

      <div className="max-w-xl text-center">
        <h2 className="text-5xl md:text-6xl font-bold drop-shadow-[0_4px_0_rgba(255,0,168,0.8)]">
          {new Date(date).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' })}
        </h2>

        <div className="w-full max-w-md relative mt-24 mx-auto">
          <div
            className="absolute -top-18 left-10 text-7xl transform -rotate-12 "
            data-alt="AI bot icon"
          >
            🤖
          </div>
          <div className="speech-bubble-ai p-6">
            <p className="font-family-display text-lg text-text-main">
              {texte}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md text-center">
        <p className="font-display text-text-secondary text-lg font-medium leading-normal pb-4">
          {t('subtitle')}
        </p>
        <div className="flex justify-center items-center gap-4">
          <div className="relative group">
            <button className="text-4xl transition-transform duration-200 hover:scale-125 hover:rotate-[-15deg] active:scale-100">😌</button>
            <div className="tooltip invisible opacity-0 transition-opacity duration-300 absolute bottom-full mb-2 w-max max-w-xs bg-container-dark text-text-main text-sm rounded-lg px-3 py-2 -translate-x-1/2 left-1/2 group-hover:visible group-hover:opacity-100">{t('tooltips.ready')}</div>
          </div>
          <div className="relative group">
            <button className="text-4xl transition-transform duration-200 hover:scale-125 hover:rotate-15 active:scale-100">💀</button>
            <div className="tooltip invisible opacity-0 transition-opacity duration-300 absolute bottom-full mb-2 w-max max-w-xs bg-container-dark text-text-main text-sm rounded-lg px-3 py-2 -translate-x-1/2 left-1/2 group-hover:visible group-hover:opacity-100">{t('tooltips.resigned')}</div>
          </div>
          <div className="relative group">
            <button className="text-4xl transition-transform duration-200 hover:scale-125 hover:rotate-[-10deg] active:scale-100">🕯️</button>
            <div className="tooltip invisible opacity-0 transition-opacity duration-300 absolute bottom-full mb-2 w-max max-w-xs bg-container-dark text-text-main text-sm rounded-lg px-3 py-2 -translate-x-1/2 left-1/2 group-hover:visible group-hover:opacity-100">{t('tooltips.agenda')}</div>
          </div>
          <div className="relative group">
            <button className="text-4xl transition-transform duration-200 hover:scale-125 hover:rotate-10 active:scale-100">🤝</button>
            <div className="tooltip invisible opacity-0 transition-opacity duration-300 absolute bottom-full mb-2 w-max max-w-xs bg-container-dark text-text-main text-sm rounded-lg px-3 py-2 -translate-x-1/2 left-1/2 group-hover:visible group-hover:opacity-100">{t('tooltips.deal')}</div>
          </div>
          <div className="relative group">
            <button className="text-4xl transition-transform duration-200 hover:scale-125 hover:rotate-[-15deg] active:scale-100">😂</button>
            <div className="tooltip invisible opacity-0 transition-opacity duration-300 absolute bottom-full mb-2 w-max max-w-xs bg-container-dark text-text-main text-sm rounded-lg px-3 py-2 -translate-x-1/2 left-1/2 group-hover:visible group-hover:opacity-100">{t('tooltips.train')}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
        <Link href="/timer" className="btn-irregular cursor-pointer font-comic text-3xl bg-accent text-[#1E1E2A] px-10 py-4 tracking-wide border-primary shadow-[0_0_20px_var(--color-accent)] active:scale-95">
          {t('tickTockButton')}
        </Link>
        <Link href="/" onClick={handleRestart} className="btn-irregular cursor-pointer font-comic text-3xl bg-primary text-[#1E1E2A] px-10 py-4 tracking-wide border-accent shadow-[0_0_20px_var(--color-primary)] active:scale-95">
          {t('restartButton')}
        </Link>
      </div>
    </>
  );
}

export default BestTime;