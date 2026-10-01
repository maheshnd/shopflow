import { createTheme } from "@vanilla-extract/css";

const systemFont =
  'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export const [themeClass, vars] = createTheme({
  color: {
    background: "#f8fafc",
    surface: "#ffffff",
    surfaceMuted: "#f1f5f9",
    text: "#0f172a",
    textMuted: "#64748b",
    primary: "#4f46e5",
    primaryHover: "#4338ca",
    primaryText: "#ffffff",
    secondary: "#e2e8f0",
    secondaryHover: "#cbd5e1",
    border: "#e2e8f0",
    danger: "#dc2626",
    dangerHover: "#b91c1c",
    success: "#16a34a",
  },

  space: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
  },

  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    full: "9999px",
  },

  font: {
    body: systemFont,
    heading: systemFont,
  },

  fontSize: {
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "2.75rem",
  },

  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  shadow: {
    sm: "0 1px 2px rgba(15, 23, 42, 0.06)",
    md: "0 4px 12px rgba(15, 23, 42, 0.08)",
  },
});
