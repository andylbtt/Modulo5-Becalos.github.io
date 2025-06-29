// Archivo: index.js

const { obtenerPlanetas, mostrarPlanetas } = require('./planetas');

console.log("Bienvenido a tu Registro de Planetas Favoritos 🚀\n");

const planetas = obtenerPlanetas();
mostrarPlanetas(planetas);