(self.webpackChunkjoystick=self.webpackChunkjoystick||[]).push([[817],{694:t=>{window,t.exports=function(t){var i={};function e(n){if(i[n])return i[n].exports;var o=i[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=i,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var o in t)e.d(n,o,function(i){return t[i]}.bind(null,o));return n},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){"use strict";e.r(i);var n,o=function(t,i){var e=i.x-t.x,n=i.y-t.y;return Math.sqrt(e*e+n*n)},s=function(t){return t*(Math.PI/180)},r=new Map,a=function(t){r.has(t)&&clearTimeout(r.get(t)),r.set(t,setTimeout(t,100))},h=function(t,i,e){for(var n,o=i.split(/[ ,]+/g),s=0;s<o.length;s+=1)n=o[s],t.addEventListener?t.addEventListener(n,e,!1):t.attachEvent&&t.attachEvent(n,e)},c=function(t,i,e){for(var n,o=i.split(/[ ,]+/g),s=0;s<o.length;s+=1)n=o[s],t.removeEventListener?t.removeEventListener(n,e):t.detachEvent&&t.detachEvent(n,e)},d=function(t){return t.preventDefault(),t.type.match(/^touch/)?t.changedTouches:t},p=function(){return{x:void 0!==window.pageXOffset?window.pageXOffset:(document.documentElement||document.body.parentNode||document.body).scrollLeft,y:void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop}},l=function(t,i){i.top||i.right||i.bottom||i.left?(t.style.top=i.top,t.style.right=i.right,t.style.bottom=i.bottom,t.style.left=i.left):(t.style.left=i.x+"px",t.style.top=i.y+"px")},u=function(t,i,e){var n=f(t);for(var o in n)if(n.hasOwnProperty(o))if("string"==typeof i)n[o]=i+" "+e;else{for(var s="",r=0,a=i.length;r<a;r+=1)s+=i[r]+" "+e+", ";n[o]=s.slice(0,-2)}return n},f=function(t){var i={};return i[t]="",["webkit","Moz","o"].forEach((function(e){i[e+t.charAt(0).toUpperCase()+t.slice(1)]=""})),i},y=function(t,i){for(var e in i)i.hasOwnProperty(e)&&(t[e]=i[e]);return t},m=function(t,i){if(t.length)for(var e=0,n=t.length;e<n;e+=1)i(t[e]);else i(t)},v=!!("ontouchstart"in window),g=!!window.PointerEvent,_=!!window.MSPointerEvent,b={start:"mousedown",move:"mousemove",end:"mouseup"},x={};function O(){}g?n={start:"pointerdown",move:"pointermove",end:"pointerup, pointercancel"}:_?n={start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:v?(n={start:"touchstart",move:"touchmove",end:"touchend, touchcancel"},x=b):n=b,O.prototype.on=function(t,i){var e,n=t.split(/[ ,]+/g);this._handlers_=this._handlers_||{};for(var o=0;o<n.length;o+=1)e=n[o],this._handlers_[e]=this._handlers_[e]||[],this._handlers_[e].push(i);return this},O.prototype.off=function(t,i){return this._handlers_=this._handlers_||{},void 0===t?this._handlers_={}:void 0===i?this._handlers_[t]=null:this._handlers_[t]&&this._handlers_[t].indexOf(i)>=0&&this._handlers_[t].splice(this._handlers_[t].indexOf(i),1),this},O.prototype.trigger=function(t,i){var e,n=this,o=t.split(/[ ,]+/g);n._handlers_=n._handlers_||{};for(var s=0;s<o.length;s+=1)e=o[s],n._handlers_[e]&&n._handlers_[e].length&&n._handlers_[e].forEach((function(t){t.call(n,{type:e,target:n},i)}))},O.prototype.config=function(t){this.options=this.defaults||{},t&&(this.options=function(t,i){var e={};for(var n in t)t.hasOwnProperty(n)&&i.hasOwnProperty(n)?e[n]=i[n]:t.hasOwnProperty(n)&&(e[n]=t[n]);return e}(this.options,t))},O.prototype.bindEvt=function(t,i){var e=this;return e._domHandlers_=e._domHandlers_||{},e._domHandlers_[i]=function(){"function"==typeof e["on"+i]?e["on"+i].apply(e,arguments):console.warn('[WARNING] : Missing "on'+i+'" handler.')},h(t,n[i],e._domHandlers_[i]),x[i]&&h(t,x[i],e._domHandlers_[i]),e},O.prototype.unbindEvt=function(t,i){return this._domHandlers_=this._domHandlers_||{},c(t,n[i],this._domHandlers_[i]),x[i]&&c(t,x[i],this._domHandlers_[i]),delete this._domHandlers_[i],this};var w=O;function k(t,i){return this.identifier=i.identifier,this.position=i.position,this.frontPosition=i.frontPosition,this.collection=t,this.defaults={size:100,threshold:.1,color:"white",fadeTime:250,dataOnly:!1,restJoystick:!0,restOpacity:.5,mode:"dynamic",zone:document.body,lockX:!1,lockY:!1,shape:"circle"},this.config(i),"dynamic"===this.options.mode&&(this.options.restOpacity=0),this.id=k.id,k.id+=1,this.buildEl().stylize(),this.instance={el:this.ui.el,on:this.on.bind(this),off:this.off.bind(this),show:this.show.bind(this),hide:this.hide.bind(this),add:this.addToDom.bind(this),remove:this.removeFromDom.bind(this),destroy:this.destroy.bind(this),setPosition:this.setPosition.bind(this),resetDirection:this.resetDirection.bind(this),computeDirection:this.computeDirection.bind(this),trigger:this.trigger.bind(this),position:this.position,frontPosition:this.frontPosition,ui:this.ui,identifier:this.identifier,id:this.id,options:this.options},this.instance}k.prototype=new w,k.constructor=k,k.id=0,k.prototype.buildEl=function(t){return this.ui={},this.options.dataOnly||(this.ui.el=document.createElement("div"),this.ui.back=document.createElement("div"),this.ui.front=document.createElement("div"),this.ui.el.className="nipple collection_"+this.collection.id,this.ui.back.className="back",this.ui.front.className="front",this.ui.el.setAttribute("id","nipple_"+this.collection.id+"_"+this.id),this.ui.el.appendChild(this.ui.back),this.ui.el.appendChild(this.ui.front)),this},k.prototype.stylize=function(){if(this.options.dataOnly)return this;var t=this.options.fadeTime+"ms",i=function(t,i){var e=f("borderRadius");for(var n in e)e.hasOwnProperty(n)&&(e[n]="50%");return e}(),e=u("transition","opacity",t),n={};return n.el={position:"absolute",opacity:this.options.restOpacity,display:"block",zIndex:999},n.back={position:"absolute",display:"block",width:this.options.size+"px",height:this.options.size+"px",marginLeft:-this.options.size/2+"px",marginTop:-this.options.size/2+"px",background:this.options.color,opacity:".5"},n.front={width:this.options.size/2+"px",height:this.options.size/2+"px",position:"absolute",display:"block",marginLeft:-this.options.size/4+"px",marginTop:-this.options.size/4+"px",background:this.options.color,opacity:".5"},y(n.el,e),"circle"===this.options.shape&&y(n.back,i),y(n.front,i),this.applyStyles(n),this},k.prototype.applyStyles=function(t){for(var i in this.ui)if(this.ui.hasOwnProperty(i))for(var e in t[i])this.ui[i].style[e]=t[i][e];return this},k.prototype.addToDom=function(){return this.options.dataOnly||document.body.contains(this.ui.el)||this.options.zone.appendChild(this.ui.el),this},k.prototype.removeFromDom=function(){return this.options.dataOnly||!document.body.contains(this.ui.el)||this.options.zone.removeChild(this.ui.el),this},k.prototype.destroy=function(){clearTimeout(this.removeTimeout),clearTimeout(this.showTimeout),clearTimeout(this.restTimeout),this.trigger("destroyed",this.instance),this.removeFromDom(),this.off()},k.prototype.show=function(t){var i=this;return i.options.dataOnly||(clearTimeout(i.removeTimeout),clearTimeout(i.showTimeout),clearTimeout(i.restTimeout),i.addToDom(),i.restCallback(),setTimeout((function(){i.ui.el.style.opacity=1}),0),i.showTimeout=setTimeout((function(){i.trigger("shown",i.instance),"function"==typeof t&&t.call(this)}),i.options.fadeTime)),i},k.prototype.hide=function(t){var i=this;if(i.options.dataOnly)return i;if(i.ui.el.style.opacity=i.options.restOpacity,clearTimeout(i.removeTimeout),clearTimeout(i.showTimeout),clearTimeout(i.restTimeout),i.removeTimeout=setTimeout((function(){var e="dynamic"===i.options.mode?"none":"block";i.ui.el.style.display=e,"function"==typeof t&&t.call(i),i.trigger("hidden",i.instance)}),i.options.fadeTime),i.options.restJoystick){var e=i.options.restJoystick,n={};n.x=!0===e||!1!==e.x?0:i.instance.frontPosition.x,n.y=!0===e||!1!==e.y?0:i.instance.frontPosition.y,i.setPosition(t,n)}return i},k.prototype.setPosition=function(t,i){var e=this;e.frontPosition={x:i.x,y:i.y};var n=e.options.fadeTime+"ms",o={};o.front=u("transition",["top","left"],n);var s={front:{}};s.front={left:e.frontPosition.x+"px",top:e.frontPosition.y+"px"},e.applyStyles(o),e.applyStyles(s),e.restTimeout=setTimeout((function(){"function"==typeof t&&t.call(e),e.restCallback()}),e.options.fadeTime)},k.prototype.restCallback=function(){var t={};t.front=u("transition","none",""),this.applyStyles(t),this.trigger("rested",this.instance)},k.prototype.resetDirection=function(){this.direction={x:!1,y:!1,angle:!1}},k.prototype.computeDirection=function(t){var i,e,n,o=t.angle.radian,s=Math.PI/4,r=Math.PI/2;if(o>s&&o<3*s&&!t.lockX?i="up":o>-s&&o<=s&&!t.lockY?i="left":o>3*-s&&o<=-s&&!t.lockX?i="down":t.lockY||(i="right"),t.lockY||(e=o>-r&&o<r?"left":"right"),t.lockX||(n=o>0?"up":"down"),t.force>this.options.threshold){var a,h={};for(a in this.direction)this.direction.hasOwnProperty(a)&&(h[a]=this.direction[a]);var c={};for(a in this.direction={x:e,y:n,angle:i},t.direction=this.direction,h)h[a]===this.direction[a]&&(c[a]=!0);if(c.x&&c.y&&c.angle)return t;c.x&&c.y||this.trigger("plain",t),c.x||this.trigger("plain:"+e,t),c.y||this.trigger("plain:"+n,t),c.angle||this.trigger("dir dir:"+i,t)}else this.resetDirection();return t};var P=k;function I(t,i){this.nipples=[],this.idles=[],this.actives=[],this.ids=[],this.pressureIntervals={},this.manager=t,this.id=I.id,I.id+=1,this.defaults={zone:document.body,multitouch:!1,maxNumberOfNipples:10,mode:"dynamic",position:{top:0,left:0},catchDistance:200,size:100,threshold:.1,color:"white",fadeTime:250,dataOnly:!1,restJoystick:!0,restOpacity:.5,lockX:!1,lockY:!1,shape:"circle",dynamicPage:!1,follow:!1},this.config(i),"static"!==this.options.mode&&"semi"!==this.options.mode||(this.options.multitouch=!1),this.options.multitouch||(this.options.maxNumberOfNipples=1);var e=getComputedStyle(this.options.zone.parentElement);return e&&"flex"===e.display&&(this.parentIsFlex=!0),this.updateBox(),this.prepareNipples(),this.bindings(),this.begin(),this.nipples}I.prototype=new w,I.constructor=I,I.id=0,I.prototype.prepareNipples=function(){var t=this.nipples;t.on=this.on.bind(this),t.off=this.off.bind(this),t.options=this.options,t.destroy=this.destroy.bind(this),t.ids=this.ids,t.id=this.id,t.processOnMove=this.processOnMove.bind(this),t.processOnEnd=this.processOnEnd.bind(this),t.get=function(i){if(void 0===i)return t[0];for(var e=0,n=t.length;e<n;e+=1)if(t[e].identifier===i)return t[e];return!1}},I.prototype.bindings=function(){this.bindEvt(this.options.zone,"start"),this.options.zone.style.touchAction="none",this.options.zone.style.msTouchAction="none"},I.prototype.begin=function(){var t=this.options;if("static"===t.mode){var i=this.createNipple(t.position,this.manager.getIdentifier());i.add(),this.idles.push(i)}},I.prototype.createNipple=function(t,i){var e=this.manager.scroll,n={},o=this.options,s=this.parentIsFlex?e.x:e.x+this.box.left,r=this.parentIsFlex?e.y:e.y+this.box.top;if(t.x&&t.y)n={x:t.x-s,y:t.y-r};else if(t.top||t.right||t.bottom||t.left){var a=document.createElement("DIV");a.style.display="hidden",a.style.top=t.top,a.style.right=t.right,a.style.bottom=t.bottom,a.style.left=t.left,a.style.position="absolute",o.zone.appendChild(a);var h=a.getBoundingClientRect();o.zone.removeChild(a),n=t,t={x:h.left+e.x,y:h.top+e.y}}var c=new P(this,{color:o.color,size:o.size,threshold:o.threshold,fadeTime:o.fadeTime,dataOnly:o.dataOnly,restJoystick:o.restJoystick,restOpacity:o.restOpacity,mode:o.mode,identifier:i,position:t,zone:o.zone,frontPosition:{x:0,y:0},shape:o.shape});return o.dataOnly||(l(c.ui.el,n),l(c.ui.front,c.frontPosition)),this.nipples.push(c),this.trigger("added "+c.identifier+":added",c),this.manager.trigger("added "+c.identifier+":added",c),this.bindNipple(c),c},I.prototype.updateBox=function(){this.box=this.options.zone.getBoundingClientRect()},I.prototype.bindNipple=function(t){var i,e=this,n=function(t,n){i=t.type+" "+n.id+":"+t.type,e.trigger(i,n)};t.on("destroyed",e.onDestroyed.bind(e)),t.on("shown hidden rested dir plain",n),t.on("dir:up dir:right dir:down dir:left",n),t.on("plain:up plain:right plain:down plain:left",n)},I.prototype.pressureFn=function(t,i,e){var n=this,o=0;clearInterval(n.pressureIntervals[e]),n.pressureIntervals[e]=setInterval(function(){var e=t.force||t.pressure||t.webkitForce||0;e!==o&&(i.trigger("pressure",e),n.trigger("pressure "+i.identifier+":pressure",e),o=e)}.bind(n),100)},I.prototype.onstart=function(t){var i=this,e=i.options,n=t;return t=d(t),i.updateBox(),m(t,(function(o){i.actives.length<e.maxNumberOfNipples?i.processOnStart(o):n.type.match(/^touch/)&&(Object.keys(i.manager.ids).forEach((function(e){if(Object.values(n.touches).findIndex((function(t){return t.identifier===e}))<0){var o=[t[0]];o.identifier=e,i.processOnEnd(o)}})),i.actives.length<e.maxNumberOfNipples&&i.processOnStart(o))})),i.manager.bindDocument(),!1},I.prototype.processOnStart=function(t){var i,e=this,n=e.options,s=e.manager.getIdentifier(t),r=t.force||t.pressure||t.webkitForce||0,a={x:t.pageX,y:t.pageY},h=e.getOrCreate(s,a);h.identifier!==s&&e.manager.removeIdentifier(h.identifier),h.identifier=s;var c=function(i){i.trigger("start",i),e.trigger("start "+i.id+":start",i),i.show(),r>0&&e.pressureFn(t,i,i.identifier),e.processOnMove(t)};if((i=e.idles.indexOf(h))>=0&&e.idles.splice(i,1),e.actives.push(h),e.ids.push(h.identifier),"semi"!==n.mode)c(h);else{if(!(o(a,h.position)<=n.catchDistance))return h.destroy(),void e.processOnStart(t);c(h)}return h},I.prototype.getOrCreate=function(t,i){var e,n=this.options;return/(semi|static)/.test(n.mode)?(e=this.idles[0])?(this.idles.splice(0,1),e):"semi"===n.mode?this.createNipple(i,t):(console.warn("Coudln't find the needed nipple."),!1):e=this.createNipple(i,t)},I.prototype.processOnMove=function(t){var i=this.options,e=this.manager.getIdentifier(t),n=this.nipples.get(e),r=this.manager.scroll;if(function(t){return isNaN(t.buttons)?0!==t.pressure:0!==t.buttons}(t)){if(!n)return console.error("Found zombie joystick with ID "+e),void this.manager.removeIdentifier(e);if(i.dynamicPage){var a=n.el.getBoundingClientRect();n.position={x:r.x+a.left,y:r.y+a.top}}n.identifier=e;var h=n.options.size/2,c={x:t.pageX,y:t.pageY};i.lockX&&(c.y=n.position.y),i.lockY&&(c.x=n.position.x);var d,p,u,f,y,m,v,g,_,b,x=o(c,n.position),O=(d=c,u=(p=n.position).x-d.x,f=p.y-d.y,function(t){return t*(180/Math.PI)}(Math.atan2(f,u))),w=s(O),k=x/h,P={distance:x,position:c};if("circle"===n.options.shape?(y=Math.min(x,h),v=n.position,g=y,b={x:0,y:0},_=s(_=O),b.x=v.x-g*Math.cos(_),b.y=v.y-g*Math.sin(_),m=b):(m=function(t,i,e){return{x:Math.min(Math.max(t.x,i.x-e),i.x+e),y:Math.min(Math.max(t.y,i.y-e),i.y+e)}}(c,n.position,h),y=o(m,n.position)),i.follow){if(x>h){var I=c.x-m.x,T=c.y-m.y;n.position.x+=I,n.position.y+=T,n.el.style.top=n.position.y-(this.box.top+r.y)+"px",n.el.style.left=n.position.x-(this.box.left+r.x)+"px",x=o(c,n.position)}}else c=m,x=y;var E=c.x-n.position.x,z=c.y-n.position.y;n.frontPosition={x:E,y:z},i.dataOnly||l(n.ui.front,n.frontPosition);var D={identifier:n.identifier,position:c,force:k,pressure:t.force||t.pressure||t.webkitForce||0,distance:x,angle:{radian:w,degree:O},vector:{x:E/h,y:-z/h},raw:P,instance:n,lockX:i.lockX,lockY:i.lockY};(D=n.computeDirection(D)).angle={radian:s(180-O),degree:180-O},n.trigger("move",D),this.trigger("move "+n.id+":move",D)}else this.processOnEnd(t)},I.prototype.processOnEnd=function(t){var i=this,e=i.options,n=i.manager.getIdentifier(t),o=i.nipples.get(n),s=i.manager.removeIdentifier(o.identifier);o&&(e.dataOnly||o.hide((function(){"dynamic"===e.mode&&(o.trigger("removed",o),i.trigger("removed "+o.id+":removed",o),i.manager.trigger("removed "+o.id+":removed",o),o.destroy())})),clearInterval(i.pressureIntervals[o.identifier]),o.resetDirection(),o.trigger("end",o),i.trigger("end "+o.id+":end",o),i.ids.indexOf(o.identifier)>=0&&i.ids.splice(i.ids.indexOf(o.identifier),1),i.actives.indexOf(o)>=0&&i.actives.splice(i.actives.indexOf(o),1),/(semi|static)/.test(e.mode)?i.idles.push(o):i.nipples.indexOf(o)>=0&&i.nipples.splice(i.nipples.indexOf(o),1),i.manager.unbindDocument(),/(semi|static)/.test(e.mode)&&(i.manager.ids[s.id]=s.identifier))},I.prototype.onDestroyed=function(t,i){this.nipples.indexOf(i)>=0&&this.nipples.splice(this.nipples.indexOf(i),1),this.actives.indexOf(i)>=0&&this.actives.splice(this.actives.indexOf(i),1),this.idles.indexOf(i)>=0&&this.idles.splice(this.idles.indexOf(i),1),this.ids.indexOf(i.identifier)>=0&&this.ids.splice(this.ids.indexOf(i.identifier),1),this.manager.removeIdentifier(i.identifier),this.manager.unbindDocument()},I.prototype.destroy=function(){for(var t in this.unbindEvt(this.options.zone,"start"),this.nipples.forEach((function(t){t.destroy()})),this.pressureIntervals)this.pressureIntervals.hasOwnProperty(t)&&clearInterval(this.pressureIntervals[t]);this.trigger("destroyed",this.nipples),this.manager.unbindDocument(),this.off()};var T=I;function E(t){var i=this;i.ids={},i.index=0,i.collections=[],i.scroll=p(),i.config(t),i.prepareCollections();var e=function(){var t;i.collections.forEach((function(e){e.forEach((function(e){t=e.el.getBoundingClientRect(),e.position={x:i.scroll.x+t.left,y:i.scroll.y+t.top}}))}))};h(window,"resize",(function(){a(e)}));var n=function(){i.scroll=p()};return h(window,"scroll",(function(){a(n)})),i.collections}E.prototype=new w,E.constructor=E,E.prototype.prepareCollections=function(){var t=this;t.collections.create=t.create.bind(t),t.collections.on=t.on.bind(t),t.collections.off=t.off.bind(t),t.collections.destroy=t.destroy.bind(t),t.collections.get=function(i){var e;return t.collections.every((function(t){return!(e=t.get(i))})),e}},E.prototype.create=function(t){return this.createCollection(t)},E.prototype.createCollection=function(t){var i=new T(this,t);return this.bindCollection(i),this.collections.push(i),i},E.prototype.bindCollection=function(t){var i,e=this,n=function(t,n){i=t.type+" "+n.id+":"+t.type,e.trigger(i,n)};t.on("destroyed",e.onDestroyed.bind(e)),t.on("shown hidden rested dir plain",n),t.on("dir:up dir:right dir:down dir:left",n),t.on("plain:up plain:right plain:down plain:left",n)},E.prototype.bindDocument=function(){this.binded||(this.bindEvt(document,"move").bindEvt(document,"end"),this.binded=!0)},E.prototype.unbindDocument=function(t){Object.keys(this.ids).length&&!0!==t||(this.unbindEvt(document,"move").unbindEvt(document,"end"),this.binded=!1)},E.prototype.getIdentifier=function(t){var i;return t?void 0===(i=void 0===t.identifier?t.pointerId:t.identifier)&&(i=this.latest||0):i=this.index,void 0===this.ids[i]&&(this.ids[i]=this.index,this.index+=1),this.latest=i,this.ids[i]},E.prototype.removeIdentifier=function(t){var i={};for(var e in this.ids)if(this.ids[e]===t){i.id=e,i.identifier=this.ids[e],delete this.ids[e];break}return i},E.prototype.onmove=function(t){return this.onAny("move",t),!1},E.prototype.onend=function(t){return this.onAny("end",t),!1},E.prototype.oncancel=function(t){return this.onAny("end",t),!1},E.prototype.onAny=function(t,i){var e,n=this,o="processOn"+t.charAt(0).toUpperCase()+t.slice(1);return i=d(i),m(i,(function(t){e=n.getIdentifier(t),m(n.collections,function(t,i,e){e.ids.indexOf(i)>=0&&(e[o](t),t._found_=!0)}.bind(null,t,e)),t._found_||n.removeIdentifier(e)})),!1},E.prototype.destroy=function(){this.unbindDocument(!0),this.ids={},this.index=0,this.collections.forEach((function(t){t.destroy()})),this.off()},E.prototype.onDestroyed=function(t,i){if(this.collections.indexOf(i)<0)return!1;this.collections.splice(this.collections.indexOf(i),1)};var z=new E;i.default={create:function(t){return z.create(t)},factory:z}}]).default},860:function(t){!function(i,e){var n={version:"2.14.2",areas:{},apis:{},nsdelim:".",inherit:function(t,i){for(var e in t)i.hasOwnProperty(e)||Object.defineProperty(i,e,Object.getOwnPropertyDescriptor(t,e));return i},stringify:function(t,i){return void 0===t||"function"==typeof t?t+"":JSON.stringify(t,i||n.replace)},parse:function(t,i){try{return JSON.parse(t,i||n.revive)}catch(i){return t}},fn:function(t,i){for(var e in n.storeAPI[t]=i,n.apis)n.apis[e][t]=i},get:function(t,i){return t.getItem(i)},set:function(t,i,e){t.setItem(i,e)},remove:function(t,i){t.removeItem(i)},key:function(t,i){return t.key(i)},length:function(t){return t.length},clear:function(t){t.clear()},Store:function(t,i,e){var o=n.inherit(n.storeAPI,(function(t,i,e){return 0===arguments.length?o.getAll():"function"==typeof i?o.transact(t,i,e):void 0!==i?o.set(t,i,e):"string"==typeof t||"number"==typeof t?o.get(t):"function"==typeof t?o.each(t):t?o.setAll(t,i):o.clear()}));o._id=t;try{var s="__store2_test";i.setItem(s,"ok"),o._area=i,i.removeItem(s)}catch(t){o._area=n.storage("fake")}return o._ns=e||"",n.areas[t]||(n.areas[t]=o._area),n.apis[o._ns+o._id]||(n.apis[o._ns+o._id]=o),o},storeAPI:{area:function(t,i){var e=this[t];return e&&e.area||(e=n.Store(t,i,this._ns),this[t]||(this[t]=e)),e},namespace:function(t,i,e){if(e=e||this._delim||n.nsdelim,!t)return this._ns?this._ns.substring(0,this._ns.length-e.length):"";var o=t,s=this[o];if(!(s&&s.namespace||((s=n.Store(this._id,this._area,this._ns+o+e))._delim=e,this[o]||(this[o]=s),i)))for(var r in n.areas)s.area(r,n.areas[r]);return s},isFake:function(t){return t?(this._real=this._area,this._area=n.storage("fake")):!1===t&&(this._area=this._real||this._area),"fake"===this._area.name},toString:function(){return"store"+(this._ns?"."+this.namespace():"")+"["+this._id+"]"},has:function(t){return this._area.has?this._area.has(this._in(t)):!!(this._in(t)in this._area)},size:function(){return this.keys().length},each:function(t,i){for(var e=0,o=n.length(this._area);e<o;e++){var s=this._out(n.key(this._area,e));if(void 0!==s&&!1===t.call(this,s,this.get(s),i))break;o>n.length(this._area)&&(o--,e--)}return i||this},keys:function(t){return this.each((function(t,i,e){e.push(t)}),t||[])},get:function(t,i){var e,o=n.get(this._area,this._in(t));return"function"==typeof i&&(e=i,i=null),null!==o?n.parse(o,e):null!=i?i:o},getAll:function(t){return this.each((function(t,i,e){e[t]=i}),t||{})},transact:function(t,i,e){var n=this.get(t,e),o=i(n);return this.set(t,void 0===o?n:o),this},set:function(t,i,e){var o,s=this.get(t);return null!=s&&!1===e?i:("function"==typeof e&&(o=e,e=void 0),n.set(this._area,this._in(t),n.stringify(i,o),e)||s)},setAll:function(t,i){var e,n;for(var o in t)n=t[o],this.set(o,n,i)!==n&&(e=!0);return e},add:function(t,i,e){var o=this.get(t);if(o instanceof Array)i=o.concat(i);else if(null!==o){var s=typeof o;if(s===typeof i&&"object"===s){for(var r in i)o[r]=i[r];i=o}else i=o+i}return n.set(this._area,this._in(t),n.stringify(i,e)),i},remove:function(t,i){var e=this.get(t,i);return n.remove(this._area,this._in(t)),e},clear:function(){return this._ns?this.each((function(t){n.remove(this._area,this._in(t))}),1):n.clear(this._area),this},clearAll:function(){var t=this._area;for(var i in n.areas)n.areas.hasOwnProperty(i)&&(this._area=n.areas[i],this.clear());return this._area=t,this},_in:function(t){return"string"!=typeof t&&(t=n.stringify(t)),this._ns?this._ns+t:t},_out:function(t){return this._ns?t&&0===t.indexOf(this._ns)?t.substring(this._ns.length):void 0:t}},storage:function(t){return n.inherit(n.storageAPI,{items:{},name:t})},storageAPI:{length:0,has:function(t){return this.items.hasOwnProperty(t)},key:function(t){var i=0;for(var e in this.items)if(this.has(e)&&t===i++)return e},setItem:function(t,i){this.has(t)||this.length++,this.items[t]=i},removeItem:function(t){this.has(t)&&(delete this.items[t],this.length--)},getItem:function(t){return this.has(t)?this.items[t]:null},clear:function(){for(var t in this.items)this.removeItem(t)}}},o=n.Store("local",function(){try{return localStorage}catch(t){}}());o.local=o,o._=n,o.area("session",function(){try{return sessionStorage}catch(t){}}()),o.area("page",n.storage("page")),"function"==typeof e&&void 0!==e.amd?e("store2",[],(function(){return o})):t.exports?t.exports=o:(i.store&&(n.conflict=i.store),i.store=o)}(this,this&&this.define)}}]);