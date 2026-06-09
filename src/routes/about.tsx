import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, BookOpen, GraduationCap, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن المؤلفة — Menna Mostafa" },
      { name: "description", content: "تعرّف على Menna Mostafa، مؤلفة موسوعة التشريح للتمريض." },
      { property: "og:title", content: "عن المؤلفة Menna Mostafa" },
      { property: "og:description", content: "تأليف وإعداد منى مصطفى — موسوعة تشريح التمريض." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12">
        <div className="w-28 h-28 mx-auto rounded-full bg-medical flex items-center justify-center shadow-medical mb-5">
          <span className="text-5xl font-black text-primary-foreground">M</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-2">Menna Mostafa</h1>
        <p className="text-primary font-bold tracking-widest">مؤلفة موسوعة التشريح للتمريض</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="card-medical p-8 md:p-10 mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Heart className="w-6 h-6 text-primary" fill="currentColor" /> الرؤية
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-foreground/85">
          هذه الموسوعة جهد شخصي من <strong>منى مصطفى</strong> لتوفير محتوى عربي عالي الجودة لطلاب وطالبات التمريض في الوطن العربي. الهدف هو تبسيط علم التشريح وربطه بالممارسة التمريضية اليومية، مع الحفاظ على الدقة العلمية وإدراج المصطلحات الإنجليزية الضرورية للممارسة المهنية.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: BookOpen, t: "محتوى شامل", d: "11 جهاز جسمي بشرح مفصل" },
          { icon: GraduationCap, t: "موجه للتمريض", d: "ملاحظات تمريضية لكل عضو" },
          { icon: Award, t: "محتوى أصيل", d: "بأسلوب عربي مبسّط ودقيق" },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="card-medical p-6 text-center">
            <item.icon className="w-8 h-8 mx-auto text-primary mb-3" />
            <h3 className="font-bold mb-1">{item.t}</h3>
            <p className="text-sm text-muted-foreground">{item.d}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="card-medical p-8 md:p-10 bg-gradient-to-br from-card to-accent/30">
        <h2 className="text-2xl font-bold mb-4">رسالة من المؤلفة</h2>
        <blockquote className="text-base md:text-lg leading-relaxed text-foreground/85 border-r-4 border-primary pr-5 italic">
          "آمل أن تكون هذه الموسوعة بوابة لكل طالب وطالبة تمريض، تساعدهم على فهم جسم الإنسان بعمق وحُب،
          فالتمريض رسالة سامية تستحق أفضل المراجع وأوضحها."
        </blockquote>
        <p className="mt-5 text-left font-bold text-primary">— Menna Mostafa</p>
      </motion.div>
    </div>
  );
}
