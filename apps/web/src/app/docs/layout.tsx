import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";

import { RootProvider } from "fumadocs-ui/provider/next";
import { ThemeProvider } from "@teispace/next-themes";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <ThemeProvider>
      <RootProvider>
        <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
          {children}
        </DocsLayout>
      </RootProvider>
    </ThemeProvider>
  );
}
