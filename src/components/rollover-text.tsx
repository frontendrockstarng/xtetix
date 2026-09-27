import type { ReactNode } from "react";

type RolloverTextProps = {
  children: ReactNode;
};

export function RolloverText({ children }: RolloverTextProps) {
  return (
    <span className="rollover-label">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}