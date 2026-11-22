/**
 * Estilos del paquete. Se inyectan una sola vez en <head>.
 * Todo el aspecto se controla con variables CSS (--ms-*) sobre `.ms-root`,
 * por lo que se puede tematizar desde la app sin tocar el componente:
 *
 *   .mi-selector { --ms-accent: #0f766e; --ms-radius: 4px; }
 */
export const masterComponentsCss = `
.ms-root{
  --ms-accent:#1457a6;
  --ms-accent-soft:#eaf1fb;
  --ms-ring:rgba(20,87,166,.22);
  --ms-text:#18212f;
  --ms-muted:#667085;
  --ms-placeholder:#98a2b3;
  --ms-border:#cdd5df;
  --ms-border-strong:#98a4b5;
  --ms-border-soft:#e8ecf1;
  --ms-surface:#fff;
  --ms-surface-alt:#f8f9fb;
  --ms-danger:#b42318;
  --ms-danger-soft:#fef3f2;
  --ms-radius:8px;
  --ms-height:40px;
  --ms-font:inherit;
  position:relative;width:100%;box-sizing:border-box;
  font-family:var(--ms-font);font-size:14px;line-height:1.35;color:var(--ms-text);
}
.ms-root *,.ms-root *::before,.ms-root *::after{box-sizing:border-box}
.ms-control{position:relative;display:flex;align-items:center}
.ms-input{
  width:100%;height:var(--ms-height);padding:0 66px 0 12px;margin:0;
  border:1px solid var(--ms-border);border-radius:var(--ms-radius);
  background:var(--ms-surface);color:inherit;font:inherit;text-overflow:ellipsis;
  transition:border-color .12s,box-shadow .12s,background-color .12s;
}
.ms-input::placeholder{color:var(--ms-placeholder)}
.ms-input:hover:not(:disabled){border-color:var(--ms-border-strong)}
.ms-input:focus{outline:none;border-color:var(--ms-accent);box-shadow:0 0 0 3px var(--ms-ring)}
.ms-input:disabled{background:var(--ms-surface-alt);color:var(--ms-muted);cursor:not-allowed}
.ms-root[data-invalid="true"] .ms-input{border-color:var(--ms-danger)}
.ms-root[data-invalid="true"] .ms-input:focus{box-shadow:0 0 0 3px rgba(180,35,24,.2)}
.ms-adorn{position:absolute;right:6px;top:0;bottom:0;display:flex;align-items:center;gap:2px}
.ms-icon-btn{
  display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;padding:0;
  border:0;border-radius:6px;background:transparent;color:var(--ms-muted);cursor:pointer;
}
.ms-icon-btn:hover:not(:disabled){background:var(--ms-border-soft);color:var(--ms-text)}
.ms-icon-btn:disabled{cursor:not-allowed;opacity:.5}
.ms-chevron{transition:transform .15s}
.ms-root[data-open="true"] .ms-chevron{transform:rotate(180deg)}
.ms-spin{
  width:14px;height:14px;margin:0 4px;border:2px solid var(--ms-border);border-top-color:var(--ms-accent);
  border-radius:50%;animation:ms-rot .7s linear infinite;
}
.ms-popup{
  position:absolute;left:0;right:0;z-index:1000;display:flex;flex-direction:column;overflow:hidden;
  background:var(--ms-surface);border:1px solid var(--ms-border);border-radius:calc(var(--ms-radius) + 2px);
  box-shadow:0 14px 32px -10px rgba(16,24,40,.28),0 2px 6px rgba(16,24,40,.08);
}
.ms-popup[data-placement="bottom"]{top:calc(100% + 6px)}
.ms-popup[data-placement="top"]{bottom:calc(100% + 6px)}
.ms-list{
  overflow-y:auto;overscroll-behavior:contain;padding:4px;margin:0;list-style:none;
  max-height:var(--ms-list-max,300px);
}
.ms-option{
  display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:6px;cursor:pointer;
  border-left:3px solid transparent;
}
.ms-option[data-active="true"]{background:var(--ms-accent-soft);border-left-color:var(--ms-accent)}
.ms-option[aria-selected="true"] .ms-option-label{font-weight:600;color:var(--ms-accent)}
.ms-option-main{flex:1;min-width:0}
.ms-option-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ms-option-desc{margin-top:1px;font-size:12px;color:var(--ms-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ms-check{flex:none;color:var(--ms-accent)}
.ms-mark{background:rgba(20,87,166,.16);color:inherit;border-radius:2px;padding:0 1px;margin:0 -1px}
.ms-list[data-busy="true"]{opacity:.6;transition:opacity .12s}
.ms-state{padding:22px 16px;text-align:center;color:var(--ms-muted)}
.ms-state-title{color:var(--ms-text);font-weight:600}
.ms-state-sub{margin-top:2px;font-size:12.5px}
.ms-state[data-tone="error"] .ms-state-title{color:var(--ms-danger)}
.ms-skel-row{padding:10px 12px;display:grid;gap:6px}
.ms-skel{
  height:12px;border-radius:4px;
  background:linear-gradient(90deg,var(--ms-border-soft) 25%,var(--ms-surface-alt) 50%,var(--ms-border-soft) 75%);
  background-size:200% 100%;animation:ms-shimmer 1.2s linear infinite;
}
.ms-inline-row{display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;color:var(--ms-muted);font-size:13px}
.ms-inline-row[data-tone="error"]{color:var(--ms-danger);background:var(--ms-danger-soft)}
.ms-link-btn{
  border:0;background:transparent;padding:2px 6px;border-radius:4px;font:inherit;font-weight:600;
  color:var(--ms-accent);cursor:pointer;
}
.ms-link-btn:hover{background:var(--ms-accent-soft)}
.ms-more{display:block;width:100%;padding:9px;border:0;border-top:1px solid var(--ms-border-soft);background:var(--ms-surface-alt);font:inherit;font-weight:600;color:var(--ms-accent);cursor:pointer}
.ms-more:hover{background:var(--ms-accent-soft)}
.ms-footer{
  display:flex;align-items:center;justify-content:space-between;gap:12px;padding:6px 12px;
  border-top:1px solid var(--ms-border-soft);background:var(--ms-surface-alt);font-size:12px;color:var(--ms-muted);
}
.ms-hints{display:flex;gap:12px;white-space:nowrap}
.ms-hint{display:inline-flex;align-items:center;gap:4px}
.ms-kbd{
  min-width:18px;padding:1px 5px;border:1px solid var(--ms-border);border-bottom-width:2px;border-radius:4px;
  background:var(--ms-surface);font:inherit;font-size:11px;text-align:center;color:var(--ms-text);
}
.ms-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
@media (hover:none){.ms-hints{display:none}.ms-option{padding:12px 10px}}
@media (prefers-reduced-motion:reduce){.ms-spin,.ms-skel{animation:none}.ms-chevron{transition:none}}
@keyframes ms-rot{to{transform:rotate(360deg)}}
@keyframes ms-shimmer{to{background-position:-200% 0}}
`;

const STYLE_ID = "master-components-styles";

/** Inyecta la hoja de estilos una única vez (seguro para SSR). */
export function injectMasterStyles(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = masterComponentsCss;
  document.head.appendChild(style);
}
