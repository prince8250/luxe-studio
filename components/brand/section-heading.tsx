import type { HTMLAttributes } from "react";

type SectionHeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  eyebrow?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  as: Heading = "h2",
  className = "",
  children,
  ...props
}: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="font-condensed text-sm uppercase tracking-[0.2em] text-muted-dark">
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={`font-sans text-3xl font-extrabold uppercase leading-tight tracking-[0.04em] text-inherit sm:text-4xl ${className}`}
        {...props}
      >
        {children}
      </Heading>
    </div>
  );
}
