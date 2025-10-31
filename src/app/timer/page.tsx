import Header from "@/components/Header/Header";

function Timer() {
  return (
    <>
      <Header
        className="text-primary drop-shadow-[0_4px_0_rgba(168,255,0,0.6)]"
        title="⏳ Le grand jour approche..."
      />

      <div className="bg-red-800 border-4 border-yellow-300 rounded-3xl p-4 shadow-2xl shadow-red-900/50 max-w-xl">
        <div className="bg-black/80 rounded-xl px-4 py-6 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 border-2 border-red-900/50">
          <div className="flex items-baseline">
            <span className="font-bangers text-5xl sm:text-7xl text-red-500 text-shadow-custom">
              92
            </span>
            <span className="font-bangers text-2xl sm:text-3xl text-red-400 ml-1">
              ans,
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="font-bangers text-5xl sm:text-7xl text-red-500 text-shadow-custom">
              4
            </span>
            <span className="font-bangers text-2xl sm:text-3xl text-red-400 ml-1">
              mois,
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="font-bangers text-5xl sm:text-7xl text-red-500 text-shadow-custom">
              12
            </span>
            <span className="font-bangers text-2xl sm:text-3xl text-red-400 ml-1">
              jours,
            </span>
          </div>
          <div className="flex items-baseline mt-2">
            <span className="font-bangers text-5xl sm:text-7xl text-red-500 text-shadow-custom">
              6
            </span>
            <span className="font-bangers text-2xl sm:text-3xl text-red-400 ml-1">
              heures,
            </span>
          </div>
          <div className="flex items-baseline mt-2">
            <span className="font-bangers text-5xl sm:text-7xl text-red-500 text-shadow-custom">
              44
            </span>
            <span className="font-bangers text-2xl sm:text-3xl text-red-400 ml-1">
              minutes et
            </span>
          </div>
          <div className="flex items-baseline mt-2">
            <span className="font-bangers text-5xl sm:text-7xl text-red-500 text-shadow-custom">
              30
            </span>
            <span className="font-bangers text-2xl sm:text-3xl text-red-400 ml-1">
              secondes
            </span>
          </div>
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
            "Encore un peu de patience, l'éternité vous attend."
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
        <button className="arcade-button bg-accent border-green-800 text-background-dark shadow-lg shadow-accent/20">
          Partager le verdict
        </button>
        <button className="arcade-button bg-primary border-pink-900 text-white shadow-lg shadow-primary/20">
          Recommencer
        </button>
      </div>
    </>
  );
}

export default Timer;
