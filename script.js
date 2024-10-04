// Variables globales
let usuarios = [];

// Funciones
async function cargarUsuarios() {
    try {
        const response = await fetch('usuarios.json');
        const data = await response.json();
        usuarios = data.usuarios;
        actualizarTabla();
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

function actualizarTabla() {
    const tabla = document.getElementById('tablaUsuarios');
    if (!tabla) return; // Si no estamos en la página de registro, no hacer nada

    tabla.innerHTML = '';
    usuarios.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario.cedula}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.email}</td>
            <td>${usuario.telefono}</td>
        `;
        tabla.appendChild(fila);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');
    const listarUsuariosBtn = document.getElementById('listarUsuarios');

    if (registroForm) {
        cargarUsuarios(); // Cargar usuarios iniciales

        registroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cedula = document.getElementById('cedula').value;
            if (usuarios.some(u => u.cedula === cedula)) {
                alert('Ya existe un usuario con esta cédula');
                return;
            }

            const nuevoUsuario = {
                cedula: cedula,
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                direccion: document.getElementById('direccion').value,
                fechaNacimiento: document.getElementById('fechaNacimiento').value,
                genero: document.getElementById('genero').value,
                nivelEducativo: document.getElementById('nivelEducativo').value
            };

            usuarios.push(nuevoUsuario);
            actualizarTabla();
            this.reset();
        });
    }

    if (listarUsuariosBtn) {
        listarUsuariosBtn.addEventListener('click', cargarUsuarios);
    }
});