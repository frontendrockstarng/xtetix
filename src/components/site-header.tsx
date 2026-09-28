import Image from "next/image";
import Link from "next/link";
import { NavChevron, NavDropdown } from "@/components/nav-dropdown";
import { RolloverText } from "@/components/rollover-text";

const companyLinks = [
  { href: "/about-us", label: "About us" },
  { href: "/hseq-policy", label: "HSEQ policy" },
  { href: "/local-content", label: "Local content" },
];

const links = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner page-width">
        <Link className="brand" href="/" aria-label="Xtetix Concepts home">
          <Image
            className="brand__mark"
            src="/assets/logo.png"
            alt=""
            width={52}
            height={52}
            priority
          />
          {/* <span className="brand__name">
            <RolloverText>XTETIX CONCEPTS</RolloverText>
          </span> */}
        </Link>

        <details className="mobile-nav">
          <summary className="mobile-nav__toggle" aria-label="Toggle navigation">
            <span />
            <span />
          </summary>
          <nav className="site-nav" aria-label="Main navigation">
            <details className="mobile-nav__group">
              <summary className="mobile-nav__group-toggle">
                Company
                <NavChevron />
              </summary>
              <div className="mobile-nav__submenu">
                {companyLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <RolloverText>{link.label}</RolloverText>
              </Link>
            ))}
            <Link className="button button--primary site-nav__mobile-cta" href="/contact">
              <RolloverText>Contact us</RolloverText>
            </Link>
          </nav>
        </details>

        <nav className="site-nav site-nav--desktop" aria-label="Main navigation">
          <NavDropdown label="Company" items={companyLinks} />
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <RolloverText>{link.label}</RolloverText>
            </Link>
          ))}
          <Link className="button button--primary site-nav__cta" href="/contact">
            <RolloverText>Contact us</RolloverText>
          </Link>
        </nav>
      </div>
    </header>
  );
}