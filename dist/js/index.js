(()=>{"use strict";var e,t={64:(e,t,n)=>{var o=n(612),r=n.n(o),i=n(860),a=n.n(i)().namespace("joystick");function c(e,t){var n=a(e);return null===n?t:n}window.ls=a,window.getOpt=c;var s=document.forms[0],l=s.elements,d=document.querySelector(".forgetPassword"),u=document.querySelector(".addToHomescreenPopup"),v=u.querySelector(".close-popup"),m=u.querySelector(".dontShowAgainAddToHomescreenPopup"),p=document.querySelector(".selectLayout"),h=document.querySelector(".lockableKeysList"),b=document.querySelector(".hiddenItemsList"),y=document.querySelectorAll('input[type="range"] + .value'),f=document.querySelector(".resetColors"),g=document.querySelector(".importSettings"),k=document.querySelector(".exportSettings"),w=["#F44336","#E91E63","#9C27B0","#673AB7","#3F51B5","#2196F3","#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548","#9E9E9E","#607D8B","#FFFFFF","#000000"],x={background:S("background","#000"),color:S("color","#FFF8","88"),border:S("border","#FFF8","88"),active:S("active","#FFF3","33")};function S(e,t,n){void 0===n&&(n="");var o={el:".pickr-".concat(e),theme:"classic",default:a(e)||t,defaultRepresentation:"HEXA",comparison:!1,autoReposition:!0,components:{preview:!0,opacity:!0,hue:!0,interaction:{input:!0,save:!0}},i18n:{"btn:save":"Fechar"},swatches:w.map((function(e){return e+n}))};return r().create(o).on("change",function(e){return function(t){var n=t.toRGBA().toString(),o=l[e];o.value=n,o.parentElement.querySelector(".pickr button").style.setProperty("--pcr-color",n)}}(e)).on("save",(function(e,t){t.hide()}))}f.addEventListener("click",(function(){x.background.setColor("#000"),x.color.setColor("#FFF8"),x.border.setColor("#FFF8"),x.active.setColor("#FFF3")}));var F=n(45),L=function(){function e(e){this.element=e,this.content=e.querySelector(".toast-content"),this.toasts=[],this.showing=!1}return e.prototype.show=function(e,t,n){return void 0===t&&(t=2e3),void 0===n&&(n=!1),this.toasts.push({message:e,time:t,html:n}),this.showing||this.start(),this},e.prototype.start=function(){if(this.element.classList.remove("show"),!this.toasts.length)return this.showing=!1;this.showing?setTimeout(this.run.bind(this),1e3):this.run(),this.showing=!0},e.prototype.run=function(){this.element.classList.add("show");var e=this.toasts.shift();this.content[e.html?"innerHTML":"innerText"]=e.message,setTimeout(this.start.bind(this),e.time||2e3)},e}(),E=document.createElement("div");E.classList.add("toast"),E.innerHTML='<div class="toast-content"></div>',document.body.appendChild(E);var C=document.createElement("style");C.innerHTML="\n@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');\n\n.toast {\n\t-webkit-box-align: center;\n\t-ms-flex-align: center;\n\talign-items: center;\n\tbackground-color: rgba(85, 85, 85, 0.9);\n\tborder-radius: 22px;\n\tbottom: 48px; \n\t-webkit-box-sizing: border-box;\n\tbox-sizing: border-box;\n\tcolor: #FFFFFF;\n\tdisplay: -webkit-inline-box;\n\tdisplay: -ms-inline-flexbox;\n\tdisplay: inline-flex;\n\tfont-family: 'Roboto Condensed', Roboto, Arial, sans-serif;\n\tfont-size: 15.8px;\n\tleft: 50%;\n\tline-height: 17.6px;\n\tmargin: 16px;\n\tmax-width: 320px;\n\tmin-height: 44px;\n\topacity: 0;\n\tpadding: 13.8px 25px;\n\tpointer-events: none;\n\tposition: fixed;\n\ttext-align: left;\n\ttext-shadow: black 0 0 2px;\n\t-webkit-transform: translateX(calc(-50% - 16px));\n\t-ms-transform: translateX(calc(-50% - 16px));\n\ttransform: translateX(calc(-50% - 16px));\n\t-webkit-transition: opacity 500ms cubic-bezier(0.5, 1, 0.89, 1);\n\t-o-transition: opacity 500ms cubic-bezier(0.5, 1, 0.89, 1);\n\ttransition: opacity 500ms cubic-bezier(0.5, 1, 0.89, 1);\n\twidth: -webkit-fit-content;\n\twidth: -moz-fit-content;\n\twidth: fit-content;\n\tz-index: 99999999999;\n}\n\n.toast.show {\n\topacity: 1;\n\t-webkit-transition: opacity 500ms cubic-bezier(0.11, 0, 0.5, 0);\n\t-o-transition: opacity 500ms cubic-bezier(0.11, 0, 0.5, 0);\n\ttransition: opacity 500ms cubic-bezier(0.11, 0, 0.5, 0);\n}\n\n/*.toast .toast-content {\n\tletter-spacing: -0.03px;\n\tline-height: 17.6px;\n\t-webkit-transform: scaleY(1.11);\n\t-ms-transform: scaleY(1.11);\n\ttransform: scaleY(1.11);\n}*/\n",document.body.appendChild(C);var A=new L(E),O=function(e,t,n){return void 0===t&&(t=2e3),void 0===n&&(n=!1),A.show(e,t,n)};window.toast=O;g.addEventListener("click",(function(){var e=document.createElement("input");e.type="file",e.style.display="none",e.click(),e.addEventListener("change",(function(){return e=this,t=void 0,o=function(){var e,t,n;return function(e,t){var n,o,r,i,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,o=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((r=(r=a.trys).length>0&&r[r.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){a.label=i[1];break}if(6===i[0]&&a.label<r[1]){a.label=r[1],r=i;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(i);break}r[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}(this,(function(o){switch(o.label){case 0:return o.trys.push([0,2,,3]),(e=this.files[0])?[4,new Promise((function(t,n){var o=new FileReader;o.onload=function(){return t(o.result)},o.onerror=n,o.readAsText(e)}))]:[2];case 1:return t=o.sent(),a(JSON.parse(String(t))),(0,F.Z)(),location.reload(),[3,3];case 2:return n=o.sent(),console.error(n),O("Ocorreu um erro ao importar as configurações"),[3,3];case 3:return[2]}}))},new((n=void 0)||(n=Promise))((function(r,i){function a(e){try{s(o.next(e))}catch(e){i(e)}}function c(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,c)}s((o=o.apply(e,t||[])).next())}));var e,t,n,o}))})),k.addEventListener("click",(function(){var e=JSON.stringify(a()),t=document.createElement("a"),n=new Blob([e],{type:"application/json"}),o=URL.createObjectURL(n);t.href=o,t.download="mobyStk-settings-".concat((new Date).toISOString(),".json"),t.click()}));var q=n(775),T=n(794),J=n(573),P=n(795),j={buttons:q.Z,groups:T.Z,joysticks:J.Z,layouts:P.Z,currentLayout:null,currentTouches:[],elements:{all:[],buttons:[],groups:[],joysticks:[]}};window.Controller=j;const B=j;var N=n(865),R=function(e,t,n){if(n||2===arguments.length)for(var o,r=0,i=t.length;r<i;r++)!o&&r in t||(o||(o=Array.prototype.slice.call(t,0,r)),o[r]=t[r]);return e.concat(o||Array.prototype.slice.call(t))};function H(){document.scrollingElement.scrollTop>window.innerHeight?document.querySelector(".start.floating").classList.remove("hidden"):document.querySelector(".start.floating").classList.add("hidden")}window.addEventListener("load",H),window.addEventListener("scroll",H);var z=parseInt(a("stats.hits.home"));isNaN(z)&&(z=0),a("stats.hits.home",++z),null!==a("password")&&d.classList.remove("hidden"),d.addEventListener("click",(function(){a.remove("password"),d.classList.add("hidden"),O("A senha do MobyStk foi esquecida")})),v.addEventListener("click",(function(){u.classList.remove("show"),m.checked&&a("events.addToHomescreenPopup",!0)})),a("events.addToHomescreenPopup")||3!==z&&z%10!=0||window.addEventListener("load",(function(){var e=document.createElement("video");e.src="video/add-to-homescreen-tutorial.mp4",e.loop=!0,e.muted=!0,u.querySelector(".content").appendChild(e),e.play(),u.classList.add("show")}));for(var D=function(e){var t=document.createElement("label");t.classList.add("chip");var n=document.createElement("input");n.type="radio",n.name="layout",n.value=e.id;var o=document.createElement("div");o.classList.add("label");var r=document.createElement("div");r.classList.add("label-title"),r.innerText=e.name;var i=document.createElement("div");i.classList.add("label-subtitle"),i.innerText=e.subtitle,e.info&&o.addEventListener("click",(function(){return O(e.info)})),o.appendChild(r),o.appendChild(i),t.appendChild(n),t.appendChild(o),p.appendChild(t)},M=0,I=B.layouts;M<I.length;M++)D(I[M]);for(var X=0,Y=B.buttons;X<Y.length;X++){var Z=Y[X];if(Z.content&&!Z.customAction&&!Z.diagonal){var G="";"mobystk:text"===Z.content.type?G+=(0,N.r)(Z.content.value):"mobystk:icon"===Z.content.type&&(G+='<i class="mdi mdi-'.concat((0,N.r)(Z.content.value),'"></i>')),h.innerHTML+='\n\t\t<label class="chip">\n\t\t\t<input type="checkbox" name="lock" data-id="'.concat((0,N.r)(Z.id),'" value="').concat((0,N.r)(Z.id),'">\n\t\t\t<div class="label">').concat(G,"</div>\n\t\t</label>")}}for(var K,_=0,U=R(R(R([],B.buttons,!0),B.groups,!0),B.joysticks,!0);_<U.length;_++){var Q=U[_];G="","mobystk:group"===Q.type&&(G+='<i class="mdi mdi-group"></i>&nbsp;'),"mobystk:joystick"===Q.type&&(G+='<i class="mdi mdi-gamepad"></i>&nbsp;'),"content"in Q&&"type"in Q.content&&"mobystk:text"===Q.content.type?G+=(0,N.r)(Q.content.value):"content"in Q&&"type"in Q.content&&"mobystk:icon"===Q.content.type?G+='<i class="mdi mdi-'.concat((0,N.r)(Q.content.value),'"></i>'):Q.name&&(G+=(0,N.r)(Q.name)),b.innerHTML+='\n\t\t<label class="chip">\n\t\t\t<input type="checkbox" name="hide" data-id="'.concat((0,N.r)(Q.id),'" value="').concat((0,N.r)(Q.id),'">\n\t\t\t<div class="label">').concat(G,"</div>\n\t\t</label>")}y.forEach((function(e){var t,n,o,r=e.parentElement.querySelector('input[type="range"]'),i=(t=r.step||1,(o=(n=Number(t).toString()).indexOf(".")+1)?n.length-o:0);function a(){e.innerText=Number(r.value).toFixed(i)}r&&(r.addEventListener("change",a),r.addEventListener("mousemove",a),r.addEventListener("touchmove",a)),a()})),l.code.value=c("code",window.location.hostname+":5000"),l.layout.value=c("layout",null===(K=B.layouts[0])||void 0===K?void 0:K.id),l.player.value=c("player","1"),l.invertL.checked=c("invertL",!1),l.invertR.checked=c("invertR",!1),l.disJoyXAxis.checked=c("disJoyXAxis",!1),l.disJoyYAxis.checked=c("disJoyYAxis",!1),l.dblClickLoadSave.checked=c("dblClickLoadSave",!1),l.changeKeyOnDrag.checked=c("changeKeyOnDrag",!0),l.vibrate.value=c("vibrate","15"),l.vibrateJoystick.value=c("vibrateJoystick","5"),l.vibrationFromGame.checked=c("vibrationFromGame",!0),l.vgamepad.checked=c("vgamepad",!1),l.background.value=c("background","rgba(0, 0, 0, 1)"),l.color.value=c("color","rgba(255, 255, 255, 0.53)"),l.border.value=c("border","rgba(255, 255, 255, 0.53)"),l.active.value=c("active","rgba(255, 255, 255, 0.2)"),l.bgImage.value=c("bgImage",""),l.bgOpacity.value=c("bgOpacity","0.5"),l.bgBlur.value=c("bgBlur","0"),l.customCSS.value=c("customCSS",""),l.customJS.value=c("customJS",""),l.driveSensitivity.value=c("driveSensitivity","2"),l.drivePrecision.value=c("drivePrecision","1");for(var V=c("locked",[]),W=c("hidden",["mobystk:macro_record","mobystk:macro_play","mobystk:fast_forward"]),$=0,ee=V;$<ee.length;$++){var te=ee[$];(re=document.querySelector('[name=lock][data-id="'.concat((0,N.r)(te),'"]')))&&(re.checked=!0)}for(var ne=0,oe=W;ne<oe.length;ne++){var re;te=oe[ne],(re=document.querySelector('[name=hide][data-id="'.concat((0,N.r)(te),'"]')))&&(re.checked=!0)}s.addEventListener("submit",(function(e){e.preventDefault();var t=this.elements,n=[],o=[];t.lock.forEach((function(e){e.checked&&n.push(e.value)})),t.hide.forEach((function(e){e.checked&&o.push(e.value)})),a("code",t.code.value),a("layout",t.layout.value),a("player",Number(t.player.value)),a("debug",t.debug.checked),a("invertL",t.invertL.checked),a("invertR",t.invertR.checked),a("disJoyXAxis",t.disJoyXAxis.checked),a("disJoyYAxis",t.disJoyYAxis.checked),a("dblClickLoadSave",t.dblClickLoadSave.checked),a("changeKeyOnDrag",t.changeKeyOnDrag.checked),a("vibrate",Number(t.vibrate.value)),a("vibrateJoystick",Number(t.vibrateJoystick.value)),a("vibrationFromGame",t.vibrationFromGame.checked),a("vgamepad",t.vgamepad.checked),a("background",t.background.value),a("color",t.color.value),a("border",t.border.value),a("active",t.active.value),a("bgImage",t.bgImage.value),a("bgOpacity",Number(t.bgOpacity.value)),a("bgBlur",Number(t.bgBlur.value)),a("customCSS",t.customCSS.value),a("customJS",t.customJS.value),a("driveSensitivity",Number(t.driveSensitivity.value)),a("drivePrecision",Number(t.drivePrecision.value)),a("locked",n),a("hidden",o),(0,F.Z)(),location.href="joystick.html"})),window.addEventListener("load",(function(){document.body.classList.remove("preload")})),document.addEventListener("contextmenu",(function(){return!1})),document.querySelectorAll("a").forEach((function(e){return e.addEventListener("click",F.Z)})),document.querySelectorAll(".start").forEach((function(e){e.addEventListener("contextmenu",(function(e){return e.preventDefault(),document.querySelector(".hiddenOptions").style.display="flex",function(e,t,n){if(void 0===t&&(t=0),void 0===n&&(n=document.scrollingElement),n.scrollTop!==e){var o=(n.scrollTop-e)/2,r=0,i=null;window.requestAnimationFrame((function a(c){if(null!==i){if((r+=Math.PI*(c-i)/t)>=Math.PI)return n.scrollTop=e;n.scrollTop=o+e+o*Math.cos(r)}i=c,window.requestAnimationFrame(a)}))}}(document.body.scrollHeight,400),!1}))}))}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var i=n[e]={exports:{}};return t[e].call(i.exports,i,i.exports,o),i.exports}o.m=t,e=[],o.O=(t,n,r,i)=>{if(!n){var a=1/0;for(d=0;d<e.length;d++){for(var[n,r,i]=e[d],c=!0,s=0;s<n.length;s++)(!1&i||a>=i)&&Object.keys(o.O).every((e=>o.O[e](n[s])))?n.splice(s--,1):(c=!1,i<a&&(a=i));if(c){e.splice(d--,1);var l=r();void 0!==l&&(t=l)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[n,r,i]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var r,i,[a,c,s]=n,l=0;if(a.some((t=>0!==e[t]))){for(r in c)o.o(c,r)&&(o.m[r]=c[r]);if(s)var d=s(o)}for(t&&t(n);l<a.length;l++)i=a[l],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(d)},n=self.webpackChunkjoystick=self.webpackChunkjoystick||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var r=o.O(void 0,[90,757],(()=>o(64)));r=o.O(r)})();
//# sourceMappingURL=index.js.map