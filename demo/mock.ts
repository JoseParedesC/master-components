import type { MasterBase, MasterSearchFn } from "../src";

export interface Account extends MasterBase { kind: string }
export interface Party extends MasterBase { nit: string }
export interface CostCenter extends MasterBase { area: string }

export interface MockConfig {
  latencyMs: number;
  failRate: boolean;
}

const fold = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// ---- Cuentas (estilo PUC) -------------------------------------------------
const accountBases: [string, string, string][] = [
  ["1105", "Caja", "Activo"], ["1110", "Bancos", "Activo"], ["1305", "Clientes", "Activo"],
  ["1435", "Mercancías no fabricadas", "Activo"], ["1524", "Equipo de oficina", "Activo"],
  ["2205", "Proveedores nacionales", "Pasivo"], ["2365", "Retención en la fuente", "Pasivo"],
  ["2408", "Impuesto sobre las ventas por pagar", "Pasivo"], ["3115", "Aportes sociales", "Patrimonio"],
  ["4135", "Comercio al por mayor y al por menor", "Ingreso"], ["5105", "Gastos de personal", "Gasto"],
  ["5135", "Servicios", "Gasto"], ["5160", "Depreciaciones", "Gasto"], ["6135", "Costo de ventas", "Costo"]
];
const accountSuffix = ["Moneda nacional", "Moneda extranjera", "Sede Cartagena", "Sede Barranquilla",
  "Sede Bogotá", "Sede Medellín", "Cuenta puente", "Ajuste por inflación", "Fondo fijo", "Otros"];

export const ACCOUNTS: Account[] = accountBases.flatMap(([code, name, kind], b) =>
  accountSuffix.map((suffix, s) => ({
    id: `acc-${code}${String(s + 1).padStart(2, "0")}`,
    code: `${code}${String(s + 1).padStart(2, "0")}`,
    name: `${name} - ${suffix}`,
    kind,
    active: (b * 10 + s) % 9 !== 0
  }))
);

// ---- Terceros -------------------------------------------------------------
const firstNames = ["Camila", "Andrés", "Valentina", "Julián", "Sofía", "Mateo", "Daniela", "Santiago", "Luisa", "Sebastián"];
const lastNames = ["Pérez", "Gómez", "Rodríguez", "Martínez", "Hernández", "Castaño", "Ortega", "Villalba", "Mercado", "Arrieta"];
const companies = ["Comercializadora del Caribe", "Distribuciones Bahía", "Ingeniería Heredia", "Logística Bocagrande",
  "Servicios Marítimos Getsemaní", "Alimentos La Popa", "Inversiones Manga", "Textiles Turbaco"];

export const PARTIES: Party[] = [
  ...firstNames.flatMap((f, i) => lastNames.map((l, j) => ({
    id: `p-${i}-${j}`,
    code: String(1000 + i * 10 + j),
    name: `${f} ${l}`,
    nit: `${1_043_000_000 + i * 7919 + j * 104_729}`,
    active: (i + j) % 11 !== 0
  }))),
  ...companies.map((c, i) => ({ id: `c-${i}`, code: String(9000 + i), name: c, nit: `900.${100 + i * 37}.${200 + i * 11}-${i % 10}`, active: true }))
];

// ---- Centros de costo -----------------------------------------------------
export const COST_CENTERS: CostCenter[] = [
  ["CC01", "Administración", "Corporativo"], ["CC02", "Contabilidad", "Corporativo"], ["CC03", "Talento humano", "Corporativo"],
  ["CC10", "Ventas Caribe", "Comercial"], ["CC11", "Ventas Andina", "Comercial"], ["CC12", "Mercadeo", "Comercial"],
  ["CC20", "Bodega Cartagena", "Operaciones"], ["CC21", "Bodega Barranquilla", "Operaciones"], ["CC22", "Transporte", "Operaciones"],
  ["CC30", "Tecnología", "Soporte"], ["CC31", "Mantenimiento", "Soporte"], ["CC40", "Proyectos especiales", "Proyectos"]
].map(([code, name, area]) => ({ id: code, code, name, area, active: code !== "CC12" }));

// ---- Búsqueda simulada ----------------------------------------------------
const DATASETS: Record<string, MasterBase[]> = {
  cuentas: ACCOUNTS, terceros: PARTIES, centros: COST_CENTERS
};

export function createMockSearch<T extends MasterBase>(getConfig: () => MockConfig): MasterSearchFn<T> {
  return ({ entity, query, page, pageSize, signal }) =>
    new Promise((resolve, reject) => {
      const { latencyMs, failRate } = getConfig();
      const timer = window.setTimeout(() => {
        if (failRate) return reject(new Error("Servidor no disponible (simulado)"));
        const tokens = fold(query).split(/\s+/).filter(Boolean);
        const rows = (DATASETS[entity] ?? []).filter((row) => {
          const hay = fold(`${row.code} ${row.name}`);
          return tokens.every((t) => hay.includes(t));
        });
        const start = (page - 1) * pageSize;
        resolve({
          items: rows.slice(start, start + pageSize) as T[],
          total: rows.length,
          page,
          pageSize,
          hasNextPage: start + pageSize < rows.length
        });
      }, latencyMs);

      // Cancelación real, como haría fetch(url, { signal }).
      signal?.addEventListener("abort", () => {
        window.clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      });
    });
}
