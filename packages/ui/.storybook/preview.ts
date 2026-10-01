import type { Preview } from "@storybook/react-vite";

import { themeClass } from "../src/styles/theme.css";
import "../src/styles/global.css";

// Mirror the web app: the theme class lives on <html>,
// so every story sees the same CSS variables as the real app.
document.documentElement.classList.add(themeClass);

const preview: Preview = {
  parameters: {
    layout: "padded",
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
  },
};

export default preview;
