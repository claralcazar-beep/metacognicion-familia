"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, BookOpen, Users, Star } from "lucide-react";

export function Primary({ children, onClick, disabled, color = "bg-azul" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3.5 rounded-2xl font-bold text-base text-white ${color} disabled:opacity-40 active:scale-[0.99] transition`}
    >
      {children}
    </button>
  );
}

export function Pill({ icon, value, className }) {
  return (
    <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-bold ${className}`}>
      {icon}
      {value}
    </span>
  );
}

export function Stars({ n, size = 16, className = "", animate = false }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`}>
      {[1, 2, 3].map((i) => (
        <Star
          key={i}
          size={size}
          className={`${i <= n ? "fill-ambar text-ambar" : "text-linea"} ${animate && i <= n ? `anim-pop delay-${i}` : ""}`}
        />
      ))}
    </span>
  );
}

const COLORS = ["#7C4DFF", "#E4536B", "#F0A424", "#1FA36B", "#2F5BEA"];
export function Confetti({ count = 36 }) {
  const pieces = Array.from({ length: count }, (_, i) => ({
    left: (i * 37) % 100,
    delay: (i % 9) * 0.12,
    color: COLORS[i % COLORS.length],
    rot: (i * 53) % 360,
  }));
  return (
    <>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti"
          style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, background: p.color, transform: `rotate(${p.rot}deg)` }}
        />
      ))}
    </>
  );
}

export function Avatar({ emoji, size = "text-3xl", className = "" }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-full bg-cielo ${size} ${className}`}>{emoji}</span>
  );
}

export function Nav({ role }) {
  const path = usePathname();
  const items = [
    { href: "/camino", icon: <Sparkles size={20} />, label: "Camino" },
    { href: "/guia", icon: <BookOpen size={20} />, label: "Guía" },
  ];
  if (role === "parent") items.push({ href: "/panel", icon: <Users size={20} />, label: "Panel" });
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-linea pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-md mx-auto flex">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={`flex-1 py-3 flex flex-col items-center gap-1 text-xs font-semibold ${path.startsWith(it.href) ? "text-azul" : "text-gris"}`}
          >
            {it.icon}
            {it.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Loading({ text = "Cargando…" }) {
  return <div className="min-h-screen flex items-center justify-center text-gris">{text}</div>;
}
