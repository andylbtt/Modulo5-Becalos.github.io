// Archivo: main.js
let numeroSecreto = generarNumeroSecreto();
let intentos = 0;
let mejoresPuntajes = JSON.parse(localStorage.getItem('mejoresPuntajes')) || [];

const input = document.getElementById('guessInput');
const boton = document.getElementById('checkButton');
const mensaje = document.getElementById('message');
const reiniciarBtn = document.getElementById('reiniciarButton');
const puntajesLista = document.getElementById('puntajes');

boton.addEventListener('click', () => {
  const intento = parseInt(input.value);

  if (isNaN(intento) || intento < 1 || intento > 100) {
    mensaje.textContent = 'Introduce un número entre 1 y 100.';
    return;
  }

  intentos++;

  if (intento === numeroSecreto) {
    mensaje.textContent = `¡Correcto! Adivinaste el número en ${intentos} intento(s) 🌟`;
    boton.disabled = true;
    guardarPuntaje(intentos);
    mostrarMejoresPuntajes();
  } else if (intento < numeroSecreto) {
    mensaje.textContent = 'Demasiado bajo.';
  } else {
    mensaje.textContent = 'Demasiado alto.';
  }

  input.value = '';
  input.focus();
});

reiniciarBtn.addEventListener('click', () => {
  numeroSecreto = generarNumeroSecreto();
  intentos = 0;
  mensaje.textContent = '';
  boton.disabled = false;
  input.value = '';
  input.focus();
});

function generarNumeroSecreto() {
  return Math.floor(Math.random() * 100) + 1;
}

function guardarPuntaje(puntaje) {
  mejoresPuntajes.push(puntaje);
  mejoresPuntajes.sort((a, b) => a - b);
  mejoresPuntajes = mejoresPuntajes.slice(0, 5); // Solo guardar top 5
  localStorage.setItem('mejoresPuntajes', JSON.stringify(mejoresPuntajes));
}

function mostrarMejoresPuntajes() {
  puntajesLista.innerHTML = '<h3>Mejores Puntajes:</h3><ul>' +
    mejoresPuntajes.map(p => `<li>${p} intento(s)</li>`).join('') +
    '</ul>';
}

mostrarMejoresPuntajes();