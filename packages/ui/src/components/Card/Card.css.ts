import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

export const card = recipe({
  base: {
    backgroundColor: vars.color.surface,
    border: `1px solid ${vars.color.border}`,
    borderRadius: vars.radius.lg,
    boxShadow: vars.shadow.sm,
  },

  variants: {
    padding: {
      none: { padding: 0 },
      sm: { padding: vars.space.md },
      md: { padding: vars.space.lg },
      lg: { padding: vars.space.xl },
    },
  },

  defaultVariants: {
    padding: "md",
  },
});

export type CardVariants = NonNullable<RecipeVariants<typeof card>>;
