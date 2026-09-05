"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  type MouseEvent,
  type ReactNode,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
} from "react";
import { useFx } from "@/components/fx/FxProvider";

type Variant = "primary" | "ghost" | "outline";

type Common = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type AsLink = Common & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

type AsButton = Common & {
  href?: undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variants: Record<Variant, string> = {
  primary:
    "bg-mishi-red text-white red-glow hover:red-glow-strong hover:brightness-110",
  ghost:
    "bg-transparent text-ink border border-line hover:border-mishi-red/50 hover:text-mishi-red",
  outline:
    "bg-transparent text-ink border border-mishi-red/40 hover:bg-mishi-red/10 hover:border-mishi-red red-glow",
};

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm tracking-[0.12em] uppercase transition-all duration-300 font-medium";

export function Button(props: AsLink | AsButton) {
  const { children, variant = "primary", className = "", ...rest } = props;
  const classes = `${base} ${variants[variant]} ${className}`;
  const pathname = usePathname();
  const router = useRouter();
  const fx = useFx();

  if ("href" in props && props.href) {
    const { href, onClick, ...linkRest } = rest as AsLink;
    const isInternal = href.startsWith("/");

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented || !isInternal || !fx) return;
      if (href === pathname) return;
      e.preventDefault();
      fx.startTransition(href, () => router.push(href));
    };

    return (
      <Link
        href={href}
        className={classes}
        data-magnetic
        onClick={handleClick}
        {...linkRest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} data-magnetic {...(rest as AsButton)}>
      {children}
    </button>
  );
}
