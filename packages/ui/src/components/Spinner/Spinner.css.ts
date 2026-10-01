import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

const spin = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const spinner = recipe({
  base: {
    display: "inline-block",
    flexShrink: 0,
    borderRadius: vars.radius.full,
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRightColor: "transparent",
    animation: `${spin} 0.7s linear infinite`,
    "@media": {
      "(prefers-reduced-motion: reduce)": {
        animationDuration: "1.5s",
      },
    },
  },

  variants: {
    size: {
      sm: { width: "14px", height: "14px", borderWidth: "2px" },
      md: { width: "20px", height: "20px", borderWidth: "2px" },
      lg: { width: "32px", height: "32px", borderWidth: "3px" },
    },
  },

  defaultVariants: {
    size: "md",
  },
});

export const visuallyHidden = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});
