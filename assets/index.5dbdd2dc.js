import{S as b,C as x,T as M,D as v,G as A,s as g,M as S,P as O,O as R,V as z,W as C,a as D,L as I}from"./three.d2980bf0.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))m(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&m(l)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function m(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const d=new b;d.background=new x(8900331);const p=document.querySelector("#bg"),w=document.querySelector("#progress-bar"),h=document.querySelector("#progress-bar-container");console.log(w);const f=new I(()=>{setTimeout(()=>{h.style.animation="fadeInAnimation ease 1s"},"200"),setTimeout(()=>{h.style.display="none"},"1200")},(s,i,c)=>{w.value=i/c*100}),T=new M(f),y=new v;y.setDecoderPath("./draco/");const L=new A(f);L.setDRACOLoader(y);const u=T.load("models/pslv/textures.jpg");u.flipY=!1;u.encoding=g;const q=new S({map:u});L.load("models/pslv/pslv.glb",s=>{s.scene.traverse(i=>{i.material=q}),d.add(s.scene)});const o={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{o.width=window.innerWidth,o.height=window.innerHeight,r.aspect=o.width/o.height,r.updateProjectionMatrix(),a.setSize(o.width,o.height),a.setPixelRatio(Math.min(window.devicePixelRatio,2))});const r=new O(25,o.width/o.height,.1,100);r.position.x=0;r.position.y=9;r.position.z=-10;d.add(r);const n=new R(r,p);n.target=new z(0,3.3,-1);n.enableDamping=!0;n.maxAzimuthAngle=1.75*Math.PI;n.minAzimuthAngle=.25*Math.PI;n.minPolarAngle=.2*Math.PI;n.maxPolarAngle=.6*Math.PI;n.minDistance=5;n.maxDistance=14;n.panSpeed=.5;n.rotateSpeed=.76;const a=new C({canvas:p,antialias:!0});a.setSize(o.width,o.height);a.setPixelRatio(Math.min(window.devicePixelRatio,2));a.outputEncoding=g;new D(200,50);function P(){requestAnimationFrame(P),n.update(),a.render(d,r)}P();
