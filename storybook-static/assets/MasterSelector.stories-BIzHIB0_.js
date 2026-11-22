import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{n,p as r}from"./iframe-Bwi8FIpd.js";function i(e,t){let n=o(t.trim());if(!n)return e;let r=``,i=[];for(let t=0;t<e.length;t++){let n=o(e[t]);for(let e=0;e<n.length;e++)i.push(t);r+=n}let s=[],c=0,l=0,u=0;for(;l<=r.length-n.length;){let t=r.indexOf(n,l);if(t===-1)break;let o=i[t],d=i[t+n.length-1]+1;o<c?l=t+1:(o>c&&s.push(e.slice(c,o)),s.push((0,a.jsx)(`mark`,{className:`ms-mark`,children:e.slice(o,d)},u++)),c=d,l=t+n.length)}return s.length===0?e:(c<e.length&&s.push(e.slice(c)),s)}var a,o;function s(){return(s=t((()=>{r(),a=n(),o=e=>e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase()})))()}function c(){if(typeof document>`u`||document.getElementById(u))return;let e=document.createElement(`style`);e.id=u,e.textContent=l,document.head.appendChild(e)}var l,u;function d(){return(d=t((()=>{l=`
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
`,u=`master-components-styles`})))()}function ee(e){let{value:t,entity:n,onChange:r,getOptionLabel:a,getOptionValue:o,getOptionDescription:s,renderOption:l,placeholder:u=`Buscar...`,disabled:d=!1,clearable:ee=!0,invalid:se=!1,minSearchLength:h=0,pageSize:ce=20,debounceMs:g=250,allowInactive:le=!1,initialOptions:_=m,noResultsText:ue=`No se encontraron resultados`,loadingText:v=`Buscando...`,errorText:y=`No fue posible realizar la búsqueda`,minLengthText:de=`Escribe al menos {min} caracteres para buscar`,loadMoreText:fe=`Cargar más`,retryText:pe=`Reintentar`,clearLabel:me=`Limpiar selección`,className:b,id:x,name:S,autoFocus:C,"aria-label":he,"aria-labelledby":ge}=e,w=(0,f.useRef)(e);w.current=e;let _e=(0,f.useId)(),T=`${_e}-list`,E=e=>`${_e}-opt-${e}`,[D,O]=(0,f.useState)(null),k=t!==void 0,A=k?t:D,j=A?o(A):null,M=A?a(A):``,[N,P]=(0,f.useState)(``),[F,I]=(0,f.useState)(!1),[L,R]=(0,f.useState)(!1),[z,B]=(0,f.useState)(_),[V,H]=(0,f.useState)(`idle`),[ve,U]=(0,f.useState)(!1),[ye,be]=(0,f.useState)(1),[xe,Se]=(0,f.useState)(1),[Ce,we]=(0,f.useState)(!1),[Te,Ee]=(0,f.useState)(),[W,G]=(0,f.useState)(-1),[De,Oe]=(0,f.useState)(`bottom`),[ke,Ae]=(0,f.useState)(300),K=(0,f.useRef)(0),je=(0,f.useRef)(null),Me=(0,f.useRef)(null),q=(0,f.useRef)(`keyboard`),Ne=(0,f.useRef)(null),J=(0,f.useRef)(null),Pe=(0,f.useRef)(null),Y=F?N:``,Fe=Y.trim().length<h;ne(()=>c(),[]);let X=(0,f.useCallback)(async(e,t)=>{let n=w.current,r=n.minSearchLength??0,i=n.pageSize??20;if(Me.current=e,je.current?.abort(),e.trim().length<r){K.current++,B(n.initialOptions??m),we(!1),Ee(void 0),U(!1),H(`idle`),G(-1);return}let a=new AbortController;je.current=a;let o=++K.current;H(`loading`),U(t>1);try{let r=await n.search({entity:n.entity,query:e.trim(),page:t,pageSize:i,signal:a.signal});if(o!==K.current)return;let s=n.allowInactive?r.items:r.items.filter(e=>e.active!==!1);if(B(e=>{let r=t===1?[]:e,i=new Set(r.map(e=>n.getOptionValue(e))),a=[...r];for(let e of s){let t=n.getOptionValue(e);i.has(t)||(i.add(t),a.push(e))}return a}),Ee(r.total),we(r.hasNextPage??(r.total!==void 0&&t*i<r.total)),Se(t),H(`success`),U(!1),t===1){let e=n.value?n.getOptionValue(n.value):null,t=e?s.findIndex(t=>n.getOptionValue(t)===e):-1;q.current=`keyboard`,G(t>=0?t:s.length?0:-1)}}catch(e){if(re(e)||o!==K.current)return;console.error(`MasterSelector search failed:`,e),be(t),H(`error`),U(!1)}},[]);(0,f.useEffect)(()=>{if(!L)return;let e=Me.current===null?0:g,t=window.setTimeout(()=>void X(Y,1),e);return()=>window.clearTimeout(t)},[L,Y,n,ce,le,h,g,X]);let Z=(0,f.useCallback)(()=>{je.current?.abort(),K.current++,Me.current=null,R(!1),I(!1),P(``),H(`idle`),U(!1),G(-1),B(w.current.initialOptions??m)},[]);(0,f.useEffect)(()=>()=>je.current?.abort(),[]),(0,f.useEffect)(()=>{d&&L&&Z()},[d,L,Z]),ne(()=>{if(!L||!Ne.current)return;let e=Ne.current.getBoundingClientRect(),t=window.innerHeight-e.bottom-70,n=e.top-70,r=t<220&&n>t;Oe(r?`top`:`bottom`),Ae(Math.max(160,Math.min(320,r?n:t)))},[L]),(0,f.useEffect)(()=>{!L||W<0||q.current!==`keyboard`||document.getElementById(E(W))?.scrollIntoView?.({block:`nearest`})},[W,L,z.length]),(0,f.useEffect)(()=>{C&&J.current?.focus()},[C]);let Q=()=>{d||R(!0)},Ie=e=>{k||O(e),r(e),Z(),J.current?.focus()},Le=()=>{k||O(null),r(null),P(``),I(!1),J.current?.focus()},Re=()=>{V!==`loading`&&Ce&&X(Y,xe+1)},ze=e=>{if(q.current=`keyboard`,z.length===0)return;let t=z.length-1,n=Math.min(t,Math.max(0,(W<0?e>0?-1:1:W)+e));G(n),n===t&&e>0&&Ce&&Re()},Be=e=>{if(!e.nativeEvent.isComposing)switch(e.key){case`ArrowDown`:e.preventDefault(),L?ze(1):Q();break;case`ArrowUp`:e.preventDefault(),L?ze(-1):Q();break;case`PageDown`:L&&(e.preventDefault(),ze(te));break;case`PageUp`:L&&(e.preventDefault(),ze(-8));break;case`Home`:case`End`:L&&e.ctrlKey&&(e.preventDefault(),q.current=`keyboard`,G(e.key===`Home`?0:z.length-1));break;case`Enter`:L&&W>=0&&z[W]!==void 0&&(e.preventDefault(),Ie(z[W]));break;case`Escape`:L&&(e.preventDefault(),e.stopPropagation(),Z());break;case`Tab`:L&&Z()}},Ve=e=>{Ne.current?.contains(e.relatedTarget)||L&&Z()},He=e=>{let t=e.currentTarget;Ce&&t.scrollTop+t.clientHeight>=t.scrollHeight-32&&Re()},$=z.length>0,Ue=!Fe&&!$&&V!==`success`&&V!==`error`,We=!Fe&&!$&&V===`success`,Ge=V===`error`&&!$,Ke=V===`error`&&$,qe=V===`loading`&&!ve&&$,Je=V===`loading`?v:V===`error`?y:V===`success`?$?`${z.length}`:ue:``,Ye=L&&F?N:M;return(0,p.jsxs)(`div`,{ref:Ne,className:b?`ms-root ${b}`:`ms-root`,"data-open":L,"data-invalid":se||void 0,onBlur:Ve,children:[(0,p.jsxs)(`div`,{className:`ms-control`,children:[(0,p.jsx)(`input`,{ref:J,id:x,type:`text`,role:`combobox`,className:`ms-input`,autoComplete:`off`,spellCheck:!1,"aria-expanded":L,"aria-controls":L?T:void 0,"aria-haspopup":`listbox`,"aria-autocomplete":`list`,"aria-activedescendant":L&&W>=0?E(W):void 0,"aria-label":he,"aria-labelledby":ge,"aria-invalid":se||void 0,value:Ye,disabled:d,placeholder:u,onFocus:e=>{if(Q(),M){let t=e.currentTarget;window.requestAnimationFrame(()=>t.select())}},onClick:Q,onChange:e=>{P(e.target.value),I(!0),R(!0)},onKeyDown:Be}),(0,p.jsxs)(`div`,{className:`ms-adorn`,children:[V===`loading`&&L&&(0,p.jsx)(`span`,{className:`ms-spin`,role:`presentation`}),ee&&A&&!d&&(0,p.jsx)(`button`,{type:`button`,className:`ms-icon-btn`,tabIndex:-1,"aria-label":me,onMouseDown:e=>e.preventDefault(),onClick:Le,children:(0,p.jsx)(ae,{})}),(0,p.jsx)(`button`,{type:`button`,className:`ms-icon-btn`,tabIndex:-1,"aria-hidden":`true`,disabled:d,onMouseDown:e=>e.preventDefault(),onClick:()=>L?Z():(J.current?.focus(),Q()),children:(0,p.jsx)(ie,{})})]}),S&&(0,p.jsx)(`input`,{type:`hidden`,name:S,value:j??``})]}),(0,p.jsx)(`div`,{className:`ms-sr`,role:`status`,"aria-live":`polite`,children:L?Je:``}),L&&(0,p.jsxs)(`div`,{className:`ms-popup`,"data-placement":De,style:{"--ms-list-max":`${ke}px`},onMouseDown:e=>e.preventDefault(),children:[Fe&&(0,p.jsx)(`div`,{className:`ms-state`,children:(0,p.jsx)(`div`,{className:`ms-state-title`,children:de.replace(`{min}`,String(h))})}),Ue&&(0,p.jsx)(`div`,{"aria-hidden":`true`,children:[62,78,54].map(e=>(0,p.jsx)(`div`,{className:`ms-skel-row`,children:(0,p.jsx)(`div`,{className:`ms-skel`,style:{width:`${e}%`}})},e))}),We&&(0,p.jsxs)(`div`,{className:`ms-state`,children:[(0,p.jsx)(`div`,{className:`ms-state-title`,children:ue}),Y.trim()&&(0,p.jsx)(`div`,{className:`ms-state-sub`,children:`Prueba con otro término o revisa la ortografía.`})]}),Ge&&(0,p.jsxs)(`div`,{className:`ms-state`,"data-tone":`error`,children:[(0,p.jsx)(`div`,{className:`ms-state-title`,children:y}),(0,p.jsx)(`button`,{type:`button`,className:`ms-link-btn`,onClick:()=>void X(Y,ye),children:pe})]}),$&&(0,p.jsx)(`ul`,{ref:Pe,id:T,role:`listbox`,className:`ms-list`,"data-busy":qe||void 0,"aria-busy":V===`loading`,onScroll:He,children:z.map((e,t)=>{let n=o(e),r=n===j,c=t===W,u=a(e),d=s?.(e);return(0,p.jsxs)(`li`,{id:E(t),role:`option`,className:`ms-option`,"aria-selected":r,"data-active":c,onMouseMove:()=>{(W!==t||q.current!==`mouse`)&&(q.current=`mouse`,G(t))},onClick:()=>Ie(e),children:[l?(0,p.jsx)(`div`,{className:`ms-option-main`,children:l(e,{active:c,selected:r,query:Y})}):(0,p.jsxs)(`div`,{className:`ms-option-main`,children:[(0,p.jsx)(`div`,{className:`ms-option-label`,children:i(u,Y)}),d&&(0,p.jsx)(`div`,{className:`ms-option-desc`,children:d})]}),r&&(0,p.jsx)(oe,{})]},n)})}),ve&&(0,p.jsxs)(`div`,{className:`ms-inline-row`,"aria-hidden":`true`,children:[(0,p.jsx)(`span`,{className:`ms-spin`}),` `,v]}),Ke&&(0,p.jsxs)(`div`,{className:`ms-inline-row`,"data-tone":`error`,children:[y,(0,p.jsx)(`button`,{type:`button`,className:`ms-link-btn`,onClick:()=>void X(Y,ye),children:pe})]}),Ce&&!ve&&V!==`error`&&(0,p.jsx)(`button`,{type:`button`,className:`ms-more`,onClick:Re,children:fe}),$&&(0,p.jsxs)(`div`,{className:`ms-footer`,children:[(0,p.jsx)(`span`,{children:Te===void 0?`${z.length} resultados`:`${z.length} de ${Te}`}),(0,p.jsxs)(`span`,{className:`ms-hints`,"aria-hidden":`true`,children:[(0,p.jsxs)(`span`,{className:`ms-hint`,children:[(0,p.jsx)(`kbd`,{className:`ms-kbd`,children:`↑`}),(0,p.jsx)(`kbd`,{className:`ms-kbd`,children:`↓`}),` navegar`]}),(0,p.jsxs)(`span`,{className:`ms-hint`,children:[(0,p.jsx)(`kbd`,{className:`ms-kbd`,children:`Enter`}),` elegir`]}),(0,p.jsxs)(`span`,{className:`ms-hint`,children:[(0,p.jsx)(`kbd`,{className:`ms-kbd`,children:`Esc`}),` cerrar`]})]})]})]})]})}var f,p,m,te,ne,re,ie,ae,oe;function se(){return(se=t((()=>{f=e(r(),1),s(),d(),p=n(),m=[],te=8,ne=typeof window<`u`?f.useLayoutEffect:f.useEffect,re=e=>typeof e==`object`&&!!e&&e.name===`AbortError`,ie=()=>(0,p.jsx)(`svg`,{className:`ms-chevron`,width:`16`,height:`16`,viewBox:`0 0 20 20`,fill:`none`,"aria-hidden":`true`,children:(0,p.jsx)(`path`,{d:`M5 7.5l5 5 5-5`,stroke:`currentColor`,strokeWidth:`1.7`,strokeLinecap:`round`,strokeLinejoin:`round`})}),ae=()=>(0,p.jsx)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 20 20`,fill:`none`,"aria-hidden":`true`,children:(0,p.jsx)(`path`,{d:`M5 5l10 10M15 5L5 15`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`})}),oe=()=>(0,p.jsx)(`svg`,{className:`ms-check`,width:`16`,height:`16`,viewBox:`0 0 20 20`,fill:`none`,"aria-hidden":`true`,children:(0,p.jsx)(`path`,{d:`M4.5 10.5l3.5 3.5 7.5-8`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`})}),ee.__docgenInfo={description:``,methods:[],displayName:`MasterSelector`,props:{entity:{required:!0,tsType:{name:`string`},description:``},value:{required:!1,tsType:{name:`union`,raw:`T | null`,elements:[{name:`T`},{name:`null`}]},description:``},onChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(value: T | null) => void`,signature:{arguments:[{type:{name:`union`,raw:`T | null`,elements:[{name:`T`},{name:`null`}]},name:`value`}],return:{name:`void`}}},description:``},search:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(
  params: MasterSearchParams
) => Promise<MasterSearchResult<T>>`,signature:{arguments:[{type:{name:`MasterSearchParams`},name:`params`}],return:{name:`Promise`,elements:[{name:`MasterSearchResult`,elements:[{name:`T`}],raw:`MasterSearchResult<T>`}],raw:`Promise<MasterSearchResult<T>>`}}},description:``},getOptionLabel:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(item: T) => string`,signature:{arguments:[{type:{name:`T`},name:`item`}],return:{name:`string`}}},description:``},getOptionValue:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(item: T) => string`,signature:{arguments:[{type:{name:`T`},name:`item`}],return:{name:`string`}}},description:``},getOptionDescription:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(item: T) => string | undefined`,signature:{arguments:[{type:{name:`T`},name:`item`}],return:{name:`union`,raw:`string | undefined`,elements:[{name:`string`},{name:`undefined`}]}}},description:`Segunda línea opcional bajo la etiqueta (p. ej. tipo de cuenta).`},renderOption:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(item: T, state: MasterOptionState) => ReactNode`,signature:{arguments:[{type:{name:`T`},name:`item`},{type:{name:`MasterOptionState`},name:`state`}],return:{name:`ReactNode`}}},description:`Render personalizado del contenido de cada opción.`},placeholder:{required:!1,tsType:{name:`string`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``},clearable:{required:!1,tsType:{name:`boolean`},description:`Muestra el botón para limpiar la selección. Default: true.`},invalid:{required:!1,tsType:{name:`boolean`},description:`Marca el campo con estilo de error.`},minSearchLength:{required:!1,tsType:{name:`number`},description:``},pageSize:{required:!1,tsType:{name:`number`},description:``},debounceMs:{required:!1,tsType:{name:`number`},description:`Espera (ms) tras la última tecla antes de buscar. Default: 250.`},allowInactive:{required:!1,tsType:{name:`boolean`},description:``},initialOptions:{required:!1,tsType:{name:`Array`,elements:[{name:`T`}],raw:`T[]`},description:``},noResultsText:{required:!1,tsType:{name:`string`},description:``},loadingText:{required:!1,tsType:{name:`string`},description:``},errorText:{required:!1,tsType:{name:`string`},description:``},minLengthText:{required:!1,tsType:{name:`string`},description:"Usa `{min}` como marcador del mínimo de caracteres."},loadMoreText:{required:!1,tsType:{name:`string`},description:``},retryText:{required:!1,tsType:{name:`string`},description:``},clearLabel:{required:!1,tsType:{name:`string`},description:``},className:{required:!1,tsType:{name:`string`},description:``},id:{required:!1,tsType:{name:`string`},description:``},name:{required:!1,tsType:{name:`string`},description:`Si se define, se renderiza un input oculto con el valor seleccionado (formularios nativos).`},autoFocus:{required:!1,tsType:{name:`boolean`},description:``},"aria-label":{required:!1,tsType:{name:`string`},description:``},"aria-labelledby":{required:!1,tsType:{name:`string`},description:``}}}})))()}function h(e){return({entity:t,query:n,page:r,pageSize:i,signal:a})=>new Promise((o,s)=>{let{latencyMs:c,failRate:l}=e(),u=window.setTimeout(()=>{if(l)return s(Error(`Servidor no disponible (simulado)`));let e=ce(n).split(/\s+/).filter(Boolean),a=(pe[t]??[]).filter(t=>{let n=ce(`${t.code} ${t.name}`);return e.every(e=>n.includes(e))}),c=(r-1)*i;o({items:a.slice(c,c+i),total:a.length,page:r,pageSize:i,hasNextPage:c+i<a.length})},c);a?.addEventListener(`abort`,()=>{window.clearTimeout(u),s(new DOMException(`Aborted`,`AbortError`))})})}var ce,g,le,_,ue,v,y,de,fe,pe;function me(){return(me=t((()=>{ce=e=>e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase(),g=[[`1105`,`Caja`,`Activo`],[`1110`,`Bancos`,`Activo`],[`1305`,`Clientes`,`Activo`],[`1435`,`Mercancías no fabricadas`,`Activo`],[`1524`,`Equipo de oficina`,`Activo`],[`2205`,`Proveedores nacionales`,`Pasivo`],[`2365`,`Retención en la fuente`,`Pasivo`],[`2408`,`Impuesto sobre las ventas por pagar`,`Pasivo`],[`3115`,`Aportes sociales`,`Patrimonio`],[`4135`,`Comercio al por mayor y al por menor`,`Ingreso`],[`5105`,`Gastos de personal`,`Gasto`],[`5135`,`Servicios`,`Gasto`],[`5160`,`Depreciaciones`,`Gasto`],[`6135`,`Costo de ventas`,`Costo`]],le=[`Moneda nacional`,`Moneda extranjera`,`Sede Cartagena`,`Sede Barranquilla`,`Sede Bogotá`,`Sede Medellín`,`Cuenta puente`,`Ajuste por inflación`,`Fondo fijo`,`Otros`],_=g.flatMap(([e,t,n],r)=>le.map((i,a)=>({id:`acc-${e}${String(a+1).padStart(2,`0`)}`,code:`${e}${String(a+1).padStart(2,`0`)}`,name:`${t} - ${i}`,kind:n,active:(r*10+a)%9!=0}))),ue=[`Camila`,`Andrés`,`Valentina`,`Julián`,`Sofía`,`Mateo`,`Daniela`,`Santiago`,`Luisa`,`Sebastián`],v=[`Pérez`,`Gómez`,`Rodríguez`,`Martínez`,`Hernández`,`Castaño`,`Ortega`,`Villalba`,`Mercado`,`Arrieta`],y=[`Comercializadora del Caribe`,`Distribuciones Bahía`,`Ingeniería Heredia`,`Logística Bocagrande`,`Servicios Marítimos Getsemaní`,`Alimentos La Popa`,`Inversiones Manga`,`Textiles Turbaco`],de=[...ue.flatMap((e,t)=>v.map((n,r)=>({id:`p-${t}-${r}`,code:String(1e3+t*10+r),name:`${e} ${n}`,nit:`${1043e6+t*7919+r*104729}`,active:(t+r)%11!=0}))),...y.map((e,t)=>({id:`c-${t}`,code:String(9e3+t),name:e,nit:`900.${100+t*37}.${200+t*11}-${t%10}`,active:!0}))],fe=[[`CC01`,`Administración`,`Corporativo`],[`CC02`,`Contabilidad`,`Corporativo`],[`CC03`,`Talento humano`,`Corporativo`],[`CC10`,`Ventas Caribe`,`Comercial`],[`CC11`,`Ventas Andina`,`Comercial`],[`CC12`,`Mercadeo`,`Comercial`],[`CC20`,`Bodega Cartagena`,`Operaciones`],[`CC21`,`Bodega Barranquilla`,`Operaciones`],[`CC22`,`Transporte`,`Operaciones`],[`CC30`,`Tecnología`,`Soporte`],[`CC31`,`Mantenimiento`,`Soporte`],[`CC40`,`Proyectos especiales`,`Proyectos`]].map(([e,t,n])=>({id:e,code:e,name:t,area:n,active:e!==`CC12`})),pe={cuentas:_,terceros:de,centros:fe}})))()}function b({latencyMs:e,fail:t,initial:n,search:r,...i}){let[a,o]=(0,x.useState)(n??null),s=(0,x.useMemo)(()=>r??h(()=>({latencyMs:e,failRate:t})),[r,e,t]);return(0,S.jsx)(ee,{entity:`cuentas`,"aria-label":`Cuenta contable`,value:a,onChange:o,search:s,getOptionLabel:e=>`${e.code} - ${e.name}`,getOptionValue:e=>e.id,getOptionDescription:e=>e.kind,...i})}var x,S,C,he,ge,w,_e,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z;function B(){return(B=t((()=>{x=e(r(),1),se(),me(),S=n(),{expect:C,userEvent:he,waitFor:ge,within:w}=__STORYBOOK_MODULE_TEST__,_e={title:`Components/MasterSelector`,component:b,parameters:{docs:{description:{component:`Selector con búsqueda remota para maestros. Navega con ↑ ↓ Re Pág Av Pág Ctrl+Inicio/Fin, elige con Enter y cierra con Esc. Usa los controles para cambiar latencia, errores y paginación.`}}},args:{latencyMs:350,fail:!1,minSearchLength:0,pageSize:20,debounceMs:250,allowInactive:!1,disabled:!1,invalid:!1,clearable:!0,placeholder:`Busca por código o nombre`},argTypes:{latencyMs:{control:{type:`range`,min:0,max:3e3,step:50}},pageSize:{control:{type:`number`,min:3,max:50}},minSearchLength:{control:{type:`number`,min:0,max:5}},debounceMs:{control:{type:`number`,min:0,max:1e3,step:50}}}},T={},E={args:{latencyMs:100},play:async({canvasElement:e})=>{let t=w(e),n=t.getByRole(`combobox`);await he.click(n),await ge(()=>C(t.getAllByRole(`option`).length).toBeGreaterThan(2)),await he.keyboard(`{ArrowDown}{ArrowDown}{Enter}`),await ge(()=>C(n.value).toMatch(/^\d+ - /))}},D={render:e=>(0,S.jsx)(b,{...e,initial:_[3]})},O={args:{minSearchLength:3}},k={args:{latencyMs:2e3}},A={args:{fail:!0}},j={args:{pageSize:5}},M={args:{allowInactive:!0}},N={render:e=>(0,S.jsx)(b,{...e,search:async()=>({items:[],total:0,hasNextPage:!1})})},P={render:e=>(0,S.jsx)(b,{...e,disabled:!0,initial:_[0]})},F={args:{invalid:!0},render:e=>(0,S.jsxs)(`div`,{children:[(0,S.jsx)(b,{...e}),(0,S.jsx)(`p`,{style:{color:`#b42318`,margin:`6px 0 0`,fontSize:12.5},children:`Selecciona una cuenta para continuar.`})]})},I={render:e=>(0,S.jsx)(`div`,{style:{"--ms-accent":`#0f766e`,"--ms-accent-soft":`#e6f4f1`,"--ms-ring":`rgba(15,118,110,.25)`,"--ms-radius":`2px`,"--ms-height":`36px`},children:(0,S.jsx)(b,{...e})})},L={render:e=>{let[t,n]=(0,x.useState)(null),r=(0,x.useMemo)(()=>h(()=>({latencyMs:e.latencyMs,failRate:!1})),[e.latencyMs]);return(0,S.jsx)(ee,{entity:`terceros`,"aria-label":`Tercero`,value:t,onChange:n,search:r,getOptionLabel:e=>e.name,getOptionValue:e=>e.id,placeholder:`Cliente o proveedor`,renderOption:(e,{active:t})=>(0,S.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,gap:12},children:[(0,S.jsx)(`strong`,{style:{fontWeight:t?700:500},children:e.name}),(0,S.jsx)(`span`,{style:{color:`#667085`,fontVariantNumeric:`tabular-nums`},children:e.nit})]})})}},R={render:e=>{let[t,n]=(0,x.useState)(`Sin enviar`);return(0,S.jsxs)(`form`,{onSubmit:e=>{e.preventDefault();let t=new FormData(e.currentTarget);n(`Enviado: cuenta = ${t.get(`account`)||`(vacío)`}`)},children:[(0,S.jsx)(b,{...e,name:`account`}),(0,S.jsx)(`button`,{type:`submit`,style:{marginTop:12,height:36,padding:`0 14px`},children:`Guardar`}),(0,S.jsx)(`p`,{style:{fontSize:12.5,color:`#667085`},role:`status`,children:t})]})}},z=[`Default`,`KeyboardNavigation`,`WithSelectedValue`,`MinimumCharacters`,`SlowNetwork`,`ServerError`,`Pagination`,`IncludeInactive`,`EmptyResults`,`Disabled`,`Invalid`,`Themed`,`CustomOption`,`InsideForm`],T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{}`,...T.parameters?.docs?.source},description:{story:`Estado base. Abre el campo sin escribir: lista todo y nunca muestra "sin resultados" antes de tiempo.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    latencyMs: 100
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox");
    await userEvent.click(input);
    await waitFor(() => expect(canvas.getAllByRole("option").length).toBeGreaterThan(2));
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    await waitFor(() => expect((input as HTMLInputElement).value).toMatch(/^\\d+ - /));
  }
}`,...E.parameters?.docs?.source},description:{story:`Verifica en vivo la navegación por teclado: abrir, bajar dos veces y elegir con Enter.`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: args => <Account_ {...args} initial={ACCOUNTS[3]} />
}`,...D.parameters?.docs?.source},description:{story:`Con un valor inicial; al reabrir se resalta la opción seleccionada y se puede borrar el texto.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    minSearchLength: 3
  }
}`,...O.parameters?.docs?.source},description:{story:`Con mínimo de caracteres se muestra una pista y no se llama al servidor.`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    latencyMs: 2000
  }
}`,...k.parameters?.docs?.source},description:{story:`Latencia alta: esqueleto en la primera carga y spinner en las siguientes.`,...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    fail: true
  }
}`,...A.parameters?.docs?.source},description:{story:`Error del servidor con botón "Reintentar".`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    pageSize: 5
  }
}`,...j.parameters?.docs?.source},description:{story:`Paginación: pocas filas por página para probar "cargar más" por scroll, teclado y botón.`,...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    allowInactive: true
  }
}`,...M.parameters?.docs?.source},description:{story:"Incluye registros marcados como inactivos (`active: false`).",...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => <Account_ {...args} search={async () => ({
    items: [],
    total: 0,
    hasNextPage: false
  })} />
}`,...N.parameters?.docs?.source},description:{story:`Sin ningún resultado.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: args => <Account_ {...args} disabled initial={ACCOUNTS[0]} />
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    invalid: true
  },
  render: args => <div>
      <Account_ {...args} />
      <p style={{
      color: "#b42318",
      margin: "6px 0 0",
      fontSize: 12.5
    }}>Selecciona una cuenta para continuar.</p>
    </div>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    "--ms-accent": "#0f766e",
    "--ms-accent-soft": "#e6f4f1",
    "--ms-ring": "rgba(15,118,110,.25)",
    "--ms-radius": "2px",
    "--ms-height": "36px"
  } as React.CSSProperties}>
      <Account_ {...args} />
    </div>
}`,...I.parameters?.docs?.source},description:{story:"Tematizado solo con variables CSS (`--ms-*`).",...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<Party | null>(null);
    const search = useMemo(() => createMockSearch<Party>(() => ({
      latencyMs: args.latencyMs,
      failRate: false
    })), [args.latencyMs]);
    return <MasterSelector<Party> entity="terceros" aria-label="Tercero" value={value} onChange={setValue} search={search} getOptionLabel={p => p.name} getOptionValue={p => p.id} placeholder="Cliente o proveedor" renderOption={(p, {
      active
    }) => <div style={{
      display: "flex",
      justifyContent: "space-between",
      gap: 12
    }}>
            <strong style={{
        fontWeight: active ? 700 : 500
      }}>{p.name}</strong>
            <span style={{
        color: "#667085",
        fontVariantNumeric: "tabular-nums"
      }}>{p.nit}</span>
          </div>} />;
  }
}`,...L.parameters?.docs?.source},description:{story:"Render propio de la opción mediante `renderOption`.",...L.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [log, setLog] = useState("Sin enviar");
    return <form onSubmit={event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      setLog(\`Enviado: cuenta = \${data.get("account") || "(vacío)"}\`);
    }}>
        <Account_ {...args} name="account" />
        <button type="submit" style={{
        marginTop: 12,
        height: 36,
        padding: "0 14px"
      }}>Guardar</button>
        <p style={{
        fontSize: 12.5,
        color: "#667085"
      }} role="status">{log}</p>
      </form>;
  }
}`,...R.parameters?.docs?.source},description:{story:"Dentro de un `<form>`: Enter elige la opción y NO envía el formulario; `name` genera un input oculto.",...R.parameters?.docs?.description}}}})))()}B();export{L as CustomOption,T as Default,P as Disabled,N as EmptyResults,M as IncludeInactive,R as InsideForm,F as Invalid,E as KeyboardNavigation,O as MinimumCharacters,j as Pagination,A as ServerError,k as SlowNetwork,I as Themed,D as WithSelectedValue,z as __namedExportsOrder,_e as default};