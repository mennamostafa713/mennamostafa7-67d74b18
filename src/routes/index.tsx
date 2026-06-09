import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, BookOpen, Brain, Activity, Award, ChevronLeft, Sparkles } from "lucide-react";
import { InteractiveBody } from "../components/interactive-body";
import { bodySystems } from "../data/body-systems";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "موسوعة التشريح للتمريض — Menna Mostafa" },
      { name: "description", content: "موسوعة تشريح جسم الإنسان للتمريض باللغة العربية — رسوم تفاعلية، اختبارات، وشرح وافٍ لكل أجهزة الجسم." },
      { property: "og:title", content: "موسوعة التشريح للتمريض" },
      { property: "og:description", content: "تعلم التشريح بطريقة تفاعلية مصممة لطلاب التمريض." },
    ],
  }),
  component: Home,
});

const stats = [
  { icon: BookOpen, value: "11", label: "جهاز جسمي" },
  { icon: Activity, value: "70+", label: "عضو وعنصر" },
  { icon: Brain, value: "30+", label: "سؤال اختبار" },
  { icon: Award, value: "100%", label: "محتوى عربي" },
];

function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 md:pt-20 md:pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-primary text-xs font-semibold mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              مرجع تعليمي تفاعلي
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">
              موسوعة <span className="text-gradient">تشريح</span> جسم الإنسان<br />
              <span className="text-2xl md:text-4xl text-foreground/80">للتمريض</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-7 max-w-xl">
              منهج شامل ومبسّط لطلاب وطالبات التمريض — يعرض كل أجهزة الجسم بأسماء عربية وإنجليزية، مع رسوم تفاعلية وملاحظات تمريضية واختبارات لتثبيت المعلومات.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/systems" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-medical text-primary-foreground font-bold shadow-medical hover:opacity-95 transition">
                ابدأ التعلم <ChevronLeft className="w-4 h-4" />
              </Link>
              <Link to="/quiz" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary/30 hover:border-primary text-foreground font-bold transition">
                <Brain className="w-4 h-4" /> اختبر نفسك
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <Heart className="w-4 h-4 text-primary" fill="currentColor" />
              <span>تأليف: <strong className="text-foreground">Menna Mostafa</strong></span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <InteractiveBody />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}
              className="card-medical p-5 text-center"
            >
              <s.icon className="w-7 h-7 mx-auto text-primary mb-2" />
              <div className="text-3xl font-black text-gradient">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SYSTEMS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black mb-3">أجهزة جسم الإنسان</h2>
          <p className="text-muted-foreground">اضغط على أي جهاز لقراءة شرح مفصل</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bodySystems.map((sys, i) => (
            <motion.div
              key={sys.slug}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.06 }} viewport={{ once: true }}
            >
              <Link to="/systems/$slug" params={{ slug: sys.slug }}
                className="card-medical card-medical-hover p-6 block h-full group">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{sys.icon}</div>
                  <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition">
                    <ChevronLeft className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{sys.arName}</h3>
                <p className="text-xs text-muted-foreground font-medium tracking-widest mb-3 uppercase">{sys.enName}</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{sys.shortDescription}</p>
                <div className="mt-4 text-xs font-semibold text-primary">
                  {sys.organs.length} عضو · {sys.diseases.length} حالات مرضية
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="relative rounded-3xl overflow-hidden bg-medical p-10 md:p-14 text-primary-foreground text-center shadow-medical">
          <Brain className="w-14 h-14 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-black mb-3">جاهز تختبر معلوماتك؟</h2>
          <p className="opacity-90 max-w-xl mx-auto mb-6">اختبارات قصيرة تساعدك على تثبيت المفاهيم وتجهيزك للامتحانات النظرية والعملية.</p>
          <Link to="/quiz" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-primary font-black hover:scale-105 transition">
            ابدأ الاختبار الآن <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
