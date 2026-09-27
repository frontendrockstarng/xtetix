import Image from "next/image";
import { ScrollRevealHeading } from "@/components/scroll-reveal-heading";

const clients = [
  { name: "Eroton", src: "/assets/client%20Logos/erotonlogo.png" },
  { name: "Dangote", src: "/assets/client%20Logos/dangotelogo.png" },
  { name: "International Energy Services", src: "/assets/client%20Logos/IES-logo.png" },
  { name: "KDI Engineering Services", src: "/assets/client%20Logos/kdilogo.png" },
  { name: "Erdis Nigeria", src: "/assets/client%20Logos/erdislogo.png" },
  { name: "Newcross Exploration", src: "/assets/client%20Logos/newcrosslogo.png" },
  { name: "Haskoning", src: "/assets/client%20Logos/haskoning-logo.svg" },
  { name: "British Council", src: "/assets/client%20Logos/BritishCouncil.png" },
  { name: "KDI Group", src: "/assets/client%20Logos/kdigrouplogo.png" },
  { name: "Fenog Nigeria", src: "/assets/client%20Logos/fenoglogo.png" },
  { name: "Lekoil", src: "/assets/client%20Logos/Lekoil-logo.svg" },
];

function LogoTrack() {
  return (
    <div className="client-marquee">
      <div className="client-marquee__track">
        {[0, 1].map((copy) => (
          <div
            className="client-marquee__group"
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {clients.map((client, index) => (
              <div className="client-marquee__logo" key={`${client.name}-${index}`}>
                <Image
                  src={client.src}
                  alt={copy === 0 ? client.name : ""}
                  fill
                  sizes="(max-width: 600px) 130px, 200px"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientMarquee() {
  return (
    <section className="client-trust" aria-labelledby="client-trust-title">
      <div className="client-trust__heading page-width">
        <ScrollRevealHeading
          id="client-trust-title"
          level="h2"
          lines={[
            "Trusted by organizations across energy, industrial,",
            "marine and infrastructure sectors",
          ]}
        />
      </div>
      <LogoTrack />
    </section>
  );
}