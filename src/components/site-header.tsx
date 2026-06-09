import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { to: "/", label: "الرئيسية" },
  { to: "/systems", label: "أجهزة الجسم" },
  { to: "/quiz", label: "الاختبارات" },
  { to: "/about", label: "عن المؤلفة" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: s => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 rounded-xl bg-medical flex items-center justify-center shadow-soft">
            <Heart className="w-5 h-5 text-primary-foreground animate-pulse-heart" fill="currentColor" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-base">موسوعة التشريح</div>
            <div className="text-[10px] text-muted-foreground tracking-wider">NURSING ANATOMY</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => {
            const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  active ? "bg-primary text-primary-foreground shadow-soft" : "hover:bg-accent text-foreground/80 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-accent" aria-label="القائمة">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navItems.map(item => (
                <Link key={item.to} to={item.to} onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent">
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
