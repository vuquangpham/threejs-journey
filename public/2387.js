(self.webpackChunkthreejs_journey=self.webpackChunkthreejs_journey||[]).push([[2387],{9931:(e,t,s)=>{var r={"./":[9142,9],"./index":[9142,9],"./index.js":[9142,9],"./shader-pattern":[2972,9,9477,9365,8243,2972],"./shader-pattern/":[2972,9,9477,9365,8243,2972],"./shader-pattern/fragment.glsl":[9806,1,9806],"./shader-pattern/index":[2972,9,9477,9365,8243,2972],"./shader-pattern/index.js":[2972,9,9477,9365,8243,2972],"./shader-pattern/vertex.glsl":[2698,1,2698],"./shaders":[3729,9,9477,9365,8243,3729],"./shaders/":[3729,9,9477,9365,8243,3729],"./shaders/fragment.glsl":[7245,1,7245],"./shaders/index":[3729,9,9477,9365,8243,3729],"./shaders/index.js":[3729,9,9477,9365,8243,3729],"./shaders/mu.jpeg":[8008,1,8008],"./shaders/vertex.glsl":[8668,1,8668],"./template":[7010,9,9477,9365,7010],"./template.js":[7010,9,9477,9365,7010]};function n(e){if(!s.o(r,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],n=t[0];return Promise.all(t.slice(2).map(s.e)).then((()=>s.t(n,16|t[1])))}n.keys=()=>Object.keys(r),n.id=9931,e.exports=n},4986:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});var r=s(6358),n=s(6197);class a extends n.Z{constructor(e){let{element:t,elements:s,id:r}=e;super({element:t,elements:s}),this.id=r}show(){return new Promise((e=>{r.ZP.fromTo(this.element,{autoAlpha:0},{autoAlpha:1,onComplete:e})}))}hide(){return new Promise((e=>{r.ZP.to(this.element,{autoAlpha:0,onComplete:e})}))}destroy(){console.log("destroy page:",this)}}},9142:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>n});var r=s(4986);const n=class extends r.Z{constructor(){super({element:"[data-page]"}),this.instance=null}create(){if(super.create(),this.id=this.element.getAttribute("data-page"),!this.id)return;const e=this.id;s(9931)(`./${e}`).then((e=>{this.instance=new e.default({element:this.element})}))}destroy(){this.instance&&(this.instance.destroy(),this.instance=null)}}}}]);