const { remote } = require('electron');
const main = remote.require('./main');

const menu_items_public = document.querySelector('#menu_items_public');

let menu_public = main.menu_public();
console.log(menu_public);


menu_public.forEach(item => {
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
    menu_items_public.appendChild(div);
})

const itemsMenu = document.querySelectorAll('.caja');

itemsMenu.forEach((item,i) => {
    item.addEventListener('click', () => {
        main.openSelectView(menu_public[i].name);
    })
})
