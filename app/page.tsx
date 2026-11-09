import { ArchiveFooter } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { About } from "@/components/sections/About";
import { BeyondTheScreen } from "@/components/sections/BeyondTheScreen";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Stack } from "@/components/sections/Stack";
import { hasContact } from "@/data/contact";

export default function HomePage() {
  return (
    <PageShell footer={<ArchiveFooter />}>
      <Hero />
      <SelectedWork />
      <Stack />
      <Experience />
      <BeyondTheScreen />
      <About />
      {hasContact && <Contact />}
    </PageShell>
  );
}
