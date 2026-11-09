import Image from "next/image";
import type { ComponentProps } from "react";
import type { Shot } from "@/types";

type ContentImageProps = Omit<ComponentProps<typeof Image>, "src" | "alt" | "width" | "height"> & {
  image: Shot;
};

/** Renders an image entry from the data files. Other props pass through to next/image. */
export function ContentImage({ image, ...imageProps }: ContentImageProps) {
  const { src, alt, width, height } = image;

  return <Image src={src} alt={alt} width={width} height={height} {...imageProps} />;
}
