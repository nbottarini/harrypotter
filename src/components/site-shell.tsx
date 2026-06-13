import Link from "next/link";
import { BookOpen, Castle, Home, ScrollText, Sparkles, Wand2 } from "lucide-react";

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/personajes", label: "Personajes", icon: BookOpen },
  { href: "/hechizos", label: "Hechizos", icon: Sparkles },
  { href: "/criaturas", label: "Criaturas", icon: ScrollText },
  { href: "/trivia", label: "Trivia", icon: Wand2 },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070707] text-zinc-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(137,31,35,0.18),transparent_34%),radial-gradient(circle_at_85%_12%,rgba(34,89,73,0.17),transparent_30%),linear-gradient(180deg,#09090b_0%,#070707_48%,#0b0a08_100%)]" />
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070707]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded border border-[#caa44d]/50 bg-[#15110a] text-lg font-black text-[#f1c96b]">
              HP
            </span>
            <div>
              <p className="text-lg font-black leading-none text-white">Potterpedia</p>
              <p className="mt-1 text-xs uppercase text-[#caa44d]">Archivo magico</p>
            </div>
          </Link>
          <nav className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded border border-white/10 bg-white/[0.04] px-3 text-sm font-semibold text-zinc-200 transition hover:border-[#caa44d]/60 hover:bg-[#caa44d]/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-white/10 bg-black/25">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-zinc-500 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-zinc-300">
            <Castle className="h-4 w-4 text-[#caa44d]" aria-hidden />
            Potterpedia
          </div>
          <p>Proyecto fan no oficial. Datos base curados desde HP-API, Potter DB y referencias wiki.</p>
        </div>
      </footer>
    </div>
  );
}
