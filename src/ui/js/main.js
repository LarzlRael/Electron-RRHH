
const { remote } = require('electron');
const main = remote.require('./main');

const login_form = document.querySelector('#form-login'),
    button_show_form = document.querySelector('#button-login'),
    close_login = document.querySelector('#close-login'),
    popup = document.querySelector('#popup');

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

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log(user.value, password.value);

    main.createMenuWindow();
})

