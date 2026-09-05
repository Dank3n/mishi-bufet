"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  type MouseEvent,
  type ReactNode,
  type ComponentProps,
} from "react";
import { useFx } from "@/components/fx/FxProvider";

type Props = ComponentProps<typeof Link> & {
  children: ReactNode;
};

export function TransitionLink({ href, onClick, children, ...rest }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const fx = useFx();
  const hrefStr = typeof href === "string" ? href : href.pathname || "/";

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !fx) return;
    if (!hrefStr.startsWith("/") || hrefStr === pathname) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    fx.startTransition(hrefStr, () => router.push(hrefStr));
  };

  return (
    <Link href={href} onClick={handleClick} data-magnetic {...rest}>
      {children}
    </Link>
  );
}
