uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;
attribute vec2 uv;

uniform vec2 uFrequency;
uniform float uTimeLapse;

varying vec2 vUv;
varying float vRandom;

void main()
{
    // position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * uFrequency.x + uTimeLapse * 5.0) * 0.1;

    // camera
    vec4 viewPosition = viewMatrix * modelPosition;

    // clip space
    vec4 projectPosition = projectionMatrix * viewPosition;
    gl_Position = projectPosition;

    // varying
    vRandom = aRandom;
    vUv = uv;
}