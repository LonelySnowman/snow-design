import type { StorybookConfig } from "@storybook/react-vite";
import * as path from "path";

const config: StorybookConfig = {
  stories: [
    "../packages/components/**/_story/*.stories.@(ts|tsx)"
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
      "@snow-design/foundation": path.resolve(__dirname, "../packages/foundation")
    };
    config.define = {
      "process.env": {}
    }
    config.css = {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "@snow-design/foundation/_theme/index.scss";\n
          @import "@snow-design/foundation/_theme/global.scss";\n`,
        }
      }
    }
    return config;
  },
};
export default config;
