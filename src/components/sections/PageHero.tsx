// 서브페이지 상단 배너 (크림/에디토리얼 톤)
export function PageHero({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <section className="border-b border-hairline-soft bg-cream-soft pb-16 pt-20 md:pt-24">
      <div className="container-fixed">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
          {eyebrow}
        </p>
        <h1 className="font-display mt-4 text-4xl font-normal tracking-tight text-ink-900 md:text-6xl">
          {title}
        </h1>
        {desc && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate">
            {desc}
          </p>
        )}
      </div>
    </section>
  );
}
