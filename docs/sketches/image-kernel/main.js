var MODE = 'LOCAL'
let pic;
let picLocation = '/vc/docs/sketches/image-ascii/star.png';

function preload() {
  if (MODE == 'LOCAL')
    picLocation = './image-ascii/star.png'

  pic = loadImage(picLocation);
}

function setup() {
  createCanvas(800, 600);
  asciiResults = applyAsciiFilter(pic);
}

function draw() {
  // fill(255, 255, 255)
  // text(asciiResults, 0, 0, 800, 600)
  let div = createDiv();
  div.child(asciiResults);
}

function applyKernel(img) {
    img.loadPixels()
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        let i = (x + y * width)*4;
        let result = filterfunc(img.pixels[i + 0], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3]);
        let r = result[0];
        let g = result[1];
        let b = result[2];
        let a = result[3];
  
        img.pixels[i + 0] = r;
        img.pixels[i + 1] = g;
        img.pixels[i + 2] = b;
        img.pixels[i + 3] = a;
      }
    }
    img.updatePixels()
}