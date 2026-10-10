// en globo por el sahara - aventura grafica
// paso 1: canvas e imagenes

let imagenes = [];
let cantidadPantallas = 15;
let imagenGlobo;

// pantalla en la que estoy (0 = pantalla1, 1 = pantalla2, etc)
let pantallaActual = 0;

function preload() {
  // carga pantalla1.png, pantalla2.png... con un for
  for (let i = 0; i < cantidadPantallas; i++) {
    imagenes[i] = loadImage("data/pantalla" + (i + 1) + ".png");
  }

  imagenGlobo = loadImage("data/globo.png");
}

function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(20);
  image(imagenes[pantallaActual], 0, 0, width, height);
}

// TEMPORAL: para probar que se vean las 15 imagenes con las flechas
// (esto se borra despues)
function keyPressed() {
  if (keyCode == RIGHT && pantallaActual < cantidadPantallas - 1) {
    pantallaActual++;
  }
  if (keyCode == LEFT && pantallaActual > 0) {
    pantallaActual--;
  }
}
