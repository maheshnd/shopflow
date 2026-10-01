import { style } from "@vanilla-extract/css";

import { vars } from "../../styles/theme.css";

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const label = style({
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.text,
});

export const input = style({
  width: "100%",
  height: "40px",
  padding: `0 ${vars.space.md}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  fontSize: vars.fontSize.md,
  transition: "border-color 150ms ease, box-shadow 150ms ease",

  selectors: {
    "&::placeholder": {
      color: vars.color.textMuted,
    },
    "&:focus": {
      outline: "none",
      borderColor: vars.color.primary,
      boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.primary} 20%, transparent)`,
    },
    "&:disabled": {
      backgroundColor: vars.color.surfaceMuted,
      color: vars.color.textMuted,
      cursor: "not-allowed",
    },
    "&[aria-invalid='true']": {
      borderColor: vars.color.danger,
    },
  },
});

export const helperText = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textMuted,
});

export const errorText = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.danger,
});
