/**
 * Catalogo del visualizador: el de Natural Flooring.
 *
 * ancho y largo de tabla en metros; los colores van de la veta oscura a la clara,
 * y "alt" es el tono al que tiran algunas tablas (el lapacho, hacia el oliva).
 */
export const MATERIALES = [
  { id: "lapacho", nombre: "Lapacho", familia: "Madera natural", ancho: 0.1, largo: 1.2,
    oscuro: [62, 36, 22], claro: [136, 84, 52], alt: [104, 80, 48], altK: 0.45,
    veta: 0.18, anillos: 2.2, ondulacion: 1.6, nitidez: 2.2, variacion: 0.16, fibra: 0.2 },
  { id: "viraro", nombre: "Viraro", familia: "Madera natural", ancho: 0.1, largo: 1.2,
    oscuro: [118, 76, 36], claro: [206, 152, 86], alt: [180, 120, 60], altK: 0.15,
    veta: 0.17, anillos: 2.6, ondulacion: 1.8, nitidez: 1.8, variacion: 0.14, fibra: 0.18 },
  { id: "petiribi", nombre: "Petiribí", familia: "Madera natural", ancho: 0.12, largo: 1.2,
    oscuro: [58, 34, 20], claro: [170, 112, 64], alt: [96, 62, 34], altK: 0.25,
    veta: 0.25, anillos: 1.8, ondulacion: 2.4, nitidez: 3.2, variacion: 0.15, fibra: 0.15 },
  { id: "guatambu", nombre: "Guatambú", familia: "Madera natural", ancho: 0.1, largo: 1.2,
    oscuro: [172, 138, 86], claro: [228, 206, 160], alt: [220, 196, 140], altK: 0.15,
    veta: 0.1, anillos: 2.4, ondulacion: 1.2, nitidez: 1.6, variacion: 0.1, fibra: 0.13 },
  { id: "wpc", nombre: "Deck WPC", familia: "WPC", ancho: 0.14, largo: 2.4,
    oscuro: [66, 46, 32], claro: [124, 90, 62], alt: [90, 66, 48], altK: 0.1,
    veta: 0.07, anillos: 1.2, ondulacion: 1, nitidez: 1.2, variacion: 0.08, fibra: 0.28, ranuras: 0.007 },
  { id: "spc", nombre: "Piso SPC", familia: "SPC", ancho: 0.18, largo: 1.2, bisel: true,
    oscuro: [118, 113, 105], claro: [176, 170, 160], alt: [150, 146, 138], altK: 0.1,
    veta: 0.12, anillos: 2, ondulacion: 1.6, nitidez: 1.8, variacion: 0.07, fibra: 0.13 },
  { id: "vinyl", nombre: "Piso vinílico", familia: "Vinílico", ancho: 0.18, largo: 1.2, bisel: true,
    oscuro: [128, 98, 66], claro: [206, 172, 128], alt: [170, 134, 92], altK: 0.12,
    veta: 0.14, anillos: 2.2, ondulacion: 1.8, nitidez: 2, variacion: 0.09, fibra: 0.13 },
];

/**
 * Fotos de ejemplo, ya calibradas. Coordenadas en pixeles de la foto (900 × 1200).
 *
 * piso: poligono del piso visible. huecos: lo que lo tapa (cama, banco, patas).
 * quad: cuatro puntos de un rectangulo del piso en perspectiva; mundo: su tamano en metros.
 * along: "v" si las tablas van hacia el fondo, "u" si van de lado.
 */
export const EJEMPLOS = [
  {
    id: "dormitorio",
    nombre: "Dormitorio",
    src: "/images/vis-dormitorio.jpg",
    along: "v",
    mundo: [7, 9],
    quad: [[-180, 380], [1050, 532], [1750, 1650], [462, 1650]],
    piso: [[0, 625], [140, 590], [140, 470], [670, 470], [760, 490], [900, 520], [900, 1200], [235, 1200], [0, 735]],
    huecos: [
      [[100, 380], [670, 380], [672, 470], [600, 520], [515, 600], [500, 640], [420, 690], [390, 722], [330, 700], [200, 600], [120, 545], [100, 500]],
      [[515, 500], [600, 500], [760, 535], [760, 560], [720, 610], [725, 635], [715, 642], [690, 670], [640, 690], [630, 756], [612, 756], [618, 690], [530, 642], [522, 682], [505, 676], [512, 610]],
    ],
  },
  {
    id: "comedor",
    nombre: "Comedor",
    src: "/images/vis-comedor.jpg",
    along: "u",
    mundo: [5, 3.6],
    quad: [[-400, 460], [1400, 789], [2013, 1700], [-1842, 1700]],
    piso: [[0, 790], [95, 780], [105, 705], [132, 640], [160, 622], [240, 618], [258, 560], [300, 525], [400, 488], [420, 570], [430, 612], [830, 685], [872, 650], [884, 1050], [872, 1200], [0, 1200]],
    huecos: [
      [[128, 600], [150, 600], [162, 740], [139, 740]],
      [[196, 600], [216, 600], [235, 686], [212, 686]],
      [[236, 560], [257, 560], [261, 620], [240, 620]],
    ],
  },
];

// El material del ejemplo de la historia: el que pregunto la clienta.
export const MATERIAL_DEMO = "guatambu";
export const EJEMPLO_DEMO = "dormitorio";
