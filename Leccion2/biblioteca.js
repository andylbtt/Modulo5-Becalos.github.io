// biblioteca.js
// 1. Datos simulados en formato JSON para la biblioteca
let biblioteca = {
    "libros": [
        { "titulo": "La canción de Aquiles", "autor": "Madeline Miller", "genero": "Novela histórica", "disponible": true },
        { "titulo": "La mujer rota", "autor": "Simone de Beauvoir", "genero": "Narrativa feminista", "disponible": true },
        { "titulo": "Ensayo sobre la ceguera", "autor": "José Saramago", "genero": "Novela", "disponible": true },
        { "titulo": "Tan poca vida", "autor": "Hanya Yanagihara", "genero": "Drama contemporáneo", "disponible": true }
    ]
};

// 2. Función para simular la lectura de datos
function leerDatos(callback) {
    setTimeout(() => {
        callback(biblioteca);
    }, 1000);
}

// 3. Función para mostrar todos los libros en consola con título personalizado
function mostrarLibros(titulo = "Inventario de libros") {
    console.log(`\n=== ${titulo} ===`);
    biblioteca.libros.forEach((libro, index) => {
        console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? 'Disponible' : 'Prestado'})`);
    });
}

// 4. Función para agregar un nuevo libro
function agregarLibro(titulo, autor, genero, disponible, callback) {
    const nuevoLibro = { titulo, autor, genero, disponible };
    setTimeout(() => {
        biblioteca.libros.push(nuevoLibro);
        console.log("\n📘 Libro agregado correctamente.");
        if (callback) callback();
    }, 1000);
}

// 5. Función para actualizar la disponibilidad de un libro
function actualizarDisponibilidad(titulo, nuevoEstado, callback) {
    setTimeout(() => {
        const libro = biblioteca.libros.find(libro => libro.titulo === titulo);
        if (libro) {
            libro.disponible = nuevoEstado;
            console.log(`\n✅ Disponibilidad actualizada para \"${titulo}\".`);
        } else {
            console.log(`\n⚠️ Libro \"${titulo}\" no encontrado.`);
        }
        if (callback) callback();
    }, 1000);
}

// 6. Ejecución de ejemplo en nuestra terminal
console.log("\n📚 Bienvenido a la Biblioteca\n");
mostrarLibros("Inventario inicial");

agregarLibro("El Principito", "Antoine de Saint-Exupéry", "Fábula", true, () => {
    mostrarLibros("Inventario después de agregar un libro");
    actualizarDisponibilidad("La canción de Aquiles", false, () => {
        mostrarLibros("Inventario después de actualizar disponibilidad de 'La canción de Aquiles'");
    });
});