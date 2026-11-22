import { describe, it } from "vitest";
import { composeStories, setProjectAnnotations } from "@storybook/react-vite";
import * as preview from "../.storybook/preview";
import * as behavior from "../stories/Behavior.stories";
import * as components from "../stories/MasterSelector.stories";

// Ejecuta en jsdom las interacciones (`play`) de las stories como pruebas de regresión.
setProjectAnnotations([preview as never]);

for (const [name, module] of [["Comportamiento", behavior], ["Componentes", components]] as const) {
  const stories = composeStories(module as never) as Record<string, { run: () => Promise<void> }>;
  describe(`Stories · ${name}`, () => {
    for (const [key, story] of Object.entries(stories)) {
      it(key, async () => { await story.run(); }, 15000);
    }
  });
}
