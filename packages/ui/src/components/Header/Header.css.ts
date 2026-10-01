import { style } from "@vanilla-extract/css";

import { vars } from "../../styles/theme.css";

export const header = style({
  position: "sticky",
  top: 0,
  zIndex: 10,
  backgroundColor: vars.color.surface,
  borderBottom: `1px solid ${vars.color.border}`,
});

export const inner = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.lg,
  maxWidth: "1120px",
  minHeight: "64px",
  margin: "0 auto",
  padding: `${vars.space.sm} ${vars.space.md}`,
  flexWrap: "wrap",
});

export const brand = style({
  display: "flex",
  alignItems: "center",
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.bold,
});

export const navigation = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
});

export const actions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  marginLeft: "auto",
});
