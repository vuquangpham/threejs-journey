varying float vElevation;

varying vec3 vDepthColor;
varying vec3 vSurfaceColor;

void main() {
  vec3 color = vec3(.3);

  color = mix(vDepthColor, vSurfaceColor, vElevation);

  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}