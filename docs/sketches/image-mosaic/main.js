var MODE = 'LOCAL'
// Pictures
let pics = [[], [], []];
let averages = [];
let picLocRegex = '/vc/docs/sketches/image-mosaic/bigpicture.jpg';
let bigPictureLoc = '/vc/docs/sketches/image-mosaic/palette&/?.png';
var paletteSize = 16;
// Controls
var palSel;
var palette = 0;
var tilSel;
var tileSize = 50;
var checkbox;
var showAvg = false;
var fullscreen = false;

function preload() {
  if (MODE == 'LOCAL') {
    bigPictureLoc = './image-mosaic/bigpicture.jpg';
    picLocRegex = './image-mosaic/palette&/?.png';
  }
  
  bigPicture = loadImage(bigPictureLoc);
  for(i = 0; i < 3; i++) {
    // load palettes
    let folder = picLocRegex.replace('&', i);
    for (j = 0; j < paletteSize; j++) {
      // load picture from each palette
      pic = loadImage(folder.replace('?', j));
      pics[i].push(pic);
    }
  }
}

function setup() {
  noLoop();
  addCheckbox();
  addPaletteSelector();
  addTileSizeSelector();
  
}

function draw() {
  bigPicture.resize(770, 455);
  createCanvas(bigPicture.width, bigPicture.height);
  
  let beg = performance.now()
  storePics();
  showMosaic();
  let end = performance.now()
  console.log(end - beg);
}

function showMosaic() {
  for (let y = 0; y < bigPicture.height; y = y + tileSize) {
    for (let x = 0; x < bigPicture.width; x = x + tileSize) {
      let tile = bigPicture.get(x, y, tileSize - 1, tileSize - 1);
      [r, g, b] = getAverageColor(tile);
      let i = getSimilarColor(r, g, b);
      if (showAvg) {
        let c = color(r, g, b);
        fill(c)
        square(x, y, tileSize);  
      } else {
        image(pics[palette][i], x, y);
      }
    }
  }
}

function getSimilarColor(r, g, b) {
  let w1 = [0.30, 0.59, 0.11];
  let w2 = [0.00, 0.00, 0.99];
  let w3 = [0.30, 0.70, 0.00];
  let idx = 0;
  let ans = -1;
  let min = Math.min();
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
  averages = []
  for (pic of pics[palette]) {
    pic.resize(tileSize, tileSize);
    averages.push(getAverageColor(pic))
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

function addCheckbox() {
  checkbox = createCheckbox('show average');
  checkbox.position(10, 10);
  checkbox.changed(() => {
    showAvg = !showAvg;
    redraw();
  });
}

function addPaletteSelector() {
  palSel = createSelect();
  palSel.position(40, 10);
  palSel.option('nature', 0);
  palSel.option('chips', 1);
  palSel.option('color', 2);
  palSel.selected('nature');
  palSel.changed(() => {
    showAvg = false;
    palette = palSel.value();
    redraw();
  })
}

function addTileSizeSelector() {
  tilSel = createSelect();
  tilSel.position(120, 10);
  tilSel.option(5);
  tilSel.option(10);
  tilSel.option(20);
  tilSel.option(30);
  tilSel.option(40);
  tilSel.option(50);
  tilSel.option(80);
  tilSel.option(100);
  tilSel.selected(50);
  tilSel.changed(() => {
    tileSize = Number(tilSel.value());
    redraw();
  })
}

