import React from "react";

function Footer() {
  return (
    <footer className="w-full max-w-md">
      <div className="relative">
        <div
          className="absolute -top-6 -left-10 text-5xl transform -rotate-12"
          data-alt="AI bot icon"
        >
          🤖
        </div>
        <div className="bg-container-dark/70 border-2 border-dashed border-accent/50 rounded-full p-4 min-h-[72px]">
          <p className="text-text-secondary italic text-center">
            "Don't rush, I have all of eternity."
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
