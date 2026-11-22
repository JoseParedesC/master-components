import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../stories/**/*.stories.@(ts|tsx)", "../stories/**/*.mdx"],
  addons: ["@storybook/addon-docs"]
};

export default config;
