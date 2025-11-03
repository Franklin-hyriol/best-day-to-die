"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { usePredictionStore } from "@/store/predictionStore";
import Header from "@/components/Header/Header";
import { useTranslations } from "next-intl";

interface TimeLeft {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft: TimeLeft = {};

  if (difference > 0) {
    timeLeft = {
      years: Math.floor(difference / (1000 * 60 * 60 * 24 * 365)),
      months: Math.floor((difference / (1000 * 60 * 60 * 24 * 30.44)) % 12),
      days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 30.44),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
}

function Timer() {
  const t = useTranslations('TimerPage');
  const tError = useTranslations('Error');
  const { date, clearPrediction } = usePredictionStore();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!date) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  const handleRestart = () => {
    clearPrediction();
  };

  const unitLabels: { [key: string]: { singular: string; plural: string } } = {
    years: { singular: 'an', plural: 'ans' },
    months: { singular: 'mois', plural: 'mois' },
    days: { singular: 'jour', plural: 'jours' },
    hours: { singular: 'heure', plural: 'heures' },
    minutes: { singular: 'minute', plural: 'minutes' },
    seconds: { singular: 'seconde', plural: 'secondes' },
  };

  if (!isClient) {
    return null;
  }

  if (!date) {
    return (
      <div className="text-center">
        <p className="text-2xl mb-4">{tError('noDate')}</p>
        <Link href="/" className="text-accent hover:underline">
          {tError('startOver')}
        </Link>
      </div>
    );
  }

  const timeEntries = Object.entries(timeLeft).filter(([, value]) => value !== undefined && value >= 0);

  return (
    <>
      <Header
        className="text-primary drop-shadow-[0_4px_0_rgba(168,255,0,0.6)]"
        title={t('title')}
      />

      <div className="bg-red-800 border-4 border-yellow-300 rounded-3xl p-4 shadow-2xl shadow-red-900/50 max-w-lg">
        <div className="bg-black/80 rounded-xl px-4 py-6 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 border-2 border-red-900/50">
          {timeEntries.map(([unit, value], index) => {
            const label = value! > 1 ? unitLabels[unit].plural : unitLabels[unit].singular;
            const isLast = index === timeEntries.length - 1;
            const isSecondToLast = index === timeEntries.length - 2;

            return (
              <div className="flex items-baseline mt-2" key={unit}>
                <span className="font-bangers text-5xl sm:text-7xl text-red-500 text-shadow-custom">
                  {value}
                </span>
                <span className="font-bangers text-2xl sm:text-3xl text-red-400 ml-1">
                  {label}{isSecondToLast ? ' et' : isLast ? '' : ','}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative w-full max-w-sm text-center">
        <span
          aria-hidden="true"
          className="absolute -bottom-8 -left-4 text-7xl transform -rotate-12"
        >
          😈
        </span>
        <div className="thought-bubble">
          <p className="text-text-secondary italic text-lg">
            {t('thoughtBubble')}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
        <button className="arcade-button bg-accent border-green-800 text-background-dark shadow-lg shadow-accent/20">
          {t('shareButton')}
        </button>
        <Link href="/" onClick={handleRestart} className="arcade-button bg-primary border-pink-900 text-white shadow-lg shadow-primary/20">
          {t('restartButton')}
        </Link>
      </div>
    </>
  );
}

export default Timer;