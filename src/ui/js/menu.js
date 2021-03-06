const { remote } = require('electron');
const main = remote.require('./main');
const menu = remote.require('./menu_items');

let box_container = document.querySelector('#box-container');


menu.menu_items.forEach(item => {
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
    </div>`;
    box_container.appendChild(div);
})

const itemsMenu = document.querySelectorAll('.caja');

itemsMenu.forEach((item,i) => {
    item.addEventListener('click', () => {
        main.openSelectView(menu.menu_items[i].name);
    })
})
