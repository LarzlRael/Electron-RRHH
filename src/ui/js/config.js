const { remote } = require('electron');
const query = remote.require('./database/newuser');
const Swal = require('sweetalert2');

let allUsers = []

const usuario = document.querySelector('#usuario');
const password = document.querySelector('#password');
const form_new_user = document.querySelector('#form-new-user');
const administrador = document.getElementById("admin");

const usuarios = document.getElementById("usuarios");

form_new_user.addEventListener('submit', e => {
    e.preventDefault();
    const newuser = {
        nombre_usuario: usuario.value,
        password: password.value,
        rol: administrador.checked
    }
    if (validarDatos()) {
        if (query.insertNewUser(newuser)) {
            Swal.fire({
                title: 'Nuevo usuario',
                text: 'Nuevo usuario agregado',
                icon: 'success',
                confirmButtonText: 'bien :D'
            })
            getUsers();
        } else {
            Swal.fire({
                title: 'Hubo un error',
                text: 'El nombre de usuario ya fue usando por otro usuario',
                icon: 'warning',
                confirmButtonText: 'Reitentar'
            })
        }
    } else {

        Swal.fire({
            title: 'Hubo un error',
            text: 'Llena todos los campos ',
            icon: 'warning',
            confirmButtonText: 'vale'
        })
    }
});

async function getUsers() {
    usuarios.innerHTML = `
        <tr>
            <th>Usuario</th>
            <th>rol</th>
            
        </tr>
    `;
    allUsers = await query.systemUsers();
    allUsers.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML += `
            <td>${user.nombre_usuario}</td>
            <td>${user.rol == 1 ? "administrador" : "usuario normal"}</td>
        `;
        usuarios.append(tr);

    })
}

function cambiarEstado(id) {
    alert(id)
}
getUsers();

function validarDatos() {
    if (usuario.value == "") {
        return false
    }
    if (password.value == "") {
        return false
    }
    if (administrador.value == "") {
        return false
    }
    return true;
}