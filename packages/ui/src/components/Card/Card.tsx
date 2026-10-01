import type { HTMLAttributes } from "react";

import { card, type CardVariants } from "./Card.css";

export type CardProps = HTMLAttributes<HTMLDivElement> & CardVariants;

export function Card({ padding, className, ...props }: CardProps) {
  return (
    <div
      className={[card({ padding }), className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
