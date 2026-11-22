# Actualización de Storybook

Copia estas carpetas sobre tu repo (reemplazan lo anterior):

- `.storybook/`  → main, manager, preview, tema y CSS
- `stories/`     → Introducción, Playground, Componentes, Pruebas de comportamiento
- `tests/stories.test.tsx` → ejecuta las `play` de las stories en vitest

Después:

```bash
npm i -D @storybook/addon-a11y
npm run typecheck && npm test
npm run storybook
```

`package.json` y el workflow no se tocan.
