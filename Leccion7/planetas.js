// Archivo: planetas.js

function obtenerPlanetas() {
  return [
    "Marte",
    "Júpiter",
    "Saturno",
    "Neptuno",
    "Venus"
  ];
}

function mostrarPlanetas(planetas) {
  console.log("⭐ Lista de Planetas Favoritos ⭐\n");
  planetas.forEach((planeta, index) => {
    console.log(`${index + 1}. ${planeta}`);
  });
}

module.exports = {
  obtenerPlanetas,
  mostrarPlanetas
};