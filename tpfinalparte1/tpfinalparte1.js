let imagenes = [];
let cantidadPantallas = 15;
let imagenGlobo;
let imagenIntro;
let fuente;
let pantallaActual = 0;
let textos = [
  "Junto con tus amigos Peter, Sarah y tu perro Harry, deciden alquilar un globo en Francia para divertirse atravesando el Sahara",
  "Una vez ya en el globo, se elevan dando inicio a su viaje, observando los Alpes hacia el norte, el mar mediterráneo hacia el sur, y por debajo suyo hay gente saludando desde tierra firme",
  "De pronto, al llegar al desierto se cruzan con una tormenta de arena que les corta el paso",
  "Ven unas ruinas abandonadas cerca de donde estan, asi que se desvian hacia alli para aterrizar",
  "Se adentran en las ruinas, pero dentro encuentran a una civilización nómada, quienes les ofrecen unirseles",
  "El globo fue alcanzado por la tormenta y se rompió, por lo que se unen a los nómadas",
  "La tormenta sopla con fuerza y el viento empuja al globo hacia un oasis en donde aterrizan con cuidado",
  "Se encuentran con un grupo de comerciantes a quienes le piden ayuda, a lo que uno de ellos les regala un mapa",
  "Uno de los comerciantes ofrece su carpa para que pasen la noche junto a ellos",
  "Aceptan la oferta, por lo que se quedan y pasan la noche con los comerciantes en la carpa que les prestaron",
  "Un grupo de saqueadores llega en mitad de la noche y destrozan el campamento, se roban el globo, el mapa y asesinan a todos los presentes",
  "Agradecen la oferta, pero se niegan, optando por irse y continuar su viaje",
  "Tu y tus amigos se despiden de los comerciantes, suben al globo, abren el mapa y continúan con su viaje",
  "Exploran el resto del Sahara y alrededores en globo hasta reencontrarse con los Alpes, el viaje está por terminar",
  "Tu y tus amigos llegan a Francia, se bajan del globo y se despiden con la promesa de volver a salir juntos"
];
//botones
let destinoA =         [1, 2, 3, 4, 5, -1, 7, 8, 9, 10, -1, 12, 13, 14, -1];
let destinoB =         [-1, -1, 6, -1, -1, -1, -1, -1, 11, -1, -1, -1, -1, -1, -1];
let textoBotonA = [
  "Continuar", "Continuar", "Desviarse y aterrizar", "Continuar", "Continuar",
  "", "Continuar", "Continuar", "Quedarse a pasar la noche", "Continuar",
  "", "Continuar", "Continuar", "Continuar", ""
];
let textoBotonB = [
  "", "", "Dejar que la tormenta los guíe", "", "",
  "", "", "", "Negarse y marcharse", "",
  "", "", "", "", ""
];
// pantallas finales
let finales = [5, 10, 14];
// mas botones
let yBotones = 395;
let altoBotones = 40;
let xBotonSolo = 300;
let anchoBotonSolo = 200;
let xBotonA = 40;
let xBotonB = 420;
let anchoDosBotones = 340;
let estado = "intro";
let angulo = 0;
let globoX;
let globoY;
let anchoGlobo = 130;

function preload() {
  for (let i = 0; i < cantidadPantallas; i++) {
    imagenes[i] = loadImage("img/pantalla" + (i + 1) + ".jpeg");
  }

  imagenGlobo = loadImage("img/globo.png");
  imagenIntro = loadImage("img/intro.jpeg");
  fuente = loadFont("img/MouseMemoirs-Regular.ttf");
}

function setup() {
  createCanvas(800, 450);
  textFont(fuente);
}

