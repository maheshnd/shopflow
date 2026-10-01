import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "@shopflow/ui/theme";

export const section = style({
  padding: `${vars.space["2xl"]} ${vars.space.lg}`,
});

export const container = style({
  maxWidth: "1200px",
  margin: "0 auto",
});

export const heading = style({
  margin: 0,
  fontSize: "2rem",
  fontWeight: 700,
});

export const subheading = style({
  marginTop: vars.space.sm,
  color: vars.color.textMuted,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: vars.space.lg,
  marginTop: vars.space.xl,
});

export const cardContent = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const productName = style({
  margin: 0,
  fontSize: "1.125rem",
  fontWeight: 600,
});

export const description = style({
  margin: 0,
  color: vars.color.textMuted,
  lineHeight: 1.5,
});

export const price = style({
  marginTop: vars.space.sm,
  fontWeight: 700,
  fontSize: "1.1rem",
});

export const stock = style({
  fontSize: "0.875rem",
  color: vars.color.textMuted,
});

export const state = style({
  padding: vars.space.xl,
  textAlign: "center",
  color: vars.color.textMuted,
});

export const error = style({
  padding: vars.space.xl,
  textAlign: "center",
  color: vars.color.danger,
});

export const detailContainer = style({
  maxWidth: "1100px",
  margin: "0 auto",
  padding: `${vars.space["2xl"]} ${vars.space.lg}`,
});

export const detailContent = style({
  display: "grid",
  gridTemplateColumns:
    "minmax(280px, 1fr) minmax(280px, 1fr)",
  gap: vars.space["2xl"],

  "@media": {
    "screen and (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const detailImage = style({
  minHeight: "380px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.lg,
  color: vars.color.textMuted,
  overflow: "hidden",
// selectors block removed: "& img" targets a child, which style() doesn't allow
  // selectors: {
  //   "& img": {
  //     width: "100%",
  //     height: "100%",
  //     objectFit: "cover",
  //   },
  // },
});

// Style <img> elements inside detailImage.
// `${detailImage}` resolves to the generated hashed class name,
// so this stays scoped to this container, not every <img> on the site.
globalStyle(`${detailImage} img`, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const detailTitle = style({
  margin: 0,
  fontSize: "2rem",
  fontWeight: 700,
});

export const detailPrice = style({
  marginTop: vars.space.md,
  fontSize: "1.5rem",
  fontWeight: 700,
});

export const detailDescription = style({
  marginTop: vars.space.lg,
  color: vars.color.textMuted,
  lineHeight: 1.7,
});

export const detailStock = style({
  marginTop: vars.space.lg,
  marginBottom: vars.space.lg,
  fontWeight: 600,
});