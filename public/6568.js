"use strict";(self.webpackChunkthreejs_journey=self.webpackChunkthreejs_journey||[]).push([[6568],{6568:(e,t,n)=>{n.r(t),n.d(t,{default:()=>l});var r=n(9477),a=n(9365),i=n(3867),s=n(8243),o=n(2666);const l=class{constructor(e){let{element:t}=e;this.element=t,this.init()}init(){const e=new s.ZP,t={envMapIntensity:5},n=()=>{h.traverse((e=>{e.isMesh&&e.material.isMeshStandardMaterial&&(e.material.envMapIntensity=t.envMapIntensity)}))};e.add(t,"envMapIntensity",0,10,.001).onChange(n),r.epp.enabled=!1;new r.cBK;const l=new i.E,d=new o.x;l.load("/models/FlightHelmet/glTF/FlightHelmet.gltf",(e=>{e.scene.scale.set(10,10,10),h.add(e.scene),n()})),d.load("/environmentMaps/0/2k.hdr",(e=>{e.mapping=r.Bf4,h.background=e}));const c=document.querySelector("canvas#webgl"),h=new r.xsS;e.add(h,"backgroundBlurriness").min(0).max(1).step(.001),e.add(h,"backgroundIntensity").min(0).max(10).step(.001);const p=new r.Kj0(new r.FE5(1,.4,100,16),new r.Wid({roughness:0,metalness:1,color:11184810}));p.position.x=-4,p.position.y=4,h.add(p);const u=new r.Kj0(new r.XvJ(8,.5),new r.Wid({color:"red"}));u.position.y=3.5,u.layers.enable(1),h.add(u);const w=new r.oAp(256,{type:r.cLu});h.environment=w.texture;const m=new r._am(.1,100,w);m.layers.enable(1);const g={width:window.innerWidth,height:window.innerHeight},f=new r.cPb(75,g.width/g.height,.1,100);f.position.set(4,5,4),h.add(f);const y=new a.z(f,c);y.target.y=3.5,y.enableDamping=!0;const b=new r.CP7({canvas:c});b.setSize(g.width,g.height),b.setPixelRatio(Math.min(window.devicePixelRatio,2)),b.outputColorSpace=r.GUF;const E=new r.SUY,v=()=>{const e=E.getElapsedTime();y.update(),u.rotation.x=Math.sin(e)*Math.PI*.5,m.update(b,h),b.render(h,f),window.requestAnimationFrame(v)};v(),window.addEventListener("resize",(()=>{g.width=window.innerWidth,g.height=window.innerHeight,f.aspect=g.width/g.height,f.updateProjectionMatrix(),b.setSize(g.width,g.height),b.setPixelRatio(Math.min(window.devicePixelRatio,2))}))}destroy(){console.log("destroyed",this)}}},2666:(e,t,n)=>{n.d(t,{x:()=>a});var r=n(9477);class a extends r.yxD{constructor(e){super(e),this.type=r.cLu}parse(e){const t=function(e,t){switch(e){case 1:console.error("THREE.RGBELoader Read Error: "+(t||""));break;case 2:console.error("THREE.RGBELoader Write Error: "+(t||""));break;case 3:console.error("THREE.RGBELoader Bad File Format: "+(t||""));break;default:console.error("THREE.RGBELoader: Error: "+(t||""))}return-1},n=function(e,t,n){t=t||1024;let r=e.pos,a=-1,i=0,s="",o=String.fromCharCode.apply(null,new Uint16Array(e.subarray(r,r+128)));for(;0>(a=o.indexOf("\n"))&&i<t&&r<e.byteLength;)s+=o,i+=o.length,r+=128,o+=String.fromCharCode.apply(null,new Uint16Array(e.subarray(r,r+128)));return-1<a&&(!1!==n&&(e.pos+=i+a+1),s+o.slice(0,a))},a=function(e,t,n,r){const a=e[t+3],i=Math.pow(2,a-128)/255;n[r+0]=e[t+0]*i,n[r+1]=e[t+1]*i,n[r+2]=e[t+2]*i,n[r+3]=1},i=function(e,t,n,a){const i=e[t+3],s=Math.pow(2,i-128)/255;n[a+0]=r.A5E.toHalfFloat(Math.min(e[t+0]*s,65504)),n[a+1]=r.A5E.toHalfFloat(Math.min(e[t+1]*s,65504)),n[a+2]=r.A5E.toHalfFloat(Math.min(e[t+2]*s,65504)),n[a+3]=r.A5E.toHalfFloat(1)},s=new Uint8Array(e);s.pos=0;const o=function(e){const r=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,a=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,i=/^\s*FORMAT=(\S+)\s*$/,s=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,o={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let l,d;if(e.pos>=e.byteLength||!(l=n(e)))return t(1,"no header found");if(!(d=l.match(/^#\?(\S+)/)))return t(3,"bad initial token");for(o.valid|=1,o.programtype=d[1],o.string+=l+"\n";l=n(e),!1!==l;)if(o.string+=l+"\n","#"!==l.charAt(0)){if((d=l.match(r))&&(o.gamma=parseFloat(d[1])),(d=l.match(a))&&(o.exposure=parseFloat(d[1])),(d=l.match(i))&&(o.valid|=2,o.format=d[1]),(d=l.match(s))&&(o.valid|=4,o.height=parseInt(d[1],10),o.width=parseInt(d[2],10)),2&o.valid&&4&o.valid)break}else o.comments+=l+"\n";return 2&o.valid?4&o.valid?o:t(3,"missing image size specifier"):t(3,"missing format specifier")}(s);if(-1!==o){const e=o.width,n=o.height,l=function(e,n,r){const a=n;if(a<8||a>32767||2!==e[0]||2!==e[1]||128&e[2])return new Uint8Array(e);if(a!==(e[2]<<8|e[3]))return t(3,"wrong scanline width");const i=new Uint8Array(4*n*r);if(!i.length)return t(4,"unable to allocate buffer space");let s=0,o=0;const l=4*a,d=new Uint8Array(4),c=new Uint8Array(l);let h=r;for(;h>0&&o<e.byteLength;){if(o+4>e.byteLength)return t(1);if(d[0]=e[o++],d[1]=e[o++],d[2]=e[o++],d[3]=e[o++],2!=d[0]||2!=d[1]||(d[2]<<8|d[3])!=a)return t(3,"bad rgbe scanline format");let n,r=0;for(;r<l&&o<e.byteLength;){n=e[o++];const a=n>128;if(a&&(n-=128),0===n||r+n>l)return t(3,"bad scanline data");if(a){const t=e[o++];for(let e=0;e<n;e++)c[r++]=t}else c.set(e.subarray(o,o+n),r),r+=n,o+=n}const p=a;for(let e=0;e<p;e++){let t=0;i[s]=c[e+t],t+=a,i[s+1]=c[e+t],t+=a,i[s+2]=c[e+t],t+=a,i[s+3]=c[e+t],s+=4}h--}return i}(s.subarray(s.pos),e,n);if(-1!==l){let t,s,d;switch(this.type){case r.VzW:d=l.length/4;const e=new Float32Array(4*d);for(let t=0;t<d;t++)a(l,4*t,e,4*t);t=e,s=r.VzW;break;case r.cLu:d=l.length/4;const n=new Uint16Array(4*d);for(let e=0;e<d;e++)i(l,4*e,n,4*e);t=n,s=r.cLu;break;default:console.error("THREE.RGBELoader: unsupported type: ",this.type)}return{width:e,height:n,data:t,header:o.string,gamma:o.gamma,exposure:o.exposure,type:s}}}return null}setDataType(e){return this.type=e,this}load(e,t,n,a){return super.load(e,(function(e,n){switch(e.type){case r.VzW:case r.cLu:e.colorSpace=r.GUF,e.minFilter=r.wem,e.magFilter=r.wem,e.generateMipmaps=!1,e.flipY=!0}t&&t(e,n)}),n,a)}}}}]);