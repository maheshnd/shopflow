import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

export const button = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.space.sm,
    border: "1px solid transparent",
    borderRadius: vars.radius.md,
    fontWeight: vars.fontWeight.semibold,
    lineHeight: 1,
    whiteSpace: "nowrap",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 150ms ease, border-color 150ms ease",

    selectors: {
      "&:focus-visible": {
        outline: `2px solid ${vars.color.primary}`,
        outlineOffset: "2px",
      },
      "&:disabled, &[aria-disabled='true']": {
        opacity: 0.55,
        cursor: "not-allowed",
      },
    },
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.primary,
        color: vars.color.primaryText,
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: vars.color.primaryHover,
          },
        },
      },
      secondary: {
        backgroundColor: vars.color.surface,
        color: vars.color.text,
        borderColor: vars.color.border,
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: vars.color.surfaceMuted,
          },
        },
      },
      danger: {
        backgroundColor: vars.color.danger,
        color: vars.color.primaryText,
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: vars.color.dangerHover,
          },
        },
      },
      ghost: {
        backgroundColor: "transparent",
        color: vars.color.text,
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: vars.color.surfaceMuted,
          },
        },
      },
    },

    size: {
      sm: {
        height: "32px",
        padding: `0 ${vars.space.md}`,
        fontSize: vars.fontSize.sm,
      },
      md: {
        height: "40px",
        padding: `0 ${vars.space.md}`,
        fontSize: vars.fontSize.md,
      },
      lg: {
        height: "48px",
        padding: `0 ${vars.space.lg}`,
        fontSize: vars.fontSize.lg,
      },
    },

    fullWidth: {
      true: { width: "100%" },
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "md",
    fullWidth: false,
  },
});

export type ButtonVariants = NonNullable<RecipeVariants<typeof button>>;
