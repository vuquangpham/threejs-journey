"use strict";(self.webpackChunkthreejs_journey=self.webpackChunkthreejs_journey||[]).push([[3419],{3419:(e,t,i)=>{i.r(t),i.d(t,{default:()=>s});var n=i(9477),o=i(9365);const s=class{constructor(e){let{element:t}=e;this.element=t,this.init()}init(){n.epp.enabled=!1;const e=document.querySelector("canvas#webgl"),t=new n.xsS,i=new n.Kj0(new n.xo$(.5,16,16),new n.vBJ({color:"#f00"}));i.position.x=-2;const s=new n.Kj0(new n.xo$(.5,16,16),new n.vBJ({color:"#f00"})),a=new n.Kj0(new n.xo$(.5,16,16),new n.vBJ({color:"#f00"}));a.position.x=2,t.add(i,s,a);const r=new n.iMs,w=new n.Pa4(-3,0,0),d=new n.Pa4(1,0,0);d.normalize(),r.set(w,d),i.updateMatrixWorld(),s.updateMatrixWorld(),a.updateMatrixWorld();const c={width:window.innerWidth,height:window.innerHeight},h=new n.cPb(75,c.width/c.height,.1,100);h.position.z=4,t.add(h);const l=new o.z(h,e);l.enableDamping=!0;const p=new n.CP7({canvas:e});p.setSize(c.width,c.height),p.setPixelRatio(Math.min(window.devicePixelRatio,2)),p.outputColorSpace=n.GUF;const u=new n.SUY,x=()=>{const e=u.getElapsedTime();i.position.y=1.5*Math.sin(.3*e),s.position.y=1.5*Math.sin(.8*e),a.position.y=1.5*Math.sin(1.3*e);const n=[i,s,a],o=r.intersectObjects(n);n.forEach((e=>e.material.color.set("#f00"))),o.forEach((e=>e.object.material.color.set("#00f"))),console.log(o),l.update(),p.render(t,h),window.requestAnimationFrame(x)};x(),window.addEventListener("resize",(()=>{c.width=window.innerWidth,c.height=window.innerHeight,h.aspect=c.width/c.height,h.updateProjectionMatrix(),p.setSize(c.width,c.height),p.setPixelRatio(Math.min(window.devicePixelRatio,2))}))}destroy(){console.log("destroyed",this)}}}}]);