var MODE = 'PROD'
let pic;
let picLocation = '/vc/docs/sketches/image-filters/star.png';
let asciiResults;

function preload() {
  if (MODE == 'LOCAL')
    picLocation = './image-filters/star.png'

  pic = loadImage(picLocation);
}

function setup() {
  // createCanvas(1000, 1000);
  asciiResults = applyAsciiFilter(pic);
}

function draw() {
  // fill(255, 255, 255)
  // text(asciiResults, 0, 0, 800, 600)
  let div = createDiv();
  div.child(asciiResults);
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
 * Returns a list of strings. Each string has ascii characters
 * that represents each row of the image in gray scale.
 * @param {Image} img 
 * @returns 
 */
function applyAsciiFilter(img) {
  let asciiImg = createDiv(); //   document.createElement("div");
  img.loadPixels()
  for (let y = 0; y < img.height; y++) {
    let out = ''
    for (let x = 0; x < img.width; x++) {
      let i = (x + y * width)*4;
      let char = asciifilter(img.pixels[i + 0], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3]);
      out += char;
    }
    out += '\n';
    let row = createElement('pre', out);
    asciiImg.child(row)
    // let row = document.createElement("pre");
    // row.appendChild(document.createTextNode(out));
    // asciiImg.appendChild(row);
  }
  return asciiImg
}