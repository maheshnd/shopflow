import { style } from "@vanilla-extract/css";
import { vars } from "@shopflow/ui/theme";

export const container = style({
  maxWidth: "1120px",
  margin: "0 auto",
  padding: `0 ${vars.space.md}`,
});

export const section = style({
  padding: `${vars.space["2xl"]} 0`,
});

export const sectionHeading = style({
  fontSize: vars.fontSize.xl,
  marginBottom: vars.space.sm,
});

export const sectionIntro = style({
  color: vars.color.textMuted,
  marginBottom: vars.space.lg,
});

export const grid = style({
  display: "grid",
  gap: vars.space.lg,
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
});

/* Hero */

export const hero = style({
  padding: `${vars.space["2xl"]} 0`,
  background: `linear-gradient(180deg, ${vars.color.surface} 0%, ${vars.color.background} 100%)`,
  borderBottom: `1px solid ${vars.color.border}`,
});

export const heroInner = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: vars.space.md,
  maxWidth: "640px",
  padding: `${vars.space.xl} 0`,
});

export const eyebrow = style({
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.primary,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
});

export const heroTitle = style({
  fontSize: vars.fontSize["3xl"],
  letterSpacing: "-0.02em",
});

export const heroText = style({
  fontSize: vars.fontSize.lg,
  color: vars.color.textMuted,
});

export const heroActions = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.sm,
  marginTop: vars.space.sm,
});

/* Product preview */

export const productImage = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  aspectRatio: "4 / 3",
  borderRadius: `${vars.radius.lg} ${vars.radius.lg} 0 0`,
  backgroundColor: vars.color.surfaceMuted,
  fontSize: "3rem",
});

export const productBody = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  padding: vars.space.md,
});

export const productName = style({
  fontSize: vars.fontSize.md,
});

export const productMeta = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textMuted,
});

/* Why ShopFlow */

export const featureIcon = style({
  fontSize: vars.fontSize.xl,
  marginBottom: vars.space.sm,
});

export const featureTitle = style({
  fontSize: vars.fontSize.lg,
  marginBottom: vars.space.xs,
});

export const featureText = style({
  color: vars.color.textMuted,
});

/* Footer */

export const footer = style({
  padding: `${vars.space.lg} 0`,
  borderTop: `1px solid ${vars.color.border}`,
  fontSize: vars.fontSize.sm,
  color: vars.color.textMuted,
});
