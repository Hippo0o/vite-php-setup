import{r as g,c as y,a as n,u as a,t as i,F as k,p as b,b as S,d as c,o as E,e as V}from"./vendor.a085cd8d.js";const $="modulepreload",d={},j="/dist/",x=function(o,r){return!r||r.length===0?o():Promise.all(r.map(t=>{if(t=`${j}${t}`,t in d)return;d[t]=!0;const l=t.endsWith(".css"),h=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${h}`))return;const s=document.createElement("link");if(s.rel=l?"stylesheet":$,l||(s.as="script",s.crossOrigin=""),s.href=t,document.head.appendChild(s),l)return new Promise((v,f)=>{s.addEventListener("load",v),s.addEventListener("error",f)})})).then(()=>o())};var p="/dist/assets/logo.03d6d6da.png";var H=(e,o)=>{for(const[r,t]of o)e[r]=t;return e};const u=e=>(b("data-v-2ca91351"),e=e(),S(),e),I=u(()=>n("img",{alt:"use import to workaround this",src:p,height:"40"},null,-1)),W=["src"],w=u(()=>n("p",null,[n("a",{href:"https://vitejs.dev/guide/features.html",target:"_blank"}," Vite Documentation "),c(" | "),n("a",{href:"https://v3.vuejs.org/",target:"_blank"},"Vue 3 Documentation")],-1)),B=u(()=>n("p",null,[c(" Edit "),n("code",null,"components/HelloWorld.vue"),c(" to test hot module replacement. ")],-1)),C={props:{msg:String},setup(e){const o=g({count:0});return(r,t)=>(E(),y(k,null,[I,n("img",{alt:"Vue logo",src:a(p),height:"40"},null,8,W),n("h1",null,"Vue "+i(e.msg),1),w,n("button",{type:"button",onClick:t[0]||(t[0]=l=>a(o).count++)}," count is: "+i(a(o).count),1),B],64))}};var D=H(C,[["__scopeId","data-v-2ca91351"]]),L=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:D});x(()=>import("./modulepreload-polyfill.b7f2da20.js"),[]);const _={"./components/HelloWorld.vue":L},m={};for(const e in _){const o=e.split("/").pop().replace(/\.\w+$/,"");m[o]=_[e].default}for(const e of document.getElementsByClassName("vue-app"))V({template:e.innerHTML,components:m}).mount(e);