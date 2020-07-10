const { remote } = require('electron');
const main = remote.require('./database/querys');

const cards_employes = document.querySelector('#cards-employes');
const trabajos = document.querySelector('#trabajos');


let allWorkers_db = []
let trabajos_db = [];
let trabajo_seleccionado = [];

const getWorkersPerJob_view = async (trabajo) => {
    // allWorkers_db = await main.getWorkersPerJob('Encargado Selección y Capacitación Bilingüe Francés/Español');

    allWorkers_db = await main.getWorkersPerJob(trabajo);
    //console.log(allWorkers_db)
}

const crearTrabajos = async () => {

    trabajos_db = await main.getAllJobs();

    trabajo_seleccionado = trabajos_db[0].nombre_trabajo;

    console.log(trabajo_seleccionado)
    //trabajo_seleccionado = getJobs[0].nombre_trabajo;
    trabajos_db.forEach(trabajo => {
        const aTag = document.createElement('a');
        aTag.textContent = trabajo.nombre_trabajo;
        aTag.setAttribute('data-id_trabajo', trabajo.nombre_trabajo)
        trabajos.appendChild(aTag);

        aTag.addEventListener('click',(e)=>{
            document.querySelectorAll('a').forEach(element=>{
                element.classList.remove('active');
            })

            aTag.classList.toggle('active');
        })


    });
    trabajos.childNodes.forEach(elemento => {
        elemento.addEventListener('click', async () => {

            trabajo_seleccionado = elemento.getAttribute('data-id_trabajo')
            //alert(trabajo_seleccionado);
            clickItem();

            crearTrabajadores()
        })
    })
}
crearTrabajos();


const crearTrabajadores = async () => {

    // ! importante para cuando se cargue otro grupo
    //! se vacie y no haya sobrecarga
    limpiar();

    await getWorkersPerJob_view(trabajo_seleccionado);

    if (allWorkers_db.length == 0) {
        cards_employes.innerHTML = `
        <h6> No se encontraron trabajadores para este trabajo</h6>
    `;
    }

    allWorkers_db.forEach(worker => {
        let div = document.createElement('div');
        div.classList.add('card-employe');

        div.innerHTML += `
        <img src="${worker.imagen}" alt="" class="card-image">
            <div class="datos-personales">
                <span class="dato">Nombre: </span>
                <span class="informacion"> ${worker.nombre} ${worker.apellido} </span>
            </div>
        <div class="datos-personales">
            <span class="dato">direccion: </span>
            <span class="informacion"> ${worker.direccion} </span>
        </div>
        <div class="datos-personales">
            <span class="dato">Salario : </span>
            <span class="informacion">${worker.salario} </span>
        </div>
        <div class="datos-personales">
            <span class="dato">trabaja desde:  </span>
            <span class="informacion"> 20/20/20 </span>
        </div>`;

        cards_employes.appendChild(div);
    });
}

crearTrabajadores();

function limpiar() {
    cards_employes.innerHTML = "";
    allWorkers_db = [];
}

function clickItem() {
    const allEmployes = document.querySelectorAll('.card-employe');
//    console.log(allEmployes)
    allEmployes.forEach(employe => {
        employe.addEventListener('click', e => {
            employe.classList.toggle('active')
        })
    })
}