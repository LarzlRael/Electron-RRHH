const { remote } = require('electron');
const query = remote.require('./database/newuser');

let allUsers = []

const usuario = document.querySelector('#usuario');
const password = document.querySelector('#password');
const form_new_user = document.querySelector('#form-new-user');
const administrador = document.getElementById("admin");

const usuarios = document.getElementById("usuarios");

form_new_user.addEventListener('submit', e => {
    e.preventDefault();
    console.log(usuario.value, password.value, administrador.checked);
    const newuser = {
        nombre_usuario: usuario.value,
        password: password.value,
        rol: administrador.checked
    }
    query.insertNewUser(newuser)
    getUsers();
});

async function getUsers() {
    usuarios.innerHTML = `
        <tr>
            <th>Usuario</th>
            <th>rol</th>
            
        </tr>
    `;
    allUsers = await query.systemUsers();
    console.log(allUsers)
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

