var I=Object.create;var p=Object.defineProperty;var O=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var L=Object.getPrototypeOf,J=Object.prototype.hasOwnProperty;var C=(c,o)=>()=>(o||c((o={exports:{}}).exports,o),o.exports);var P=(c,o,i,u)=>{if(o&&typeof o=="object"||typeof o=="function")for(let t of A(o))!J.call(c,t)&&t!==i&&p(c,t,{get:()=>o[t],enumerable:!(u=O(o,t))||u.enumerable});return c};var z=(c,o,i)=>(i=c!=null?I(L(c)):{},P(o||!c||!c.__esModule?p(i,"default",{value:c,enumerable:!0}):i,c));var v=C((f,g)=>{(function(c,o){var i={version:"2.14.3",areas:{},apis:{},nsdelim:".",inherit:function(t,e){for(var n in t)e.hasOwnProperty(n)||Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n));return e},stringify:function(t,e){return t===void 0||typeof t=="function"?t+"":JSON.stringify(t,e||i.replace)},parse:function(t,e){try{return JSON.parse(t,e||i.revive)}catch{return t}},fn:function(t,e){i.storeAPI[t]=e;for(var n in i.apis)i.apis[n][t]=e},get:function(t,e){return t.getItem(e)},set:function(t,e,n){t.setItem(e,n)},remove:function(t,e){t.removeItem(e)},key:function(t,e){return t.key(e)},length:function(t){return t.length},clear:function(t){t.clear()},Store:function(t,e,n){var s=i.inherit(i.storeAPI,function(l,h,m){return arguments.length===0?s.getAll():typeof h=="function"?s.transact(l,h,m):h!==void 0?s.set(l,h,m):typeof l=="string"||typeof l=="number"?s.get(l):typeof l=="function"?s.each(l):l?s.setAll(l,h):s.clear()});s._id=t;try{var a="__store2_test";e.setItem(a,"ok"),s._area=e,e.removeItem(a)}catch{s._area=i.storage("fake")}return s._ns=n||"",i.areas[t]||(i.areas[t]=s._area),i.apis[s._ns+s._id]||(i.apis[s._ns+s._id]=s),s},storeAPI:{area:function(t,e){var n=this[t];return(!n||!n.area)&&(n=i.Store(t,e,this._ns),this[t]||(this[t]=n)),n},namespace:function(t,e,n){if(n=n||this._delim||i.nsdelim,!t)return this._ns?this._ns.substring(0,this._ns.length-n.length):"";var s=t,a=this[s];if((!a||!a.namespace)&&(a=i.Store(this._id,this._area,this._ns+s+n),a._delim=n,this[s]||(this[s]=a),!e))for(var l in i.areas)a.area(l,i.areas[l]);return a},isFake:function(t){return t?(this._real=this._area,this._area=i.storage("fake")):t===!1&&(this._area=this._real||this._area),this._area.name==="fake"},toString:function(){return"store"+(this._ns?"."+this.namespace():"")+"["+this._id+"]"},has:function(t){return this._area.has?this._area.has(this._in(t)):this._in(t)in this._area},size:function(){return this.keys().length},each:function(t,e){for(var n=0,s=i.length(this._area);n<s;n++){var a=this._out(i.key(this._area,n));if(a!==void 0&&t.call(this,a,this.get(a),e)===!1)break;s>i.length(this._area)&&(s--,n--)}return e||this},keys:function(t){return this.each(function(e,n,s){s.push(e)},t||[])},get:function(t,e){var n=i.get(this._area,this._in(t)),s;return typeof e=="function"&&(s=e,e=null),n!==null?i.parse(n,s):e??n},getAll:function(t){return this.each(function(e,n,s){s[e]=n},t||{})},transact:function(t,e,n){var s=this.get(t,n),a=e(s);return this.set(t,a===void 0?s:a),this},set:function(t,e,n){var s=this.get(t),a;return s!=null&&n===!1?e:(typeof n=="function"&&(a=n,n=void 0),i.set(this._area,this._in(t),i.stringify(e,a),n)||s)},setAll:function(t,e){var n,s;for(var a in t)s=t[a],this.set(a,s,e)!==s&&(n=!0);return n},add:function(t,e,n){var s=this.get(t);if(s instanceof Array)e=s.concat(e);else if(s!==null){var a=typeof s;if(a===typeof e&&a==="object"){for(var l in e)s[l]=e[l];e=s}else e=s+e}return i.set(this._area,this._in(t),i.stringify(e,n)),e},remove:function(t,e){var n=this.get(t,e);return i.remove(this._area,this._in(t)),n},clear:function(){return this._ns?this.each(function(t){i.remove(this._area,this._in(t))},1):i.clear(this._area),this},clearAll:function(){var t=this._area;for(var e in i.areas)i.areas.hasOwnProperty(e)&&(this._area=i.areas[e],this.clear());return this._area=t,this},_in:function(t){return typeof t!="string"&&(t=i.stringify(t)),this._ns?this._ns+t:t},_out:function(t){return this._ns?t&&t.indexOf(this._ns)===0?t.substring(this._ns.length):void 0:t}},storage:function(t){return i.inherit(i.storageAPI,{items:{},name:t})},storageAPI:{length:0,has:function(t){return this.items.hasOwnProperty(t)},key:function(t){var e=0;for(var n in this.items)if(this.has(n)&&t===e++)return n},setItem:function(t,e){this.has(t)||this.length++,this.items[t]=e},removeItem:function(t){this.has(t)&&(delete this.items[t],this.length--)},getItem:function(t){return this.has(t)?this.items[t]:null},clear:function(){for(var t in this.items)this.removeItem(t)}}},u=i.Store("local",function(){try{return localStorage}catch{}}());u.local=u,u._=i,u.area("session",function(){try{return sessionStorage}catch{}}()),u.area("page",i.storage("page")),typeof o=="function"&&o.amd!==void 0?o("store2",[],function(){return u}):typeof g<"u"&&g.exports?g.exports=u:(c.store&&(i.conflict=c.store),c.store=u)})(f,f&&f.define)});var y=z(v(),1),_=y.default.namespace("joystick");function r(c,o){let i=_(c);return i===null?o:i}window.ls=_;window.getOpt=r;var T=document.querySelector(".loadingScreen");function x(){T.classList.add("visible")}window.loading=x;var b=class{constructor(o){this.element=o,this.content=o.querySelector(".toast-content"),this.toasts=[],this.showing=!1}show(o,i=2e3,u=!1){return this.toasts.push({message:o,time:i,html:u}),this.showing||this.start(),this}start(){if(this.element.classList.remove("show"),!this.toasts.length)return this.showing=!1;this.showing?setTimeout(this.run.bind(this),1e3):this.run(),this.showing=!0}run(){this.element.classList.add("show");let o=this.toasts.shift();this.content[o.html?"innerHTML":"innerText"]=o.message,setTimeout(this.start.bind(this),o.time||2e3)}},d=document.createElement("div");d.classList.add("toast");d.innerHTML='<div class="toast-content"></div>';document.body.appendChild(d);var w=document.createElement("style");w.innerHTML=`
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');

.toast {
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	background-color: rgba(85, 85, 85, 0.9);
	border-radius: 22px;
	bottom: 48px; 
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	color: #FFFFFF;
	display: -webkit-inline-box;
	display: -ms-inline-flexbox;
	display: inline-flex;
	font-family: 'Roboto Condensed', Roboto, Arial, sans-serif;
	font-size: 15.8px;
	left: 50%;
	line-height: 17.6px;
	margin: 16px;
	max-width: 320px;
	min-height: 44px;
	opacity: 0;
	padding: 13.8px 25px;
	pointer-events: none;
	position: fixed;
	text-align: left;
	text-shadow: black 0 0 2px;
	-webkit-transform: translateX(calc(-50% - 16px));
	-ms-transform: translateX(calc(-50% - 16px));
	transform: translateX(calc(-50% - 16px));
	-webkit-transition: opacity 500ms cubic-bezier(0.5, 1, 0.89, 1);
	-o-transition: opacity 500ms cubic-bezier(0.5, 1, 0.89, 1);
	transition: opacity 500ms cubic-bezier(0.5, 1, 0.89, 1);
	width: -webkit-fit-content;
	width: -moz-fit-content;
	width: fit-content;
	z-index: 99999999999;
}

.toast.show {
	opacity: 1;
	-webkit-transition: opacity 500ms cubic-bezier(0.11, 0, 0.5, 0);
	-o-transition: opacity 500ms cubic-bezier(0.11, 0, 0.5, 0);
	transition: opacity 500ms cubic-bezier(0.11, 0, 0.5, 0);
}

/*.toast .toast-content {
	letter-spacing: -0.03px;
	line-height: 17.6px;
	-webkit-transform: scaleY(1.11);
	-ms-transform: scaleY(1.11);
	transform: scaleY(1.11);
}*/
`;document.body.appendChild(w);var F=new b(d),M=(c,o=2e3,i=!1)=>F.show(c,o,i);window.toast=M;var S={ip:r("code","localhost:5000"),layout:r("layout"),player:r("player",1)-1,password:r("password"),debug:r("debug",!1),locked:r("locked",[]),hidden:r("hidden",[]),useXbox:r("useXbox",!1),invertL:r("invertL",!1),invertR:r("invertR",!1),disJoyXAxis:r("disJoyXAxis",!1),disJoyYAxis:r("disJoyYAxis",!1),dblClickLoadSave:r("dblClickLoadSave",!1),changeKeyOnDrag:r("changeKeyOnDrag",!0),vibrate:r("vibrate",60),vibrateJoystick:r("vibrateJoystick",0),vibrationFromGame:r("vibrationFromGame",!0),useKeyboard:r("useKeyboard",!1),bgImage:r("bgImage",""),bgOpacity:r("bgOpacity",.5),bgBlur:r("bgBlur",0),colorsBackground:r("background","rgba(0, 0, 0, 1)"),colorsColor:r("color","rgba(255, 255, 255, 0.53)"),colorsBorder:r("border","rgba(255, 255, 255, 0.53)"),colorsActive:r("active","rgba(255, 255, 255, 0.2)"),customCSS:r("customCSS",""),customJS:r("customJS",""),pluginMobile:r("pluginMobile",!1),driveSensitivity:r("driveSensitivity",2),drivePrecision:r("drivePrecision",1)};window.options=S;var Y=S;export{C as a,z as b,_ as c,r as d,x as e,M as f,Y as g};
/*! Bundled license information:

store2/dist/store2.js:
  (*! store2 - v2.14.3 - 2024-02-14
  * Copyright (c) 2024 Nathan Bubna; Licensed MIT *)
*/
