var MODE = 'LOCAL'
let pic;
let picLocation = '/vc/docs/sketches/image-ascii/star.png';
let asciiResults;

function preload() {
  if (MODE == 'LOCAL')
    picLocation = './image-ascii/lenna.png'

  pic = loadImage(picLocation);
}

function setup() {
  createCanvas(5000, 5000);
  textFont('monospace');
  applyAsciiFilter(pic);
}

function asciifilter(r, g, b, a) {
  // 01234567   256
  //  .:-=+*#   %@   
  let avg = Math.floor((r + g + b)/3);
    switch (Math.floor(avg/32)) {
      case 0:
        return ' '
      case 1:
        return '.'
      case 2:
        return ':'
      case 3:
        return '-'
      case 4:
        return '='
      case 5:
        return '+'
      case 6:
        return '*'
      case 7:
        return '#'
      default:
        return '@'; 
  }
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
  chanSel = createSelect();
  chanSel.position(40, 10);
  chanSel.option('red',   0);
  chanSel.option('blue',  1);
  chanSel.option('gree',  2);
  chanSel.option('gamma', 3);
  chanSel.option('grayavg',  4);
  chanSel.option('luma',  4);
  chanSel.selected('gray');
  chanSel.changed(() => {
    showAvg = false;
    palette = chanSel.value();
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
    redraw();
  })
}