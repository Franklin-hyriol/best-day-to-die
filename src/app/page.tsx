import { PredictionForm } from "@/components/PredictionForm/PredictionForm";

export default function Home() {
  return (
    <>
      <div className="max-w-xl py-10 m-auto">
        <header className="text-center">
          <h1 className="font-bangers tracking-wider text-5xl md:text-7xl text-accent drop-shadow-[0_4px_0_rgba(255,0,168,0.8)]">
            Découvre ton meilleur jour pour mourir 💀
          </h1>
        </header>
      </div>
      <PredictionForm />
    </>
  );
}
