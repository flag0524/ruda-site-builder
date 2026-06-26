// 마운트 진입 페이드 — CSS 애니메이션, reduced-motion 시 즉시 표시. 항상 최종 가시.
import { cn } from "@/lib/utils";

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "motion-safe:animate-[ruda-rise_0.7s_ease-out_both]",
        className,
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
