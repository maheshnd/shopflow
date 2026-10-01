import { useId, type InputHTMLAttributes } from "react";

import * as styles from "./Input.css";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  /** Error message. When set, the input is marked aria-invalid. */
  error?: string;
};

export function Input({
  id,
  label,
  helperText,
  error,
  className,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const messageId = `${inputId}-message`;
  const message = error ?? helperText;

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={[styles.input, className].filter(Boolean).join(" ")}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        {...props}
      />

      {message && (
        <p
          id={messageId}
          className={error ? styles.errorText : styles.helperText}
        >
          {message}
        </p>
      )}
    </div>
  );
}
