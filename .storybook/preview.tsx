import React from "react";
import type { Decorator, Preview } from "@storybook/react-vite";
import "./preview.css";

const WIDTHS: Record<string, number | "100%"> = {
  narrow: 320,
  form: 420,
  wide: 640
};

const withStage: Decorator = (Story, context) => {
  const { skin = "default", width = "form" } = context.globals as { skin?: string; width?: string };
  const fill = context.parameters.stage === "fill";
  return (
    <div
      className="sb-stage"
      data-skin={skin}
      data-fill={fill}
      style={fill ? undefined : { width: WIDTHS[width] ?? 420 }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [withStage],
  globalTypes: {
    skin: {
      description: "Tema visual (variables CSS --ms-*)",
      toolbar: {
        title: "Tema",
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "default", title: "Clásico" },
          { value: "emerald", title: "Esmeralda" },
          { value: "compact", title: "Compacto" },
          { value: "dark", title: "Oscuro" }
        ]
      }
    },
    width: {
      description: "Ancho del campo",
      toolbar: {
        title: "Ancho",
        icon: "grow",
        dynamicTitle: true,
        items: [
          { value: "narrow", title: "Estrecho · 320 px" },
          { value: "form", title: "Formulario · 420 px" },
          { value: "wide", title: "Ancho · 640 px" }
        ]
      }
    }
  },
  initialGlobals: { skin: "default", width: "form" },
  parameters: {
    layout: "centered",
    controls: { expanded: true, sort: "requiredFirst" },
    options: {
      storySort: { order: ["Introducción", "Laboratorio", "Componentes", "Pruebas"] }
    },
    a11y: { test: "todo" }
  }
};

export default preview;
