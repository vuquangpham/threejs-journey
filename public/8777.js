"use strict";(self.webpackChunkthreejs_journey=self.webpackChunkthreejs_journey||[]).push([[8777,5415],{8777:(e,t,i)=>{i.r(t),i.d(t,{default:()=>a});var n=i(9477),o=i(9365),s=i(5415);const a=class{constructor(e){let{element:t}=e;this.element=t,this.init()}init(){n.epp.enabled=!1;const e=document.querySelector("canvas#webgl"),t=new n.xsS,i={width:window.innerWidth,height:window.innerHeight},a=(new n.dpR).load(s),r=new n.u9r,d=5e4,w=new Float32Array(15e4),h=new Float32Array(15e4);for(let e=0;e<15e4;e++)w[e]=10*(Math.random()-.5),h[e]=Math.random();r.setAttribute("position",new n.TlE(w,3)),r.setAttribute("color",new n.TlE(h,3));const c=new n.UY4;c.size=.1,c.sizeAttenuation=!0,c.map=a,c.transparent=!0,c.alphaMap=a,c.depthWrite=!1,c.vertexColors=!0;const l=new n.woe(r,c);t.add(l);const p=new n.cPb(75,i.width/i.height,.1,100);p.position.x=1,p.position.y=1,p.position.z=2,t.add(p);const u=new o.z(p,e);u.enableDamping=!0;const b=new n.CP7({canvas:e});b.setSize(i.width,i.height),b.setPixelRatio(Math.min(window.devicePixelRatio,2)),b.outputColorSpace=n.GUF;const g=new n.SUY,m=()=>{const e=g.getElapsedTime();for(let t=0;t<d;t++){const i=3*t,n=r.attributes.position.array[i];r.attributes.position.array[i+1]=Math.sin(e+n)}r.attributes.position.needsUpdate=!0,u.update(),b.render(t,p),window.requestAnimationFrame(m)};m(),window.addEventListener("resize",(()=>{i.width=window.innerWidth,i.height=window.innerHeight,p.aspect=i.width/i.height,p.updateProjectionMatrix(),b.setSize(i.width,i.height),b.setPixelRatio(Math.min(window.devicePixelRatio,2))}))}destroy(){console.log("destroyed",this)}}},5415:(e,t,i)=>{e.exports=i.p+"a973815b19c8d51f62fb..png"}}]);