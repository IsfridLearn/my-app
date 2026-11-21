import type { ReactNode } from "react";
import { Nav } from "@/components/layout/Nav";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

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
      <SmoothScroll />
      <Nav active={activeSection} base={navBase} />
      <main id="main" className={mainClassName}>
        {children}
      </main>
      {footer}
    </div>
  );
}
