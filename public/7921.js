"use strict";(self.webpackChunkthreejs_journey=self.webpackChunkthreejs_journey||[]).push([[7921,1152],{7921:(e,t,o)=>{o.r(t),o.d(t,{default:()=>a});var n=o(9477),i=o(8243),s=o(1152),r=o(6358);const a=class{constructor(e){let{element:t}=e;this.element=t,this.init()}init(){const e=(new n.dpR).load(s);e.magFilter=n.TyD;const t=new i.ZP,o={materialColor:"#fff"},a={x:0,y:0};window.addEventListener("mousemove",(e=>{a.x=e.clientX/innerWidth-.5,a.y=e.clientY/innerHeight-.5})),n.epp.enabled=!1;const d=document.querySelector("canvas#webgl"),l=new n.xsS,w=new n.Ox3("#fff",1);w.position.set(1,1,0),l.add(w);const c=new n.IKL({color:o.materialColor,gradientMap:e});t.addColor(o,"materialColor").onChange((()=>{c.color.set(o.materialColor),y.color.set(o.materialColor)}));const h=new n.Kj0(new n.XvJ(1,.4,16,60),c),p=new n.Kj0(new n.b_z(1,2,32),c),u=new n.Kj0(new n.FE5(.8,.35,100,16),c);h.position.x=-2,p.position.x=2,u.position.x=-2,h.position.y=0,p.position.y=-5,u.position.y=-10;const m=[h,p,u];l.add(h,p,u);const g=new Float32Array(600);for(let e=0;e<200;e++)g[3*e+0]=10*(Math.random()-.5),g[3*e+1]=2.5-5*Math.random()*m.length,g[3*e+2]=10*(Math.random()-.5);const x=new n.u9r;x.setAttribute("position",new n.TlE(g,3));const y=new n.UY4({color:o.materialColor,sizeAttenuation:!0,size:.03}),f=new n.woe(x,y);l.add(f);const C={width:window.innerWidth,height:window.innerHeight},v=new n.ZAu;l.add(v);const j=new n.cPb(35,C.width/C.height,.1,100);j.position.z=6,v.add(j);const P=new n.CP7({canvas:d,alpha:!0});P.setSize(C.width,C.height),P.setPixelRatio(Math.min(window.devicePixelRatio,2)),P.outputColorSpace=n.GUF;const z=new n.SUY;let M=0;const b=()=>{const e=z.getElapsedTime(),t=e-M;M=e;const o=scrollY/C.height*5;j.position.y=-1*o;for(const e of m)e.rotation.x+=.1*t,e.rotation.y+=.12*t;v.position.x+=5*(a.x-v.position.x)*t,v.position.y+=5*(-a.y-v.position.y)*t,P.render(l,j),window.requestAnimationFrame(b)};b(),window.addEventListener("resize",(()=>{C.width=window.innerWidth,C.height=window.innerHeight,j.aspect=C.width/C.height,j.updateProjectionMatrix(),P.setSize(C.width,C.height),P.setPixelRatio(Math.min(window.devicePixelRatio,2))}));let E=0;window.addEventListener("scroll",(()=>{const e=Math.round(scrollY/C.height);e!==E&&(E=e,r.ZP.to(m[E].rotation,{duration:1.5,ease:"power2.inOut",x:"+=6",y:"+=3",z:"+=1.5"}))}))}destroy(){console.log("destroyed",this)}}},1152:(e,t,o)=>{e.exports=o.p+"f981ce1c4519d9e255f5..jpg"}}]);