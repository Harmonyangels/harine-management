import Link from "next/link";
import type { RelatedService } from "@/lib/blog";

export default function RelatedServices({
  services,
}: {
  services: RelatedService[];
}) {
  if (services.length === 0) return null;

  return (
    <section className="related-services">
      <div className="related-services-inner">
        <h2>Related services</h2>
        <div className="related-services-grid">
          {services.map((s) => (
            <Link key={s.url} href={s.url} className="related-service-card">
              <div className="related-service-card-title">{s.label}</div>
              <div className="related-service-card-desc">{s.description}</div>
              <span className="related-service-card-arrow">Learn more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
