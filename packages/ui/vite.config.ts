import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// Used by Storybook (@storybook/react-vite picks this file up automatically).
// The package itself is not built: apps consume the TypeScript source
// directly and compile it (see transpilePackages in apps/web/next.config.ts).
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
});
