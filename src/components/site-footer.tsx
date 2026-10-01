import Link from "next/link";
import { RolloverText } from "@/components/rollover-text";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__inner page-width">
        <div className="site-footer__top">
          <Link className="site-footer__brand" href="/" aria-label="XTETIX Concepts Ltd home">
            <RolloverText>
              XTETIX
              <br />
              CONCEPTS LTD
            </RolloverText>
          </Link>

          <div className="site-footer__socials" aria-label="Social media links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <img src="/assets/social Logo/facebookLogo.svg" alt="Facebook" />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
              <img src="/assets/social Logo/twitterlogo.svg" alt="X" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="/assets/social Logo/instaicon.svg" alt="Instagram" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <img src="/assets/social Logo/linkedinlogo.svg" alt="LinkedIn" />
            </a>
          </div>
        </div>

        <div className="site-footer__columns">
          <div className="site-footer__column site-footer__column--company">
            <h3>Company</h3>
            <Link href="/about-us"><RolloverText>About us</RolloverText></Link>
            <Link href="/hseq-policy"><RolloverText>HSEQ policy</RolloverText></Link>
            <Link href="/local-content"><RolloverText>Local content</RolloverText></Link>
          </div>

          <div className="site-footer__column site-footer__column--links">
            <h3>Links</h3>
            <Link href="/services"><RolloverText>Services</RolloverText></Link>
            <Link href="/projects"><RolloverText>Projects</RolloverText></Link>          </div>

          <div className="site-footer__column site-footer__column--contact">
            <h3>Contact</h3>
            <a href="mailto:info@xtetixconcepts.com">
              <RolloverText>info@xtetixconcepts.com</RolloverText>
            </a>
            <a href="tel:+2348022748799">
              <RolloverText>+234-8022748799</RolloverText>
            </a>
            <a href="tel:+23490909930358">
              <RolloverText>090909930358</RolloverText>
            </a>
            <p>
              CROMWELL TERRACE 2 (UNIT A2)
              <br />
              NO 13 & 14, Onigefon Street,
              <br />
              Oniru Eti-osa, Lagos
              <br />
              Nigeria.
            </p>
          </div>
        </div>

        <div className="site-footer__wordmark" aria-label="XTETIX">
          XTETIX
        </div>

        <p className="site-footer__copyright">Copyright © {new Date().getFullYear()} All rights reserved</p>
      </div>
    </footer>
  );
}