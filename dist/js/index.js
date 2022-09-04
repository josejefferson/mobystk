(()=>{"use strict";var e,t={630:(e,t,o)=>{var n=o(612),r=o.n(n),a=o(146),c=o(186),i=o(963),l=o(931);const u={buttons:a.Z,groups:c.Z,joysticks:i.Z,layouts:l.Z,currentLayout:null,currentTouches:[],elements:{all:[],buttons:[],groups:[],joysticks:[]}};var s=o(860),d=o.n(s)().namespace("joystick");function v(e,t){var o=d(e);return null===o?t:o}window.ls=d,window.getOpt=v;var m,p,y,b=o(45),h=o(294),f=function(e,t,o){if(o||2===arguments.length)for(var n,r=0,a=t.length;r<a;r++)!n&&r in t||(n||(n=Array.prototype.slice.call(t,0,r)),n[r]=t[r]);return e.concat(n||Array.prototype.slice.call(t))},g=document.forms[0].elements,k=parseInt(d("stats.hits.home"));function S(){document.scrollingElement.scrollTop>window.innerHeight?document.querySelector(".start.floating").classList.remove("hidden"):document.querySelector(".start.floating").classList.add("hidden")}isNaN(k)&&(k=0),d("stats.hits.home",++k),window.addEventListener("load",(function(){document.body.classList.remove("preload")})),window.addEventListener("load",S),window.addEventListener("scroll",S),document.addEventListener("contextmenu",(function(){return!1})),document.querySelectorAll("a").forEach((function(e){return e.addEventListener("click",b.Z)})),document.querySelectorAll(".start").forEach((function(e){e.addEventListener("contextmenu",(function(e){return e.preventDefault(),document.querySelector(".hiddenOptions").style.display="flex",function(e,t,o){if(void 0===t&&(t=0),void 0===o&&(o=document.scrollingElement),o.scrollTop!==e){var n=(o.scrollTop-e)/2,r=0,a=null;window.requestAnimationFrame((function c(i){if(null!==a){if((r+=Math.PI*(i-a)/t)>=Math.PI)return o.scrollTop=e;o.scrollTop=n+e+n*Math.cos(r)}a=i,window.requestAnimationFrame(c)}))}}(document.body.scrollHeight,400),!1}))}));var w=document.querySelector(".forgetPassword");null!==d("password")&&w.classList.remove("hidden"),w.addEventListener("click",(function(){d.remove("password"),w.classList.add("hidden"),(0,h.A)("A senha do MobyStk foi esquecida")}));var F=document.querySelector(".addToHomescreenPopup"),L=F.querySelector(".close-popup"),E=F.querySelector(".dontShowAgainAddToHomescreenPopup");L.addEventListener("click",(function(){F.classList.remove("show"),E.checked&&d("events.addToHomescreenPopup",!0)})),d("events.addToHomescreenPopup")||3!==k&&k%10!=0||window.addEventListener("load",(function(){var e=document.createElement("video");e.src="video/add-to-homescreen-tutorial.mp4",e.loop=!0,e.muted=!0,F.querySelector(".content").appendChild(e),e.play(),F.classList.add("show")}));for(var x=document.querySelector(".selectLayout"),A=0,O=u.layouts;A<O.length;A++){var q=O[A];x.innerHTML+='\n\t\t<label class="chip">\n\t\t\t<input type="radio" name="layout" value="'.concat(z(q.id),'">\n\t\t\t<div class="label">').concat(z(q.name),"</div>\n\t\t</label>")}for(var C=document.querySelector(".lockableKeysList"),J=0,P=u.buttons;J<P.length;J++){var T=P[J];if(T.content&&!T.customAction&&!T.diagonal){var j="";"mobystk:text"===T.content.type?j+=z(T.content.value):"mobystk:icon"===T.content.type&&(j+='<i class="mdi mdi-'.concat(z(T.content.value),'"></i>')),C.innerHTML+='\n\t\t<label class="chip">\n\t\t\t<input type="checkbox" name="lock" data-id="'.concat(z(T.id),'" value="').concat(z(T.id),'">\n\t\t\t<div class="label">').concat(j,"</div>\n\t\t</label>")}}for(var B=document.querySelector(".hiddenItemsList"),N=0,D=f(f(f([],u.buttons,!0),u.groups,!0),u.joysticks,!0);N<D.length;N++){var H=D[N];j="","mobystk:group"===H.type&&(j+='<i class="mdi mdi-group"></i>&nbsp;'),"mobystk:joystick"===H.type&&(j+='<i class="mdi mdi-gamepad"></i>&nbsp;'),"mobystk:text"===(null===(m=H.content)||void 0===m?void 0:m.type)?j+=z(H.content.value):"mobystk:icon"===(null===(p=H.content)||void 0===p?void 0:p.type)?j+='<i class="mdi mdi-'.concat(z(H.content.value),'"></i>'):H.name&&(j+=z(H.name)),B.innerHTML+='\n\t\t<label class="chip">\n\t\t\t<input type="checkbox" name="hide" data-id="'.concat(z(H.id),'" value="').concat(z(H.id),'">\n\t\t\t<div class="label">').concat(j,"</div>\n\t\t</label>")}g.code.value=v("code",window.location.hostname+":5000"),g.layout.value=v("layout",null===(y=u.layouts[0])||void 0===y?void 0:y.id),g.player.value=v("player","1"),g.invertL.checked=v("invertL",!1),g.invertR.checked=v("invertR",!1),g.disJoyXAxis.checked=v("disJoyXAxis",!1),g.disJoyYAxis.checked=v("disJoyYAxis",!1),g.dblClickLoadSave.checked=v("dblClickLoadSave",!1),g.changeKeyOnDrag.checked=v("changeKeyOnDrag",!0),g.vibrate.value=v("vibrate","15"),g.vibrateJoystick.value=v("vibrateJoystick","5"),g.vibrationFromGame.checked=v("vibrationFromGame",!0),g.vgamepad.checked=v("vgamepad",!1),g.background.value=v("background","rgba(0, 0, 0, 1)"),g.color.value=v("color","rgba(255, 255, 255, 0.53)"),g.border.value=v("border","rgba(255, 255, 255, 0.53)"),g.active.value=v("active","rgba(255, 255, 255, 0.2)"),g.bgImage.value=v("bgImage",""),g.bgOpacity.value=v("bgOpacity","0.5"),g.bgBlur.value=v("bgBlur","0"),g.customCSS.value=v("customCSS",""),g.customJS.value=v("customJS",""),g.driveSensitivity.value=v("driveSensitivity","2"),g.drivePrecision.value=v("drivePrecision","1");for(var R=v("locked",[]),I=v("hidden",["mobystk:macro_record","mobystk:macro_play","mobystk:fast_forward"]),M=0,Z=R;M<Z.length;M++){var G=Z[M];(_=document.querySelector('[name=lock][data-id="'.concat(z(G),'"]')))&&(_.checked=!0)}for(var K=0,X=I;K<X.length;K++){var _;G=X[K],(_=document.querySelector('[name=hide][data-id="'.concat(z(G),'"]')))&&(_.checked=!0)}document.querySelectorAll('input[type="range"] + .value').forEach((function(e){var t,o,n,r=e.parentElement.querySelector('input[type="range"]'),a=(t=r.step||1,(n=(o=Number(t).toString()).indexOf(".")+1)?o.length-n:0);function c(){e.innerText=Number(r.value).toFixed(a)}r&&(r.addEventListener("change",c),r.addEventListener("mousemove",c),r.addEventListener("touchmove",c)),c()})),document.forms[0].addEventListener("submit",(function(e){e.preventDefault();var t=this.elements,o=[],n=[];t.lock.forEach((function(e){e.checked&&o.push(e.value)})),t.hide.forEach((function(e){e.checked&&n.push(e.value)})),d("code",t.code.value),d("layout",t.layout.value),d("player",Number(t.player.value)),d("debug",t.debug.checked),d("invertL",t.invertL.checked),d("invertR",t.invertR.checked),d("disJoyXAxis",t.disJoyXAxis.checked),d("disJoyYAxis",t.disJoyYAxis.checked),d("dblClickLoadSave",t.dblClickLoadSave.checked),d("changeKeyOnDrag",t.changeKeyOnDrag.checked),d("vibrate",Number(t.vibrate.value)),d("vibrateJoystick",Number(t.vibrateJoystick.value)),d("vibrationFromGame",t.vibrationFromGame.checked),d("vgamepad",t.vgamepad.checked),d("background",t.background.value),d("color",t.color.value),d("border",t.border.value),d("active",t.active.value),d("bgImage",t.bgImage.value),d("bgOpacity",Number(t.bgOpacity.value)),d("bgBlur",Number(t.bgBlur.value)),d("customCSS",t.customCSS.value),d("customJS",t.customJS.value),d("driveSensitivity",Number(t.driveSensitivity.value)),d("drivePrecision",Number(t.drivePrecision.value)),d("locked",o),d("hidden",n),(0,b.Z)(),location.href="joystick.html"}));var Y={background:U("background","#000"),color:U("color","#FFF8","88"),border:U("border","#FFF8","88"),active:U("active","#FFF3","33")};function U(e,t,o){return void 0===o&&(o=""),r().create({el:".pickr-".concat(e),theme:"classic",default:d(e)||t,defaultRepresentation:"HEXA",comparison:!1,autoReposition:!0,components:{preview:!0,opacity:!0,hue:!0,interaction:{input:!0,save:!0}},i18n:{"btn:save":"Fechar"},swatches:["#F44336","#E91E63","#9C27B0","#673AB7","#3F51B5","#2196F3","#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548","#9E9E9E","#607D8B","#FFFFFF","#000000"].map((function(e){return e+o}))}).on("change",(function(t){t=t.toRGBA().toString();var o=g[e];o.value=t,o.parentElement.querySelector(".pickr button").style.setProperty("--pcr-color",t)})).on("save",(function(e,t){t.hide()}))}function z(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}document.querySelector(".resetColors").addEventListener("click",(function(){Y.background.setColor("#000"),Y.color.setColor("#FFF8"),Y.border.setColor("#FFF8"),Y.active.setColor("#FFF3")})),document.querySelector(".importSettings").addEventListener("click",(function(){var e=document.createElement("input");e.type="file",e.style.display="none",e.click(),e.onchange=function(){return e=this,t=void 0,n=function(){var e,t,o;return function(e,t){var o,n,r,a,c={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(o)throw new TypeError("Generator is already executing.");for(;c;)try{if(o=1,n&&(r=2&a[0]?n.return:a[0]?n.throw||((r=n.return)&&r.call(n),0):n.next)&&!(r=r.call(n,a[1])).done)return r;switch(n=0,r&&(a=[2&a[0],r.value]),a[0]){case 0:case 1:r=a;break;case 4:return c.label++,{value:a[1],done:!1};case 5:c.label++,n=a[1],a=[0];continue;case 7:a=c.ops.pop(),c.trys.pop();continue;default:if(!((r=(r=c.trys).length>0&&r[r.length-1])||6!==a[0]&&2!==a[0])){c=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&a[1]<r[3])){c.label=a[1];break}if(6===a[0]&&c.label<r[1]){c.label=r[1],r=a;break}if(r&&c.label<r[2]){c.label=r[2],c.ops.push(a);break}r[2]&&c.ops.pop(),c.trys.pop();continue}a=t.call(e,c)}catch(e){a=[6,e],n=0}finally{o=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}}(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),(e=this.files[0])?[4,new Promise((function(t,o){var n=new FileReader;n.onload=function(){return t(n.result)},n.onerror=o,n.readAsText(e)}))]:[2];case 1:return t=n.sent(),d(JSON.parse(String(t))),(0,b.Z)(),location.reload(),[3,3];case 2:return o=n.sent(),console.error(o),alert("Ocorreu um erro ao importar as configurações."),[3,3];case 3:return[2]}}))},new((o=void 0)||(o=Promise))((function(r,a){function c(e){try{l(n.next(e))}catch(e){a(e)}}function i(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,i)}l((n=n.apply(e,t||[])).next())}));var e,t,o,n}})),document.querySelector(".exportSettings").addEventListener("click",(function(){var e=JSON.stringify(d()),t=document.createElement("a"),o=new Blob([e],{type:"application/json"}),n=URL.createObjectURL(o);t.href=n,t.download="mobyStk-settings-".concat((new Date).toISOString(),".json"),t.click()}))}},o={};function n(e){var r=o[e];if(void 0!==r)return r.exports;var a=o[e]={exports:{}};return t[e].call(a.exports,a,a.exports,n),a.exports}n.m=t,e=[],n.O=(t,o,r,a)=>{if(!o){var c=1/0;for(s=0;s<e.length;s++){for(var[o,r,a]=e[s],i=!0,l=0;l<o.length;l++)(!1&a||c>=a)&&Object.keys(n.O).every((e=>n.O[e](o[l])))?o.splice(l--,1):(i=!1,a<c&&(c=a));if(i){e.splice(s--,1);var u=r();void 0!==u&&(t=u)}}return t}a=a||0;for(var s=e.length;s>0&&e[s-1][2]>a;s--)e[s]=e[s-1];e[s]=[o,r,a]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0};n.O.j=t=>0===e[t];var t=(t,o)=>{var r,a,[c,i,l]=o,u=0;if(c.some((t=>0!==e[t]))){for(r in i)n.o(i,r)&&(n.m[r]=i[r]);if(l)var s=l(n)}for(t&&t(o);u<c.length;u++)a=c[u],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(s)},o=self.webpackChunkjoystick=self.webpackChunkjoystick||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var r=n.O(void 0,[90,906],(()=>n(630)));r=n.O(r)})();