import type { HTMLAttributes } from "react";

import { spinner, visuallyHidden } from "./Spinner.css";

export type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  size?: "sm" | "md" | "lg";
  /** Text announced to screen readers. */
  label?: string;
  /**
   * Set to true when the spinner sits inside something that already
   * announces the loading state (e.g. a Button with aria-busy).
   */
  decorative?: boolean;
};

export function Spinner({
  size,
  label = "Loading",
  decorative = false,
  className,
  ...props
}: SpinnerProps) {
  const classes = [spinner({ size }), className].filter(Boolean).join(" ");

  if (decorative) {
    return <span aria-hidden="true" className={classes} {...props} />;
  }

  return (
    <span role="status" {...props}>
      <span aria-hidden="true" className={classes} />
      <span className={visuallyHidden}>{label}</span>
    </span>
  );
}
