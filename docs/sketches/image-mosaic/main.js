var MODE = 'LOCAL'
let pics = [];
let picLocRegex = '/vc/docs/sketches/image-mosaic/?.webp';
let bigPictureLoc = '/vc/docs/sketches/image-mosaic/bigpicture.jpg';
let paletteSize = 16

function preload() {
  if (MODE == 'LOCAL') {
    bigPictureLoc = './image-mosaic/bigpicture.jpg';
    picLocRegex = './image-mosaic/?.webp';
  }

  bigPicture = loadImage(bigPictureLoc);
  for (i = 0; i < paletteSize; i++) {
    pic = loadImage(picLocRegex.replace('?', i));
    pics.push(pic);
  }
}

function setup() {
  createCanvas(bigPicture.width, bigPicture.height);
  image(bigPicture, 0, 0)
  w = 0
  for (i = 1; i < paletteSize; i++) {
    pics[i].resize(30, 30);
    image(pics[i], w, 0);
    w += pics[i].width;
  }
}

function draw() {

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