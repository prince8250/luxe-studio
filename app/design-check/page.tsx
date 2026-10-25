import {
  BrandButton,
  Container,
  PaperSection,
  ScrollReveal,
  SectionHeading,
} from "@/components/brand";

const swatches = [
  ["Base", "bg-base"],
  ["Surface", "bg-surface"],
  ["Bar", "bg-bar"],
  ["Button", "bg-button"],
  ["Paper", "bg-paper"],
  ["Muted", "bg-muted-dark"],
];

export default function DesignCheckPage() {
  return (
    <main className="min-h-screen bg-base py-12 text-on-dark sm:py-20">
      <Container className="space-y-16">
        <ScrollReveal className="space-y-8">
          <div className="space-y-4">
            <p className="font-condensed text-sm uppercase tracking-[0.2em] text-muted-dark">
              Design check
            </p>
            <h1 className="font-display text-4xl uppercase tracking-[0.06em] sm:text-6xl">
              Bestman Luxe Studio
            </h1>
            <p className="max-w-xl text-base leading-7 text-muted-dark">
              Temporary visual review for the theme, typography, and shared brand
              components.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <BrandButton>Book now</BrandButton>
            <BrandButton variant="outline">See more</BrandButton>
            <BrandButton size="sm">Small action</BrandButton>
          </div>
        </ScrollReveal>

        <ScrollReveal className="space-y-8">
          <SectionHeading eyebrow="Typography">Section heading</SectionHeading>
          <div className="grid gap-5 border border-line bg-surface p-6 sm:grid-cols-3">
            <div>
              <p className="font-display text-3xl">Noto Serif</p>
              <p className="mt-2 text-muted-dark">Display serif, bold 700</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold uppercase">Open Sans</p>
              <p className="mt-2 text-muted-dark">Headings and body</p>
            </div>
            <div>
              <p className="font-condensed text-2xl uppercase tracking-[0.15em]">
                Oswald
              </p>
              <p className="mt-2 text-muted-dark">Buttons and labels</p>
            </div>
          </div>
        </ScrollReveal>

        <PaperSection className="space-y-6 border border-line p-6 sm:p-10">
          <ScrollReveal>
            <SectionHeading eyebrow="Paper surface">
              Quiet, tactile, and light
            </SectionHeading>
            <p className="mt-5 max-w-2xl leading-7 text-muted-paper">
              The paper section uses a restrained speckle texture made entirely
              with CSS, keeping the light surface fast and easy to reuse.
            </p>
            <div className="mt-6">
              <BrandButton>Explore the studio</BrandButton>
            </div>
          </ScrollReveal>
        </PaperSection>

        <ScrollReveal className="space-y-5">
          <SectionHeading eyebrow="Tokens">Color swatches</SectionHeading>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {swatches.map(([label, color]) => (
              <div key={label} className="border border-line bg-surface p-3">
                <div className={`h-16 ${color}`} />
                <p className="mt-3 font-condensed text-sm uppercase tracking-[0.15em]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </main>
  );
}
