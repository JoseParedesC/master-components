import React, { useState } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MasterSelector } from "../src";
import type { MasterSearchFn } from "../src";

interface Item { id: string; code: string; name: string; active?: boolean }

const ALL: Item[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  code: String(1000 + i),
  name: i % 2 ? `Banco ${i}` : `Caja ${i}`
}));

function makeSearch(delay = 40) {
  return vi.fn<MasterSearchFn<Item>>(async ({ query, page, pageSize }) => {
    await new Promise((r) => setTimeout(r, delay));
    const q = query.toLowerCase();
    const rows = ALL.filter((i) => `${i.code} ${i.name}`.toLowerCase().includes(q));
    const start = (page - 1) * pageSize;
    return { items: rows.slice(start, start + pageSize), total: rows.length, hasNextPage: start + pageSize < rows.length };
  });
}

function Harness(props: { search: MasterSearchFn<Item>; onPick?: (i: Item | null) => void; min?: number; pageSize?: number }) {
  const [value, setValue] = useState<Item | null>(null);
  return (
    <MasterSelector<Item>
      entity="cuentas"
      value={value}
      onChange={(v) => { setValue(v); props.onPick?.(v); }}
      search={props.search}
      getOptionLabel={(i) => `${i.code} - ${i.name}`}
      getOptionValue={(i) => i.id}
      debounceMs={0}
      minSearchLength={props.min}
      pageSize={props.pageSize}
      aria-label="Cuenta"
    />
  );
}

const NO_RESULTS = "No se encontraron resultados";

describe("MasterSelector", () => {
  it("no muestra 'sin resultados' antes de que llegue la primera respuesta", async () => {
    const search = makeSearch(80);
    render(<Harness search={search} />);
    await userEvent.click(screen.getByRole("combobox"));

    expect(screen.queryByText(NO_RESULTS)).toBeNull();      // justo al abrir
    await new Promise((r) => setTimeout(r, 30));
    expect(screen.queryByText(NO_RESULTS)).toBeNull();      // mientras carga

    expect(await screen.findAllByRole("option")).toHaveLength(12);
    expect(screen.queryByText(NO_RESULTS)).toBeNull();
  });

  it("muestra 'sin resultados' solo cuando la búsqueda realmente no devuelve nada", async () => {
    render(<Harness search={makeSearch(10)} />);
    await userEvent.type(screen.getByRole("combobox"), "zzz");
    // Aparece en el panel y también en la región aria-live (lectores de pantalla).
    await waitFor(() => expect(screen.getAllByText(NO_RESULTS).length).toBeGreaterThan(0));
    expect(document.querySelector(".ms-state-title")?.textContent).toBe(NO_RESULTS);
  });

  it("navega con flechas y selecciona con Enter", async () => {
    const onPick = vi.fn();
    render(<Harness search={makeSearch(10)} onPick={onPick} />);
    const input = screen.getByRole("combobox");
    await userEvent.click(input);
    await screen.findAllByRole("option");

    const options = screen.getAllByRole("option");
    expect(input.getAttribute("aria-activedescendant")).toBe(options[0].id);

    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    expect(input.getAttribute("aria-activedescendant")).toBe(options[2].id);

    await userEvent.keyboard("{ArrowUp}");
    expect(input.getAttribute("aria-activedescendant")).toBe(options[1].id);

    await userEvent.keyboard("{Enter}");
    expect(onPick).toHaveBeenCalledWith(ALL[1]);
    expect((input as HTMLInputElement).value).toBe("1001 - Banco 1");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("Enter no envía el formulario padre", async () => {
    const submit = vi.fn((e: React.FormEvent) => e.preventDefault());
    render(<form onSubmit={submit}><Harness search={makeSearch(10)} /></form>);
    await userEvent.click(screen.getByRole("combobox"));
    await screen.findAllByRole("option");
    await userEvent.keyboard("{Enter}");
    expect(submit).not.toHaveBeenCalled();
  });

  it("permite borrar el texto y no filtra por la etiqueta seleccionada", async () => {
    const search = makeSearch(10);
    render(<Harness search={search} />);
    const input = screen.getByRole("combobox") as HTMLInputElement;

    await userEvent.click(input);
    await screen.findAllByRole("option");
    await userEvent.keyboard("{Enter}");               // selecciona el primero
    expect(input.value).toBe("1000 - Caja 0");

    search.mockClear();
    await userEvent.click(input);                      // reabre con valor seleccionado
    await waitFor(() => expect(search).toHaveBeenCalled());
    expect(search.mock.calls[0][0].query).toBe("");    // no usa la etiqueta como filtro

    await userEvent.clear(input);
    expect(input.value).toBe("");                      // antes reaparecía la etiqueta
  });

  it("respeta minSearchLength mostrando una pista en lugar de 'sin resultados'", async () => {
    const search = makeSearch(10);
    render(<Harness search={search} min={2} />);
    const input = screen.getByRole("combobox");
    await userEvent.click(input);

    expect(screen.getByText(/al menos 2 caracteres/i)).toBeTruthy();
    expect(screen.queryByText(NO_RESULTS)).toBeNull();
    expect(search).not.toHaveBeenCalled();

    await userEvent.type(input, "ca");
    await waitFor(() => expect(search).toHaveBeenCalled());
    expect((await screen.findAllByRole("option")).length).toBeGreaterThan(0);
  });

  it("Escape cierra el panel y descarta lo escrito", async () => {
    render(<Harness search={makeSearch(10)} />);
    const input = screen.getByRole("combobox") as HTMLInputElement;
    await userEvent.type(input, "caj");
    await screen.findAllByRole("option");
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(input.value).toBe("");
  });

  it("carga la siguiente página al llegar al final con ↓ y no duplica opciones", async () => {
    const search = makeSearch(10);
    render(<Harness search={search} pageSize={5} />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(await screen.findAllByRole("option")).toHaveLength(5);

    await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}");
    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(10));
    expect(search.mock.calls.some(([p]) => p.page === 2)).toBe(true);
    const ids = screen.getAllByRole("option").map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("no relanza la búsqueda cuando el padre re-renderiza con funciones inline", async () => {
    const search = makeSearch(10);
    const { rerender } = render(<Harness search={(p) => search(p)} />);
    await userEvent.click(screen.getByRole("combobox"));
    await screen.findAllByRole("option");
    const calls = search.mock.calls.length;
    rerender(<Harness search={(p) => search(p)} />);
    await new Promise((r) => setTimeout(r, 60));
    expect(search.mock.calls.length).toBe(calls);
  });
});
