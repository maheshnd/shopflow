import path from "node:path";
import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

// Compiles *.css.ts files (in this app and in @shopflow/ui).
// Turbopack support is opt-in in the plugin; "auto" enables it for
// Next.js >= 16 (where Turbopack is the default bundler). The plugin
// merges its rules into the `turbopack` config below, keeping `root`.
const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: "auto" },
});

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },

  transpilePackages: [
    "@shopflow/contracts",
    "@shopflow/ui",
  ],
  output: "standalone",
};

export default withVanillaExtract(nextConfig);
