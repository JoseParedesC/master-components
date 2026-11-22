# Changelog

## 0.2.0

### Corregido
- Ya no aparece "No se encontraron resultados" al abrir sin escribir: solo se muestra cuando la búsqueda terminó y no devolvió nada. Mientras carga hay un esqueleto.
- Se puede borrar el texto del campo (antes reaparecía la etiqueta seleccionada).
- Al abrir con un valor seleccionado ya no se filtra por su propia etiqueta.
- Pasar `search`/`getOptionLabel` inline ya no relanza la búsqueda en cada render del padre.
- Debounce real (`debounceMs`) y cancelación de la petición anterior también al cerrar o por debajo de `minSearchLength`.
- "Cargar más" ya no oculta la lista; se deduplican opciones entre páginas.
- `minSearchLength` muestra una pista en vez de "sin resultados".
- Enter dentro del selector ya no envía el formulario; Escape no cierra modales contenedores.

### Añadido
- Navegación por teclado (↑ ↓ Re Pág Av Pág Ctrl+Inicio/Fin Enter Esc) con ARIA combobox/listbox.
- Carga automática al llegar al final de la lista (scroll y teclado).
- Rediseño: resaltado de coincidencias (sin distinguir tildes), descripción por opción, estados de carga/error con reintento, contador, pie de atajos, apertura hacia arriba si falta espacio, tematizable con variables CSS.
- Props: `getOptionDescription`, `renderOption`, `debounceMs`, `clearable`, `invalid`, `name`, `id`, `autoFocus`, textos adicionales.
- `useMasterSearch`: cancelación, ignora respuestas obsoletas, `loadMore` y `reset`.
- Prototipo (`npm run demo`) y pruebas (`npm test`).
