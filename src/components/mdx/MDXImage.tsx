import Image from "next/image";

export function MDXImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={450}
      className="my-8 rounded-lg"
      sizes="(max-width: 768px) 100vw, 800px"
    />
  );
}
