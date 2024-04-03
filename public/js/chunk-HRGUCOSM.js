var I=Object.create;var _=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var z=Object.getOwnPropertyNames;var A=Object.getPrototypeOf,O=Object.prototype.hasOwnProperty;var T=(a,r)=>()=>(r||a((r={exports:{}}).exports,r),r.exports);var L=(a,r,n,c)=>{if(r&&typeof r=="object"||typeof r=="function")for(let t of z(r))!O.call(a,t)&&t!==n&&_(a,t,{get:()=>r[t],enumerable:!(c=S(r,t))||c.enumerable});return a};var P=(a,r,n)=>(n=a!=null?I(A(a)):{},L(r||!a||!a.__esModule?_(n,"default",{value:a,enumerable:!0}):n,a));var d=T((u,l)=>{(function(a,r){var n={version:"2.14.2",areas:{},apis:{},nsdelim:".",inherit:function(t,e){for(var i in t)e.hasOwnProperty(i)||Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(t,i));return e},stringify:function(t,e){return t===void 0||typeof t=="function"?t+"":JSON.stringify(t,e||n.replace)},parse:function(t,e){try{return JSON.parse(t,e||n.revive)}catch{return t}},fn:function(t,e){n.storeAPI[t]=e;for(var i in n.apis)n.apis[i][t]=e},get:function(t,e){return t.getItem(e)},set:function(t,e,i){t.setItem(e,i)},remove:function(t,e){t.removeItem(e)},key:function(t,e){return t.key(e)},length:function(t){return t.length},clear:function(t){t.clear()},Store:function(t,e,i){var s=n.inherit(n.storeAPI,function(h,f,p){return arguments.length===0?s.getAll():typeof f=="function"?s.transact(h,f,p):f!==void 0?s.set(h,f,p):typeof h=="string"||typeof h=="number"?s.get(h):typeof h=="function"?s.each(h):h?s.setAll(h,f):s.clear()});s._id=t;try{var o="__store2_test";e.setItem(o,"ok"),s._area=e,e.removeItem(o)}catch{s._area=n.storage("fake")}return s._ns=i||"",n.areas[t]||(n.areas[t]=s._area),n.apis[s._ns+s._id]||(n.apis[s._ns+s._id]=s),s},storeAPI:{area:function(t,e){var i=this[t];return(!i||!i.area)&&(i=n.Store(t,e,this._ns),this[t]||(this[t]=i)),i},namespace:function(t,e,i){if(i=i||this._delim||n.nsdelim,!t)return this._ns?this._ns.substring(0,this._ns.length-i.length):"";var s=t,o=this[s];if((!o||!o.namespace)&&(o=n.Store(this._id,this._area,this._ns+s+i),o._delim=i,this[s]||(this[s]=o),!e))for(var h in n.areas)o.area(h,n.areas[h]);return o},isFake:function(t){return t?(this._real=this._area,this._area=n.storage("fake")):t===!1&&(this._area=this._real||this._area),this._area.name==="fake"},toString:function(){return"store"+(this._ns?"."+this.namespace():"")+"["+this._id+"]"},has:function(t){return this._area.has?this._area.has(this._in(t)):this._in(t)in this._area},size:function(){return this.keys().length},each:function(t,e){for(var i=0,s=n.length(this._area);i<s;i++){var o=this._out(n.key(this._area,i));if(o!==void 0&&t.call(this,o,this.get(o),e)===!1)break;s>n.length(this._area)&&(s--,i--)}return e||this},keys:function(t){return this.each(function(e,i,s){s.push(e)},t||[])},get:function(t,e){var i=n.get(this._area,this._in(t)),s;return typeof e=="function"&&(s=e,e=null),i!==null?n.parse(i,s):e??i},getAll:function(t){return this.each(function(e,i,s){s[e]=i},t||{})},transact:function(t,e,i){var s=this.get(t,i),o=e(s);return this.set(t,o===void 0?s:o),this},set:function(t,e,i){var s=this.get(t),o;return s!=null&&i===!1?e:(typeof i=="function"&&(o=i,i=void 0),n.set(this._area,this._in(t),n.stringify(e,o),i)||s)},setAll:function(t,e){var i,s;for(var o in t)s=t[o],this.set(o,s,e)!==s&&(i=!0);return i},add:function(t,e,i){var s=this.get(t);if(s instanceof Array)e=s.concat(e);else if(s!==null){var o=typeof s;if(o===typeof e&&o==="object"){for(var h in e)s[h]=e[h];e=s}else e=s+e}return n.set(this._area,this._in(t),n.stringify(e,i)),e},remove:function(t,e){var i=this.get(t,e);return n.remove(this._area,this._in(t)),i},clear:function(){return this._ns?this.each(function(t){n.remove(this._area,this._in(t))},1):n.clear(this._area),this},clearAll:function(){var t=this._area;for(var e in n.areas)n.areas.hasOwnProperty(e)&&(this._area=n.areas[e],this.clear());return this._area=t,this},_in:function(t){return typeof t!="string"&&(t=n.stringify(t)),this._ns?this._ns+t:t},_out:function(t){return this._ns?t&&t.indexOf(this._ns)===0?t.substring(this._ns.length):void 0:t}},storage:function(t){return n.inherit(n.storageAPI,{items:{},name:t})},storageAPI:{length:0,has:function(t){return this.items.hasOwnProperty(t)},key:function(t){var e=0;for(var i in this.items)if(this.has(i)&&t===e++)return i},setItem:function(t,e){this.has(t)||this.length++,this.items[t]=e},removeItem:function(t){this.has(t)&&(delete this.items[t],this.length--)},getItem:function(t){return this.has(t)?this.items[t]:null},clear:function(){for(var t in this.items)this.removeItem(t)}}},c=n.Store("local",function(){try{return localStorage}catch{}}());c.local=c,c._=n,c.area("session",function(){try{return sessionStorage}catch{}}()),c.area("page",n.storage("page")),typeof r=="function"&&r.amd!==void 0?r("store2",[],function(){return c}):typeof l<"u"&&l.exports?l.exports=c:(a.store&&(n.conflict=a.store),a.store=c)})(u,u&&u.define)});var b=P(d(),1),v=b.default.namespace("joystick");function x(a,r){let n=v(a);return n===null?r:n}window.ls=v;window.getOpt=x;var F=document.querySelector(".loadingScreen");function y(){F.classList.add("visible")}window.loading=y;var g=class{constructor(r){this.element=r,this.content=r.querySelector(".toast-content"),this.toasts=[],this.showing=!1}show(r,n=2e3,c=!1){return this.toasts.push({message:r,time:n,html:c}),this.showing||this.start(),this}start(){if(this.element.classList.remove("show"),!this.toasts.length)return this.showing=!1;this.showing?setTimeout(this.run.bind(this),1e3):this.run(),this.showing=!0}run(){this.element.classList.add("show");let r=this.toasts.shift();this.content[r.html?"innerHTML":"innerText"]=r.message,setTimeout(this.start.bind(this),r.time||2e3)}},m=document.createElement("div");m.classList.add("toast");m.innerHTML='<div class="toast-content"></div>';document.body.appendChild(m);var w=document.createElement("style");w.innerHTML=`
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
`;document.body.appendChild(w);var H=new g(m),M=(a,r=2e3,n=!1)=>H.show(a,r,n);window.toast=M;export{T as a,P as b,v as c,x as d,y as e,M as f};
/*! Bundled license information:

store2/dist/store2.js:
  (*! store2 - v2.14.2 - 2022-07-18
  * Copyright (c) 2022 Nathan Bubna; Licensed (MIT OR GPL-3.0) *)
*/
