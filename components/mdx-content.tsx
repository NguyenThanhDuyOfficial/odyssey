import * as runtime from 'react/jsx-runtime'

const sharedComponents = {
  // Add your global components here
  wrapper: ({ children }: { children: React.ReactNode }) => (
    <article className="whitespace-pre-wrap prose prose-slate lg:prose-lg dark:prose-invert max-w-none">
      {children}
    </article>
  ),
}

// parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

interface MDXProps {
  code: string
  components?: Record<string, React.ComponentType>
}

// MDXContent component
export const MDXContent = ({ code, components }: MDXProps) => {
  const Component = useMDXComponent(code)
  return <Component components={{ ...sharedComponents, ...components }} />
}
