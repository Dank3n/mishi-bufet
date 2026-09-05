type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <p className="mb-2 sm:mb-3 text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.35em] uppercase text-mishi-red">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink">
        {title}
      </h2>
      {description && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-ink-muted font-light leading-relaxed">
          {description}
        </p>
      )}
      <div
        className={`editorial-rule mt-4 sm:mt-6 ${align === "center" ? "mx-auto max-w-xs" : "max-w-sm"}`}
      />
    </div>
  );
}
