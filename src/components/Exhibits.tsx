import { projects } from "../data/content";
import { Container } from "./Container";
import { ExhibitCard } from "./ExhibitCard";
import { SectionHeading } from "./SectionHeading";

export function Exhibits() {
  return (
    <section id="exhibits" className="border-b py-16 sm:py-24" style={{ borderColor: "var(--color-border)" }}>
      <Container>
        <SectionHeading
          title="exhibits"
          lede="Five pieces of entered evidence — each with the real tool's own output, not just a description of it. Three also open a controlled, in-browser demonstration, clearly marked live vs. simulated."
        />
        <div>
          {projects.map((p) => (
            <ExhibitCard key={p.id} project={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
