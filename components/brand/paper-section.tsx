import type { HTMLAttributes } from "react";

export function PaperSection({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={`paper-texture text-on-paper ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
