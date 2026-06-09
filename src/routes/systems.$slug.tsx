import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronRight, AlertCircle, Stethoscope, BookOpen, Activity } from "lucide-react";
import { getSystem, bodySystems } from "../data/body-systems";

export const Route = createFileRoute("/systems/$slug")({
  loader: ({ params }) => {
    const sys = getSystem(params.slug);
    if (!sys) throw notFound();
    return { sys };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.sys.arName} — موسوعة التشريح للتمريض` },
      { name: "description", content: loaderData.sys.shortDescription },
      { property: "og:title", content: loaderData.sys.arName },
      { property: "og:description", content: loaderData.sys.shortDescription },
    ] : [],
  }),
  component: SystemDetail,
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <h1 className="text-3xl font-bold mb-3">الجهاز غير موجود</h1>
      <Link to="/systems" className="text-primary hover:underline">العودة لقائمة الأجهزة</Link>
    </div>
  ),
});

function SystemDetail() {
  const { sys } = Route.useLoaderData();
  const idx = bodySystems.findIndex(s => s.slug === sys.slug);
  const next = bodySystems[(idx + 1) % bodySystems.length];
  const prev = bodySystems[(idx - 1 + bodySystems.length) % bodySystems.length];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary">الرئيسية</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/systems" className="hover:text-primary">الأجهزة</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-semibold">{sys.arName}</span>
      </div>

      {/* Hero */}
      <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="card-medical p-8 md:p-10 mb-8 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 text-9xl opacity-10 select-none">{sys.icon}</div>
        <div className="relative">
          <div className="text-6xl mb-4">{sys.icon}</div>
          <h1 className="text-4xl md:text-5xl font-black mb-2">{sys.arName}</h1>
          <p className="text-sm tracking-[0.3em] text-primary font-bold uppercase mb-5">{sys.enName}</p>
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
            {sys.longDescription}
          </p>
        </div>
      </motion.header>

      {/* Key Facts */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" /> حقائق سريعة
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {sys.keyFacts.map((fact, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }} viewport={{ once: true }}
              className="card-medical p-4 text-sm leading-relaxed">
              <div className="w-7 h-7 rounded-full bg-medical text-primary-foreground flex items-center justify-center text-xs font-black mb-2">{i + 1}</div>
              {fact}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Organs */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" /> الأعضاء الرئيسية
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {sys.organs.map((organ, i) => (
            <motion.article key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }} viewport={{ once: true }}
              className="card-medical card-medical-hover p-6">
              <div className="flex items-baseline justify-between gap-3 mb-3 flex-wrap">
                <h3 className="text-xl font-bold">{organ.ar}</h3>
                <span className="text-xs font-bold tracking-widest text-primary uppercase">{organ.en}</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-4">{organ.description}</p>
              <div className="mb-3">
                <div className="text-xs font-bold text-muted-foreground mb-2">الوظائف:</div>
                <ul className="space-y-1.5">
                  {organ.functions.map((fn, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {fn}
                    </li>
                  ))}
                </ul>
              </div>
              {organ.nursingNotes && organ.nursingNotes.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border bg-accent/30 -mx-6 -mb-6 px-6 pb-6 rounded-b-xl">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-primary mb-2">
                    <Stethoscope className="w-3.5 h-3.5" /> ملاحظات تمريضية
                  </div>
                  <ul className="space-y-1 text-xs text-foreground/80">
                    {organ.nursingNotes.map((n, k) => <li key={k}>• {n}</li>)}
                  </ul>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </section>

      {/* Diseases */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-primary" /> الحالات المرضية الشائعة
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sys.diseases.map((d, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }} viewport={{ once: true }}
              className="card-medical p-5 border-r-4 border-r-primary">
              <h4 className="font-bold mb-1">{d.ar}</h4>
              <p className="text-xs text-primary font-semibold tracking-wider uppercase mb-2">{d.en}</p>
              <p className="text-sm text-foreground/75 leading-relaxed">{d.note}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Nursing care */}
      <section className="mb-10">
        <div className="card-medical p-8 bg-gradient-to-br from-card to-accent/30">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-primary" /> الرعاية التمريضية
          </h2>
          <ol className="space-y-3">
            {sys.nursingCare.map((care, i) => (
              <motion.li key={i}
                initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }} viewport={{ once: true }}
                className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-medical text-primary-foreground flex items-center justify-center text-sm font-black flex-shrink-0">{i + 1}</span>
                <span className="text-sm md:text-base leading-relaxed pt-0.5">{care}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Navigation */}
      <nav className="grid sm:grid-cols-2 gap-4 mt-12">
        <Link to="/systems/$slug" params={{ slug: prev.slug }}
          className="card-medical card-medical-hover p-5 flex items-center gap-3">
          <ChevronRight className="w-5 h-5 text-primary" />
          <div className="flex-1">
            <div className="text-xs text-muted-foreground">السابق</div>
            <div className="font-bold">{prev.arName}</div>
          </div>
          <div className="text-3xl">{prev.icon}</div>
        </Link>
        <Link to="/systems/$slug" params={{ slug: next.slug }}
          className="card-medical card-medical-hover p-5 flex items-center gap-3 text-right">
          <div className="text-3xl">{next.icon}</div>
          <div className="flex-1">
            <div className="text-xs text-muted-foreground">التالي</div>
            <div className="font-bold">{next.arName}</div>
          </div>
          <ChevronRight className="w-5 h-5 text-primary rotate-180" />
        </Link>
      </nav>
    </div>
  );
}
