(()=>{"use strict";var t,e={749:(t,e,n)=>{const o={joyLUp:["W","T","058","195"],joyLLeft:["A","F","063","196"],joyLDown:["S","G","096","197"],joyLRight:["D","H","097","198"],joyRUp:["5","9","098","199"],joyRLeft:["6","0","099","200"],joyRDown:["7","[","100","201"],joyRRight:["8","]","101","202"],padUp:["UP","Z","102","203","XUSB_GAMEPAD_DPAD_UP"],padLeft:["LEFT","X","103","204","XUSB_GAMEPAD_DPAD_LEFT"],padDown:["DOWN","C","104","205","XUSB_GAMEPAD_DPAD_DOWN"],padRight:["RIGHT","V","105","206","XUSB_GAMEPAD_DPAD_RIGHT"],actUp:["I","B","106","207","XUSB_GAMEPAD_Y"],actLeft:["J","N","107","208","XUSB_GAMEPAD_X"],actDown:["K","M","108","209","XUSB_GAMEPAD_A"],actRight:["L","Ç","109","210","XUSB_GAMEPAD_B"],left1:["Q","Y","110","211","XUSB_GAMEPAD_LEFT_SHOULDER"],left2:["1","3","111","212","XUSB_GAMEPAD_LEFT_TRIGGER"],left3:[";","´","187","213","XUSB_GAMEPAD_LEFT_THUMB"],right1:["E","U","188","214","XUSB_GAMEPAD_RIGHT_SHOULDER"],right2:["2","4","189","215","XUSB_GAMEPAD_RIGHT_TRIGGER"],right3:[".","~","190","216","XUSB_GAMEPAD_RIGHT_THUMB"],select:["ENTER","P","193","217","XUSB_GAMEPAD_BACK"],start:["SPACE","O","231","218","XUSB_GAMEPAD_START"],pause:["ESC","ESC","ESC","ESC","ESC"],load:["F1","F1","F1","F1","F1"],save:["[","[","[","[","["],fast:["TAB","TAB","TAB","TAB","TAB"],volUp:["MEDIA_VOLUME_UP","MEDIA_VOLUME_UP","MEDIA_VOLUME_UP","MEDIA_VOLUME_UP","MEDIA_VOLUME_UP"],volDown:["MEDIA_VOLUME_DOWN","MEDIA_VOLUME_DOWN","MEDIA_VOLUME_DOWN","MEDIA_VOLUME_DOWN","MEDIA_VOLUME_DOWN"]};var i=n(45),r=function(){function t(t){this.element=t,this.content=t.querySelector(".toast-content"),this.toasts=[],this.showing=!1}return t.prototype.show=function(t,e,n){return void 0===e&&(e=2e3),void 0===n&&(n=!1),this.toasts.push({message:t,time:e,html:n}),this.showing||this.start(),this},t.prototype.start=function(){if(this.element.classList.remove("show"),!this.toasts.length)return this.showing=!1;this.showing?setTimeout(this.run.bind(this),1e3):this.run(),this.showing=!0},t.prototype.run=function(){this.element.classList.add("show");var t=this.toasts.shift();this.content[t.html?"innerHTML":"innerText"]=t.message,setTimeout(this.start.bind(this),t.time||2e3)},t}(),a=document.createElement("div");a.classList.add("toast"),a.innerHTML='<div class="toast-content"></div>',document.body.appendChild(a);var s=document.createElement("style");s.innerHTML="\n@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');\n\n.toast {\n\t-webkit-box-align: center;\n\t-ms-flex-align: center;\n\talign-items: center;\n\tbackground-color: rgba(85, 85, 85, 0.9);\n\tborder-radius: 22px;\n\tbottom: 48px; \n\t-webkit-box-sizing: border-box;\n\tbox-sizing: border-box;\n\tcolor: #FFFFFF;\n\tdisplay: -webkit-inline-box;\n\tdisplay: -ms-inline-flexbox;\n\tdisplay: inline-flex;\n\tfont-family: 'Roboto Condensed', Roboto, Arial, sans-serif;\n\tfont-size: 15.8px;\n\tleft: 50%;\n\tline-height: 17.6px;\n\tmargin: 16px;\n\tmax-width: 320px;\n\tmin-height: 44px;\n\topacity: 0;\n\tpadding: 13.8px 25px;\n\tpointer-events: none;\n\tposition: fixed;\n\ttext-align: left;\n\ttext-shadow: black 0 0 2px;\n\t-webkit-transform: translateX(calc(-50% - 16px));\n\t-ms-transform: translateX(calc(-50% - 16px));\n\ttransform: translateX(calc(-50% - 16px));\n\t-webkit-transition: opacity 500ms cubic-bezier(0.5, 1, 0.89, 1);\n\t-o-transition: opacity 500ms cubic-bezier(0.5, 1, 0.89, 1);\n\ttransition: opacity 500ms cubic-bezier(0.5, 1, 0.89, 1);\n\twidth: -webkit-fit-content;\n\twidth: -moz-fit-content;\n\twidth: fit-content;\n\tz-index: 99999999999;\n}\n\n.toast.show {\n\topacity: 1;\n\t-webkit-transition: opacity 500ms cubic-bezier(0.11, 0, 0.5, 0);\n\t-o-transition: opacity 500ms cubic-bezier(0.11, 0, 0.5, 0);\n\ttransition: opacity 500ms cubic-bezier(0.11, 0, 0.5, 0);\n}\n\n/*.toast .toast-content {\n\tletter-spacing: -0.03px;\n\tline-height: 17.6px;\n\t-webkit-transform: scaleY(1.11);\n\t-ms-transform: scaleY(1.11);\n\ttransform: scaleY(1.11);\n}*/\n",document.body.appendChild(s);var c=new r(a),l=function(t,e,n){return void 0===e&&(e=2e3),void 0===n&&(n=!1),c.show(t,e,n)};window.toast=l;var d=Date.now();function u(t,e){var n;return void 0===e&&(e=!1),n=Array.isArray(t)?t.reduce((function(t,e){return t+Number(e)}),0):Number(t),e?(d=Date.now()+n,navigator.vibrate(t)):Date.now()+n>d&&navigator.vibrate(t)}var h=n(146),v=n(186),m=n(963),p=n(931),f={buttons:h.Z,groups:v.Z,joysticks:m.Z,layouts:p.Z,currentLayout:null,currentTouches:[],elements:{all:[],buttons:[],groups:[],joysticks:[]}};window.Controller=f;const y=f;var g=n(860),b=n.n(g)().namespace("joystick");function w(t,e){var n=b(t);return null===n?e:n}window.ls=b,window.getOpt=w;var L={ip:w("code","localhost:5000"),layout:w("layout"),player:w("player",1)-1,password:w("password"),debug:w("debug",!1),locked:w("locked",[]),hidden:w("hidden",[]),invertL:w("invertL",!1),invertR:w("invertR",!1),disJoyXAxis:w("disJoyXAxis",!1),disJoyYAxis:w("disJoyYAxis",!1),dblClickLoadSave:w("dblClickLoadSave",!1),changeKeyOnDrag:w("changeKeyOnDrag",!0),vibrate:w("vibrate",15),vibrateJoystick:w("vibrateJoystick",5),vibrationFromGame:w("vibrationFromGame",!0),vgamepad:w("vgamepad",!1),bgImage:w("bgImage",""),bgOpacity:w("bgOpacity",.5),bgBlur:w("bgBlur",0),colorsBackground:w("background","rgba(0, 0, 0, 1)"),colorsColor:w("color","rgba(255, 255, 255, 0.53)"),colorsBorder:w("border","rgba(255, 255, 255, 0.53)"),colorsActive:w("active","rgba(255, 255, 255, 0.2)"),customCSS:w("customCSS",""),customJS:w("customJS",""),driveSensitivity:w("driveSensitivity",2),drivePrecision:w("drivePrecision",1)};window.options=L;const E=L;var k=!1,x=!1,_=[];function A(){var t;(null===(t=window.layoutEditor)||void 0===t?void 0:t.opened)||(W("load"),W("load",!0),u(3*E.vibrate))}function S(){var t;(null===(t=window.layoutEditor)||void 0===t?void 0:t.opened)||(W("save"),W("save",!0),u(3*E.vibrate))}function M(){var t;(null===(t=window.layoutEditor)||void 0===t?void 0:t.opened)||x||(this.instance&&this.instance[this.instance.active?"release":"press"](),k||(_=[]),k=!k)}function j(){var t,e,n,o,i;return e=this,n=void 0,i=function(){var e,n,o;return function(t,e){var n,o,i,r,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function s(r){return function(s){return function(r){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,o&&(i=2&r[0]?o.return:r[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,r[1])).done)return i;switch(o=0,i&&(r=[2&r[0],i.value]),r[0]){case 0:case 1:i=r;break;case 4:return a.label++,{value:r[1],done:!1};case 5:a.label++,o=r[1],r=[0];continue;case 7:r=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==r[0]&&2!==r[0])){a=0;continue}if(3===r[0]&&(!i||r[1]>i[0]&&r[1]<i[3])){a.label=r[1];break}if(6===r[0]&&a.label<i[1]){a.label=i[1],i=r;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(r);break}i[2]&&a.ops.pop(),a.trys.pop();continue}r=e.call(t,a)}catch(t){r=[6,t],o=0}finally{n=i=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,s])}}}(this,(function(i){switch(i.label){case 0:if(null===(t=window.layoutEditor)||void 0===t?void 0:t.opened)return[2];if(k)return[2];x=!x,this.instance&&this.instance.press(),e=0,n=_,i.label=1;case 1:return e<n.length?(o=n[e],x?1!==N.readyState?[3,4]:(N.send(o),[4,new Promise((function(t){return setTimeout(t,50)}))]):[3,4]):[3,4];case 2:i.sent(),i.label=3;case 3:return e++,[3,1];case 4:return this.instance&&this.instance.release(),x=!1,[2]}}))},new((o=void 0)||(o=Promise))((function(t,r){function a(t){try{c(i.next(t))}catch(t){r(t)}}function s(t){try{c(i.throw(t))}catch(t){r(t)}}function c(e){var n;e.done?t(e.value):(n=e.value,n instanceof o?n:new o((function(t){t(n)}))).then(a,s)}c((i=i.apply(e,n||[])).next())}))}function T(){document.documentElement.requestFullscreen()}window.playingMacro=x,window.recordingMacro=k,window.lastMacro=_,window.loadState=A,window.saveState=S,window.recordMacro=M,window.playMacro=j,window.fullScreen=T;var O=document.documentElement,D=document.querySelector(".edit"),P=document.querySelector(".backgroundImage"),X=document.querySelector(".deviceInfo"),C=X.querySelector(".battery"),U=C.querySelector(".battery-icon"),z=C.querySelector(".battery-level"),I=X.querySelector(".clock"),Y=X.querySelector(".player .player-number"),B=X.querySelector(".layout"),R=(X.querySelector(".status"),document.querySelector(".controller-indicator")),H=document.querySelector(".controller-layout"),G=document.querySelector('meta[name="viewport"]'),q=E.vgamepad?"mdi-google-controller":"mdi-keyboard";R.classList.add(q);var F=!1,J={V:function(t){var e=t.toLowerCase().split(" ")[0];if(E.vibrationFromGame){var n=parseInt(e.split("|")[0]);u(n?3e3:0,!0),R.classList[n?"remove":"add"](q),R.classList[n?"add":"remove"]("mdi-vibrate")}},INFO:function(t){l(t)},AUTH_FAILED:function(){if(!F){document.body.classList.remove("connecting","connected"),document.body.classList.add("disconnected");var t=prompt("O computador requer uma senha para se conectar ao MobyStk");null!==t&&(localStorage.setItem("joystick.password",t),F=!0,(0,i.Z)(),window.location.reload())}}},N=function t(){var e=new WebSocket("ws://"+E.ip);return e.addEventListener("open",(function(){document.body.classList.remove("connecting","disconnected"),document.body.classList.add("connected"),e.send("PASSWORD "+(E.password||""))})),e.addEventListener("close",(function(){document.body.classList.remove("connecting","connected"),document.body.classList.add("disconnected"),setTimeout((function(){return N=t()}),3e3)})),e.addEventListener("message",(function(t){var e=t.data.split(" "),n=e[0],o=e.slice(1),i=J[n];"function"==typeof i&&i(o.join(" "))})),document.body.classList.remove("connected","disconnected"),document.body.classList.add("connecting"),e}();function W(t,e,n){if(void 0===e&&(e=!1),t&&t.length)return"string"==typeof t&&(t=[t]),n||(t=t.map((function(t){var e,n;return E.vgamepad?null===(e=o[t])||void 0===e?void 0:e[4]:null===(n=o[t])||void 0===n?void 0:n[E.player]}))),k&&n?_.push("".concat(n," ").concat(t," ").concat(E.player)):k?_.push("".concat(e?"R":"P"," ").concat(t," ").concat(E.player)):void(1===N.readyState&&(n?N.send("".concat(n," ").concat(t," ").concat(E.player)):N.send("".concat(e?"R":"P"," ").concat(t," ").concat(E.player))))}window.sendCmd=W;var $,V=function(){function t(){this.events={}}return t.prototype.on=function(t,e){for(var n=this,o=0,i=t.split(" ");o<i.length;o++){var r=i[o];"object"!=typeof this.events[r]&&(this.events[r]=[]),this.events[r].push(e)}return function(){for(var o=0,i=t.split(" ");o<i.length;o++){var r=i[o];n.off(r,e)}}},t.prototype.off=function(t,e){for(var n=0,o=t.split(" ");n<o.length;n++){var i=o[n];if("object"==typeof this.events[i]){var r=this.events[i].indexOf(e);r>-1&&this.events[i].splice(r,1)}}},t.prototype.emit=function(t){for(var e=this,n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];for(var i=0,r=t.split(" ");i<r.length;i++){var a=r[i];"object"==typeof this.events[a]&&this.events[a].forEach((function(t){return t.apply(e,n)}))}},t.prototype.once=function(t,e){for(var n=this,o=function(t){var o=i.on(t,(function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];o(),e.apply(n,t)}))},i=this,r=0,a=t.split(" ");r<a.length;r++)o(a[r])},t}(),Z=($=function(t,e){return $=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},$(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}$(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});const K=function(t){function e(e){var n=t.call(this)||this;return n.type="mobystk:unknown",n.id=e.id||"mobystk:unknown",n.name=e.name||"(Sem nome)",n.x=e.x||[0,"px"],n.y=e.y||[0,"px"],n.anchorX=e.anchorX||0,n.anchorY=e.anchorY||0,n.width=e.width||[100,"px"],n.height=e.height||[100,"px"],n}return Z(e,t),e.prototype.render=function(){var t=this.element;t.style.left=null,t.style.right=null,t.style.top=null,t.style.bottom=null,t.style.transform=null,t.style.width=this.width.join(""),t.style.height=this.height.join(""),0===this.anchorX&&(t.style.left=this.x.join("")),1===this.anchorX&&(t.style.right=this.x.join("")),0===this.anchorY&&(t.style.top=this.y.join("")),1===this.anchorY&&(t.style.bottom=this.y.join("")),t.classList[2===this.anchorX?"add":"remove"]("center-x"),t.classList[2===this.anchorY?"add":"remove"]("center-y"),t.classList[this.editing?"add":"remove"]("controller-editing")},e}(V);var Q=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),tt=function(t){function e(e){var n=t.call(this,e)||this;n.type="mobystk:button",n.content=e.content||{type:"mobystk:text",value:""},n.key=e.key||"",n.customAction=e.customAction||!1,n.lockable=e.lockable||!1,n.diagonal=e.diagonal||!1,n.diagonal&&(n.targets=e.targets||[]),n.scalable=e.scalable||!1,n.border=e.border||[!0,!0,!0,!0],n.radius=e.radius||[[0,"px"],[0,"px"],[0,"px"],[0,"px"]],n.fontSize=e.fontSize||[20,"px"],n.active=!1,n.editing=!1;var o=document.createElement("button");return o.classList.add("controller-button"),o.dataset.id=n.id,o.instance=n,n.element=o,n}return Q(e,t),e.prototype.press=function(t){var e=this;if(void 0===t&&(t=!1),this.diagonal)for(var n=0,o=y.elements.buttons.filter((function(t){return e.targets.includes(t.id)&&!t.lockable}));n<o.length;n++)o[n].press(!0);else this.active||this.customAction||this.emit("press",this.key),!this.scalable||this.active||t?!this.active&&t&&(this.element.classList.add("controller-button-active-diagonal"),this.element.classList.add("controller-button-scale-diagonal")):this.element.classList.add("controller-button-scale"),this.active=!0,this.element.classList.add("controller-button-active")},e.prototype.release=function(){var t=this;if(this.diagonal)for(var e=0,n=y.elements.buttons.filter((function(e){return t.targets.includes(e.id)}));e<n.length;e++)n[e].release();else this.active&&!this.customAction&&this.emit("release",this.key),this.active=!1,this.element.classList.remove("controller-button-active"),this.element.classList.remove("controller-button-scale"),this.element.classList.remove("controller-button-active-diagonal"),this.element.classList.remove("controller-button-scale-diagonal")},e.prototype.render=function(){t.prototype.render.call(this);var e=this.element;this.border[0]||(e.style.borderTop="0"),this.border[1]||(e.style.borderRight="0"),this.border[2]||(e.style.borderBottom="0"),this.border[3]||(e.style.borderLeft="0");var n=this.radius.map((function(t){return t.join("")})).join(" ");if(e.style.borderRadius=n,e.style.fontSize=this.fontSize.join(""),e.classList[this.diagonal?"add":"remove"]("controller-button-diagonal"),e.classList[this.lockable?"add":"remove"]("controller-button-lockable"),e.innerHTML="","mobystk:text"===this.content.type)e.innerText=this.content.value;else if("mobystk:icon"===this.content.type){var o=document.createElement("i");o.classList.add("mdi","mdi-"+this.content.value),e.appendChild(o)}this._html&&(e.innerHTML=this._html),e.classList[this.customAction?"add":"remove"]("controller-custom-action"),e.dataset.action=this.customAction||null},e}(K);const et=tt;var nt=n(694),ot=n.n(nt),it=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();const rt=function(t){function e(e){var n=t.call(this,e)||this;n.type="mobystk:joystick",n.size=e.size||[90,"px"],n.padding=e.padding||60,n.keys=e.keys||["joyLUp","joyLLeft","joyLDown","joyLRight"],n.position={up:!1,down:!1,left:!1,right:!1};var o=document.createElement("div");return o.classList.add("controller-joystick"),o.dataset.id=n.id,o.instance=n,n.element=o,n}return it(e,t),e.prototype.render=function(){var e=this;this.width=[this.size[0]+this.padding,this.size[1]],this.height=[this.size[0]+this.padding,this.size[1]],t.prototype.render.call(this);var n=this.element;this.position={up:!1,down:!1,left:!1,right:!1},this.nipple&&this.nipple.destroy(),this.nipple=ot().create({zone:n,size:this.size[0],mode:"static",position:{left:"50%",top:"50%"},lockX:E.disJoyYAxis,lockY:E.disJoyXAxis}),this.nipple.on("move",(function(t,n){return e.emit("move",e,t,n)})),this.nipple.on("end",(function(t,n){return e.emit("end",e,t,n)}))},e}(K);function at(t){var e,n;if(!(null===(e=window.layoutEditor)||void 0===e?void 0:e.opened))for(var o=function(t){var e=y.currentTouches.findIndex((function(e){return e.touch.identifier===t.identifier}));if(e<0)return"continue";(null===(n=y.currentTouches[e].target)||void 0===n?void 0:n.instance)instanceof et&&y.currentTouches[e].target.instance.release(),y.currentTouches.splice(e,1)},i=0,r=Array.from(t.changedTouches);i<r.length;i++)o(r[i])}document.addEventListener("touchstart",(function(t){var e;if(!(null===(e=window.layoutEditor)||void 0===e?void 0:e.opened))for(var n=0,o=Array.from(t.changedTouches);n<o.length;n++){for(var i=o[n],r=document.elementFromPoint(i.clientX,i.clientY);null!==r&&!(r.instance instanceof et&&!r.instance.customAction||r.instance instanceof rt);)r=r.parentElement;if(null==r?void 0:r.instance.lockable)u(E.vibrate),r.instance.active?r.instance.release():r.instance.press();else{var a=(null==r?void 0:r.instance)instanceof rt;y.currentTouches.push({target:r,touch:i,joystick:a}),r&&(u(E.vibrate),a||r.instance.press())}}})),document.addEventListener("touchmove",(function(t){var e,n,o;if(!(null===(e=window.layoutEditor)||void 0===e?void 0:e.opened))for(var i=function(t){var e=y.currentTouches.findIndex((function(e){return e.touch.identifier===t.identifier}));if(e<0)return"continue";var i=y.currentTouches[e];if(i.joystick)return"continue";if(!E.changeKeyOnDrag&&i.target)return"continue";i.touch=t;for(var r=document.elementFromPoint(t.clientX,t.clientY);null!==r&&(!(r.instance instanceof et)||r.instance.customAction||r.instance.lockable);)r=r.parentElement;return i.target===r?"continue":(null===(n=i.target)||void 0===n||n.instance.release(),r&&!(null===(o=r.instance)||void 0===o?void 0:o.active)||(r=null),i.target=r,r?(r.instance.press(),void u(E.vibrate)):"continue")},r=0,a=Array.from(t.changedTouches);r<a.length;r++){i(a[r])}})),document.addEventListener("touchend",at),document.addEventListener("touchcancel",at);var st=["mobystk:joystick_left","mobystk:joystick_right"];function ct(t,e,n){var o,i;if(u(E.vibrateJoystick*(null==n?void 0:n.distance)/45),E.vgamepad&&st.includes(t.id)){var r=Math.round(65534/90*(45+(null==n?void 0:n.distance)*Math.cos(null===(o=null==n?void 0:n.angle)||void 0===o?void 0:o.radian))-32768),a=Math.round(65534/90*(45+(null==n?void 0:n.distance)*Math.sin(null===(i=null==n?void 0:n.angle)||void 0===i?void 0:i.radian))-32768);(isNaN(r)||isNaN(a))&&(r=a=0),"mobystk:joystick_left"===t.id&&W("".concat(r,"|").concat(a),!1,"VJL"),"mobystk:joystick_right"===t.id&&W("".concat(r,"|").concat(a),!1,"VJR")}if(!(null==n?void 0:n.direction))return s("up",!1),s("left",!1),s("down",!1),void s("right",!1);function s(e,n){var o=function(t,e){var n,o;switch(e){case"up":n=t[0],o="Top";break;case"left":n=t[1],o="Left";break;case"down":n=t[2],o="Bottom";break;case"right":n=t[3],o="Right"}return{key:n,border:o}}(t.keys,e),i=o.key,r=o.border;if(t.element.querySelector(".back").style["border".concat(r,"Width")]=n?"7px":"",!E.vgamepad||!st.includes(t.id)){if(t.position[e]===n)return;W([i],!n)}t.position[e]=n}E.disJoyYAxis||s("up",(null==n?void 0:n.angle.degree)>22.5&&(null==n?void 0:n.angle.degree)<157.5),E.disJoyXAxis||s("left",(null==n?void 0:n.angle.degree)>112.5&&(null==n?void 0:n.angle.degree)<247.5),E.disJoyYAxis||s("down",(null==n?void 0:n.angle.degree)>202.5&&(null==n?void 0:n.angle.degree)<337.5),E.disJoyXAxis||s("right",(null==n?void 0:n.angle.degree)>292.5||(null==n?void 0:n.angle.degree)<67.5)}function lt(){var t;t=window.outerHeight>window.outerWidth/1.7777777777777777?640:window.outerWidth/window.outerHeight*360,G.setAttribute("content","width=".concat(t,", user-scalable=0")),y.currentTouches=y.currentTouches.filter((function(t){return!t.joystick})),y.elements.joysticks.forEach((function(t){return t.render()}))}window.addEventListener("load",lt),window.addEventListener("resize",lt);var dt=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),ut=function(t){function e(e){var n=t.call(this,e)||this;n.type="mobystk:group",n.content=e.content||[],n.parsedContent=e.parsedContent||[];var o=document.createElement("div");o.classList.add("controller-group"),o.dataset.id=n.id,o.instance=n,n.element=o;for(var i=0,r=n.parsedContent;i<r.length;i++){var a=r[i];o.appendChild(a.element),a.render()}return n}return dt(e,t),e}(K);const ht=ut;function vt(){var t=y.elements.buttons.find((function(t){return"drive"===t.customAction})),e=t?t._html='\n\t<svg viewBox="0 0 32 32">\n\t\t<path d="M16 0a16 16 0 100 32 16 16 0 000-32zm0 4a12 12 0 0111.3 8H4.7c1.7-4.6 6-8 11.3-8zm0 14a2 2 0 110-4 2 2 0 010 4zM4 16c5.5 0 9.9 5.3 10 11.8A12 12 0 014 16zm14 11.8c.1-6.5 4.5-11.8 10-11.8a12 12 0 01-10 11.8z"></path>\n\t</svg>':"";null==t||t.render(),t&&t.element.addEventListener("touchstart",(function(){var n;(null===(n=window.layoutEditor)||void 0===n?void 0:n.opened)||(t.active?(t.release(),t.element.innerHTML=e,window.ondevicemotion=null,E.vgamepad?W("0|0",!1,"VJL"):(W("joyLUp",!0),W("joyLLeft",!0),W("joyLRight",!0))):function(){t.press(),t.element.innerHTML='<i class="driveArrow mdi mdi-arrow-up"></i>';var e=0,n=0,o=[];window.ondevicemotion=function(i){var r=window.outerWidth>window.outerHeight,a=i.accelerationIncludingGravity[r?"x":"y"]>=0?1:-1;e=parseFloat(i.accelerationIncludingGravity[r?"y":"x"].toFixed(1)),e*=a*(r?1:-1);var s=t.element.children[0];if(E.vgamepad){var c=Math.round(32767/E.driveSensitivity*e);c<10923*E.drivePrecision&&c>-10923*E.drivePrecision&&(c=0),c>32767&&(c=32767),c<-32767&&(c=-32767),l=90*c/32767,s.style.transform="rotate(".concat(l,"deg)"),W("".concat(c,"|0"),!1,"VJL")}else{var l=function(t,e,n,o){var i=0;return-45===t?(e>n&&(i=45),e<-n+o&&(i=-45),e>2*n&&(i*=2),e<2*-n-o&&(i*=2)):45===t?(e>n-o&&(i=45),e<-n&&(i=-45),e>2*n+o&&(i*=2),e<2*-n&&(i*=2)):(e>n&&(i=45),e<-n&&(i=-45),e>2*n&&(i*=2),e<2*-n&&(i*=2)),i}(n,e,E.driveSensitivity,E.drivePrecision);if(l===n)return;s.style.transform="rotate(".concat(l,"deg)"),n=l,u(2*E.vibrate);var d=function(t){var e;switch(t){case-90:e=["joyLLeft"];break;case-45:e=["joyLUp","joyLLeft"];break;case 45:e=["joyLUp","joyLRight"];break;case 90:e=["joyLRight"];break;default:e=["joyLUp"]}return e}(l),h=d.filter((function(t){return!o.includes(t)})),v=o.filter((function(t){return!d.includes(t)}));W(h),W(v,!0),o=function(t,e,n){if(n||2===arguments.length)for(var o,i=0,r=e.length;i<r;i++)!o&&i in e||(o||(o=Array.prototype.slice.call(e,0,i)),o[i]=e[i]);return t.concat(o||Array.prototype.slice.call(e))}([],d,!0)}}}())})),"https:"!==location.protocol&&"localhost"!==location.hostname&&"127.0.0.1"!==location.hostname&&t&&t.element&&(t.element.style.display="none")}var mt=function(){return mt=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},mt.apply(this,arguments)},pt=function(t,e,n){if(n||2===arguments.length)for(var o,i=0,r=e.length;i<r;i++)!o&&i in e||(o||(o=Array.prototype.slice.call(e,0,i)),o[i]=e[i]);return t.concat(o||Array.prototype.slice.call(e))};function ft(t,e){if(void 0===e&&(e=[]),"mobystk:layout"===t.type||"mobystk:group"===t.type){"mobystk:layout"!==t.type&&e.push(t);for(var n=0,o=t.parsedContent;n<o.length;n++)ft(o[n],e)}else e.push(t);return e}function yt(t){var e,n,o="import"in t?t.import:t.id;if(!(null===(e=E.hidden)||void 0===e?void 0:e.includes(o))&&("import"in t&&(t=function(t){var e=pt(pt(pt([],y.buttons,!0),y.groups,!0),y.joysticks,!0).find((function(e){return e.id===t.import}));if(e)return mt(mt({},e),t)}(t)),t)){if("mobystk:button"===t.type)return(null===(n=E.locked)||void 0===n?void 0:n.includes(o))&&(t=mt(mt({},t),{lockable:!0})),new et(t);if("mobystk:group"===t.type){t.parsedContent=t.content.map(yt).filter((function(t){return t}));var i=new ht(t);return t.parsedContent=t.parsedContent.map((function(t){return t.parent=i})),i}return"mobystk:joystick"===t.type?new rt(t):void 0}}if(!E.layout)throw window.location.href="index.html",new Error("Layout não selecionado");var gt,bt,wt=y.layouts.find((function(t){return t.id===E.layout}));if(!wt)throw alert("Layout não encontrado!"),window.location.href="index.html",new Error("Layout não encontrado");!function(t){var e=mt(mt({},t),{parsedContent:t.content.map(yt).filter((function(t){return t}))}),n=ft(e);H.innerHTML="";for(var o=0,i=e.parsedContent;o<i.length;o++){var r=i[o];r&&(H.appendChild(r.element),r.render())}y.currentLayout=e,y.elements.all=n,y.elements.buttons=n.filter((function(t){return t instanceof et})),y.elements.groups=n.filter((function(t){return t instanceof ht})),y.elements.joysticks=n.filter((function(t){return t instanceof rt})),B.innerText=t.name||"???",function(){var t=y.elements.buttons.find((function(t){return"load-state"===t.customAction}));t&&t.element.addEventListener(E.dblClickLoadSave?"dblclick":"click",A);var e=y.elements.buttons.find((function(t){return"save-state"===t.customAction}));e&&e.element.addEventListener(E.dblClickLoadSave?"dblclick":"click",S),k=!1,x=!1,_=[];var n=y.elements.buttons.find((function(t){return"macro-record"===t.customAction}));n&&n.element.addEventListener("click",M);var o=y.elements.buttons.find((function(t){return"macro-play"===t.customAction}));o&&o.element.addEventListener("click",j),document.querySelector(".deviceInfo").addEventListener("dblclick",T)}(),vt()}(wt);for(var Lt=0,Et=y.elements.all;Lt<Et.length;Lt++){var kt=Et[Lt];kt instanceof et?(kt.on("press",(function(t){return W(t,!1)})),kt.on("release",(function(t){return W(t,!0)}))):kt instanceof rt&&kt.on("move end",ct)}E.hidden.includes("mobystk:deviceInfo")&&X.classList.add("hidden"),D.addEventListener("click",i.Z),D.addEventListener("contextmenu",(function(){window.layoutEditor.opened?window.layoutEditor.end():window.layoutEditor.start()})),E.layout||(location.href="index.html"),E.debug&&document.body.classList.add("debug"),E.invertL&&document.body.classList.add("invertL"),E.invertR&&document.body.classList.add("invertR"),E.bgImage&&(P.style.backgroundImage="url('".concat(E.bgImage,"')")),E.bgOpacity&&(P.style.opacity=String(E.bgOpacity)),E.bgBlur&&(P.style.filter="blur(".concat(E.bgBlur,"px)")),E.colorsBackground&&O.style.setProperty("--background",E.colorsBackground),E.colorsColor&&O.style.setProperty("--color",E.colorsColor),E.colorsBorder&&O.style.setProperty("--border",E.colorsBorder),E.colorsActive&&O.style.setProperty("--active",E.colorsActive);var xt=document.createElement("style");if(xt.textContent=E.customCSS,document.body.append(xt),E.customJS&&E.customJS.trim()&&confirm("Deseja executar os plugins?"))try{new Function(E.customJS.trim())()}catch(t){alert("Ocorreu um erro ao executar os plugins\n\n"+(t.message||""))}function _t(t){var e;(e=U.classList).remove.apply(e,Array.from(U.classList)),U.classList.add("mdi");var n=t.charging,o=100*t.level,i=10*Math.round(o/10);z.innerText=Math.round(o)+"% •",0===i?U.classList.add("mdi-battery-outline"):100===i?U.classList.add("mdi-battery"+(n?"-charging-100":"")):U.classList.add("mdi-battery-"+(n?"charging-":"")+i)}function At(){var t=(new Date).getHours().toString().padStart(2,"0"),e=(new Date).getMinutes().toString().padStart(2,"0");I.innerText=t+":"+e}null===(bt=null===(gt=navigator.getBattery)||void 0===gt?void 0:gt.call(navigator))||void 0===bt||bt.then((function(t){_t(t),t.addEventListener("chargingchange",(function(t){return _t(t.target)})),t.addEventListener("levelchange",(function(t){return _t(t.target)}))})).catch(console.error),window.setInterval(At,1e3),At(),Y.innerText=String(E.player+1),E.debug&&X.addEventListener("click",(function(){E.player+=1,E.player>3&&(E.player=0),Y.innerText=String(E.player+1)}));var St=null,Mt=null,jt=null;function Tt(){if(St.removeAttribute("style"),Mt.removeAttribute("style"),jt.removeAttribute("style"),zt){var t=zt.anchorX,e=zt.anchorY,n=zt.width,o=zt.height,i=zt.x,r=zt.y;St.style.width=2!==t?i.join(""):"0px",Mt.style.height=2!==e?r.join(""):"0px",jt.style.width=n.join(""),jt.style.height=o.join("");var a=1===t?"right":"left",s=1===e?"bottom":"top";St.style[a]="0",Mt.style[a]=2===t?"50%":"calc(".concat(i.join("")," + ").concat(n.join("")," / 2)"),Mt.style[s]="0",St.style[s]=2===e?"50%":"calc(".concat(r.join("")," + ").concat(o.join("")," / 2)"),jt.style[a]=2===t?"50%":i.join(""),jt.style[s]=2===e?"50%":r.join(""),2===t&&2===e?jt.style.transform="translate(-50%, -50%)":2===t?jt.style.transform="translateX(-50%)":2===e&&(jt.style.transform="translateY(-50%)")}}var Ot,Dt=n(790),Pt=function(){function t(t){var e=this;this.element=t,this.opened=!1,this.interacting=!1,t.addEventListener("touchstart",(function(){return e.interacting=!0})),t.addEventListener("touchend",(function(){return e.interacting=!1})),this.render()}return t.prototype.render=function(){this.element.classList[this.opened?"add":"remove"]("opened"),this.element.innerHTML="",this.element.appendChild(this._html(y.currentLayout))},t.prototype._html=function(t,e){void 0===e&&(e=!0);var n,o=document.createDocumentFragment();if(!e&&t instanceof ht){var i=document.createElement("div");i.classList.add("element","group"),t===zt&&i.classList.add("active"),(d=document.createElement("div")).classList.add("name");var r=(0,Dt.r)(this._getIcon(t)),a=(0,Dt.r)(t.name);d.innerHTML+='<i class="mdi mdi-'.concat(r,'"></i> ').concat(a),d.instance=t,i.appendChild(d),(n=document.createElement("div")).classList.add("content"),i.appendChild(n),o.appendChild(i)}else n=o;for(var s=0,c=t.parsedContent||t.content;s<c.length;s++){var l=c[s];if("content"in l&&Array.isArray(l.content))n.appendChild(this._html(l,!1));else{var d,u=document.createElement("div"),h=l instanceof et?"button":l instanceof rt?"joystick":"";h&&u.classList.add("element",h),l===zt&&u.classList.add("active"),(d=document.createElement("div")).classList.add("name"),d.innerHTML+='<i class="mdi mdi-'.concat((0,Dt.r)(this._getIcon(l)),'"></i> ').concat((0,Dt.r)(l.name)),d.instance=l,u.appendChild(d),n.appendChild(u)}}return o},t.prototype._getIcon=function(t){switch(t.type){case"mobystk:button":return"mobystk:icon"===t.content.type?t.content.value:"checkbox-intermediate";case"mobystk:group":return"group";case"mobystk:joystick":return"gamepad"}},t}(),Xt=new Pt(document.querySelector(".layout-tree")),Ct=function(){function t(t){var e=this;if(!t)throw new Error("Invalid element to construct Toolbar");this.element=t,this.x=0,this.y=0,this.mode=0,this.showingMore=!1,this.interacting=!1,t.addEventListener("touchstart",(function(){return e.interacting=!0})),t.addEventListener("touchend",(function(){e.interacting=!1,e.render()})),t.querySelector(".drag").addEventListener("touchmove",(function(t){e.x=Math.max(0,t.changedTouches[0].clientX-14),e.y=Math.max(0,t.changedTouches[0].clientY-21),e.render()})),this.$showLayoutTree=t.querySelector(".show-layout-tree"),this.$showLayoutTree.addEventListener("click",(function(t){Xt.opened=!Xt.opened,Xt.render(),e.render()})),this.$toolbarShowMore=t.querySelector(".show-more"),this.$toolbarShowMore.addEventListener("click",(function(t){e.showingMore=!e.showingMore,e.render()})),this.$modes=document.querySelectorAll(".mode");for(var n=function(t){var e=o;t.addEventListener("click",(function(t){var n=parseInt(this.dataset.mode);isNaN(n)||(e.mode=n,e.render())}))},o=this,i=0,r=Array.from(this.$modes);i<r.length;i++)n(r[i]);this.$anchorX=document.querySelector(".anchor-x"),this.$anchorX.addEventListener("click",(function(t){zt.anchorX+=1,zt.anchorX>2&&(zt.anchorX=0),e.render(),zt.render(),Tt()})),this.$anchorY=document.querySelector(".anchor-y"),this.$anchorY.addEventListener("click",(function(t){zt.anchorY+=1,zt.anchorY>2&&(zt.anchorY=0),e.render(),zt.render(),Tt()})),this.render()}return t.prototype.render=function(){var t=this.element;t.classList[this.showingMore?"add":"remove"]("showing-more"),t.classList[this.interacting?"add":"remove"]("interacting");try{this.$showLayoutTree.classList[Xt.opened?"add":"remove"]("active")}catch(t){console.error(t)}var e=this.x,n=this.y,o=t.parentElement;e+t.offsetWidth>o.offsetWidth&&(e=o.offsetWidth-t.offsetWidth),n+t.offsetHeight>o.offsetHeight&&(n=o.offsetHeight-t.offsetHeight),t.style.left=e+"px",t.style.top=n+"px",this._x=e,this._y=n;for(var i=0,r=Array.from(this.$modes);i<r.length;i++){var a=r[i],s=parseInt(a.dataset.mode);isNaN(s)||a.classList[this.mode===s?"add":"remove"]("active-mode")}var c=this.$anchorX.querySelector("i.mdi"),l=this.$anchorY.querySelector("i.mdi");c.classList.remove("mdi-align-horizontal-left","mdi-align-horizontal-center","mdi-align-horizontal-right"),l.classList.remove("mdi-align-vertical-top","mdi-align-vertical-center","mdi-align-vertical-bottom"),void 0!==zt&&zt?(this.$anchorX.disabled=!1,this.$anchorY.disabled=!1,0===zt.anchorX&&c.classList.add("mdi-align-horizontal-left"),1===zt.anchorX&&c.classList.add("mdi-align-horizontal-right"),2===zt.anchorX&&c.classList.add("mdi-align-horizontal-center"),0===zt.anchorY&&l.classList.add("mdi-align-vertical-top"),1===zt.anchorY&&l.classList.add("mdi-align-vertical-bottom"),2===zt.anchorY&&l.classList.add("mdi-align-vertical-center")):(this.$anchorX.disabled=!0,this.$anchorY.disabled=!0,c.classList.add("mdi-align-horizontal-left"),l.classList.add("mdi-align-vertical-top"))},t}(),Ut=new Ct(document.querySelector(".layout-editor-toolbar")),zt=null;function It(t){Ot="changedTouches"in t?t.changedTouches[0]:t}function Yt(t){var e;if(!Ut.interacting&&!Xt.interacting){var n=zt;if(n){var o="changedTouches"in t?t.changedTouches[0]:t,i=o.clientX,r=o.clientY,a=i-((null==Ot?void 0:Ot.clientX)||i),s=r-((null==Ot?void 0:Ot.clientY)||r);(2===n.anchorX&&(a<-20||a>20)&&!c.showing||2===n.anchorY&&(s<-20||s>20)&&!c.showing)&&l("Não é possível mover o elemento centralizado\nMude a posição do elemento para movimentá-lo"),Ot="changedTouches"in t?t.changedTouches[0]:t,1===n.anchorX&&(a=-a),1===n.anchorY&&(s=-s);var d=Ht,u=Ht,h=(null===(e=n.parent)||void 0===e?void 0:e.width[0])||document.body.clientWidth;0===Ut.mode?function(){"%"===n.x[1]&&v(),"%"===n.y[1]&&m(),2===n.anchorX&&(a=0),2===n.anchorY&&(s=0);var t=n._imaginaryX||n.x[0],e=n._imaginaryY||n.y[0];n.x[0]=Math.round((t+a)/d)*d,n.y[0]=Math.round((e+s)/u)*u,n._imaginaryX=t+a,n._imaginaryY=e+s}():1===Ut.mode&&(n instanceof rt?function(){var t=n;"%"===t.size[1]&&(v(),m());var e=t._imaginarySize||t.size[0],o=t._imaginaryPadding||t.padding;t.size[0]=Math.max(0,Math.round((e+a)/d)*d),t.padding=Math.max(0,Math.round((o+s)/u)*u),t._imaginarySize=Math.max(0,e+a),t._imaginaryPadding=Math.max(0,o+s)}():function(){"%"===n.width[1]&&v(),"%"===n.height[1]&&m();var t=n._imaginaryWidth||n.width[0],e=n._imaginaryHeight||n.height[0];n.width[0]=Math.max(0,Math.round((t+a)/d)*d),n.height[0]=Math.max(0,Math.round((e+s)/u)*u),n._imaginaryWidth=Math.max(0,t+a),n._imaginaryHeight=Math.max(0,e+s)}()),n.render(),Tt()}}function v(){d=100*d/h,a=100*a/h}function m(){u=100*u/h,s=100*s/h}}function Bt(t){}window.onload=function(){return Rt.start()};var Rt={};window.layoutEditor=Rt,Rt.opened=!1;var Ht=10;function Gt(t){var e,n,o;if(!t.path.includes(Ut.element)){for(var i=0;t.path[i]&&(!("instance"in t.path[i])||(null===(n=null===(e=t.path[i])||void 0===e?void 0:e.instance)||void 0===n?void 0:n.editing));)i++;o=t.path[i],zt&&(zt.editing=!1,zt.render(),function(t){var e;((null===(e=t.parent)||void 0===e?void 0:e.element)||document.body).classList.remove("editing-element-parent"),null==St||St.remove(),null==Mt||Mt.remove(),null==jt||jt.remove()}(zt)),(zt=null==o?void 0:o.instance)&&(zt.editing=!0,zt.render(),function(t){var e,n=(null===(e=t.parent)||void 0===e?void 0:e.element)||document.body;n.classList.add("editing-element-parent"),St=document.createElement("div"),Mt=document.createElement("div"),jt=document.createElement("div"),St.classList.add("horizontal-anchor"),Mt.classList.add("vertical-anchor"),jt.classList.add("editing-item-box"),n.appendChild(St),n.appendChild(Mt),n.appendChild(jt)}(zt),Tt()),Xt.render(),Ut.render()}}Rt.start=function(){Rt.opened=!0,E.disJoyXAxis=!0,E.disJoyYAxis=!0,lt(),document.body.classList.add("layout-editor-opened"),document.addEventListener("click",Gt),document.body.style.setProperty("--grid-size",Ht+"px"),document.addEventListener("touchstart",It),document.addEventListener("touchmove",Yt),document.addEventListener("touchend",Bt),document.addEventListener("mousedown",It),document.addEventListener("mouseup",Yt),document.addEventListener("mousemove",Bt),l("Modo edição ativado"),l("Clique em algum elemento para editar")};var qt=!1;function Ft(t){qt=!0,It(t)}function Jt(t){qt=!1}function Nt(t){qt&&Yt(t)}Rt.end=function(){Rt.opened=!1,document.body.classList.remove("layout-editor-opened"),E.disJoyXAxis=!1,E.disJoyYAxis=!1,lt(),document.removeEventListener("click",Gt),document.removeEventListener("touchstart",It),document.removeEventListener("touchmove",Yt),document.removeEventListener("touchend",Bt),document.removeEventListener("mousedown",Ft),document.removeEventListener("mouseup",Nt),document.removeEventListener("mousemove",Jt),l("Modo edição desativado")},document.addEventListener("contextmenu",(function(t){return t.preventDefault()})),window.addEventListener("load",(function(){document.body.classList.remove("preload")}))}},n={};function o(t){var i=n[t];if(void 0!==i)return i.exports;var r=n[t]={exports:{}};return e[t].call(r.exports,r,r.exports,o),r.exports}o.m=e,t=[],o.O=(e,n,i,r)=>{if(!n){var a=1/0;for(d=0;d<t.length;d++){for(var[n,i,r]=t[d],s=!0,c=0;c<n.length;c++)(!1&r||a>=r)&&Object.keys(o.O).every((t=>o.O[t](n[c])))?n.splice(c--,1):(s=!1,r<a&&(a=r));if(s){t.splice(d--,1);var l=i();void 0!==l&&(e=l)}}return e}r=r||0;for(var d=t.length;d>0&&t[d-1][2]>r;d--)t[d]=t[d-1];t[d]=[n,i,r]},o.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},o.d=(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={698:0};o.O.j=e=>0===t[e];var e=(e,n)=>{var i,r,[a,s,c]=n,l=0;if(a.some((e=>0!==t[e]))){for(i in s)o.o(s,i)&&(o.m[i]=s[i]);if(c)var d=c(o)}for(e&&e(n);l<a.length;l++)r=a[l],o.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return o.O(d)},n=self.webpackChunkjoystick=self.webpackChunkjoystick||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))})();var i=o.O(void 0,[817,444],(()=>o(749)));i=o.O(i)})();
//# sourceMappingURL=joystick.js.map