"use client";

import { useState } from "react";
import { Datepicker } from "flowbite-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePredictionStore } from "@/store/predictionStore"; // Corrected import
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useRouter } from "@/i18n/navigation";

// Define the type separately
type IPredictionForm = z.infer<ReturnType<typeof getPredictionFormSchema>>;

// Function to get schema, to infer type outside component
const getPredictionFormSchema = (t: (key: string) => string) =>
  z.object({
    birthday: z
      .date({ message: t("birthday_required") })
      .min(new Date(1900, 0, 1), { message: t("birthday_invalid") })
      .max(new Date(), { message: t("birthday_future") }),
    gender: z.enum(["male", "female"], { message: t("gender_required") }),
  });

export function PredictionForm({ locale }: { locale: string }) {
  const t = useTranslations("PredictionForm");
  const tZod = useTranslations("ZodErrors");

  // Get the schema inside the component
  const PredictionFormSchema = getPredictionFormSchema(tZod);

  const defaultValues: IPredictionForm = {
    birthday: new Date(),
    gender: "male",
  };

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

  const [selectedDate, setSelectedDate] = useState<Date>(
    defaultValues.birthday
  );
  const [isLoading, setIsLoading] = useState(false);
  const setPrediction = usePredictionStore((state) => state.setPrediction);
  const router = useRouter();

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    setSelectedDate(date);
    setValue("birthday", date, { shouldValidate: true });
  };

  const onSubmit = async (data: IPredictionForm) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          birthday: data.birthday.toISOString().split("T")[0],
          gender: data.gender,
          locale: locale,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setPrediction(result.date, result.texte);
      router.push("/besttime", { locale: locale });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="max-w-xl flex flex-col items-center gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="speech-bubble p-6 border-2 border-primary/50 shadow-lg shadow-primary/20 w-full">
        <label
          htmlFor="birthday"
          className="block font-display text-text-secondary text-lg font-medium leading-normal mb-2"
        >
          {t("dateLabel")}
        </label>
        <Datepicker
          id="birthday"
          value={selectedDate}
          onChange={handleDateChange}
          minDate={new Date(1900, 0, 1)}
          maxDate={new Date()}
        />
        {errors.birthday && (
          <p className="text-red-500 text-sm mt-2">{errors.birthday.message}</p>
        )}
      </div>

      <div className="w-full max-w-md text-center">
        <p className="font-display text-text-secondary text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-4">
          {t("genderLabel")}
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
        className={cn(
          "cursor-pointer font-bangers text-2xl md:text-3xl bg-primary text-[#1E1E2A] font-bold px-10 py-4 tracking-wide clip-path-custom border-4 border-accent shadow-[0_0_20px_var(--color-primary)] transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95",
          { disabled: isLoading }
        )}
      >
        {isLoading ? (
          <>
            <span className="crystal-ball-loader"></span>
            {t("loadingButton")}
          </>
        ) : (
          t("submitButton")
        )}
      </button>
    </form>
  );
}
