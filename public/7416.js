"use strict";(self.webpackChunkthreejs_journey=self.webpackChunkthreejs_journey||[]).push([[7416,8015,4376],{7416:(e,n,o)=>{o.r(n),o.d(n,{default:()=>d});var t=o(9477),i=o(9365),a=o(8243),s=o(8015),r=o(4376);const d=class{constructor(e){let{element:n}=e;this.element=n,this.init()}init(){const e=new a.ZP,n=document.querySelector("canvas#webgl"),o=new t.xsS,d={count:2e5,size:.005,radius:5,branches:3,spin:1,randomness:.5,randomnessPower:3,insideColor:"#ff6030",outsideColor:"#1b3984"};let l=null,h=null,c=null;const m=()=>{null!==c&&(l.dispose(),h.dispose(),o.remove(c)),l=new t.u9r;const e=new Float32Array(3*d.count),n=new Float32Array(3*d.count),i=new Float32Array(1*d.count),a=new Float32Array(3*d.count),m=new t.Ilk(d.insideColor),u=new t.Ilk(d.outsideColor);for(let o=0;o<d.count;o++){const t=3*o,s=Math.random()*d.radius,r=o%d.branches/d.branches*Math.PI*2;e[t]=Math.cos(r)*s,e[t+1]=0,e[t+2]=Math.sin(r)*s;const l=Math.pow(Math.random(),d.randomnessPower)*(Math.random()<.5?1:-1)*d.randomness*s,h=Math.pow(Math.random(),d.randomnessPower)*(Math.random()<.5?1:-1)*d.randomness*s,c=Math.pow(Math.random(),d.randomnessPower)*(Math.random()<.5?1:-1)*d.randomness*s;a[t]=l,a[t+1]=h,a[t+2]=c;const w=m.clone();w.lerp(u,s/d.radius),n[t]=w.r,n[t+1]=w.g,n[t+2]=w.b,i[o]=Math.random()}l.setAttribute("position",new t.TlE(e,3)),l.setAttribute("color",new t.TlE(n,3)),l.setAttribute("aScale",new t.TlE(i,1)),l.setAttribute("aRandomness",new t.TlE(a,3)),h=new t.jyz({depthWrite:!1,blending:t.WMw,vertexColors:!0,fragmentShader:s,vertexShader:r,uniforms:{uSize:{value:30*v.getPixelRatio()},uTime:{value:0}}}),c=new t.woe(l,h),o.add(c)};e.add(d,"count").min(100).max(1e6).step(100).onFinishChange(m),e.add(d,"radius").min(.01).max(20).step(.01).onFinishChange(m),e.add(d,"branches").min(2).max(20).step(1).onFinishChange(m),e.add(d,"randomness").min(0).max(2).step(.001).onFinishChange(m),e.add(d,"randomnessPower").min(1).max(10).step(.001).onFinishChange(m),e.addColor(d,"insideColor").onFinishChange(m),e.addColor(d,"outsideColor").onFinishChange(m);const u={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",(()=>{u.width=window.innerWidth,u.height=window.innerHeight,w.aspect=u.width/u.height,w.updateProjectionMatrix(),v.setSize(u.width,u.height),v.setPixelRatio(Math.min(window.devicePixelRatio,2))}));const w=new t.cPb(75,u.width/u.height,.1,100);w.position.x=3,w.position.y=3,w.position.z=3,o.add(w);const g=new i.z(w,n);g.enableDamping=!0;const v=new t.CP7({canvas:n});v.setSize(u.width,u.height),v.setPixelRatio(Math.min(window.devicePixelRatio,2)),m(),e.add(h.uniforms.uSize,"value").min(0).max(10).step(1).name("pointSize");const p=new t.SUY,P=()=>{const e=p.getElapsedTime();h.uniforms.uTime.value=e,g.update(),v.render(o,w),window.requestAnimationFrame(P)};P()}destroy(){console.log("destroyed",this)}}},8015:e=>{e.exports="varying vec3 vColor;\n\nvoid main() {\n  // get the distance\n  float strength = distance(gl_PointCoord, vec2(0.5));\n\n  // create the diffuse\n  strength *= 2.0;\n\n  // remove white bg\n  strength = 1.0 - strength;\n  strength = pow(strength, 10.);\n\n  // color\n  vec3 color = mix(vec3(0.), vColor, strength);\n  \n  gl_FragColor = vec4(color, 1.0);\n  #include <colorspace_fragment>\n}"},4376:e=>{e.exports="attribute float aScale;\nattribute vec3 aRandomness;\n\nuniform float uSize;\nuniform float uTime;\n\nvarying vec3 vColor;\n\nvoid main() {\n  vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n\n  // calculate the position\n  float angle = atan(modelPosition.x, modelPosition.z);\n  float distanceToCenter = length(modelPosition.xz);\n  float offset = (1. / distanceToCenter) * uTime * 0.2;\n  angle += offset;\n\n  modelPosition.x = cos(angle) * distanceToCenter;\n  modelPosition.z = sin(angle) * distanceToCenter;\n\n  modelPosition.xyz += aRandomness;\n\n  vec4 viewPosition = viewMatrix * modelPosition;\n  vec4 projectedPosition = projectionMatrix * viewPosition;\n\n  gl_Position = projectedPosition;\n\n  gl_PointSize = uSize * aScale;\n  gl_PointSize *= (1.0 / - viewPosition.z);\n\n  // color is created by default because of the vertexColor = true in ShaderMaterial\n  vColor = color;\n}"}}]);