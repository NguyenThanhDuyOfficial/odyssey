import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...components,
    a: ({ href, children, ...props }) => {
      return (
        <a
          href={href}
          {...props}
          className="text-blue-600 hover:text-blue-700 active:text-blue-800 underline hover:no-underline transition-colors"
        >
          {children}
        </a>
      );
    },
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
