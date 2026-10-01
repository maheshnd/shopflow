import { globalStyle } from "@vanilla-extract/css";

import { vars } from "./theme.css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("html, body", {
  margin: 0,
  padding: 0,
});

globalStyle("body", {
  minHeight: "100vh",
  backgroundColor: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.md,
  lineHeight: 1.5,
  WebkitFontSmoothing: "antialiased",
});

globalStyle("h1, h2, h3, h4", {
  margin: 0,
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.bold,
  lineHeight: 1.2,
});

globalStyle("p", {
  margin: 0,
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle("button, input, textarea, select", {
  font: "inherit",
});
