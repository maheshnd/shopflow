import { style } from "@vanilla-extract/css";
import { vars } from "@shopflow/ui/theme";

export const brand = style({
  color: vars.color.primary,
  letterSpacing: "-0.02em",
});

export const greeting = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textMuted,
  marginRight: vars.space.xs,
});

export const cartPlaceholder = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textMuted,
  padding: `0 ${vars.space.sm}`,
});
