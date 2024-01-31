uniform float uBigWavesElevation;
uniform float uTime;

uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;

varying float vElevation;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // elevation
  float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed)
                  * sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed)
                  * uBigWavesElevation;

  // custom position
  modelPosition.y = elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  vElevation = elevation; 
}