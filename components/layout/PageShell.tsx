import type { ReactNode } from "react";
import { Nav } from "@/components/layout/Nav";

type PageShellProps = {
  children: ReactNode;
  footer: ReactNode;
  mainClassName?: string;
  activeSection?: string;
  navBase?: string;
};

/** The frame shared by every page: skip link, navigation, main content and footer. */
export function PageShell({ children, footer, mainClassName, activeSection, navBase }: PageShellProps) {
  return (
    <div className="site">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav active={activeSection} base={navBase} />
      <main id="main" className={mainClassName}>
        {children}
      </main>
      {footer}
    </div>
  );
}
