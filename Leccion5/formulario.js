document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registroForm');
  const mensaje = document.getElementById('mensaje');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const intereses = document.querySelectorAll('input[name="intereses"]:checked');
    const horario = document.querySelector('input[name="horario"]:checked');
    const fecha = document.getElementById('fecha').value;
    const archivo = document.getElementById('archivo').files[0];

    let errores = [];

    // Validación: Nombre debe tener al menos 3 caracteres
    if (nombre.length < 3) {
      errores.push("El nombre debe tener al menos 3 caracteres.");
    }

    // Validación: Teléfono debe tener 10 dígitos
    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(telefono)) {
      errores.push("El número de teléfono debe contener exactamente 10 dígitos.");
    }

    // Validación: Debe seleccionarse al menos un interés
    if (intereses.length === 0) {
      errores.push("Debes seleccionar al menos un interés.");
    }

    // Validación adicional: Email debe ser del dominio 'correo.com'
    if (!email.endsWith("@correo.com")) {
      errores.push("El correo electrónico debe pertenecer al dominio '@correo.com'.");
    }

    // Validación adicional: La fecha no puede ser en el pasado
    const hoy = new Date().toISOString().split('T')[0];
    if (fecha < hoy) {
      errores.push("La fecha del evento no puede ser en el pasado.");
    }

    // Validación adicional: Si se sube archivo, debe pesar menos de 2MB
    if (archivo && archivo.size > 2 * 1024 * 1024) {
      errores.push("El archivo debe pesar menos de 2MB.");
    }

    if (errores.length > 0) {
      mensaje.innerHTML = `<ul style="color:red">${errores.map(err => `<li>${err}</li>`).join('')}</ul>`;
    } else {
      mensaje.innerHTML = "<p style='color:green'>Formulario enviado con éxito.</p>";
      form.reset();
    }
  });
});