import{a as u,d as r}from"../chunk-7XZ5U2TU.js";import{d as l,e as d}from"../chunk-JKTMEYDY.js";var D={snes:{pause:100,sequence:["padUp","padLeft","padDown","padRight","actDown","actRight","actLeft","actUp","start","select","left1","right1"]},snesSave:{pause:100,sequence:["["]},snesLoad:{pause:100,sequence:["F1"]},ps2:{pause:1e3,sequence:["select","left3","right3","start","padUp","padRight","padDown","padLeft","left2","right2","left1","right1","actUp","actRight","actDown","actLeft","joyLUp","joyLRight","joyLDown","joyLLeft","joyRUp","joyRRight","joyRDown","joyRLeft"]},psp:{pause:150,sequence:["UP","LEFT","RIGHT","SPACE","padUp","DOWN","SPACE","padDown","DOWN","SPACE","padLeft","DOWN","SPACE","padRight","DOWN","SPACE","actRight","DOWN","SPACE","actDown","DOWN","SPACE","actLeft","DOWN","SPACE","actUp","DOWN","SPACE","start","DOWN","SPACE","select","DOWN","SPACE","left1","DOWN","SPACE","right1","DOWN","SPACE","joyLUp","DOWN","SPACE","joyLDown","DOWN","SPACE","joyLLeft","DOWN","SPACE","joyLRight","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","SPACE","pause","DOWN","DOWN","DOWN","DOWN","SPACE","save","DOWN","SPACE","load","ESC"]}},m=D;var s=document.querySelector(".progress"),o=s.querySelector(".bar"),E=s.querySelector(".cancel"),f=document.querySelector(".ip"),W=document.querySelector(".connectStatus");window.addEventListener("load",()=>{document.body.classList.remove("preload")});document.querySelectorAll("a").forEach(e=>e.addEventListener("click",d));var L=l("code",window.location.hostname+":5000");f.innerText=L;document.querySelectorAll(".app .actions .start").forEach(e=>{let{app:t,player:n}=e.dataset;e.addEventListener("click",()=>N(t,n))});async function N(e,t){let n=!1;E.addEventListener("click",()=>n=!0);let{sequence:a,pause:i}=m[e];c(1),S(!0);for(let p in a){if(r?.readyState!==1||n)return c(3);g(a[p],t),c(1,p,a.length,i),await y(i)}c(2)}function c(e,t,n,a){if(e>0){switch(s.classList.remove("hidden"),e){case 1:s.classList.remove("complete","stopped");break;case 2:s.classList.add("complete");break;case 3:s.classList.add("stopped");break}if(e>=2&&(o.style.transition="",setTimeout(()=>c(0),2e3)),t&&n){o.style.transition=a+"ms linear";let i=1/(n-1)*Number(t)*100;o.style.width=i+"%"}}else setTimeout(()=>{s.classList.add("hidden"),o.style.transition="",setTimeout(()=>{s.classList.remove("complete","stopped"),o.style.width="0",S(!1)},150)},2e3)}function S(e=!1){document.querySelectorAll(".app .actions button").forEach(t=>{t.disabled=e})}function g(e,t){e=u[e]?.[Number(t)-1]||e,r?.readyState===1&&(e.startsWith("*")?r?.send(e.substring(1)):r?.send("T "+e))}async function y(e){return new Promise(t=>{setTimeout(t,e)})}
