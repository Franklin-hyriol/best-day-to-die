import { cn } from "@/lib/utils";

interface HeaderProps {
    title: string
    className?: string
}

function Header({title, className}: HeaderProps) {
  return (
    <header className="text-center max-w-xl pt-10">
      <h1 className={cn("font-bangers tracking-wider text-5xl md:text-7xl text-accent drop-shadow-[0_4px_0_rgba(255,0,168,0.8)] transform -rotate-3", className)}>
        {title}
      </h1>
    </header>
  );
}

export default Header;