function draw() {
  background(20);

  if (estado == "intro") {
    dibujarIntro();
  } else if (estado == "juego") {
    dibujarPantalla(pantallaActual);
   }
}

 function dibujarPantalla(num) {
  image(imagenes[num], 0, 0, width, height);

  //texto
  stroke(0);
  strokeWeight(3);
  fill(255);
  textSize(26);
  textAlign(CENTER, TOP);
  text(textos[num], 40, 15, 720);

  if (esFinal(num)) {
    // cartel Ffin
    stroke(0);
    strokeWeight(5);
    fill(255);
    textSize(70);
    textAlign(CENTER, CENTER);
    text("FIN", width / 2, 310);

    dibujarBoton(xBotonSolo, yBotones, anchoBotonSolo, altoBotones, "Volver al inicio");
  } else if (destinoB[num] == -1) {
    // pantalla con un camino
    dibujarBoton(xBotonSolo, yBotones, anchoBotonSolo, altoBotones, textoBotonA[num]);
  } else {
    // pantalla con decision
    dibujarBoton(xBotonA, yBotones, anchoDosBotones, altoBotones, textoBotonA[num]);
    dibujarBoton(xBotonB, yBotones, anchoDosBotones, altoBotones, textoBotonB[num]);
  }
}

// devuelve true si la pantalla es uno de los finales
function esFinal(num) {
  for (let i = 0; i < finales.length; i++) {
     if (finales[i] == num) {
     return true;
    }
  }
  return false;
}

// intro
function dibujarIntro() {
   image(imagenIntro, 0, 0, width, height);

  // movimiento globo
  angulo = angulo + 0.01;
  globoX = 400 + 250 * sin(angulo);
  globoY = 140 + 70 * sin(angulo * 2);

 let altoGlobo = anchoGlobo * imagenGlobo.height / imagenGlobo.width;
  image(imagenGlobo, globoX - anchoGlobo / 2, globoY - altoGlobo / 2, anchoGlobo, altoGlobo);

  // recuadro con los datos
   noStroke();
  fill(0, 170);
  rect(0, 320, width, 130);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("En globo por el Sahara", width / 2, 335);
  textSize(20);
  text("Andruetto Clementina y Bailate Braian", width / 2, 362);
  text("Autor: Douglas Terman", width / 2, 384);

  dibujarBoton(300, 405, 200, 35, "Comenzar");
}

// cambia de color con el mouse
function dibujarBoton(x, y, ancho, alto, texto) {
  stroke(255);
  strokeWeight(2);

  if (mouseEnZona(x, y, ancho, alto)) {
     fill(255, 200, 0);
  } else {
   fill(40, 40, 40, 200);
  }
 rect(x, y, ancho, alto, 10);

  noStroke();
  if (mouseEnZona(x, y, ancho, alto)) {
    fill(0);
  } else {
    fill(255);
  }
  textSize(22);
  textAlign(CENTER, CENTER);
  text(texto, x + ancho / 2, y + alto / 2);
}

// devuelve true si el mouse esta dentro de la zona
function mouseEnZona(x, y, ancho, alto) {
 return mouseX > x && mouseX < x + ancho && mouseY > y && mouseY < y + alto;
}

function mousePressed() {
   if (estado == "intro") {
    if (mouseEnZona(300, 405, 200, 35)) {
     estado = "juego";
      pantallaActual = 0;
    }
  } else if (estado == "juego") {
    if (esFinal(pantallaActual)) {
    // boton de volver a la intro
    if (mouseEnZona(xBotonSolo, yBotones, anchoBotonSolo, altoBotones)) {
  volverAlInicio();
      }
    } else if (destinoB[pantallaActual] == -1) {
      // un solo camino
   if (mouseEnZona(xBotonSolo, yBotones, anchoBotonSolo, altoBotones)) {
      pantallaActual = destinoA[pantallaActual];
      }
    } else {
      // decision: boton A o boton B
      if (mouseEnZona(xBotonA, yBotones, anchoDosBotones, altoBotones)) {
     pantallaActual = destinoA[pantallaActual];
      } else if (mouseEnZona(xBotonB, yBotones, anchoDosBotones, altoBotones)) {
         pantallaActual = destinoB[pantallaActual];
      }
    }
  }
}

// vuelve a la pantalla intro
function volverAlInicio() {
  estado = "intro";
  pantallaActual = 0;
  angulo = 0;
}
