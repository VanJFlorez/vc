let redGreen;
let orangeBlue;
let showRedGreen = false;

function preload() {
  // note that we are using two instances
  // of the same vertex and fragment shaders
  redGreen = loadShader('shaders/shader.vert', 'shaders/texture.frag');
  orangeBlue = loadShader('shaders/shader.vert', 'shaders/texture.frag');
}

function setup() {
  createCanvas(100, 100, WEBGL);

  // initialize the colors for redGreen shader
//   shader(redGreen);
//   redGreen.setUniform('colorCenter', [1.0, 0.0, 0.0]);
//   redGreen.setUniform('colorBackground', [0.0, 1.0, 0.0]);

  // initialize the colors for orangeBlue shader
//   shader(orangeBlue);
//   orangeBlue.setUniform('colorCenter', [1.0, 0.5, 0.0]);
//   orangeBlue.setUniform('colorBackground', [0.226, 0.0, 0.615]);

//   noStroke();
}

function draw() {
  // update the offset values for each shader,
  // moving orangeBlue in vertical and redGreen
  // in horizontal direction
//   orangeBlue.setUniform('offset', [0, sin(millis() / 2000) + 1]);
//   redGreen.setUniform('offset', [sin(millis() / 2000), 1]);

//   if (showRedGreen === true) {
    shader(redGreen);
//   } else {
//     shader(orangeBlue);
//   }
//   quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

function mouseClicked() {
  showRedGreen = !showRedGreen;
}