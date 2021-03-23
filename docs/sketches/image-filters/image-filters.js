var MODE = 'LOCAL'
let pic1;
let pic2;
let pic3;
let pic4;
let width;
let height;
let picLocation = './lenna.png';

function preload() {
  if (MODE == 'LOCAL')
    picLocation = './image-filters/lenna.png'

  pic1 = loadImage(picLocation);
  pic2 = loadImage(picLocation);
  pic3 = loadImage(picLocation);
  pic4 = loadImage(picLocation);
}

function setup() {
  width = pic1.width;
  height = pic1.height;
  createCanvas(2*width, 2*height);
  applyFilter(pic1, noFilter);
  applyFilter(pic2, grayFilter);
  applyFilter(pic3, invertFilter);
  applyFilter(pic4, onlyRedFilter);
  applyAsciiFilter(pic1);
}

function draw() {
  image(pic1, 0, 0);
  image(pic2, width,      0);
  image(pic3,     0, height);
  image(pic4, height, width);
}

function invertFilter(r, g, b, a) {
  return [(r + 128)%256, 
          (g + 128)%256, 
          (b + 128)%256, 
          a]
}

function onlyRedFilter(r, g, b, a) {
  return [r, 0, 0, a];
}

function noFilter(r, g, b, a) {
  return [r, g, b, a];
}

function grayFilter(r, g, b, a) {
  let avg = Math.floor((r + g + b)/3)
  return [avg, avg, avg, a]

  // 01234567   256
  //  .:-=+*#   %@                           
}

function asciifilter(r, g, b, a) {
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

function applyAsciiFilter(img) {
  let out = '';
  img.loadPixels()
  for (let y = 0; y < img.height; y++) {
    out = ''
    for (let x = 0; x < img.width; x++) {
      let res = asciifilter(img.pixels[0], img.pixels[1], img.pixels[2], img.pixels[2]);
      out = out + res;
    }
    out = out + '\n';
  }
}


function applyFilter(img, filterfunc) {
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