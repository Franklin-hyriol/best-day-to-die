import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PredictionState {
  date: string | null;
  texte: string | null;
  setPrediction: (date: string, texte: string) => void;
  clearPrediction: () => void;
}

export const usePredictionStore = create<PredictionState>()(
  persist(
    (set) => ({
      date: null,
      texte: null,
      setPrediction: (date, texte) => set({ date, texte }),
      clearPrediction: () => set({ date: null, texte: null }),
    }),
    {
      name: 'prediction-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
