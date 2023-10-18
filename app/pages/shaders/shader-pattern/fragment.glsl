varying vec2 vUv;

void main() {
    // pattern 1 & 2
    //    gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);
    //    gl_FragColor = vec4(vUv.x, vUv.y, 0.0, 1.0);

    // pattern 3 & 4
    //    gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 1.0);
    //    gl_FragColor = vec4(vUv.yy, vUv.y, 1.0);

    float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
    strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // step, reach limit => return 1, else return 0
    //    strength = step(0.8, strength);

    //    gl_FragColor = vec4(vec3(strength), 1.0);
    gl_FragColor = vec4(vec3(strength), 1.0);
}