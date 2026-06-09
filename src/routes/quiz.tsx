import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Brain, Check, X, RotateCcw, Trophy, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "اختبارات التشريح — موسوعة التمريض" },
      { name: "description", content: "اختبر معلوماتك في تشريح جسم الإنسان مع أسئلة من جميع الأجهزة." },
      { property: "og:title", content: "اختبارات التشريح" },
      { property: "og:description", content: "أسئلة متعددة الخيارات لطلاب التمريض." },
    ],
  }),
  component: QuizPage,
});

interface Q { q: string; choices: string[]; answer: number; explain: string; }

const questions: Q[] = [
  { q: "كم عدد العظام في جسم الإنسان البالغ؟", choices: ["186", "206", "226", "246"], answer: 1, explain: "يحتوي جسم الإنسان البالغ على 206 عظمة." },
  { q: "أطول عظمة في الجسم هي:", choices: ["الفخذ Femur", "الساق Tibia", "العضد Humerus", "الزند Ulna"], answer: 0, explain: "عظمة الفخذ Femur هي الأطول والأقوى." },
  { q: "كم عدد حجرات القلب؟", choices: ["2", "3", "4", "5"], answer: 2, explain: "القلب يتكون من 4 حجرات: أذينان وبطينان." },
  { q: "أكبر شريان في الجسم:", choices: ["الرئوي", "السباتي", "الأبهر Aorta", "التاجي"], answer: 2, explain: "الشريان الأبهر Aorta أكبر شريان." },
  { q: "العضلة الرئيسية للتنفس:", choices: ["الحجاب الحاجز", "العضلة الصدرية", "العضلة الترقوية", "العضلة الوربية"], answer: 0, explain: "الحجاب الحاجز Diaphragm هو العضلة الرئيسية للتنفس." },
  { q: "أكبر غدة في جسم الإنسان:", choices: ["البنكرياس", "الدرقية", "الكبد", "النخامية"], answer: 2, explain: "الكبد Liver هي أكبر غدة." },
  { q: "تفرز غدة البنكرياس هرمون:", choices: ["الأدرينالين", "الأنسولين", "التيروكسين", "الميلاتونين"], answer: 1, explain: "البنكرياس يفرز الأنسولين والجلوكاجون." },
  { q: "عدد الفقرات في العمود الفقري:", choices: ["29", "31", "33", "35"], answer: 2, explain: "33 فقرة مقسمة على 5 أقسام." },
  { q: "الوحدة الوظيفية للكلية تسمى:", choices: ["الحويصلة", "النيفرون", "الكبيبة", "الحالب"], answer: 1, explain: "النيفرون Nephron هي الوحدة الوظيفية وعددها مليون لكل كلية." },
  { q: "معدل التنفس الطبيعي للبالغ:", choices: ["6-10", "12-20", "25-35", "40-60"], answer: 1, explain: "المعدل الطبيعي 12-20 نفس/دقيقة." },
  { q: "أصغر عظمة في الجسم:", choices: ["السندان", "المطرقة", "الركاب Stapes", "الزند"], answer: 2, explain: "عظمة الركاب في الأذن الوسطى." },
  { q: "الجهاز المسؤول عن الدفاع عن الجسم:", choices: ["البولي", "التنفسي", "اللمفاوي والمناعي", "الهضمي"], answer: 2, explain: "الجهاز اللمفاوي والمناعي يدافع ضد الأمراض." },
  { q: "ينتج النخاع العظمي خلايا:", choices: ["الكبد", "الدم", "العضلات", "الأعصاب"], answer: 1, explain: "نخاع العظم Bone Marrow ينتج كرات الدم." },
  { q: "هرمون النوم يفرز من:", choices: ["النخامية", "الصنوبرية", "الدرقية", "الكظرية"], answer: 1, explain: "الغدة الصنوبرية Pineal تفرز الميلاتونين." },
  { q: "ضغط الدم الطبيعي:", choices: ["100/60", "120/80", "140/90", "160/100"], answer: 1, explain: "120/80 mmHg هو الضغط الطبيعي." },
];

function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showExplain, setShowExplain] = useState(false);

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setShowExplain(true);
    if (i === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowExplain(false);
    }
  };

  const restart = () => {
    setCurrent(0); setSelected(null); setScore(0); setDone(false); setShowExplain(false);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const grade = pct >= 80 ? "ممتاز" : pct >= 60 ? "جيد جداً" : pct >= 40 ? "جيد" : "تحتاج مراجعة";
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="card-medical p-10 text-center">
          <div className="w-20 h-20 rounded-full bg-medical mx-auto flex items-center justify-center mb-5 shadow-medical">
            <Trophy className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-black mb-2">انتهى الاختبار!</h1>
          <p className="text-muted-foreground mb-6">شكراً لاختبار معلوماتك</p>
          <div className="text-7xl font-black text-gradient mb-2">{score}/{questions.length}</div>
          <div className="text-xl font-bold mb-1">{pct}%</div>
          <div className="text-primary font-bold mb-8">{grade}</div>
          <button onClick={restart} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-medical text-primary-foreground font-bold hover:opacity-95">
            <RotateCcw className="w-4 h-4" /> أعد الاختبار
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <span className="font-bold">سؤال {current + 1} / {questions.length}</span>
        </div>
        <div className="text-sm text-muted-foreground">النقاط: <span className="font-bold text-primary">{score}</span></div>
      </div>

      <div className="h-2 bg-secondary rounded-full overflow-hidden mb-8">
        <motion.div className="h-full bg-medical" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
          className="card-medical p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-6 leading-relaxed">{q.q}</h2>
          <div className="space-y-3">
            {q.choices.map((c, i) => {
              const isCorrect = i === q.answer;
              const isSelected = i === selected;
              const showResult = selected !== null;
              return (
                <button key={i} onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`w-full text-right p-4 rounded-xl border-2 font-medium transition-all flex items-center justify-between gap-3 ${
                    showResult && isCorrect ? "border-success bg-success/10 text-foreground" :
                    showResult && isSelected && !isCorrect ? "border-destructive bg-destructive/10" :
                    "border-border hover:border-primary hover:bg-accent"
                  }`}>
                  <span>{c}</span>
                  {showResult && isCorrect && <Check className="w-5 h-5 text-success" />}
                  {showResult && isSelected && !isCorrect && <X className="w-5 h-5 text-destructive" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {showExplain && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-5 overflow-hidden">
                <div className="bg-accent/50 border-r-4 border-primary p-4 rounded-lg">
                  <div className="font-bold text-primary mb-1 text-sm">💡 التفسير</div>
                  <p className="text-sm leading-relaxed">{q.explain}</p>
                </div>
                <button onClick={next} className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-medical text-primary-foreground font-bold">
                  {current + 1 >= questions.length ? "عرض النتيجة" : "السؤال التالي"} <ChevronLeft className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
