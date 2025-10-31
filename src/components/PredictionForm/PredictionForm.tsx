"use client";

import { ChangeEvent, useState } from "react";
import { Datepicker } from "flowbite-react";

export function PredictionForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [gender, setGender] = useState<string | null>(null);

  const handleDateChange = (date: Date) => {
    console.log(date.toLocaleString());
    setSelectedDate(date);
  };

  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setGender(e.target.value);
  };

  return (
    <form className="max-w-xl flex flex-col items-center gap-10">
      <div className="speech-bubble p-6 border-2 border-primary/50 shadow-lg shadow-primary/20 w-full">
        <label
          className="block font-display text-text-secondary text-lg font-medium leading-normal mb-2"
          htmlFor="birthday"
        >
          When were you born? (The beginning of the end)
        </label>

        <Datepicker
          id="birthday"
          value={selectedDate}
          onChange={(e) => handleDateChange(e as Date)}
          minDate={new Date(1920, 0, 1)}
          maxDate={new Date()}
        />
      </div>

      <div className="w-full max-w-md text-center">
        <p className="font-display text-text-secondary text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-4">
          Pick your gender:
        </p>
        <div className="flex justify-center gap-8 px-4 py-3">
          <label className="group relative cursor-pointer">
            <input
              onChange={(e) => handleGenderChange(e)}
              checked={gender === "male"}
              className="peer sr-only"
              name="avatar"
              type="radio"
              value="male"
            />
            <div className="w-28 h-28 flex items-center justify-center rounded-2xl bg-[#2D2D3E] text-text-secondary/50 ring-4 ring-transparent peer-checked:ring-accent peer-checked:text-accent transition-all duration-300 transform group-hover:scale-105 peer-checked:scale-110">
              <span className="material-symbols-outlined text-7xl!">man</span>
            </div>
          </label>

          <label className="group relative cursor-pointer">
            <input
              onChange={(e) => handleGenderChange(e)}
              checked={gender === "female"}
              className="peer sr-only"
              name="avatar"
              type="radio"
              value="female"
            />
            <div className="w-28 h-28 flex items-center justify-center rounded-2xl bg-[#2D2D3E] text-text-secondary/50 ring-4 ring-transparent peer-checked:ring-accent peer-checked:text-accent transition-all duration-300 transform group-hover:scale-105 peer-checked:scale-110">
              <span className="material-symbols-outlined text-7xl!">woman</span>
            </div>
          </label>
        </div>
      </div>

      <button className="cursor-pointer font-bangers text-2xl md:text-3xl bg-primary text-[#1E1E2A] font-bold px-10 py-4 tracking-wide clip-path-custom border-4 border-accent shadow-[0_0_20px_var(--color-primary)] transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">
        Let's Get This Over With! 💀
      </button>
    </form>
  );
}
