var MODE = 'LOCAL'
let pics = [];
let picLocRegex = '/vc/docs/sketches/image-mosaic/?.webp';
let bigPictureLoc = '/vc/docs/sketches/image-mosaic/bigpicture.jpg';
let averages = [];
let paletteSize = 16;
var tileSize = 10;
var mos;

function preload() {
  if (MODE == 'LOCAL') {
    bigPictureLoc = './image-mosaic/bigpicture.jpg';
    picLocRegex = './image-mosaic/palette1/?.webp';
  }

  bigPicture = loadImage(bigPictureLoc);
  for (i = 0; i < paletteSize; i++) {
    pic = loadImage(picLocRegex.replace('?', i));
    pics.push(pic);
  }
}

function setup() {
  bigPicture.resize(1000, 1000);
  createCanvas(bigPicture.width, bigPicture.height);
  storePics();
  // showAverages();
  showMosaic();
}

function showMosaic() {
  for (let y = 0; y < bigPicture.height; y = y + tileSize) {
    for (let x = 0; x < bigPicture.width; x = x + tileSize) {
      let tile = bigPicture.get(x, y, tileSize - 1, tileSize - 1);
      [r, g, b] = getAverageColor(tile);
      let i = getSimilarColor(r, g, b);
      pics[i].resize(tileSize, tileSize);
      image(pics[i], x, y);
    }
  }
}

function showAverages() {
  for (let y = 0; y < bigPicture.height; y = y + tileSize) {
    for (let x = 0; x < bigPicture.width; x = x + tileSize) {
      let tile = bigPicture.get(x, y, tileSize - 1, tileSize - 1);
      [r, g, b] = getAverageColor(tile);
      let c = color(r, g, b);
      fill(c)
      square(x, y, tileSize);
    }
  }
}

function getSimilarColor(r, g, b) {
  let w1 = [0.30, 0.59, 0.11];
  let w2 = [0.00, 0.00, 0.99];
  let w3 = [0.30, 0.70, 0.00];
  let idx = 0;
  let ans = -1;
  let min = 999999999999;
  for (avg of averages) {
    let d =  (avg[0] - r)*(avg[0] - r)
           + (avg[1] - g)*(avg[1] - g)
           + (avg[2] - b)*(avg[2] - b);
    if (d < min) {
      min = d;
      ans = idx;
    }
    idx++;
  }
  return ans;
}

function storePics() {
  for (i = 0; i < paletteSize; i++) {
    pics[i].resize(tileSize, tileSize);
    averages.push(getAverageColor(pics[i]))
  }
}

function getAverageColor(pic) {
  pic.loadPixels()
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  for (let y = 0; y < pic.height; y++) {
    for (let x = 0; x < pic.width; x++) {
      let i = (x + y * pic.width)*4;
      r += pic.pixels[i + 0];
      g += pic.pixels[i + 1];
      b += pic.pixels[i + 2];
      n++;
    }
  }
  return [r/n, g/n, b/n];
}
