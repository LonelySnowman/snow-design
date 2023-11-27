import type { StorybookConfig } from "@storybook/react-vite";
import * as path from "path";

const config: StorybookConfig = {
  stories: [
    // "../stories/**/*.mdx",
    // "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../packages/snow-ui/**/_story/*.stories.@(ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/preset-scss"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    config.resolve.alias = {
      "@snow-design/snow-foundation": path.resolve(__dirname, "../packages/snow-foundation")
    };
    config.define = {
      "process.env": {}
    }
    config.css = {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@snow-design/snow-foundation/_theme/index.scss";\n`
        }
      }
    }
    return config;
  },
};
export default config;
