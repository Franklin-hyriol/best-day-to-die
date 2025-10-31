import Header from "@/components/Header/Header";

function BestTime() {
  return (
    <>
      <Header title="Ton meilleur jour pour mourir !" />

      <div className="max-w-xl text-center">
        <h2 className="text-9xl md:text-7xl font-bold drop-shadow-[0_4px_0_rgba(255,0,168,0.8)]">
          13 Juin 2077
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
              "Ah, 2077. Un choix classique. Tu trébucheras probablement sur un
              robot de nettoyage rebelle. Ce n'est pas glorieux, mais c'est
              efficace. Au moins, tu manqueras la singularité... d'une semaine.
              Mes condoléances."
            </p>
          </div>
        </div>
      </div>

      {/* reaction */}
      <div className="w-full max-w-md text-center">
        <p className="font-display text-text-secondary text-lg font-medium leading-normal pb-4">
          Relax, Humour Noir:
        </p>
        <div className="flex justify-center items-center gap-4">
          <div className="relative group">
            <button className="text-4xl transition-transform duration-200 hover:scale-125 hover:rotate-[-15deg] active:scale-100">
              😌
            </button>
            <div className="tooltip invisible opacity-0 transition-opacity duration-300 absolute bottom-full mb-2 w-max max-w-xs bg-container-dark text-text-main text-sm rounded-lg px-3 py-2 -translate-x-1/2 left-1/2">
              Genre, on est prêts pour ça ?
            </div>
          </div>
          <div className="relative group">
            <button className="text-4xl transition-transform duration-200 hover:scale-125 hover:rotate-15 active:scale-100">
              💀
            </button>
            <div className="tooltip invisible opacity-0 transition-opacity duration-300 absolute bottom-full mb-2 w-max max-w-xs bg-container-dark text-text-main text-sm rounded-lg px-3 py-2 -translate-x-1/2 left-1/2">
              C'est ça, la résignation est belle.
            </div>
          </div>
          <div className="relative group">
            <button className="text-4xl transition-transform duration-200 hover:scale-125 hover:rotate-[-10deg] active:scale-100">
              🕯️
            </button>
            <div className="tooltip invisible opacity-0 transition-opacity duration-300 absolute bottom-full mb-2 w-max max-w-xs bg-container-dark text-text-main text-sm rounded-lg px-3 py-2 -translate-x-1/2 left-1/2">
              Double-check ton agenda, on ne voudrait pas d'un conflit.
            </div>
          </div>
          <div className="relative group">
            <button className="text-4xl transition-transform duration-200 hover:scale-125 hover:rotate-10 active:scale-100">
              🤝
            </button>
            <div className="tooltip invisible opacity-0 transition-opacity duration-300 absolute bottom-full mb-2 w-max max-w-xs bg-container-dark text-text-main text-sm rounded-lg px-3 py-2 -translate-x-1/2 left-1/2">
              L'encre est sèche, pas de retour possible !
            </div>
          </div>
          <div className="relative group">
            <button className="text-4xl transition-transform duration-200 hover:scale-125 hover:rotate-[-15deg] active:scale-100">
              😂
            </button>
            <div className="tooltip invisible opacity-0 transition-opacity duration-300 absolute bottom-full mb-2 w-max max-w-xs bg-container-dark text-text-main text-sm rounded-lg px-3 py-2 -translate-x-1/2 left-1/2">
              Le train est en marche, champion.
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
        <button className="btn-irregular cursor-pointer font-comic text-3xl bg-accent text-[#1E1E2A] px-10 py-4 tracking-wide border-primary shadow-[0_0_20px_var(--color-accent)] active:scale-95">
          Tick-Tock!
        </button>
        <button className="btn-irregular cursor-pointer font-comic text-3xl bg-primary text-[#1E1E2A] px-10 py-4 tracking-wide border-accent shadow-[0_0_20px_var(--color-primary)] active:scale-95">
          Recommencer!
        </button>
      </div>
    </>
  );
}

export default BestTime;
