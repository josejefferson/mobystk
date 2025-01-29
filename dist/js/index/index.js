import{a as et,b as tt,c as m,d as _,e as P,f as K,g as G,k as j}from"../chunk-F47FR2AL.js";var ge=et((U,ae)=>{(function(l,c){typeof U=="object"&&typeof ae=="object"?ae.exports=c():typeof define=="function"&&define.amd?define([],c):typeof U=="object"?U.Pickr=c():l.Pickr=c()})(self,()=>(()=>{"use strict";var l={d:(p,e)=>{for(var t in e)l.o(e,t)&&!l.o(p,t)&&Object.defineProperty(p,t,{enumerable:!0,get:e[t]})},o:(p,e)=>Object.prototype.hasOwnProperty.call(p,e),r:p=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(p,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(p,"__esModule",{value:!0})}},c={};l.d(c,{default:()=>R});var f={};function w(p,e,t,n,s={}){e instanceof HTMLCollection||e instanceof NodeList?e=Array.from(e):Array.isArray(e)||(e=[e]),Array.isArray(t)||(t=[t]);for(let o of e)for(let i of t)o[p](i,n,{capture:!1,...s});return Array.prototype.slice.call(arguments,1)}l.r(f),l.d(f,{adjustableInputNumbers:()=>de,createElementFromString:()=>L,createFromTemplate:()=>H,eventPath:()=>pe,off:()=>$,on:()=>v,resolveElement:()=>ue});let v=w.bind(null,"addEventListener"),$=w.bind(null,"removeEventListener");function L(p){let e=document.createElement("div");return e.innerHTML=p.trim(),e.firstElementChild}function H(p){let e=(n,s)=>{let o=n.getAttribute(s);return n.removeAttribute(s),o},t=(n,s={})=>{let o=e(n,":obj"),i=e(n,":ref"),a=o?s[o]={}:s;i&&(s[i]=n);for(let r of Array.from(n.children)){let u=e(r,":arr"),d=t(r,u?{}:a);u&&(a[u]||(a[u]=[])).push(Object.keys(d).length?d:r)}return s};return t(L(p))}function pe(p){let e=p.path||p.composedPath&&p.composedPath();if(e)return e;let t=p.target.parentElement;for(e=[p.target,t];t=t.parentElement;)e.push(t);return e.push(document,window),e}function ue(p){return p instanceof Element?p:typeof p=="string"?p.split(/>>/g).reduce((e,t,n,s)=>(e=e.querySelector(t),n<s.length-1?e.shadowRoot:e),document):null}function de(p,e=t=>t){function t(n){let s=[.001,.01,.1][Number(n.shiftKey||2*n.ctrlKey)]*(n.deltaY<0?1:-1),o=0,i=p.selectionStart;p.value=p.value.replace(/[\d.]+/g,(a,r)=>r<=i&&r+a.length>=i?(i=r,e(Number(a),s,o)):(o++,a)),p.focus(),p.setSelectionRange(i,i),n.preventDefault(),p.dispatchEvent(new Event("input"))}v(p,"focus",()=>v(window,"wheel",t,{passive:!1})),v(p,"blur",()=>$(window,"wheel",t))}let{min:T,max:Pe,floor:Oe,round:He}=Math;function z(p,e,t){e/=100,t/=100;let n=Oe(p=p/360*6),s=p-n,o=t*(1-e),i=t*(1-s*e),a=t*(1-(1-s)*e),r=n%6;return[255*[t,i,o,o,a,t][r],255*[a,t,t,i,o,o][r],255*[o,o,a,t,t,i][r]]}function Te(p,e,t){let n=(2-(e/=100))*(t/=100)/2;return n!==0&&(e=n===1?0:n<.5?e*t/(2*n):e*t/(2-2*n)),[p,100*e,100*n]}function W(p,e,t){let n=T(p/=255,e/=255,t/=255),s=Pe(p,e,t),o=s-n,i,a;if(o===0)i=a=0;else{a=o/s;let r=((s-p)/6+o/2)/o,u=((s-e)/6+o/2)/o,d=((s-t)/6+o/2)/o;p===s?i=d-u:e===s?i=1/3+r-d:t===s&&(i=2/3+u-r),i<0?i+=1:i>1&&(i-=1)}return[360*i,100*a,100*s]}function Be(p,e,t,n){return e/=100,t/=100,[...W(255*(1-T(1,(p/=100)*(1-(n/=100))+n)),255*(1-T(1,e*(1-n)+n)),255*(1-T(1,t*(1-n)+n)))]}function Re(p,e,t){e/=100;let n=2*(e*=(t/=100)<.5?t:1-t)/(t+e)*100,s=100*(t+e);return[p,isNaN(n)?0:n,s]}function De(p){return W(...p.match(/.{2}/g).map(e=>parseInt(e,16)))}function Me(p){p=p.match(/^[a-zA-Z]+$/)?function(s){if(s.toLowerCase()==="black")return"#000";let o=document.createElement("canvas").getContext("2d");return o.fillStyle=s,o.fillStyle==="#000"?null:o.fillStyle}(p):p;let e={cmyk:/^cmyk\D+([\d.]+)\D+([\d.]+)\D+([\d.]+)\D+([\d.]+)/i,rgba:/^rgba?\D+([\d.]+)(%?)\D+([\d.]+)(%?)\D+([\d.]+)(%?)\D*?(([\d.]+)(%?)|$)/i,hsla:/^hsla?\D+([\d.]+)\D+([\d.]+)\D+([\d.]+)\D*?(([\d.]+)(%?)|$)/i,hsva:/^hsva?\D+([\d.]+)\D+([\d.]+)\D+([\d.]+)\D*?(([\d.]+)(%?)|$)/i,hexa:/^#?(([\dA-Fa-f]{3,4})|([\dA-Fa-f]{6})|([\dA-Fa-f]{8}))$/i},t=s=>s.map(o=>/^(|\d+)\.\d+|\d+$/.test(o)?Number(o):void 0),n;e:for(let s in e)if(n=e[s].exec(p))switch(s){case"cmyk":{let[,o,i,a,r]=t(n);if(o>100||i>100||a>100||r>100)break e;return{values:Be(o,i,a,r),type:s}}case"rgba":{let[,o,,i,,a,,,r]=t(n);if(o=n[2]==="%"?o/100*255:o,i=n[4]==="%"?i/100*255:i,a=n[6]==="%"?a/100*255:a,r=n[9]==="%"?r/100:r,o>255||i>255||a>255||r<0||r>1)break e;return{values:[...W(o,i,a),r],a:r,type:s}}case"hexa":{let[,o]=n;o.length!==4&&o.length!==3||(o=o.split("").map(r=>r+r).join(""));let i=o.substring(0,6),a=o.substring(6);return a=a?parseInt(a,16)/255:void 0,{values:[...De(i),a],a,type:s}}case"hsla":{let[,o,i,a,,r]=t(n);if(r=n[6]==="%"?r/100:r,o>360||i>100||a>100||r<0||r>1)break e;return{values:[...Re(o,i,a),r],a:r,type:s}}case"hsva":{let[,o,i,a,,r]=t(n);if(r=n[6]==="%"?r/100:r,o>360||i>100||a>100||r<0||r>1)break e;return{values:[o,i,a,r],a:r,type:s}}}return{values:null,type:null}}function B(p=0,e=0,t=0,n=1){let s=(i,a)=>(r=-1)=>a(~r?i.map(u=>Number(u.toFixed(r))):i),o={h:p,s:e,v:t,a:n,toHSVA(){let i=[o.h,o.s,o.v,o.a];return i.toString=s(i,a=>`hsva(${a[0]}, ${a[1]}%, ${a[2]}%, ${o.a})`),i},toHSLA(){let i=[...Te(o.h,o.s,o.v),o.a];return i.toString=s(i,a=>`hsla(${a[0]}, ${a[1]}%, ${a[2]}%, ${o.a})`),i},toRGBA(){let i=[...z(o.h,o.s,o.v),o.a];return i.toString=s(i,a=>`rgba(${a[0]}, ${a[1]}, ${a[2]}, ${o.a})`),i},toCMYK(){let i=function(a,r,u){let d=z(a,r,u),h=d[0]/255,g=d[1]/255,b=d[2]/255,y=T(1-h,1-g,1-b);return[100*(y===1?0:(1-h-y)/(1-y)),100*(y===1?0:(1-g-y)/(1-y)),100*(y===1?0:(1-b-y)/(1-y)),100*y]}(o.h,o.s,o.v);return i.toString=s(i,a=>`cmyk(${a[0]}%, ${a[1]}%, ${a[2]}%, ${a[3]}%)`),i},toHEXA(){let i=function(r,u,d){return z(r,u,d).map(h=>He(h).toString(16).padStart(2,"0"))}(o.h,o.s,o.v),a=o.a>=1?"":Number((255*o.a).toFixed(0)).toString(16).toUpperCase().padStart(2,"0");return a&&i.push(a),i.toString=()=>`#${i.join("").toUpperCase()}`,i},clone:()=>B(o.h,o.s,o.v,o.a)};return o}let q=p=>Math.max(Math.min(p,1),0);function Z(p){let e={options:Object.assign({lock:null,onchange:()=>0,onstop:()=>0},p),_keyboard(o){let{options:i}=e,{type:a,key:r}=o;if(document.activeElement===i.wrapper){let{lock:u}=e.options,d=r==="ArrowUp",h=r==="ArrowRight",g=r==="ArrowDown",b=r==="ArrowLeft";if(a==="keydown"&&(d||h||g||b)){let y=0,S=0;u==="v"?y=d||h?1:-1:u==="h"?y=d||h?-1:1:(S=d?-1:g?1:0,y=b?-1:h?1:0),e.update(q(e.cache.x+.01*y),q(e.cache.y+.01*S)),o.preventDefault()}else r.startsWith("Arrow")&&(e.options.onstop(),o.preventDefault())}},_tapstart(o){v(document,["mouseup","touchend","touchcancel"],e._tapstop),v(document,["mousemove","touchmove"],e._tapmove),o.cancelable&&o.preventDefault(),e._tapmove(o)},_tapmove(o){let{options:i,cache:a}=e,{lock:r,element:u,wrapper:d}=i,h=d.getBoundingClientRect(),g=0,b=0;if(o){let F=o&&o.touches&&o.touches[0];g=o?(F||o).clientX:0,b=o?(F||o).clientY:0,g<h.left?g=h.left:g>h.left+h.width&&(g=h.left+h.width),b<h.top?b=h.top:b>h.top+h.height&&(b=h.top+h.height),g-=h.left,b-=h.top}else a&&(g=a.x*h.width,b=a.y*h.height);r!=="h"&&(u.style.left=`calc(${g/h.width*100}% - ${u.offsetWidth/2}px)`),r!=="v"&&(u.style.top=`calc(${b/h.height*100}% - ${u.offsetHeight/2}px)`),e.cache={x:g/h.width,y:b/h.height};let y=q(g/h.width),S=q(b/h.height);switch(r){case"v":return i.onchange(y);case"h":return i.onchange(S);default:return i.onchange(y,S)}},_tapstop(){e.options.onstop(),$(document,["mouseup","touchend","touchcancel"],e._tapstop),$(document,["mousemove","touchmove"],e._tapmove)},trigger(){e._tapmove()},update(o=0,i=0){let{left:a,top:r,width:u,height:d}=e.options.wrapper.getBoundingClientRect();e.options.lock==="h"&&(i=o),e._tapmove({clientX:a+u*o,clientY:r+d*i})},destroy(){let{options:o,_tapstart:i,_keyboard:a}=e;$(document,["keydown","keyup"],a),$([o.wrapper,o.element],"mousedown",i),$([o.wrapper,o.element],"touchstart",i,{passive:!1})}},{options:t,_tapstart:n,_keyboard:s}=e;return v([t.wrapper,t.element],"mousedown",n),v([t.wrapper,t.element],"touchstart",n,{passive:!1}),v(document,["keydown","keyup"],s),e}function Ne(p={}){p=Object.assign({onchange:()=>0,className:"",elements:[]},p);let e=v(p.elements,"click",t=>{p.elements.forEach(n=>n.classList[t.target===n?"add":"remove"](p.className)),p.onchange(t),t.stopPropagation()});return{destroy:()=>$(...e)}}let je={variantFlipOrder:{start:"sme",middle:"mse",end:"ems"},positionFlipOrder:{top:"tbrl",right:"rltb",bottom:"btrl",left:"lrbt"},position:"bottom",margin:8,padding:0},Ie=(p,e,t)=>{let n=typeof p!="object"||p instanceof HTMLElement?{reference:p,popper:e,...t}:p;return{update(s=n){let{reference:o,popper:i}=Object.assign(n,s);if(!i||!o)throw new Error("Popper- or reference-element missing.");return((a,r,u)=>{let{container:d,arrow:h,margin:g,padding:b,position:y,variantFlipOrder:S,positionFlipOrder:F}={container:document.documentElement.getBoundingClientRect(),...je,...u},{left:Q,top:ee}=r.style;r.style.left="0",r.style.top="0";let C=a.getBoundingClientRect(),E=r.getBoundingClientRect(),qe={t:C.top-E.height-g,b:C.bottom+g,r:C.right+g,l:C.left-E.width-g},Je={vs:C.left,vm:C.left+C.width/2-E.width/2,ve:C.left+C.width-E.width,hs:C.top,hm:C.bottom-C.height/2-E.height/2,he:C.bottom-E.height},[Ke,Ge="middle"]=y.split("-"),Ue=F[Ke],Xe=S[Ge],{top:he,left:me,bottom:ve,right:fe}=d;for(let D of Ue){let x=D==="t"||D==="b",M=qe[D],[te,oe]=x?["top","left"]:["left","top"],[ne,ie]=x?[E.height,E.width]:[E.width,E.height],[Ve,Ye]=x?[ve,fe]:[fe,ve],[ze,We]=x?[he,me]:[me,he];if(!(M<ze||M+ne+b>Ve))for(let re of Xe){let N=Je[(x?"v":"h")+re];if(!(N<We||N+ie+b>Ye)){if(N-=E[oe],M-=E[te],r.style[oe]=`${N}px`,r.style[te]=`${M}px`,h){let se=x?C.width/2:C.height/2,J=ie/2,be=se>J,Ze=N+{s:be?J:se,m:J,e:be?J:ie-se}[re],Qe=M+{t:ne,b:0,r:0,l:ne}[D];h.style[oe]=`${Ze}px`,h.style[te]=`${Qe}px`}return D+re}}}return r.style.left=Q,r.style.top=ee,null})(o,i,n)}}};class R{static utils=f;static version="1.9.1";static I18N_DEFAULTS={"ui:dialog":"color picker dialog","btn:toggle":"toggle color picker dialog","btn:swatch":"color swatch","btn:last-color":"use previous color","btn:save":"Save","btn:cancel":"Cancel","btn:clear":"Clear","aria:btn:save":"save and close","aria:btn:cancel":"cancel and close","aria:btn:clear":"clear and close","aria:input":"color input field","aria:palette":"color selection area","aria:hue":"hue selection slider","aria:opacity":"selection slider"};static DEFAULT_OPTIONS={appClass:null,theme:"classic",useAsButton:!1,padding:8,disabled:!1,comparison:!0,closeOnScroll:!1,outputPrecision:0,lockOpacity:!1,autoReposition:!0,container:"body",components:{interaction:{}},i18n:{},swatches:null,inline:!1,sliders:null,default:"#42445a",defaultRepresentation:null,position:"bottom-middle",adjustableNumbers:!0,showAlways:!1,closeWithKey:"Escape"};_initializingActive=!0;_recalc=!0;_nanopop=null;_root=null;_color=B();_lastColor=B();_swatchColors=[];_setupAnimationFrame=null;_eventListener={init:[],save:[],hide:[],show:[],clear:[],change:[],changestop:[],cancel:[],swatchselect:[]};constructor(e){this.options=e=Object.assign({...R.DEFAULT_OPTIONS},e);let{swatches:t,components:n,theme:s,sliders:o,lockOpacity:i,padding:a}=e;["nano","monolith"].includes(s)&&!o&&(e.sliders="h"),n.interaction||(n.interaction={});let{preview:r,opacity:u,hue:d,palette:h}=n;n.opacity=!i&&u,n.palette=h||r||u||d,this._preBuild(),this._buildComponents(),this._bindEvents(),this._finalBuild(),t&&t.length&&t.forEach(S=>this.addSwatch(S));let{button:g,app:b}=this._root;this._nanopop=Ie(g,b,{margin:a}),g.setAttribute("role","button"),g.setAttribute("aria-label",this._t("btn:toggle"));let y=this;this._setupAnimationFrame=requestAnimationFrame(function S(){if(!b.offsetWidth)return requestAnimationFrame(S);y.setColor(e.default),y._rePositioningPicker(),e.defaultRepresentation&&(y._representation=e.defaultRepresentation,y.setColorRepresentation(y._representation)),e.showAlways&&y.show(),y._initializingActive=!1,y._emit("init")})}static create=e=>new R(e);_preBuild(){let{options:e}=this;for(let t of["el","container"])e[t]=ue(e[t]);this._root=(t=>{let{components:n,useAsButton:s,inline:o,appClass:i,theme:a,lockOpacity:r}=t.options,u=b=>b?"":'style="display:none" hidden',d=b=>t._t(b),h=H(`
      <div :ref="root" class="pickr">

        ${s?"":'<button type="button" :ref="button" class="pcr-button"></button>'}

        <div :ref="app" class="pcr-app ${i||""}" data-theme="${a}" ${o?'style="position: unset"':""} aria-label="${d("ui:dialog")}" role="window">
          <div class="pcr-selection" ${u(n.palette)}>
            <div :obj="preview" class="pcr-color-preview" ${u(n.preview)}>
              <button type="button" :ref="lastColor" class="pcr-last-color" aria-label="${d("btn:last-color")}"></button>
              <div :ref="currentColor" class="pcr-current-color"></div>
            </div>

            <div :obj="palette" class="pcr-color-palette">
              <div :ref="picker" class="pcr-picker"></div>
              <div :ref="palette" class="pcr-palette" tabindex="0" aria-label="${d("aria:palette")}" role="listbox"></div>
            </div>

            <div :obj="hue" class="pcr-color-chooser" ${u(n.hue)}>
              <div :ref="picker" class="pcr-picker"></div>
              <div :ref="slider" class="pcr-hue pcr-slider" tabindex="0" aria-label="${d("aria:hue")}" role="slider"></div>
            </div>

            <div :obj="opacity" class="pcr-color-opacity" ${u(n.opacity)}>
              <div :ref="picker" class="pcr-picker"></div>
              <div :ref="slider" class="pcr-opacity pcr-slider" tabindex="0" aria-label="${d("aria:opacity")}" role="slider"></div>
            </div>
          </div>

          <div class="pcr-swatches ${n.palette?"":"pcr-last"}" :ref="swatches"></div>

          <div :obj="interaction" class="pcr-interaction" ${u(Object.keys(n.interaction).length)}>
            <input :ref="result" class="pcr-result" type="text" spellcheck="false" ${u(n.interaction.input)} aria-label="${d("aria:input")}">

            <input :arr="options" class="pcr-type" data-type="HEXA" value="${r?"HEX":"HEXA"}" type="button" ${u(n.interaction.hex)}>
            <input :arr="options" class="pcr-type" data-type="RGBA" value="${r?"RGB":"RGBA"}" type="button" ${u(n.interaction.rgba)}>
            <input :arr="options" class="pcr-type" data-type="HSLA" value="${r?"HSL":"HSLA"}" type="button" ${u(n.interaction.hsla)}>
            <input :arr="options" class="pcr-type" data-type="HSVA" value="${r?"HSV":"HSVA"}" type="button" ${u(n.interaction.hsva)}>
            <input :arr="options" class="pcr-type" data-type="CMYK" value="CMYK" type="button" ${u(n.interaction.cmyk)}>

            <input :ref="save" class="pcr-save" value="${d("btn:save")}" type="button" ${u(n.interaction.save)} aria-label="${d("aria:btn:save")}">
            <input :ref="cancel" class="pcr-cancel" value="${d("btn:cancel")}" type="button" ${u(n.interaction.cancel)} aria-label="${d("aria:btn:cancel")}">
            <input :ref="clear" class="pcr-clear" value="${d("btn:clear")}" type="button" ${u(n.interaction.clear)} aria-label="${d("aria:btn:clear")}">
          </div>
        </div>
      </div>
    `),g=h.interaction;return g.options.find(b=>!b.hidden&&!b.classList.add("active")),g.type=()=>g.options.find(b=>b.classList.contains("active")),h})(this),e.useAsButton&&(this._root.button=e.el),e.container.appendChild(this._root.root)}_finalBuild(){let e=this.options,t=this._root;if(e.container.removeChild(t.root),e.inline){let n=e.el.parentElement;e.el.nextSibling?n.insertBefore(t.app,e.el.nextSibling):n.appendChild(t.app)}else e.container.appendChild(t.app);e.useAsButton?e.inline&&e.el.remove():e.el.parentNode.replaceChild(t.root,e.el),e.disabled&&this.disable(),e.comparison||(t.button.style.transition="none",e.useAsButton||(t.preview.lastColor.style.transition="none")),this.hide()}_buildComponents(){let e=this,t=this.options.components,n=(e.options.sliders||"v").repeat(2),[s,o]=n.match(/^[vh]+$/g)?n:[],i=()=>this._color||(this._color=this._lastColor.clone()),a={palette:Z({element:e._root.palette.picker,wrapper:e._root.palette.palette,onstop:()=>e._emit("changestop","slider",e),onchange(r,u){if(!t.palette)return;let d=i(),{_root:h,options:g}=e,{lastColor:b,currentColor:y}=h.preview;e._recalc&&(d.s=100*r,d.v=100-100*u,d.v<0&&(d.v=0),e._updateOutput("slider"));let S=d.toRGBA().toString(0);this.element.style.background=S,this.wrapper.style.background=`
                        linear-gradient(to top, rgba(0, 0, 0, ${d.a}), transparent),
                        linear-gradient(to left, hsla(${d.h}, 100%, 50%, ${d.a}), rgba(255, 255, 255, ${d.a}))
                    `,g.comparison?g.useAsButton||e._lastColor||b.style.setProperty("--pcr-color",S):(h.button.style.setProperty("--pcr-color",S),h.button.classList.remove("clear"));let F=d.toHEXA().toString();for(let{el:Q,color:ee}of e._swatchColors)Q.classList[F===ee.toHEXA().toString()?"add":"remove"]("pcr-active");y.style.setProperty("--pcr-color",S)}}),hue:Z({lock:o==="v"?"h":"v",element:e._root.hue.picker,wrapper:e._root.hue.slider,onstop:()=>e._emit("changestop","slider",e),onchange(r){if(!t.hue||!t.palette)return;let u=i();e._recalc&&(u.h=360*r),this.element.style.backgroundColor=`hsl(${u.h}, 100%, 50%)`,a.palette.trigger()}}),opacity:Z({lock:s==="v"?"h":"v",element:e._root.opacity.picker,wrapper:e._root.opacity.slider,onstop:()=>e._emit("changestop","slider",e),onchange(r){if(!t.opacity||!t.palette)return;let u=i();e._recalc&&(u.a=Math.round(100*r)/100),this.element.style.background=`rgba(0, 0, 0, ${u.a})`,a.palette.trigger()}}),selectable:Ne({elements:e._root.interaction.options,className:"active",onchange(r){e._representation=r.target.getAttribute("data-type").toUpperCase(),e._recalc&&e._updateOutput("swatch")}})};this._components=a}_bindEvents(){let{_root:e,options:t}=this,n=[v(e.interaction.clear,"click",()=>this._clearColor()),v([e.interaction.cancel,e.preview.lastColor],"click",()=>{this.setHSVA(...(this._lastColor||this._color).toHSVA(),!0),this._emit("cancel")}),v(e.interaction.save,"click",()=>{!this.applyColor()&&!t.showAlways&&this.hide()}),v(e.interaction.result,["keyup","input"],s=>{this.setColor(s.target.value,!0)&&!this._initializingActive&&(this._emit("change",this._color,"input",this),this._emit("changestop","input",this)),s.stopImmediatePropagation()}),v(e.interaction.result,["focus","blur"],s=>{this._recalc=s.type==="blur",this._recalc&&this._updateOutput(null)}),v([e.palette.palette,e.palette.picker,e.hue.slider,e.hue.picker,e.opacity.slider,e.opacity.picker],["mousedown","touchstart"],()=>this._recalc=!0,{passive:!0})];if(!t.showAlways){let s=t.closeWithKey;n.push(v(e.button,"click",()=>this.isOpen()?this.hide():this.show()),v(document,"keyup",o=>this.isOpen()&&(o.key===s||o.code===s)&&this.hide()),v(document,["touchstart","mousedown"],o=>{this.isOpen()&&!pe(o).some(i=>i===e.app||i===e.button)&&this.hide()},{capture:!0}))}if(t.adjustableNumbers){let s={rgba:[255,255,255,1],hsva:[360,100,100,1],hsla:[360,100,100,1],cmyk:[100,100,100,100]};de(e.interaction.result,(o,i,a)=>{let r=s[this.getColorRepresentation().toLowerCase()];if(r){let u=r[a],d=o+(u>=100?1e3*i:i);return d<=0?0:Number((d<u?d:u).toPrecision(3))}return o})}if(t.autoReposition&&!t.inline){let s=null,o=this;n.push(v(window,["scroll","resize"],()=>{o.isOpen()&&(t.closeOnScroll&&o.hide(),s===null?(s=setTimeout(()=>s=null,100),requestAnimationFrame(function i(){o._rePositioningPicker(),s!==null&&requestAnimationFrame(i)})):(clearTimeout(s),s=setTimeout(()=>s=null,100)))},{capture:!0}))}this._eventBindings=n}_rePositioningPicker(){let{options:e}=this;if(!e.inline&&!this._nanopop.update({container:document.body.getBoundingClientRect(),position:e.position})){let t=this._root.app,n=t.getBoundingClientRect();t.style.top=(window.innerHeight-n.height)/2+"px",t.style.left=(window.innerWidth-n.width)/2+"px"}}_updateOutput(e){let{_root:t,_color:n,options:s}=this;if(t.interaction.type()){let o=`to${t.interaction.type().getAttribute("data-type")}`;t.interaction.result.value=typeof n[o]=="function"?n[o]().toString(s.outputPrecision):""}!this._initializingActive&&this._recalc&&this._emit("change",n,e,this)}_clearColor(e=!1){let{_root:t,options:n}=this;n.useAsButton||t.button.style.setProperty("--pcr-color","rgba(0, 0, 0, 0.15)"),t.button.classList.add("clear"),n.showAlways||this.hide(),this._lastColor=null,this._initializingActive||e||(this._emit("save",null),this._emit("clear"))}_parseLocalColor(e){let{values:t,type:n,a:s}=Me(e),{lockOpacity:o}=this.options,i=s!==void 0&&s!==1;return t&&t.length===3&&(t[3]=void 0),{values:!t||o&&i?null:t,type:n}}_t(e){return this.options.i18n[e]||R.I18N_DEFAULTS[e]}_emit(e,...t){this._eventListener[e].forEach(n=>n(...t,this))}on(e,t){return this._eventListener[e].push(t),this}off(e,t){let n=this._eventListener[e]||[],s=n.indexOf(t);return~s&&n.splice(s,1),this}addSwatch(e){let{values:t}=this._parseLocalColor(e);if(t){let{_swatchColors:n,_root:s}=this,o=B(...t),i=L(`<button type="button" style="--pcr-color: ${o.toRGBA().toString(0)}" aria-label="${this._t("btn:swatch")}"/>`);return s.swatches.appendChild(i),n.push({el:i,color:o}),this._eventBindings.push(v(i,"click",()=>{this.setHSVA(...o.toHSVA(),!0),this._emit("swatchselect",o),this._emit("change",o,"swatch",this)})),!0}return!1}removeSwatch(e){let t=this._swatchColors[e];if(t){let{el:n}=t;return this._root.swatches.removeChild(n),this._swatchColors.splice(e,1),!0}return!1}applyColor(e=!1){let{preview:t,button:n}=this._root,s=this._color.toRGBA().toString(0);return t.lastColor.style.setProperty("--pcr-color",s),this.options.useAsButton||n.style.setProperty("--pcr-color",s),n.classList.remove("clear"),this._lastColor=this._color.clone(),this._initializingActive||e||this._emit("save",this._color),this}destroy(){cancelAnimationFrame(this._setupAnimationFrame),this._eventBindings.forEach(e=>$(...e)),Object.keys(this._components).forEach(e=>this._components[e].destroy())}destroyAndRemove(){this.destroy();let{root:e,app:t}=this._root;e.parentElement&&e.parentElement.removeChild(e),t.parentElement.removeChild(t),Object.keys(this).forEach(n=>this[n]=null)}hide(){return!!this.isOpen()&&(this._root.app.classList.remove("visible"),this._emit("hide"),!0)}show(){return!this.options.disabled&&!this.isOpen()&&(this._root.app.classList.add("visible"),this._rePositioningPicker(),this._emit("show",this._color),this)}isOpen(){return this._root.app.classList.contains("visible")}setHSVA(e=360,t=0,n=0,s=1,o=!1){let i=this._recalc;if(this._recalc=!1,e<0||e>360||t<0||t>100||n<0||n>100||s<0||s>1)return!1;this._color=B(e,t,n,s);let{hue:a,opacity:r,palette:u}=this._components;return a.update(e/360),r.update(s),u.update(t/100,1-n/100),o||this.applyColor(),i&&this._updateOutput(),this._recalc=i,!0}setColor(e,t=!1){if(e===null)return this._clearColor(t),!0;let{values:n,type:s}=this._parseLocalColor(e);if(n){let o=s.toUpperCase(),{options:i}=this._root.interaction,a=i.find(r=>r.getAttribute("data-type")===o);if(a&&!a.hidden)for(let r of i)r.classList[r===a?"add":"remove"]("active");return!!this.setHSVA(...n,t)&&this.setColorRepresentation(o)}return!1}setColorRepresentation(e){return e=e.toUpperCase(),!!this._root.interaction.options.find(t=>t.getAttribute("data-type").startsWith(e)&&!t.click())}getColorRepresentation(){return this._representation}getColor(){return this._color}getSelectedColor(){return this._lastColor}getRoot(){return this._root}disable(){return this.hide(),this.options.disabled=!0,this._root.button.classList.add("disabled"),this}enable(){return this.options.disabled=!1,this._root.button.classList.remove("disabled"),this}}return c=c.default})())});var Le=tt(ge(),1);var ce=document.forms[0],k=ce.elements,X=document.querySelector(".forgetPassword"),O=document.querySelector(".addToHomescreenPopup"),ye=O.querySelector(".close-popup"),_e=O.querySelector(".dontShowAgainAddToHomescreenPopup"),ke=document.querySelector(".selectGamepad"),we=document.querySelector(".lockableKeysList"),$e=document.querySelector(".hiddenItemsList"),Se=document.querySelectorAll('input[type="range"] + .value'),Ce=document.querySelector(".resetColors"),Ae=document.querySelector(".importSettings"),Ee=document.querySelector(".exportSettings");var ot=["#F44336","#E91E63","#9C27B0","#673AB7","#3F51B5","#2196F3","#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548","#9E9E9E","#607D8B","#FFFFFF","#000000"],V={background:Y("background","#000"),color:Y("color","#FFF8","88"),border:Y("border","#FFF8","88"),active:Y("active","#FFF3","33")};Ce.addEventListener("click",()=>{V.background.setColor("#000"),V.color.setColor("#FFF8"),V.border.setColor("#FFF8"),V.active.setColor("#FFF3")});function Y(l,c,f=""){let w={el:`.pickr-${l}`,theme:"classic",default:m(l)||c,defaultRepresentation:"HEXA",comparison:!1,autoReposition:!0,components:{preview:!0,opacity:!0,hue:!0,interaction:{input:!0,save:!0}},i18n:{"btn:save":"Fechar"},swatches:ot.map(v=>v+f)};return Le.default.create(w).on("change",nt(l)).on("save",it(l))}function nt(l){return c=>{let f=c.toRGBA().toString(),w=k[l];w.value=f,w.parentElement.querySelector(".pickr button").style.setProperty("--pcr-color",f)}}function it(l){return(c,f)=>{f.hide()}}Ae.addEventListener("click",rt);Ee.addEventListener("click",st);function rt(){let l=document.createElement("input");l.type="file",l.style.display="none",l.click(),l.addEventListener("change",c);async function c(){try{let f=this.files[0];if(!f)return;let w=await new Promise((v,$)=>{let L=new FileReader;L.onload=()=>v(L.result),L.onerror=$,L.readAsText(f)});m(JSON.parse(String(w))),P(),location.reload()}catch(f){console.error(f),K("Ocorreu um erro ao importar as configura\xE7\xF5es")}}}function st(){let l=JSON.stringify(m()),c=document.createElement("a"),f=new Blob([l],{type:"application/json"}),w=URL.createObjectURL(f);c.href=w,c.download=`mobyStk-settings-${new Date().toISOString()}.json`,c.click()}function A(l){return l==null?"":(l=l.toString(),l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"))}function le(l){let c=Number(l).toString(),f=c.indexOf(".")+1;return f?c.length-f:0}window.addEventListener("load",Fe);window.addEventListener("scroll",Fe);function Fe(){document.scrollingElement.scrollTop>window.innerHeight?document.querySelector(".start.floating").classList.remove("hidden"):document.querySelector(".start.floating").classList.add("hidden")}var I=parseInt(m("stats.hits.home"),10);isNaN(I)&&(I=0);m("stats.hits.home",++I);m("password")!==null&&X.classList.remove("hidden");X.addEventListener("click",()=>{m.remove("password"),X.classList.add("hidden"),K("A senha do MobyStk foi esquecida")});ye.addEventListener("click",()=>{O.classList.remove("show"),_e.checked&&m("events.addToHomescreenPopup",!0)});!m("events.addToHomescreenPopup")&&(I===3||I%10===0)&&window.addEventListener("load",()=>{let l=document.createElement("video");l.src="video/add-to-homescreen-tutorial.mp4",l.loop=!0,l.muted=!0,O.querySelector(".content").appendChild(l),l.play(),O.classList.add("show")});for(let l of G){let c=document.createElement("label");c.classList.add("chip");let f=document.createElement("input");f.type="radio",f.name="gamepad",f.value=l.id;let w=document.createElement("div");w.classList.add("label");let v=document.createElement("i");v.classList.add("label-icon","mdi",`mdi-${l.icon}`);let $=document.createElement("div");$.classList.add("label-title"),$.appendChild(v),$.appendChild(document.createTextNode(l.name)),w.appendChild($),c.appendChild(f),c.appendChild(w),ke.appendChild(c)}for(let l of j.buttons){if(!l.content||l.customAction||l.diagonal)continue;let c="";l.content.type==="mobystk:text"?c+=A(l.content.value):l.content.type==="mobystk:icon"&&(c+=`<i class="mdi mdi-${A(l.content.value)}"></i>`),we.innerHTML+=`
		<label class="chip">
			<input type="checkbox" name="lock" data-id="${A(l.id)}" value="${A(l.id)}">
			<div class="label">${c}</div>
		</label>`}var at=[...j.buttons,...j.groups,...j.joysticks];for(let l of at){let c="";l.type==="mobystk:group"&&(c+='<i class="mdi mdi-group"></i>&nbsp;'),l.type==="mobystk:joystick"&&(c+='<i class="mdi mdi-gamepad"></i>&nbsp;'),"content"in l&&"type"in l.content&&l.content.type==="mobystk:text"?c+=A(l.content.value):"content"in l&&"type"in l.content&&l.content.type==="mobystk:icon"?c+=`<i class="mdi mdi-${A(l.content.value)}"></i>`:l.name&&(c+=A(l.name)),$e.innerHTML+=`
		<label class="chip">
			<input type="checkbox" name="hide" data-id="${A(l.id)}" value="${A(l.id)}">
			<div class="label">${c}</div>
		</label>`}Se.forEach(l=>{let c=l.parentElement.querySelector('input[type="range"]'),f=le(c.step||1);c&&(c.addEventListener("change",w),c.addEventListener("mousemove",w),c.addEventListener("touchmove",w)),w();function w(){l.innerText=Number(c.value).toFixed(f)}});k.code.value=_("code",window.location.hostname+":5000");k.gamepad.value=_("gamepad",G[0].id);k.player.value=_("player","1");k.invertL.checked=_("invertL",!1);k.invertR.checked=_("invertR",!1);k.disJoyXAxis.checked=_("disJoyXAxis",!1);k.disJoyYAxis.checked=_("disJoyYAxis",!1);k.dblClickLoadSave.checked=_("dblClickLoadSave",!1);k.changeKeyOnDrag.checked=_("changeKeyOnDrag",!0);k.vibrate.value=_("vibrate","60");k.vibrateJoystick.value=_("vibrateJoystick","0");k.vibrationFromGame.checked=_("vibrationFromGame",!0);k.useKeyboard.checked=_("useKeyboard",!1);k.background.value=_("background","rgba(0, 0, 0, 1)");k.color.value=_("color","rgba(255, 255, 255, 0.53)");k.border.value=_("border","rgba(255, 255, 255, 0.53)");k.active.value=_("active","rgba(255, 255, 255, 0.2)");k.bgImage.value=_("bgImage","");k.bgOpacity.value=_("bgOpacity","0.5");k.bgBlur.value=_("bgBlur","0");k.customCSS.value=_("customCSS","");k.customJS.value=_("customJS","");k.pluginMobile.value=_("pluginMobile",!1);k.driveSensitivity.value=_("driveSensitivity","2");k.drivePrecision.value=_("drivePrecision","1");var ct=_("locked",[]),lt=_("hidden",["mobystk:macro_record","mobystk:macro_play","mobystk:fast_forward","mobystk:diag_left_up","mobystk:diag_right_up","mobystk:diag_left_down","mobystk:diag_right_down","mobystk:ping_chart"]);for(let l of ct){let c=document.querySelector(`[name=lock][data-id="${A(l)}"]`);c&&(c.checked=!0)}for(let l of lt){let c=document.querySelector(`[name=hide][data-id="${A(l)}"]`);c&&(c.checked=!0)}ce.addEventListener("submit",function(l){l.preventDefault();let c=this.elements,f=[],w=[];c.lock.forEach(v=>{let $=v;$.checked&&f.push($.value)}),c.hide.forEach(v=>{let $=v;$.checked&&w.push($.value)}),m("code",c.code.value),m("gamepad",c.gamepad.value),m("player",Number(c.player.value)),m("debug",c.debug.checked),m("invertL",c.invertL.checked),m("invertR",c.invertR.checked),m("disJoyXAxis",c.disJoyXAxis.checked),m("disJoyYAxis",c.disJoyYAxis.checked),m("dblClickLoadSave",c.dblClickLoadSave.checked),m("changeKeyOnDrag",c.changeKeyOnDrag.checked),m("vibrate",Number(c.vibrate.value)),m("vibrateJoystick",Number(c.vibrateJoystick.value)),m("vibrationFromGame",c.vibrationFromGame.checked),m("useKeyboard",c.useKeyboard.checked),m("background",c.background.value),m("color",c.color.value),m("border",c.border.value),m("active",c.active.value),m("bgImage",c.bgImage.value),m("bgOpacity",Number(c.bgOpacity.value)),m("bgBlur",Number(c.bgBlur.value)),m("customCSS",c.customCSS.value),m("customJS",c.customJS.value),m("pluginMobile",c.pluginMobile.checked),m("driveSensitivity",Number(c.driveSensitivity.value)),m("drivePrecision",Number(c.drivePrecision.value)),m("locked",f),m("hidden",w),P(),location.href="joystick.html"});function xe(l,c=0,f=document.scrollingElement){if(f.scrollTop===l)return;let w=(f.scrollTop-l)/2,v=0,$=null;function L(H){if($!==null){if(v+=Math.PI*(H-$)/c,v>=Math.PI)return f.scrollTop=l;f.scrollTop=w+l+w*Math.cos(v)}$=H,window.requestAnimationFrame(L)}window.requestAnimationFrame(L)}window.addEventListener("load",()=>{document.body.classList.remove("preload")});document.addEventListener("contextmenu",()=>!1);document.querySelectorAll("a").forEach(l=>l.addEventListener("click",P));document.querySelectorAll(".start").forEach(l=>{l.addEventListener("contextmenu",c=>(c.preventDefault(),document.querySelector(".hiddenOptions").style.display="flex",xe(document.body.scrollHeight,400),!1))});
/*! Bundled license information:

@simonwep/pickr/dist/pickr.min.js:
  (*! Pickr 1.9.1 MIT | https://github.com/Simonwep/pickr *)
*/
