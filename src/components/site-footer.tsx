import { Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-medical flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="font-bold">موسوعة التشريح للتمريض</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            مرجع تعليمي شامل لطلاب وطالبات التمريض باللغة العربية مع المصطلحات الإنجليزية الدقيقة.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/systems" className="hover:text-primary">أجهزة الجسم</Link></li>
            <li><Link to="/quiz" className="hover:text-primary">الاختبارات</Link></li>
            <li><Link to="/about" className="hover:text-primary">عن المؤلفة</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">المؤلفة</h4>
          <p className="text-sm text-muted-foreground">
            تأليف وإعداد: <span className="font-semibold text-foreground">Menna Mostafa</span>
          </p>
          <p className="text-xs text-muted-foreground mt-3">© {new Date().getFullYear()} جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
