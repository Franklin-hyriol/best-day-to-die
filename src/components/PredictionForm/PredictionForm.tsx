"use client";

import { useState } from "react";
import { Datepicker } from "flowbite-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const PredictionFormSchema = z.object({
  birthday: z
    .date({ message: "La date de naissance est requise" })
    .min(new Date(1900, 0, 1), { message: "La date de naissance est invalide" })
    .max(new Date(), { message: "La date de naissance est dans le futur" }),

  gender: z
    .enum(["male", "female"], { message: "Le genre est requis" }),
});


type IPredictionForm = z.infer<typeof PredictionFormSchema>;

const defaultValues: IPredictionForm = {
  birthday: new Date(),
  gender: "male",
};

export function PredictionForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IPredictionForm>({
    resolver: zodResolver(PredictionFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [selectedDate, setSelectedDate] = useState<Date>(defaultValues.birthday);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setValue("birthday", date, { shouldValidate: true });
  };

  const onSubmit = async (data: IPredictionForm) => {
    console.log("Form data:", data);
  };

  return (
    <form
      className="max-w-xl flex flex-col items-center gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Champ date */}
      <div className="speech-bubble p-6 border-2 border-primary/50 shadow-lg shadow-primary/20 w-full">
        <label
          htmlFor="birthday"
          className="block font-display text-text-secondary text-lg font-medium leading-normal mb-2"
        >
          When were you born? (The beginning of the end)
        </label>

        <Datepicker
          id="birthday"
          value={selectedDate}
          onChange={(date) => handleDateChange(date as Date)}
          minDate={new Date(1920, 0, 1)}
          maxDate={new Date()}
        />

        {errors.birthday && (
          <p className="text-red-500 text-sm mt-2">
            {errors.birthday.message}
          </p>
        )}
      </div>

      {/* Champ genre */}
      <div className="w-full max-w-md text-center">
        <p className="font-display text-text-secondary text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-4">
          Pick your gender:
        </p>
        <div className="flex justify-center gap-8 px-4 py-3">
          {["male", "female"].map((g) => (
            <label key={g} className="group relative cursor-pointer">
              <input
                className="peer sr-only"
                type="radio"
                value={g}
                {...register("gender")}
              />
              <div className="w-28 h-28 flex items-center justify-center rounded-2xl bg-[#2D2D3E] text-text-secondary/50 ring-4 ring-transparent peer-checked:ring-accent peer-checked:text-accent transition-all duration-300 transform group-hover:scale-105 peer-checked:scale-110">
                <span className="material-symbols-outlined text-7xl!">
                  {g === "male" ? "man" : "woman"}
                </span>
              </div>
            </label>
          ))}
        </div>

        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </div>


      <button
        type="submit"
        className="cursor-pointer font-bangers text-2xl md:text-3xl bg-primary text-[#1E1E2A] font-bold px-10 py-4 tracking-wide clip-path-custom border-4 border-accent shadow-[0_0_20px_var(--color-primary)] transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
      >
        Let's Get This Over With! 💀
      </button>
    </form>
  );
}