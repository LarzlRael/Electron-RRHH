const { remote } = require('electron');
const Swal = require('sweetalert2');

const main = remote.require('./database/departaments');
const query = remote.require('./database/location_jobs');


const deparments_list = document.querySelector('#deparments_list');

const nombre_departamento = document.querySelector('#nombre_departamento');
const numero_miembros = document.querySelector('#numero_miembros');
const locacion_select = document.querySelector('#locacion_select');
//? formulario 
const form_deparment_list = document.querySelector('#form_deparment_list');

let deparmentos_db = [];
let locaciones_db = [];

async function getDepartmentosHere() {

    deparmentos_db = await main.getDeparmentLocacion();
    console.log(deparmentos_db);

    deparmentos_db.forEach(departamento => {
        const tr = document.createElement('tr');
        tr.innerHTML += `
            <td>${departamento.id_departamento}</td>
            <td class="text-capitalize">${departamento.nombre_departamento}</td>
            <td class="text-capitalize">${departamento.cantidad_integrantes}/${
            departamento.cantidad_total}</td>
            <td class="text-capitalize">${departamento.direccion}</td>
        `;
        deparments_list.appendChild(tr)
    })
}
const getLocacionHere = async () => {
    locaciones_db = await query.getLocations();
    console.log(locaciones_db);
    locaciones_db.forEach(location => {
        locacion_select.innerHTML +=
            `<option value=${location.id_locacion}>
            ${location.direccion}-${location.ciudad}
        </option>`;
    })
}


getLocacionHere();
getDepartmentosHere();

form_deparment_list.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(
        nombre_departamento.value,
        numero_miembros.value,
        locacion_select.value
    );

    let newDepartament = {
        nombre_departamento: nombre_departamento.value,
        cantidad_total: numero_miembros.value,
        locacion: locacion_select.value
    }

    if (validarCampos()) {
        Swal.fire({
            title: 'Departamento creado',
            text: 'Nuevo departamento agregado',
            icon: 'success',
            confirmButtonText: 'bien :D'
        })
    } else {
        Swal.fire({
            title: 'Hubo un error',
            text: 'Llena todos los campos ',
            icon: 'warning',
            confirmButtonText: 'vale'
        })
    }


})


function limpiar(params) {
    nombre_departamento.value = ""
    numero_miembros.value = ""
    locacion_select.value = ""
    form_deparment_list.reset();
}

function validarCampos() {

    if (nombre_departamento.value == "") {
        return false
    }
    if (numero_miembros.value == "") {
        return false
    }
    if (locacion_select.value == "") {
        return false
    }
    return true;
}