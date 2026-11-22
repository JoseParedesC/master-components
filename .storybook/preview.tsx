import React from "react";
import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true }
  },
  decorators: [
    (Story) => (
      <div style={{ width: 420, minHeight: 420, fontFamily: "system-ui, sans-serif" }}>
        <Story />
      </div>
    )
  ]
};

export default preview;
