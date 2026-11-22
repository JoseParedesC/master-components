import { create } from "storybook/theming/create";

const font = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

export default create({
  base: "light",
  brandTitle: "master-components",
  brandTarget: "_self",

  colorPrimary: "#1457a6",
  colorSecondary: "#1457a6",

  appBg: "#f4f6f9",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#e1e6ed",
  appBorderRadius: 10,

  textColor: "#18212f",
  textMutedColor: "#667085",
  barTextColor: "#667085",
  barSelectedColor: "#1457a6",
  barHoverColor: "#1457a6",
  barBg: "#ffffff",

  inputBg: "#ffffff",
  inputBorder: "#cdd5df",
  inputTextColor: "#18212f",
  inputBorderRadius: 6,

  fontBase: font,
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
});
