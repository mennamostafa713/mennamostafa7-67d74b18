import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { bodySystems } from "../data/body-systems";

export const Route = createFileRoute("/systems/")({
  head: () => ({
    meta: [
      { title: "أجهزة جسم الإنسان — موسوعة التشريح للتمريض" },
      { name: "description", content: "تصفّح جميع أجهزة جسم الإنسان: الهيكلي، العضلي، الدوري، التنفسي، الهضمي والمزيد." },
      { property: "og:title", content: "أجهزة جسم الإنسان" },
      { property: "og:description", content: "11 جهاز جسمي مع شرح مفصل لكل عضو." },
    ],
  }),
  component: SystemsList,
});

function SystemsList() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl md:text-5xl font-black mb-3">أجهزة جسم الإنسان</h1>
        <p className="text-muted-foreground mb-10">11 جهازاً متكاملاً — اختر جهازاً للاطلاع على تفاصيله</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {bodySystems.map((sys, i) => (
          <motion.div key={sys.slug}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}>
            <Link to="/systems/$slug" params={{ slug: sys.slug }}
              className="card-medical card-medical-hover p-6 block group">
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{sys.icon}</div>
                <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition" />
              </div>
              <h2 className="text-2xl font-bold mb-1">{sys.arName}</h2>
              <p className="text-xs text-primary font-bold tracking-widest mb-3 uppercase">{sys.enName}</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{sys.shortDescription}</p>
              <div className="mt-4 flex gap-2 flex-wrap text-[11px]">
                <span className="px-2 py-1 rounded-full bg-accent text-accent-foreground font-semibold">{sys.organs.length} عضو</span>
                <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground font-semibold">{sys.keyFacts.length} حقائق</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
