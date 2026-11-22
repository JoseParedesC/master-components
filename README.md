# @joseparedesc/master-components

Componentes React reutilizables para gestionar maestros y seleccionar registros mediante búsqueda.

## Instalación

```bash
npm install @joseparedesc/master-components
```

## MasterSelector

```tsx
import { MasterSelector } from "@joseparedesc/master-components";

interface Account {
  id: string;
  code: string;
  name: string;
  active: boolean;
}

<MasterSelector<Account>
  value={account}
  onChange={setAccount}
  search={async ({ query, page, pageSize }) => {
    const response = await fetch(
      `/api/accounts?search=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`
    );

    return response.json();
  }}
  getOptionLabel={(account) =>
    `${account.code} - ${account.name}`
  }
  getOptionValue={(account) => account.id}
  placeholder="Buscar cuenta..."
/>
```

## Prototipo

```bash
npm install
npm run demo        # http://localhost:5173
npm test            # pruebas de comportamiento (teclado, estados, paginación)
```

La demo (`demo/`) simula cuentas contables, terceros y centros de costo con latencia,
paginación, registros inactivos y errores configurables.

## Teclado

| Tecla | Acción |
| --- | --- |
| `↓` / `↑` | Abre el panel y mueve la selección; al llegar al final carga la siguiente página |
| `Re Pág` / `Av Pág` | Salta 8 opciones |
| `Ctrl` + `Inicio` / `Fin` | Primera / última opción |
| `Enter` | Elige la opción resaltada (no envía el formulario) |
| `Esc` | Cierra y descarta lo escrito |

El componente sigue el patrón ARIA *combobox con listbox* (`aria-activedescendant`, región `aria-live`).

## Props opcionales

| Prop | Default | Descripción |
| --- | --- | --- |
| `getOptionDescription` | – | Segunda línea bajo cada opción |
| `renderOption` | – | Render propio de la opción |
| `debounceMs` | `250` | Espera tras la última tecla antes de buscar |
| `minSearchLength` | `0` | Muestra una pista en lugar de buscar |
| `clearable` | `true` | Botón para limpiar |
| `invalid` | `false` | Estilo de error |
| `name` | – | Input oculto con el id seleccionado (formularios nativos) |
| `minLengthText`, `loadMoreText`, `retryText`, `clearLabel` | español | Textos |

## Estilos

Los estilos se inyectan solos. Se tematiza con variables CSS:

```css
.mi-selector {
  --ms-accent: #0f766e;
  --ms-radius: 4px;
  --ms-height: 36px;
}
```

Variables: `--ms-accent`, `--ms-accent-soft`, `--ms-ring`, `--ms-text`, `--ms-muted`,
`--ms-border`, `--ms-surface`, `--ms-danger`, `--ms-radius`, `--ms-height`, `--ms-font`.
También se exporta `masterComponentsCss` por si necesitas inyectarlo con CSP/nonce o en SSR.

## Contrato de búsqueda

La función `search` debe retornar:

```ts
{
  items: T[];
  total?: number;
  page?: number;
  pageSize?: number;
  hasNextPage?: boolean;
}
```

Si no envías `hasNextPage` pero sí `total`, se calcula solo. `search` recibe además
`signal` (`AbortSignal`): pásalo a `fetch` para cancelar búsquedas obsoletas.

## Publicar

Antes de publicar cambia `@joseparedesc/master-components` por el nombre real de tu paquete.

```bash
npm install
npm run typecheck
npm run build
npm login
npm publish --access public
```

Para una nueva versión:

```bash
npm version patch
npm publish
```
