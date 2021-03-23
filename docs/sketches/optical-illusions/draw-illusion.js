let MODE      = 'LOCAL'
let defWidth  = 800
let defHeight = 600
let picLocation = '/vc/docs/sketches/optical-illusions/munkerstudy.png';
let pic

function preload() {
  if (MODE == 'LOCAL')
    picLocation = 'optical-illusions/munkerstudy.png'
  pic = loadImage(picLocation);
}

function setup() {
  createCanvas(defWidth, defHeight);
  pic.resize(defWidth, defHeight)
}

function draw() {
  image(pic, 0, 0);
}