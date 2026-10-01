import type { ButtonHTMLAttributes } from "react";

import { Spinner } from "../Spinner/Spinner";
import { button, type ButtonVariants } from "./Button.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    /** Shows a spinner, disables the button and sets aria-busy. */
    loading?: boolean;
  };

export function Button({
  variant,
  size,
  fullWidth,
  loading = false,
  disabled,
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = [button({ variant, size, fullWidth }), className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Spinner size="sm" decorative />}
      {children}
    </button>
  );
}

/**
 * The button class names, for elements that should *look* like a button
 * but are not <button> — e.g. a Next.js <Link>:
 *
 *   <Link href="/signup" className={buttonStyles({ variant: "secondary" })} />
 */
export { button as buttonStyles };
