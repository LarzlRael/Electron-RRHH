
const { remote } = require('electron');
const query = remote.require('./database/jobs');
const Swal = require('sweetalert2');

const query_deparments = remote.require('./database/departaments');

const nombre_trabajo = document.querySelector('#nombre_trabajo');
const salario_maximo = document.querySelector('#salario_maximo');
const salario_minmo = document.querySelector('#salario_minmo');
const departamento = document.querySelector('#departamento');

const form_job = document.querySelector('#form_job');

const cards_jobs = document.querySelector('#cards_jobs');

let jobs_db = [];
let departments_db = [];

const getDeparmetns_here = async () => {
    departments_db = await query_deparments.getDepartaments();
    console.log(departments_db)
    departments_db.forEach(departament => {
        departamento.innerHTML += `
            <option value=${departament.id_departamento}>
            ${departament.nombre_departamento}
            </option>
        `;
    })
}

async function getJobs() {
    cards_jobs.innerHTML = "";
    jobs_db = await query.getJobs();
    console.log(jobs_db)
    jobs_db.forEach(job => {
        const card = document.createElement('div');
        card.classList.add('card-job');
        card.innerHTML += `
        <div class="logo">
            <div class="logotipo"></div>
                <i class="fas fa-retweet"></i>
            </div>
            <div class="information">
                <h4>${job.nombre_trabajo}</h4>
                <h3>${job.nombre_departamento}</h3>
                <span>Integrantes : ${job.cantidad_integrantes}/${job.cantidad_total}</span><br>
                <span>Salario Maximo: ${job.salario_maximo}</span><br>
                <span>Salario Minimo: ${job.salario_minimo}</span><br>
                
            </div>
            <div class="buttons">
                <button class="seemore">
                    Ver mas
                </button>
            </div>
        </div>
        `;
        cards_jobs.appendChild(card);
    })
}

getJobs();
getDeparmetns_here()

form_job.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(
        nombre_trabajo.value,
        salario_maximo.value,
        salario_minmo.value,
        departamento.value
    );
    let newJob = {
        nombre_trabajo: nombre_trabajo.value,
        salario_maximo: salario_maximo.value,
        salario_minimo: salario_minmo.value,
        departamento: departamento.value
    }


    if (validarCampos()) {
        query.insertJob(newJob);
        Swal.fire({
            title: 'Trabajo agregado',
            text: 'Agregado exitosamente',
            icon: 'success',
            confirmButtonText: 'vale'
        });
        getJobs();
        getDeparmetns_here()
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Llena todos los campos ',
            icon: 'warning',
            confirmButtonText: 'vale'
        })
    }

});


function validarCampos() {
    if (nombre_trabajo.value == "") {
        return false;
    }
    if (salario_minmo.value > salario_maximo.value) {
        return false;
    }
    if (salario_maximo.value == "") {
        return false;
    }
    if (salario_minmo.value == "") {
        return false;
    }
    if (departamento.value == "") {
        return false;
    }
    return true;
}

