uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;
attribute vec2 uv;

uniform float uFrequency;
uniform float uTimeLapse;

varying vec2 vUv;
varying float vRandom;
varying float vElevation;

void main()
{
    // position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vElevation = sin(modelPosition.x * uFrequency + uTimeLapse * 5.0) * 0.1;
    modelPosition.z += vElevation;

    // camera
    vec4 viewPosition = viewMatrix * modelPosition;

    // clip space
    vec4 projectPosition = projectionMatrix * viewPosition;
    gl_Position = projectPosition;

    // varying
    vRandom = aRandom;
    vUv = uv;
}