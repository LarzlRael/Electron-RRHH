

const { remote } = require('electron');
const main = remote.require('./database/querys');

const card_container = document.querySelector('#cards-container');
let allWorkers = [];
let allJobs = [];


const verAllWorkers = async () => {
    //* sirve para ver los retgistrso
    //* esta funcion recibe 2 parametros
    // * primera el orden que puede ASC o DESC
    // * segundo el numero de registros queremos ver
    allWorkers = await main.seeAllWorkers('DESC', 5);

    //console.log(allWorkers)
    viewWorkers();

}
const getJobs = async () => {
    allJobs = await main.getJobs();

}

const crearTrabajos = async () => {
    await getJobs();
    const jobs = document.querySelector('#jobs');
    console.log(allJobs);
    allJobs.forEach((job,i) => {
        let option = document.createElement("option");
        option.textContent = `${job.nombre_trabajo} - ${job.cantidad_integrantes}`;
        option.setAttribute('index',i);
        option.value = job.id_trabajo;
        jobs.appendChild(option);
    })
}

crearTrabajos();

//?  obtener los datos de los campos

const viewWorkers = () => {
    card_container.innerHTML = ""
    allWorkers.forEach(worker => {
        console.log('bucle')
        const div = document.createElement('div');
        div.classList.add('card', 'col-md-4', 'm-2');
        //TODO crear nuestra propia tarjeta para un mejor vista
        //TODO agregar la parte de detalle de empleado para poder eliminar o editar
        //TODO aumentar en trabajadores de salario, fecha incio default, fecha fin
        //TODO agregar en departamento numero de integrantes  y ponerlo dinamico
        
        div.innerHTML += `
            <img src='${worker.imagen}' class="card-img-top img-fluid" />
            <div class="card-body">
                <div class="card-title">
                    <h5>${worker.nombre} ${worker.apellido}</h5
                    <p class="card-text"> ${worker.nombre_trabajo} </p>
                </div>
            </div>
            
        `;
        card_container.appendChild(div);
    })
}
viewWorkers();



verAllWorkers()

const formNewEmploye = document.querySelector('#form-new-employe');


const next = document.querySelector('.next');
const next2 = document.querySelector('.next2');

const back = document.querySelector('.back');
const back2 = document.querySelector('.back2');

const datosPersonales = document.querySelector('.datos-personales');
const direccion = document.querySelector('.direccion');
const puesto_trabajo = document.querySelector('.puesto-trabajo');


//alert(formNewEmploye.childElementCount);

const stepper = document.querySelector('.stepper');


//? metodos para ir adelante
next.addEventListener('click', (e) => {
    e.preventDefault()
    datosPersonales.classList.remove('active');
    direccion.classList.add('active');

    stepper.childNodes[0].classList.remove('active');
    stepper.childNodes[1].classList.add('active');
})
next2.addEventListener('click', (e) => {
    e.preventDefault()
    direccion.classList.remove('active');
    puesto_trabajo.classList.add('active');
    stepper.childNodes[1].classList.remove('active');
    stepper.childNodes[2].classList.add('active');
});

//metodos para ir atras

back.addEventListener('click', e => {
    e.preventDefault();
    direccion.classList.remove('active');
    datosPersonales.classList.add('active');
    stepper.childNodes[1].classList.remove('active');
    stepper.childNodes[0].classList.add('active');
})
back2.addEventListener('click', e => {

    e.preventDefault();
    puesto_trabajo.classList.remove('active');
    direccion.classList.add('active');
    stepper.childNodes[2].classList.remove('active');
    stepper.childNodes[1].classList.add('active');
})

//alert(formNewEmploye.childElementCount);

//const stepper = document.querySelector('.stepper');


const balls = formNewEmploye.childElementCount;

for (let i = 0; i < balls; i++) {
    const div = document.createElement('div');
    if (i === 0) {
        div.classList.add('active');
    }
    div.classList.add('step');
    stepper.appendChild(div)
}




