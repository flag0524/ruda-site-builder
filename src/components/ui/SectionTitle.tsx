// 섹션 공통 헤더 (eyebrow / title / desc)
import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  desc,
  align = "center",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  align?: "center" | "left";
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center mx-auto max-w-3xl" : "text-left",
      )}
    >
      {eyebrow && (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-normal tracking-tight md:text-4xl lg:text-5xl",
          invert ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {desc && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            invert ? "text-white/70" : "text-ink-500",
          )}
        >
          {desc}
        </p>
      )}
    </div>
  );
}
