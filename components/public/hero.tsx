import Image from "next/image";
import Link from "next/link";
import { AtSign, Globe, MapPin, Phone, Send } from "lucide-react";

import { BrandButton } from "@/components/brand/brand-button";
import { studio } from "@/lib/studio";

const socialLinks = [
  { label: "Instagram", href: studio.socials.instagram, Icon: AtSign },
  { label: "Facebook", href: studio.socials.facebook, Icon: Globe },
  { label: "X", href: studio.socials.twitter, Icon: Send },
] as const;

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image
        className="hero__image"
        src="/hero-image.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={70}
      />
      <div className="hero__overlay" />

      <aside className="hero__social-rail" aria-label="Social links">
        <div className="hero__social-icons">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
            >
              <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
            </a>
          ))}
        </div>
        <span className="hero__social-label">Our socials</span>
      </aside>

      <div className="hero__content">
        <h1 id="hero-title" className="hero__wordmark">
          {studio.name}
        </h1>
        <div className="hero__actions">
          <BrandButton asChild size="lg">
            <Link href="/book">Book now</Link>
          </BrandButton>
          <div className="hero__secondary-actions">
            <BrandButton asChild variant="outline" size="sm">
              <a href={`tel:${studio.phone}`}>
                <Phone aria-hidden="true" size={16} />
                Call
              </a>
            </BrandButton>
            <BrandButton asChild variant="outline" size="sm">
              <a href={studio.mapUrl} target="_blank" rel="noreferrer">
                <MapPin aria-hidden="true" size={16} />
                Get directions
              </a>
            </BrandButton>
          </div>
        </div>
      </div>
    </section>
  );
}
