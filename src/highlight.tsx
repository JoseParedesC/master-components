import React from "react";

const fold = (text: string) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/**
 * Resalta todas las coincidencias de `term` en `label` ignorando
 * mayúsculas y tildes ("ana" encuentra "Análisis").
 */
export function highlightMatch(label: string, term: string): React.ReactNode {
  const needle = fold(term.trim());
  if (!needle) return label;

  let haystack = "";
  const map: number[] = [];
  for (let i = 0; i < label.length; i++) {
    const piece = fold(label[i]);
    for (let k = 0; k < piece.length; k++) map.push(i);
    haystack += piece;
  }

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  let from = 0;
  let key = 0;

  while (from <= haystack.length - needle.length) {
    const index = haystack.indexOf(needle, from);
    if (index === -1) break;
    const start = map[index];
    const end = map[index + needle.length - 1] + 1;
    if (start < cursor) { from = index + 1; continue; }
    if (start > cursor) parts.push(label.slice(cursor, start));
    parts.push(
      <mark className="ms-mark" key={key++}>
        {label.slice(start, end)}
      </mark>
    );
    cursor = end;
    from = index + needle.length;
  }

  if (parts.length === 0) return label;
  if (cursor < label.length) parts.push(label.slice(cursor));
  return parts;
}
