import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import { PluginCreator } from "tailwindcss/types/config";

const pluginCreator: PluginCreator = ({ addComponents }) => {
  addComponents({
    ".container": {
      maxWidth: "100%",
      "@screen sm": {
        maxWidth: "640px",
      },
      "@screen md": {
        maxWidth: "768px",
      },
      "@screen lg": {
        maxWidth: "90%",
      },
    },
  });
};

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "2rem",
      },
    },
  },
  plugins: [pluginCreator, nextui()],
};

export default config;
