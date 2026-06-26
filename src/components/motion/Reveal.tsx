// 진입 reveal — CSS 애니메이션(마운트 시 1회), reduced-motion 시 즉시 표시. 항상 최종 가시.
import { cn } from "@/lib/utils";

export function Reveal({
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
        "motion-safe:animate-[ruda-rise_0.6s_ease-out_both]",
        className,
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
