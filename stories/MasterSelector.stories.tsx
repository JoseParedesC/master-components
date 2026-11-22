import React, { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { MasterSelector } from "../src";
import { createMockSearch } from "../demo/mock";
import type { Party } from "../demo/mock";
import { AccountSelector, sampleAccount } from "./helpers";

const meta = {
  title: "Componentes/MasterSelector",
  component: AccountSelector,
  parameters: {
    docs: {
      description: {
        component:
          "Selector con búsqueda remota. Usa el panel **Controls** para cambiar las props; " +
          "el tema y el ancho se cambian desde la barra superior."
      }
    }
  },
  args: {
    latencyMs: 350,
    fail: false,
    minSearchLength: 0,
    pageSize: 20,
    debounceMs: 250,
    allowInactive: false,
    disabled: false,
    invalid: false,
    clearable: true,
    placeholder: "Busca por código o nombre",
    onChange: fn()
  },
  argTypes: {
    latencyMs: { control: { type: "range", min: 0, max: 3000, step: 50 }, description: "Latencia simulada del servidor (solo demo)." },
    fail: { description: "Hace que el servidor simulado responda con error (solo demo)." },
    pageSize: { control: { type: "number", min: 3, max: 50 } },
    minSearchLength: { control: { type: "number", min: 0, max: 5 } },
    debounceMs: { control: { type: "number", min: 0, max: 1000, step: 50 } },
    initial: { control: false },
    search: { control: false },
    onChange: { control: false }
  }
} satisfies Meta<typeof AccountSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Estado base. Al abrir sin escribir lista todo; "sin resultados" solo aparece tras una búsqueda vacía. */
export const Predeterminado: Story = {};

/** Con un valor inicial: al reabrir se resalta la opción elegida y el texto se puede borrar. */
export const ConValorInicial: Story = {
  name: "Con valor inicial", args: { initial: sampleAccount } };

/** Con mínimo de caracteres muestra una pista y no consulta al servidor. */
export const MinimoDeCaracteres: Story = {
  name: "Mínimo de caracteres", args: { minSearchLength: 3 } };

/** Latencia alta: esqueleto en la primera carga y spinner en las siguientes. */
export const RedLenta: Story = {
  name: "Red lenta", args: { latencyMs: 2000 } };

/** Error del servidor con botón "Reintentar". */
export const ErrorDelServidor: Story = {
  name: "Error del servidor", args: { fail: true } };

/** Paginación con pocas filas por página: scroll, teclado (`↓` al final) o botón "Cargar más". */
export const Paginacion: Story = {
  name: "Paginación", args: { pageSize: 5 } };

/** Incluye registros marcados como inactivos (`active: false`). */
export const ConInactivos: Story = {
  name: "Con inactivos", args: { allowInactive: true } };

/** Búsqueda que no devuelve nada. */
export const SinResultados: Story = {
  name: "Sin resultados",
  args: { search: async () => ({ items: [], total: 0, hasNextPage: false }) }
};

export const Deshabilitado: Story = { args: { disabled: true, initial: sampleAccount } };

/** Con estado de error: el mensaje lo pinta la aplicación. */
export const Invalido: Story = {
  name: "Inválido",
  args: { invalid: true },
  render: (args) => (
    <div>
      <AccountSelector {...args} />
      <p className="sb-hint" style={{ color: "#b42318" }}>Selecciona una cuenta para continuar.</p>
    </div>
  )
};

/** Contenido propio de cada opción con `renderOption`. */
export const OpcionPersonalizada: Story = {
  name: "Opción personalizada",
  render: (args) => {
    const [value, setValue] = useState<Party | null>(null);
    const search = useMemo(
      () => createMockSearch<Party>(() => ({ latencyMs: args.latencyMs ?? 350, failRate: false })),
      [args.latencyMs]
    );
    return (
      <MasterSelector<Party>
        entity="terceros"
        aria-label="Tercero"
        value={value}
        onChange={setValue}
        search={search}
        getOptionLabel={(p) => p.name}
        getOptionValue={(p) => p.id}
        placeholder="Cliente o proveedor"
        renderOption={(p, { active }) => (
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <strong style={{ fontWeight: active ? 700 : 500 }}>{p.name}</strong>
            <span style={{ color: "#667085", fontVariantNumeric: "tabular-nums" }}>{p.nit}</span>
          </div>
        )}
      />
    );
  }
};

/** Dentro de un `<form>`: Enter elige la opción y NO envía el formulario; `name` crea un input oculto. */
export const EnFormulario: Story = {
  name: "En formulario",
  render: (args) => {
    const [log, setLog] = useState("Sin enviar");
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setLog(`Enviado: cuenta = ${new FormData(event.currentTarget).get("account") || "(vacío)"}`);
        }}
      >
        <AccountSelector {...args} name="account" />
        <button type="submit" style={{ marginTop: 12, height: 34, padding: "0 14px" }}>Guardar</button>
        <p className="sb-hint" role="status">{log}</p>
      </form>
    );
  }
};
