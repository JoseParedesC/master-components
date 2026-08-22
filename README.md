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
