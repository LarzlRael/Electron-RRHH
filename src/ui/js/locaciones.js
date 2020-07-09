
const Swal = require('sweetalert2');
const { remote } = require('electron');
const query = remote.require('./database/location_jobs');

const direccion = document.querySelector('#direccion')
const ciudad = document.querySelector('#ciudad')
const provincia = document.querySelector('#provincia')
//? formualrio
const formLocacion = document.querySelector('#formLocacion');
const limpiar_eliminar = document.querySelector('#limpiar-eliminar');

// listado de las locaciones
const listaLocacion = document.querySelector('#lista_locacion');

let locations = [];

let editar = false;
let eliminar = false;
let id_location = null;

formLocacion.addEventListener('submit', async e => {
    e.preventDefault();
    let newLocacion = {
        direccion: direccion.value,
        ciudad: ciudad.value,
        provincia: provincia.value
    }
    if (editar) {
        await query.updateLocation(newLocacion, id_location);
        editar = false;
        id_location = null;

        document.querySelector('#action-button').value = "Crear una nueva Locacion"
        limpar();
    } else {
        await query.insertNewLocation(newLocacion);
        limpar();
    }
    getLocationsHere();
})

async function getLocationsHere() {
    locations = await query.getLocations();
    console.log(locations);
    listaLocacion.innerHTML = `
        <tr>
        <td>Direccion</td>
        <td>Provincia</td>
        <td>Ciudad</td>
        <td>Numero Identificador</td>
    </tr>
    `;
    locations.forEach(location => {
        let tr = document.createElement('tr');
        tr.classList.add('item-location')
        tr.addEventListener('click', async (e) => {

            direccion.value = tr.cells[0].childNodes[0].textContent;
            ciudad.value = tr.cells[1].childNodes[0].textContent;
            provincia.value = tr.cells[2].childNodes[0].textContent;

            id_location = tr.cells[3].childNodes[0].textContent;
            console.log(id_location)
            document.querySelector('#action-button').value = "Editar Locacion";

            editar = true;
            eliminar = true;

            limpiar_eliminar.classList.remove('btn-outline-info')
            limpiar_eliminar.classList.add('btn-danger');
            limpiar_eliminar.value = "Eliminar";
        })
        tr.innerHTML += `
            <td class>${location.direccion}</td>
            <td class>${location.ciudad}</td>
            <td class>${location.provincia}</td>
            <td class>${location.id_locacion}</td>
        `;
        listaLocacion.appendChild(tr)
    })
    let td_content = listaLocacion.rows[0].cells;

}

let tables_content = document.querySelectorAll('.item-location');

document.querySelectorAll('.item-location').forEach(tr => {
    tr.addEventListener('click', async (e) => {
        console.log(tr)
        console.log(tr.cells[3].childNodes[0])
        const id_location = tr.cells[3].childNodes[0];

        let itemSelect = await query.getLocationForId(id_location)
        console.log(itemSelect)

    })
})
console.log(tables_content)

getLocationsHere();

function limpar(params) {
    direccion.value = "";
    ciudad.value = "";
    provincia.value = "";
    formLocacion.reset();
    eliminar = false;
}

limpiar_eliminar.addEventListener('click', async (e) => {
    
    if (eliminar) {
        if (await query.deleteLocation(id_location)) {

            limpiar_eliminar.classList.remove('btn-danger')
            limpiar_eliminar.classList.add('btn-outline-info');
            limpiar_eliminar.value = "limpar";
            Swal.fire({
                title: 'Eliminado',
                text: 'Locacion eliminada',
                icon: 'success',
                confirmButtonText: 'vale'
            })
            limpiar();
            getLocationsHere();
        } else {
            Swal.fire({
                title: 'Error',
                text: 'No puedes eliminar una locacion con departamentos',
                icon: 'error',
                confirmButtonText: 'Regresar'
            })

        }

        limpiar_eliminar.classList.remove('btn-danger')
        limpiar_eliminar.classList.add('btn-outline-info');
        limpiar_eliminar.value = "limpar";
        limpiar();
        getLocationsHere();
    } else {
        limpar()
    }
})