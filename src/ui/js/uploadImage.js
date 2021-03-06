

const electron = require('electron');
const Swal = require('sweetalert2');

const dialog = electron.remote.dialog;

const path = require('path');

const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellidos');
const telefono = document.querySelector('#telefono');
const direccion_ = document.querySelector('#direccion');
let imagen = ""


// Importing dialog module using remote 

global.filepath = undefined;


const foto = document.querySelector('#foto');
foto.addEventListener('click', (e) => {
    e.preventDefault();
    //If the platform is 'win32' or 'Linux'
    if (process.platform !== 'darwin') {
        // Resolves to a Promise<Object> 
        dialog.showOpenDialog({
            title: 'Selecciona su archivo para subir',
            defaultPath: path.join(__dirname, '../assets/'),
            buttonLabel: 'Subir Imagen',
            // Restricting the user to only Text Files. 
            filters: [
                {
                    name: 'Imagenes',
                    extensions: ['jpg', 'jpeg', 'png']
                },],
            // Specifying the File Selector Property 
            properties: ['openFile']
        }).then(file => {
            // Stating whether dialog operation was 
            // cancelled or not. 
            console.log(file.canceled);
            if (!file.canceled) {

                global.filepath = file.filePaths[0].toString();
                console.log(global.filepath);
                //? asignar el path de la imagen
                imagen = global.filepath;

            }
        }).catch(err => {
            console.log(err)
        });
    }
    else {
        // If the platform is 'darwin' (macOS) 
        dialog.showOpenDialog({
            title: 'Select the File to be uploaded',
            //defaultPath: path.join(__dirname, '../assets/'),
            buttonLabel: 'Subir',
            filters: [
                {
                    name: 'Text Files',
                    extensions: ['jpg', 'jpeg', 'png']
                },],
            // Specifying the File Selector and Directory  
            // Selector Property In macOS 
            properties: ['openFile', 'openDirectory']
        }).then(file => {
            console.log(file.canceled);
            if (!file.canceled) {
                global.filepath = file.filePaths[0].toString();
                console.log(global.filepath);
            }
        }).catch(err => {
            console.log(err)
        });
    }
})




formNewEmploye.addEventListener('submit', async (e) => {
    e.preventDefault()
    const newEmploye = {
        trabajo: jobs.value,
        nombre: nombre.value,
        apellido: apellido.value,
        telefono: telefono.value,
        direccion: direccion_.value,
        imagen: imagen,
        salario: salario.value
    }

    if (validar()) {


        await main.newEmploye(newEmploye, id_departamento);
        limpiar()
        verAllWorkers()
        obtenerSalario()
        Swal.fire({
            title: 'Empleado agregado',
            text: `Nuevo empleado Agregado`,
            icon: 'success',
            confirmButtonText: 'vale'
        })
    } else {

        Swal.fire({
            title: 'Error',
            text: 'Llena todos los campos ',
            icon: 'warning',
            confirmButtonText: 'vale'
        })
    }

});

function limpiar() {
    formNewEmploye.reset();
    nombre.value = "";
    apellido.value = "";
    telefono.value = "";
    direccion_.value = "";
    imagen.value = "";
    salario.value = ""
}


function validar() {
    if (nombre.value == "") {
        return false;
    }
    if (apellido.value == "") {
        return false;
    }
    if (telefono.value == "") {
        return false;
    }
    if (direccion_.value == "") {
        return false;
    }
    if (salario.value == "") {
        return false;
    }
    return true
}