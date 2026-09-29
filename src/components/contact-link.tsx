"use client";

import type { ComponentProps } from "react";

/** Jumps to the footer contact details, closing the mobile menu if it's open. */
export function ContactLink(props: Omit<ComponentProps<"a">, "href">) {
  return (
    <a
      {...props}
      href="#contact"
      onClick={(event) => {
        event.currentTarget.closest("details")?.removeAttribute("open");
        props.onClick?.(event);
      }}
    />
  );
}
