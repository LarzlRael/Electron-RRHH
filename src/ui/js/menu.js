const { remote } = require('electron');
const main = remote.require('./main');

let box_container = document.querySelector('#box-container');
const menu_items = [
    {
        icono: 'fas fa-clipboard-list',
        color1: '255, 145, 28',
        color2: '255, 194, 128',
        titulo: 'Tareas'
    },
    {
        icono: 'fas fa-plus',
        color1: '247,77,122',
        color2: '247,147,174',
        titulo: 'Agregar Nuevo Miembro'
    },
    {
        icono: 'fas fa-tasks',
        color1: '101,101,250',
        color2: '148,148,250',
        titulo: 'Requisitos'
    },
    {
        icono: 'fas fa-users"',
        color1: '192,84,204',
        color2: '196,121,204',
        titulo: 'Nuevos Miembros'
    },
    {
        icono: 'far fa-calendar-alt',
        color1: '252,89,77',
        color2: '252,134,125',
        titulo: 'Eventos'
    },
    {
        icono: 'far fa-bell',
        color1: '14,141,252',
        color2: '75,170,252',
        titulo: 'Anuncios'
    },
    {
        icono: 'far fa-building"',
        color1: '14,141,252',
        color2: '75,170,252',
        titulo: 'Departamentos'
    },
    {
        icono: 'fas fa-history',
        color1: '14,141,252',
        color2: '75,170,252',
        titulo: 'Historial'
    },
]

menu_items.forEach(item => {
    const div = document.createElement('div');
    div.style.background = `linear-gradient(to bottom, rgb(${item.color2}), rgb(${item.color1})`;
    div.classList.add('caja')
    div.innerHTML += `
    <div class="logo">
        <span><i 
        style="color: rgb(${item.color1})"
        class="${item.icono}"></i></span>
    </div>
    <div class="titulo">
        ${item.titulo}
    </div>
    `;
    box_container.appendChild(div);
})

const itemsMenu = document.querySelectorAll('.caja');
itemsMenu.forEach((item,i) => {
    item.addEventListener('click', () => {
        main.openSelectView(i);
    })
})
