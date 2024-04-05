import type { Config } from "tailwindcss";
import { PluginCreator } from "tailwindcss/types/config";

type Plugin = {
  addComponents: (value: Record<string, unknown>) => void;
};

const pluginCreator: PluginCreator = ({ addComponents }: Plugin) => {
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
  plugins: [pluginCreator],
};
export default config;
