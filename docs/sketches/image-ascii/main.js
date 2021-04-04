var MODE = 'LOCAL'
let pic;
let picLocation = '/vc/docs/sketches/image-ascii/star.png';
let asciiResults;
let filters = [
  (r, g, b, a) => r,                                 // red
  (r, g, b, a) => g,                                 // green
  (r, g, b, a) => b,                                 // blue
  (r, g, b, a) => a,                                 // gamma
  (r, g, b, a) => (r + g + b)/3,                     // gray
  (r, g, b, a) => (0.2989*r + 0.5870*g + 0.1140*b)/3 // luma
]
// Controls
let palSel;
let palette = [' ', '.', ':', '-', '=', '+', '*', '#'];
let filSel;
let filter = 0;

function preload() {
  if (MODE == 'LOCAL')
    picLocation = './image-ascii/lenna.png'
  pic = loadImage(picLocation);
}

function setup() {
  noLoop();
  createCanvas(5000, 5000);
  addPaletteSelector();
  addChannelSelector(),
  textFont('monospace');
}

function draw() {
  applyAsciiFilter(pic);
}

function asciifilter(r, g, b, a) {
  // let avg = Math.floor((r + g + b)/3);
  let avg = filters[filter](r, g, b, a);
  let idx = Math.floor(avg/32);
  return palette[idx];
}

/**
 * Print to the global the given image converted to ascii art.
 * @param {Image} img 
 * @returns 
 */
function applyAsciiFilter(img) {
  img.loadPixels()
  pixY = 10;
  for (let y = 0; y < img.height; y++) {
    let out = ''
    for (let x = 0; x < img.width; x++) {
      let i = (x + y * img.width)*4;
      let char = asciifilter(img.pixels[i + 0], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3]);
      out += char;
    }
    text(out, 10, pixY);
    pixY += 10;
  }
}


function addChannelSelector() {
  filSel = createSelect();
  filSel.position(100, 10);
  filSel.option('red',    0);
  filSel.option('green',  1);
  filSel.option('blue',   2);
  filSel.option('gamma',  3);
  filSel.option('grayavg',4);
  filSel.option('luma',   5);
  filSel.selected('red');
  filSel.changed(() => {
    filter = filSel.value();
    redraw();
  })
}

function addPaletteSelector() {
  palSel = createSelect();
  palSel.position(40, 10);
  palSel.option('8bit',   0);
  palSel.option('256bit', 1);
  palSel.selected('8bit');
  palSel.changed(() => {
    showAvg = false;
    palette = palSel.value();

    // Math.floor(256/palette.lenght)
    redraw();
  })
}