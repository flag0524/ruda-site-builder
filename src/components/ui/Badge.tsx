// 태그/뱃지 컴포넌트
import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-cream-deeper px-3 py-1 text-xs font-medium text-ink-900",
        className,
      )}
    >
      {children}
    </span>
  );
}
