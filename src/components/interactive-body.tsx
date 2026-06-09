import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";

interface BodyPart {
  slug: string;
  name: string;
  enName: string;
}

const parts: BodyPart[] = [
  { slug: "nervous", name: "الدماغ", enName: "Brain" },
  { slug: "respiratory", name: "الرئتان", enName: "Lungs" },
  { slug: "cardiovascular", name: "القلب", enName: "Heart" },
  { slug: "digestive", name: "المعدة", enName: "Stomach" },
  { slug: "urinary", name: "الكليتان", enName: "Kidneys" },
  { slug: "muscular", name: "العضلات", enName: "Muscles" },
  { slug: "skeletal", name: "العظام", enName: "Bones" },
  { slug: "reproductive", name: "الحوض", enName: "Pelvis" },
];

export function InteractiveBody() {
  const [hovered, setHovered] = useState<BodyPart | null>(null);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative aspect-[1/2] bg-gradient-to-b from-card to-secondary rounded-3xl border border-border shadow-medical overflow-hidden">
        {/* Glow background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-primary blur-3xl" />
        </div>

        <svg viewBox="0 0 200 400" className="relative w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.98 0.01 20)" />
              <stop offset="100%" stopColor="oklch(0.94 0.02 20)" />
            </linearGradient>
            <radialGradient id="heartGrad">
              <stop offset="0%" stopColor="oklch(0.68 0.25 25)" />
              <stop offset="100%" stopColor="oklch(0.5 0.22 27)" />
            </radialGradient>
          </defs>

          {/* Body silhouette */}
          <path
            d="M100 18 C112 18 121 28 121 42 C121 52 118 58 115 62 L120 72 C130 74 138 80 142 92 L148 130 C150 142 148 158 144 168 L138 200 L138 250 C138 260 136 270 134 278 L130 320 C128 335 126 350 124 368 L120 390 C119 394 116 396 113 396 L107 396 C104 396 102 394 102 391 L100 372 L98 391 C98 394 96 396 93 396 L87 396 C84 396 81 394 80 390 L76 368 C74 350 72 335 70 320 L66 278 C64 270 62 260 62 250 L62 200 L56 168 C52 158 50 142 52 130 L58 92 C62 80 70 74 80 72 L85 62 C82 58 79 52 79 42 C79 28 88 18 100 18 Z"
            fill="url(#bodyGrad)"
            stroke="oklch(0.55 0.22 27 / 0.4)"
            strokeWidth="1.2"
          />

          {/* Brain */}
          <Link to="/systems/$slug" params={{ slug: "nervous" }}>
            <g onMouseEnter={() => setHovered(parts[0])} onMouseLeave={() => setHovered(null)} className="organ-path">
              <ellipse cx="100" cy="38" rx="14" ry="11" />
              <path d="M88 38 Q100 32 112 38 M88 40 Q100 46 112 40" stroke="white" strokeWidth="0.6" fill="none" opacity="0.7" />
            </g>
          </Link>

          {/* Lungs */}
          <Link to="/systems/$slug" params={{ slug: "respiratory" }}>
            <g onMouseEnter={() => setHovered(parts[1])} onMouseLeave={() => setHovered(null)} className="organ-path">
              <path d="M82 100 C70 100 65 115 67 135 C68 145 72 152 82 152 C88 152 92 145 92 135 L92 105 C92 102 88 100 82 100 Z" />
              <path d="M118 100 C130 100 135 115 133 135 C132 145 128 152 118 152 C112 152 108 145 108 135 L108 105 C108 102 112 100 118 100 Z" />
            </g>
          </Link>

          {/* Heart */}
          <Link to="/systems/$slug" params={{ slug: "cardiovascular" }}>
            <g onMouseEnter={() => setHovered(parts[2])} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }}>
              <motion.path
                d="M100 132 C96 124 84 122 84 134 C84 144 100 154 100 154 C100 154 116 144 116 134 C116 122 104 124 100 132 Z"
                fill="url(#heartGrad)"
                stroke="oklch(0.4 0.22 27)"
                strokeWidth="1"
                animate={{ scale: [1, 1.12, 1, 1.06, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "100px 138px" }}
              />
            </g>
          </Link>

          {/* Stomach */}
          <Link to="/systems/$slug" params={{ slug: "digestive" }}>
            <g onMouseEnter={() => setHovered(parts[3])} onMouseLeave={() => setHovered(null)} className="organ-path">
              <path d="M90 170 C82 172 78 180 82 192 C86 202 96 206 108 202 C116 198 118 188 114 178 C112 172 100 168 90 170 Z" />
            </g>
          </Link>

          {/* Kidneys */}
          <Link to="/systems/$slug" params={{ slug: "urinary" }}>
            <g onMouseEnter={() => setHovered(parts[4])} onMouseLeave={() => setHovered(null)} className="organ-path">
              <path d="M80 215 C74 215 71 222 73 232 C75 240 80 242 84 240 C87 238 87 230 86 224 C85 218 83 215 80 215 Z" />
              <path d="M120 215 C126 215 129 222 127 232 C125 240 120 242 116 240 C113 238 113 230 114 224 C115 218 117 215 120 215 Z" />
            </g>
          </Link>

          {/* Muscles indicator (arms) */}
          <Link to="/systems/$slug" params={{ slug: "muscular" }}>
            <g onMouseEnter={() => setHovered(parts[5])} onMouseLeave={() => setHovered(null)} className="organ-path">
              <ellipse cx="56" cy="115" rx="6" ry="14" />
              <ellipse cx="144" cy="115" rx="6" ry="14" />
            </g>
          </Link>

          {/* Skeletal (ribs hint) */}
          <Link to="/systems/$slug" params={{ slug: "skeletal" }}>
            <g onMouseEnter={() => setHovered(parts[6])} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }}>
              <path d="M76 92 L124 92 M74 102 L126 102 M73 112 L127 112 M74 122 L126 122 M76 132 L124 132"
                stroke="oklch(0.55 0.22 27 / 0.35)" strokeWidth="1.2" fill="none" />
            </g>
          </Link>

          {/* Pelvis */}
          <Link to="/systems/$slug" params={{ slug: "reproductive" }}>
            <g onMouseEnter={() => setHovered(parts[7])} onMouseLeave={() => setHovered(null)} className="organ-path">
              <path d="M78 258 C78 270 88 278 100 278 C112 278 122 270 122 258 C122 252 115 250 100 250 C85 250 78 252 78 258 Z" />
            </g>
          </Link>
        </svg>

        {/* Pulse rings around heart */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ top: "33%", left: "50%", transform: "translate(-50%, -50%)" }}
          animate={{ scale: [0.5, 2], opacity: [0.6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        >
          <div className="w-16 h-16 rounded-full border-2 border-primary" />
        </motion.div>
      </div>

      {/* Tooltip */}
      <motion.div
        className="absolute top-4 left-4 right-4 mx-auto max-w-xs"
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -10 }}
        transition={{ duration: 0.2 }}
      >
        {hovered && (
          <div className="card-medical px-4 py-2 text-center backdrop-blur-md">
            <div className="font-bold text-primary">{hovered.name}</div>
            <div className="text-xs text-muted-foreground tracking-wide">{hovered.enName}</div>
          </div>
        )}
      </motion.div>

      <p className="text-center text-sm text-muted-foreground mt-4">
        ✨ مرّر فوق الأعضاء واضغط للاستكشاف
      </p>
    </div>
  );
}
