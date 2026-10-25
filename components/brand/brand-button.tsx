import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { cloneElement, isValidElement } from "react";

type BrandButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  children: ReactNode;
};

const sizeClasses = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-11 px-6 text-base",
  lg: "min-h-12 px-8 text-base",
};

export function BrandButton({
  variant = "solid",
  size = "md",
  asChild = false,
  className = "",
  children,
  ...props
}: BrandButtonProps) {
  const classes = [
    "inline-flex items-center justify-center border font-condensed font-semibold uppercase tracking-[0.15em] transition-colors duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
    sizeClasses[size],
    variant === "solid"
      ? "border-2 border-border-button bg-button text-on-dark hover:border-border-strong hover:bg-surface"
      : "border border-border-strong bg-transparent text-on-dark hover:bg-border-strong hover:text-base",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      className: [classes, child.props.className].filter(Boolean).join(" "),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
