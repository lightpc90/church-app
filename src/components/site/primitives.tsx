import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)} {...props} />;
}

const sectionTones = {
  ivory: "bg-ivory text-ink",
  sand: "bg-sand text-ink",
  white: "bg-white text-ink",
  ink: "bg-ink text-white",
} as const;

export function Section({
  tone = "ivory",
  className,
  children,
  ...props
}: ComponentProps<"section"> & { tone?: keyof typeof sectionTones }) {
  return (
    <section className={cn("py-20 sm:py-28", sectionTones[tone], className)} {...props}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
  className,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center [&_.eyebrow]:justify-center",
        className
      )}
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Heading
        className={cn(
          "font-display text-4xl leading-[1.08] font-medium tracking-tight sm:text-5xl",
          invert ? "text-white" : "text-ink"
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className={cn("mt-5 text-lg leading-relaxed", invert ? "text-white/70" : "text-stone")}>
          {description}
        </p>
      )}
    </div>
  );
}

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-ink text-white hover:bg-ink-soft shadow-soft hover:-translate-y-0.5",
        gold: "bg-gold text-ink hover:bg-[#d6a54d] shadow-soft hover:-translate-y-0.5",
        outline: "border border-ink/15 bg-white/60 text-ink hover:border-ink/40 hover:bg-white",
        light: "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
        ghost: "text-ink hover:bg-ink/5",
        link: "rounded-none px-0 text-royal underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & ButtonVariantProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & ButtonVariantProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8", className)}
      {...props}
    />
  );
}

/** Rounded icon tile used on feature cards. */
export function IconBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold-soft text-ink [&_svg]:size-6",
        className
      )}
      aria-hidden
    >
      {children}
    </span>
  );
}
