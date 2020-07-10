
const { remote } = require('electron');
const main = remote.require('./main');

//? modulo de sweetalert
const Swal = require('sweetalert2')

//? para obtener el metodo para el login
const login = remote.require('./database/newuser');

const login_form = document.querySelector('#form-login'),
    button_show_form = document.querySelector('#button-login'),
    close_login = document.querySelector('#close-login'),
    popup = document.querySelector('#popup'),
    button_ver = document.querySelector('#button-ver');

//? get user and password

const user = document.getElementById('usuario');
const password = document.getElementById('password');
const loginForm = document.getElementById('loginFormSubmit');



button_show_form.addEventListener('click', () => {

    login_form.classList.add('active');
    popup.classList.add('active');
});

close_login.addEventListener('click', () => {

    login_form.classList.remove('active');
    popup.classList.add('active');

});

loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    console.log(user.value, password.value);

    const login_user = {
        nombre_usuario: user.value,
        password: password.value
    }

    if (await login.comparePassword(login_user)) {

        main.createMenuWindow();
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Usuario o contraseña incorrecto',
            icon: 'error',
            confirmButtonText: 'Reintentar'
        })
    }
});
button_ver.addEventListener('click', e => {
    main.createPublic_menuWindow();
})

