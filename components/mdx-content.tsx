import Link from "next/link";
import * as runtime from "react/jsx-runtime";

const sharedComponents = {
  // Add your global components here
  wrapper: ({ children }: { children: React.ReactNode }) => (
    <article className="whitespace-pre-wrap prose prose-slate lg:prose-lg dark:prose-invert max-w-none">
      {children}
    </article>
  ),
  a: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    return (
      <Link
        href={href}
        className="text-primary/80 hover:text-primary/90 active:text-primary underline"
        {...props}
      >
        {children}
      </Link>
    );
  },
  blockquote: ({ children, ...props }: { children: React.ReactNode }) => {
    return (
      <blockquote
        className="pl-4 border-l-4 border-primary/40 text-muted-foreground italic my-1"
        {...props}
      >
        {children}
      </blockquote>
    );
  },
};

// parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

// MDXContent component
export const MDXContent = ({ code, components }: MDXProps) => {
  const Component = useMDXComponent(code);
  return <Component components={{ ...sharedComponents, ...components }} />;
};
