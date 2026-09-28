"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { RolloverText } from "@/components/rollover-text";

type NavDropdownProps = {
  label: string;
  items: { href: string; label: string }[];
};

export function NavChevron() {
  return (
    <svg className="nav-chevron" viewBox="0 0 10 6" aria-hidden="true">
      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function NavDropdown({ label, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const pathname = usePathname();
  const isCurrent = items.some((item) => item.href === pathname);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      className={`nav-dropdown${open ? " is-open" : ""}`}
      ref={rootRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        className={`nav-dropdown__trigger${isCurrent ? " is-current" : ""}`}
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <RolloverText>{label}</RolloverText>
        <NavChevron />
      </button>
      <ul className="nav-dropdown__menu" id={menuId}>
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} aria-current={item.href === pathname ? "page" : undefined}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
