varying float vElevation;

void main() {
  vec3 color = vec3(.3);

  vec3 depthColor = vec3(0.8);
  vec3 surfaceColor = vec3(0.005);

  color = mix(depthColor, surfaceColor, vElevation);

  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}