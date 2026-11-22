import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import type { MasterSearchFn } from "../src";
import { createMockSearch } from "../demo/mock";
import type { Account } from "../demo/mock";
import { AccountSelector } from "./helpers";

/**
 * Cada story ejecuta una interacción automática (panel **Interactions**).
 * Si el comportamiento se rompe, la story aparece en rojo.
 */
const meta = {
  title: "Pruebas/Comportamiento",
  component: AccountSelector,
  tags: ["!autodocs"],
  args: { latencyMs: 80, debounceMs: 0, onChange: fn() }
} satisfies Meta<typeof AccountSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const NO_RESULTS = "No se encontraron resultados";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Al abrir sin escribir nunca se ve "sin resultados": primero el esqueleto, luego las opciones. */
export const SinMensajeVacioPrematuro: Story = {
  name: "Sin mensaje vacío prematuro",
  args: { latencyMs: 600 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("combobox"));
    await expect(canvas.queryByText(NO_RESULTS)).toBeNull();
    await sleep(250);
    await expect(canvas.queryByText(NO_RESULTS)).toBeNull();
    await waitFor(() => expect(canvas.getAllByRole("option").length).toBeGreaterThan(0), { timeout: 3000 });
  }
};

/** Solo se informa "sin resultados" cuando la búsqueda terminó y no encontró nada. */
export const VacioSoloTrasBuscar: Story = {
  name: "Vacío solo tras buscar",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("combobox"), "zzzz");
    await waitFor(() => expect(canvasElement.querySelector(".ms-state-title")?.textContent).toBe(NO_RESULTS));
  }
};

/** ↓ ↓ ↑ y Enter eligen la opción correcta y actualizan `aria-activedescendant`. */
export const NavegarConFlechas: Story = {
  name: "Navegar con flechas",
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox") as HTMLInputElement;
    await userEvent.click(input);
    await waitFor(() => expect(canvas.getAllByRole("option").length).toBeGreaterThan(3));
    const options = canvas.getAllByRole("option");

    await expect(input.getAttribute("aria-activedescendant")).toBe(options[0].id);
    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    await expect(input.getAttribute("aria-activedescendant")).toBe(options[2].id);
    await userEvent.keyboard("{ArrowUp}");
    await expect(input.getAttribute("aria-activedescendant")).toBe(options[1].id);

    await userEvent.keyboard("{Enter}");
    await expect(args.onChange).toHaveBeenCalledTimes(1);
    await expect(input.value).toMatch(/^\d+ - /);
    await expect(canvas.queryByRole("listbox")).toBeNull();
  }
};

/** Se puede borrar el texto escrito y no se filtra por la etiqueta del valor ya elegido. */
export const BorrarTexto: Story = {
  name: "Borrar texto",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox") as HTMLInputElement;
    await userEvent.click(input);
    await waitFor(() => expect(canvas.getAllByRole("option").length).toBeGreaterThan(0));
    await userEvent.keyboard("{Enter}");
    await expect(input.value).not.toBe("");

    await userEvent.click(input);
    await waitFor(() => expect(canvas.getAllByRole("option").length).toBeGreaterThan(5)); // lista completa, no filtrada
    await userEvent.clear(input);
    await expect(input.value).toBe("");
  }
};

/** Con `minSearchLength` se muestra la pista y recién se busca al alcanzar el mínimo. */
export const PistaDeMinimo: Story = {
  name: "Pista de mínimo",
  args: { minSearchLength: 2 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox");
    await userEvent.click(input);
    await expect(canvas.getByText(/al menos 2 caracteres/i)).toBeTruthy();
    await expect(canvas.queryByText(NO_RESULTS)).toBeNull();
    await userEvent.type(input, "ca");
    await waitFor(() => expect(canvas.getAllByRole("option").length).toBeGreaterThan(0));
  }
};

/** Escape cierra el panel y descarta lo escrito. */
export const EscapeDescarta: Story = {
  name: "Escape descarta lo escrito",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox") as HTMLInputElement;
    await userEvent.type(input, "caj");
    await waitFor(() => expect(canvas.getAllByRole("option").length).toBeGreaterThan(0));
    await userEvent.keyboard("{Escape}");
    await expect(canvas.queryByRole("listbox")).toBeNull();
    await expect(input.value).toBe("");
  }
};

/** Al llegar al final con ↓ se carga la página siguiente y no hay opciones repetidas. */
export const PaginarConTeclado: Story = {
  name: "Paginar con teclado",
  // allowInactive: el mock tiene registros inactivos que, filtrados, harían variar el tamaño de página.
  args: { pageSize: 5, allowInactive: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("combobox"));
    await waitFor(() => expect(canvas.getAllByRole("option")).toHaveLength(5));
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}");
    await waitFor(() => expect(canvas.getAllByRole("option")).toHaveLength(10));
    const ids = canvas.getAllByRole("option").map((o) => o.id);
    await expect(new Set(ids).size).toBe(ids.length);
  }
};

let attempts = 0;
const flaky: MasterSearchFn<Account> = async (params) => {
  attempts += 1;
  if (attempts === 1) throw new Error("fallo simulado");
  return createMockSearch<Account>(() => ({ latencyMs: 30, failRate: false }))(params);
};

/** El primer intento falla; "Reintentar" recupera la lista. */
export const ReintentarTrasError: Story = {
  name: "Reintentar tras error",
  args: { search: flaky },
  beforeEach: () => { attempts = 0; },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("combobox"));
    const retry = await canvas.findByRole("button", { name: "Reintentar" });
    await userEvent.click(retry);
    await waitFor(() => expect(canvas.getAllByRole("option").length).toBeGreaterThan(0));
  }
};

const slowThenFast: MasterSearchFn<Account> = (params) =>
  createMockSearch<Account>(() => ({ latencyMs: params.query.length <= 2 ? 700 : 40, failRate: false }))(params);

/** Escribir rápido no deja resultados viejos: la respuesta lenta de "ca" no pisa la de "caja". */
export const IgnoraRespuestasObsoletas: Story = {
  name: "Ignora respuestas obsoletas",
  args: { search: slowThenFast },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("combobox"), "caja", { delay: 20 });
    await sleep(1000);
    const labels = canvas.getAllByRole("option").map((o) => o.textContent ?? "");
    await expect(labels.length).toBeGreaterThan(0);
    for (const label of labels) await expect(label.toLowerCase()).toContain("caja");
  }
};

/** Enter dentro de un formulario elige la opción y no lo envía. */
export const EnterNoEnviaFormulario: Story = {
  name: "Enter no envía el formulario",
  render: (args) => {
    const submit = (window as unknown as { __submits?: number });
    submit.__submits = 0;
    return (
      <form onSubmit={(e) => { e.preventDefault(); submit.__submits = (submit.__submits ?? 0) + 1; }}>
        <AccountSelector {...args} />
      </form>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("combobox"));
    await waitFor(() => expect(canvas.getAllByRole("option").length).toBeGreaterThan(0));
    await userEvent.keyboard("{Enter}");
    await expect((window as unknown as { __submits?: number }).__submits).toBe(0);
  }
};
