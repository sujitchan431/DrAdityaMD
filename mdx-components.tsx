import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, id }) => (
      <h1
        id={id}
        className="mb-6 mt-12 text-3xl font-bold tracking-tight text-gray-900"
      >
        {children}
      </h1>
    ),
    h2: ({ children, id }) => (
      <h2
        id={id}
        className="mb-4 mt-10 text-2xl font-semibold text-gray-800"
      >
        {children}
      </h2>
    ),
    h3: ({ children, id }) => (
      <h3
        id={id}
        className="mb-3 mt-8 text-xl font-semibold text-gray-800"
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
    ),
    a: ({ href, children }) => {
      const isExternal = href?.startsWith("http");
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 underline decoration-primary-300 hover:decoration-primary-600"
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href ?? "#"} className="text-primary-600 underline">
          {children}
        </Link>
      );
    },
    img: ({ src, alt }) => (
      <Image
        src={src as string}
        alt={alt ?? ""}
        width={800}
        height={450}
        className="my-8 rounded-lg"
        sizes="(max-width: 768px) 100vw, 800px"
      />
    ),
    ul: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-6 text-gray-700">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-6 text-gray-700">
        {children}
      </ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary-500 pl-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
    ...components,
  };
}
