varying vec3 vColor;

void main() {
  // get the distance
  float strength = distance(gl_PointCoord, vec2(0.5));

  // create the diffuse
  strength *= 2.0;

  // remove white bg
  strength = 1.0 - strength;
  strength = pow(strength, 10.);

  // color
  vec3 color = mix(vec3(0.), vColor, strength);
  
  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}