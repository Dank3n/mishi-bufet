"use client";

import Image, { type ImageProps } from "next/image";

/** Site photos — higher encode quality to avoid soft WhatsApp→WebP recompression. */
export function PhotoImage({
  quality = 90,
  ...props
}: ImageProps) {
  return <Image quality={quality} {...props} />;
}
