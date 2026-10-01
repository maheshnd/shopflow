import { style } from "@vanilla-extract/css";
import { vars } from "@shopflow/ui/theme";

export const page = style({
  maxWidth: "1120px",
  margin: "0 auto",
  padding: `${vars.space["2xl"]} ${vars.space.md}`,
});

export const centered = style({
  display: "flex",
  justifyContent: "center",
  padding: vars.space["2xl"],
});

export const title = style({
  fontSize: vars.fontSize["2xl"],
  marginBottom: vars.space.lg,
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: vars.space.xs,
  maxWidth: "480px",
});

export const greeting = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.semibold,
});

export const email = style({
  color: vars.color.textMuted,
});

export const error = style({
  color: vars.color.danger,
  fontSize: vars.fontSize.sm,
});

export const actions = style({
  marginTop: vars.space.md,
});
