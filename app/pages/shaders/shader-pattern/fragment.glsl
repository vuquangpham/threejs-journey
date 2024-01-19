varying vec2 vUv;

void main() {
    // pattern 1 & 2
    //    gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);
    //    gl_FragColor = vec4(vUv.x, vUv.y, 0.0, 1.0);

    // pattern 3 & 4
    //    gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 1.0);
    //    gl_FragColor = vec4(vUv.yy, vUv.y, 1.0);

    //    float strength = step(0.4, mod(vUv.x * 10.0 , 1.0));
    //    strength *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));
    //
    //    float strengthY = step(0.4, mod(vUv.y * 10.0, 1.0));
    //    strengthY *= step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
    //
    //    gl_FragColor = vec4(vec3(strength + strengthY), 1.0);

    float strength = abs(vUv.x - 0.5);

    gl_FragColor = vec4(vec3(strength), 1.0);
}