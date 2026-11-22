# Pendientes – master-components (sesión 2026-11-21)

Estado: mejoras implementadas, `tsc`, `tsup`, `vite build` y 9 pruebas (vitest) en verde.
No se llegó al límite de consumo de la sesión; esto es lo que queda abierto.

## Por verificar
- [ ] **Revisión visual en navegador real** (`npm run demo`). En la sesión no había navegador headless, así que el estilo se validó solo por código y pruebas de comportamiento. Revisar: apertura hacia arriba cerca del borde inferior, scroll con el mouse sobre la barra de desplazamiento, móvil (< 400 px).
- [ ] Probar con lector de pantalla (NVDA/VoiceOver) el anuncio de resultados.

## Mejoras no incluidas
- [ ] Selección múltiple (chips) – hoy solo selección simple.
- [ ] Si una página completa queda vacía tras filtrar inactivos pero `hasNextPage` es true, cargar la siguiente automáticamente.
- [ ] Modo oscuro (hoy solo variables `--ms-*`; sin `prefers-color-scheme`).
- [ ] Opción "Crear nuevo…" al final de la lista cuando no hay resultados.
- [ ] Caché de búsquedas recientes por `entity` + `query`.
- [ ] Virtualización para listas de miles de elementos.
- [ ] Componente de CRUD de maestros (tabla + formulario), mencionado en la descripción del paquete pero aún no existe en `src/`.

## Publicación
- [ ] Cambiar el nombre real del paquete en `package.json` (aún `@joseparedesc/master-components`) y publicar `0.2.0` (`npm run typecheck && npm test && npm publish`).
- [ ] Agregar `npm test` al workflow `.github/workflows/publish.yml`.
