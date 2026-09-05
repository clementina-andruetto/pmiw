//hola profe la animacion se reinicia tocando el "harry potter" de lo ultimo o con la R :)

let fondo;
let framesCaminar = [];
let framesGiro = [];
let framesTirar = [];
let framesSaludar = [];
let hechizoImg;
let imagenTitulo;
let frameActual = 0;
let contador = 0;
let x;
let y = 390;
let velocidadMovimiento = 1.5;
let anchoHarry = 50;
let altoHarry = 100;
let velocidadAnimacion = 8;
let velocidadGiro = 20;
let opacidadHechizo = 255;
let progresoHechizo = 0;
let estado = "caminando";

function preload() {
  
 fondo = loadImage("data/hogwarts.jpg");
 

 for (let i = 0; i < 9; i++) {
  framesCaminar[i] = loadImage("data/camina" + (i + 1) + ".png");
  }

framesGiro[0] = loadImage("data/giro.png");

 for (let i = 0; i < 16; i++) {
   framesTirar[i] = loadImage("data/tira" + (i + 1) + ".png");
  }

  hechizoImg = loadImage("data/hechizo9.png");
  imagenTitulo = loadImage("data/hp.png");

  for (let i = 0; i < 3; i++) {
    framesSaludar[i] = loadImage("data/saluda" + (i + 1) + ".png");
  }
}

function setup() {
  createCanvas(800, 600);
  reiniciarAnimacion();
}

function draw() {
  background(20);
  image(fondo, 0, 0, width, height);

  // harry camina
  if (estado == "caminando") {
    x = x - velocidadMovimiento;

    if (x <= 533) {
      x = 533;
      cambiarEstado("girando");
    }
  }

  if (
    estado == "caminando" ||
    estado == "girando" ||
    estado == "tirando" ||
    estado == "saludando"
  ) {
    let frames = elegirFrames();
    let vel = elegirVelocidad();
    let termino = actualizarAnimacion(frames, vel);

    if (estado == "tirando" && frameActual >= 10) {
      cambiarEstado("hechizo");

    } else if (termino) {
      if (estado == "girando") {
        cambiarEstado("tirando");
      } else if (estado == "saludando") {
        cambiarEstado("final");
   }
  }
  }

  //el hechizo se agrande
  if (estado == "hechizo") {
    progresoHechizo = progresoHechizo + 0.02;

    if (progresoHechizo >= 1) {
      progresoHechizo = 1;
      cambiarEstado("desvaneciendo");
    }
  }

  // el hechizo se desvanece
  if (estado == "desvaneciendo") {
    opacidadHechizo = opacidadHechizo - 3;

  if (opacidadHechizo <= 0) {
      opacidadHechizo = 0;
     cambiarEstado("saludando");
    }
  }

  // titulo
  if (estado == "desvaneciendo") {
    let progresoTitulo = 1 - opacidadHechizo / 255;
    mostrarTitulo(progresoTitulo);
  } else if (estado == "saludando" || estado == "final") {
    mostrarTitulo(1);
  }

  let frames = elegirFrames();
  mostrarHarry(frames);
}

// frames segun estado
function elegirFrames() {
  if (estado == "caminando") {
    return framesCaminar;
  } else if (estado == "girando") {
    return framesGiro;
  } else if (estado == "tirando") {
    return framesTirar;
  } else if (estado == "saludando") {
    return framesSaludar;
  } else {
    return framesCaminar; // no deberia pasar pero por las dudas devuelvo algo
  }
}

// harry gira
function elegirVelocidad() {
 if (estado == "girando") {
   return velocidadGiro;
  } else {
    return velocidadAnimacion;
  }
}

function cambiarEstado(nuevoEstado) {
  estado = nuevoEstado;
  frameActual = 0;
  contador = 0;
}


function actualizarAnimacion(frames, velocidad) {
  contador++;

 if (contador >= velocidad) {
    contador = 0;
  frameActual++;

    if (frameActual >= frames.length) {
    frameActual = 0;
      return true;
    }
  }

  return false;
}


function mostrarHarry(frames) {
  let ultimoFrameTirando = framesTirar[framesTirar.length - 1];

//hechizo agrandandose
  if (estado == "hechizo") {

    let centroX = lerp(551, 330, progresoHechizo);
    let centroY = lerp(422, 230, progresoHechizo);
    let ancho = lerp(30, 260, progresoHechizo);
    let alto = lerp(30, 260, progresoHechizo);

    image(hechizoImg, centroX - ancho / 2, centroY - alto / 2, ancho, alto);
    image(ultimoFrameTirando, x, y, anchoHarry, altoHarry);

  } else if (estado == "desvaneciendo") {
    tint(255, opacidadHechizo);
    image(hechizoImg, 330 - 260 / 2, 230 - 260 / 2, 260, 260);
    noTint();

    image(ultimoFrameTirando, x, y, anchoHarry, altoHarry);

  } else if (estado == "final") {
    image(framesSaludar[framesSaludar.length - 1], x, y, anchoHarry, altoHarry);

  } else {
    image(frames[frameActual], x, y, anchoHarry, altoHarry);
  }
}

function mostrarTitulo(progreso) {
  let anchoFinal = 460;
  let altoFinal = anchoFinal * imagenTitulo.height / imagenTitulo.width;


  let centroX = 95 + anchoFinal / 2;
  let centroY = 90 + altoFinal / 2;

  let ancho = lerp(110, anchoFinal, progreso);
  let alto = ancho * imagenTitulo.height / imagenTitulo.width;

   image(imagenTitulo, centroX - ancho / 2, centroY - alto / 2, ancho, alto);
}

function mousePressed() {
  // reiniciar
   let anchoTitulo = 460;
  let altoTitulo = anchoTitulo * imagenTitulo.height / imagenTitulo.width;

  let clickEnTitulo =
    mouseX >= 95 &&
   mouseX <= 95 + anchoTitulo &&
    mouseY >= 90 &&
    mouseY <= 90 + altoTitulo;

  if (estado == "final" && clickEnTitulo) {
    reiniciarAnimacion();
  }
}

function reiniciarAnimacion() {
  x = width + anchoHarry;
 estado = "caminando";
  frameActual = 0;
 contador = 0;
  opacidadHechizo = 255;
  progresoHechizo = 0;
}

function keyPressed() {
  if (key == "r" || key == "R") {
    reiniciarAnimacion();
  }
}
