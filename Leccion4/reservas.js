let mesasDisponibles = 5;

// Verificamos si hay suficientes mesas disponibles
function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mesasSolicitadas <= mesasDisponibles) {
        resolve('Mesas disponibles');
      } else {
        reject('No hay suficientes mesas disponibles');
      }
    }, 1000);
  });
}

// Simulamos el envío del correo de confirmación
function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.8) {
        resolve(`Correo de confirmación enviado a ${nombreCliente}`);
      } else {
        reject('Error al enviar el correo de confirmación');
      }
    }, 1000);
  });
}

// Función principal para realizar la reserva
async function hacerReserva(nombreCliente, mesasSolicitadas) {
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.textContent = 'Procesando reserva...';

  try {
    await verificarDisponibilidad(mesasSolicitadas);
    mesasDisponibles -= mesasSolicitadas;
    const mensajeCorreo = await enviarConfirmacionReserva(nombreCliente);
    resultadoDiv.textContent = `¡Reserva confirmada para ${nombreCliente}! ${mensajeCorreo}`;
  } catch (error) {
    resultadoDiv.textContent = `Error: ${error}`;
  }
}

// Función auxiliar para capturar datos desde HTML
function hacerReservaDesdeHTML() {
  const nombre = document.getElementById('nombreCliente').value.trim();
  const mesas = parseInt(document.getElementById('mesasSolicitadas').value);

  if (!nombre || isNaN(mesas) || mesas <= 0) {
    document.getElementById('resultado').textContent = 'Ingresa un nombre y un número válido de mesas.';
    return;
  }

  hacerReserva(nombre, mesas);
}