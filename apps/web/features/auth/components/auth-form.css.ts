import { style } from "@vanilla-extract/css";
import { vars } from "@shopflow/ui/theme";

export const page = style({
  display: "flex",
  justifyContent: "center",
  padding: `${vars.space["2xl"]} ${vars.space.md}`,
});

export const card = style({
  width: "100%",
  maxWidth: "420px",
});

export const title = style({
  fontSize: vars.fontSize.xl,
  marginBottom: vars.space.xs,
});

export const subtitle = style({
  color: vars.color.textMuted,
  marginBottom: vars.space.lg,
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const formError = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  backgroundColor: `color-mix(in srgb, ${vars.color.danger} 8%, transparent)`,
  color: vars.color.danger,
  fontSize: vars.fontSize.sm,
});

export const switchText = style({
  marginTop: vars.space.lg,
  textAlign: "center",
  fontSize: vars.fontSize.sm,
  color: vars.color.textMuted,
});

export const switchLink = style({
  color: vars.color.primary,
  fontWeight: vars.fontWeight.semibold,
  selectors: {
    "&:hover": { textDecoration: "underline" },
  },
});
