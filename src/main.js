const { BrowserWindow, Notification } = require('electron');
const { menu_items } = require('./menu_items');

let mainWindow;
let menuWindow;
let employes;
let requirements;
let newMembers;
let departaments;
let config;
let view_menu_public;
let jobs;
let locations;
let departamentos_list;


const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadFile('src/ui/index.html')
}
const createMenuWindow = () => {

    menuWindow = new BrowserWindow({
        width: 900,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.close();
    menuWindow.loadFile('src/ui/windows/menu.html');
}
const createEmployeWindow = () => {
    employes = new BrowserWindow({
        width: 900,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    });
    employes.loadFile('src/ui/windows/employes.html')
}
const createRequirementsWindow = () => {
    requirements = new BrowserWindow({
        width: 900,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    });
    requirements.loadFile('src/ui/windows/requeriments.html')
}
const createNewMembersWindow = () => {
    newMembers = new BrowserWindow({
        width: 900,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    });
    newMembers.loadFile('src/ui/windows/new_members.html')
}

const createDepartamentssWindow = () => {
    departaments = new BrowserWindow({
        width: 900,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    });
    departaments.loadFile('src/ui/windows/departaments.html')
}
const createConfigWindow = () => {
    config = new BrowserWindow({
        width: 900,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    });
    config.loadFile('src/ui/windows/config.html')
}
const createPublic_menuWindow = () => {
    view_menu_public = new BrowserWindow({
        width: 900,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    });
    view_menu_public.loadFile('src/ui/windows/menu_public.html')
}
const createJobs_menuWindow = () => {
    jobs = new BrowserWindow({
        width: 900,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    });
    jobs.loadFile('src/ui/windows/jobs.html')
}
const createLocationWindow = () => {
    locations = new BrowserWindow({
        width: 900,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    });
    locations.loadFile('src/ui/windows/location.html')
}
const createDepartamentListWindow = () => {
    departamentos_list = new BrowserWindow({
        width: 900,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    });
    departamentos_list.loadFile('src/ui/windows/departament_list.html')
}

function openSelectView(nombre_ventana) {
    switch (nombre_ventana) {
        case 'tareas':
            //createEmployeWindow()
            break;
        case 'nuevo_miembro':
            return createEmployeWindow()
            break;
        case 'requisitos':
            return createRequirementsWindow()
        case 'nuevos_miembros':
            return createNewMembersWindow()
            break;
        case 'departamentos':
            return createDepartamentssWindow()
            break;
        case 'configuraciones':
            return createConfigWindow()
            break;
        case 'trabajos':
            return createJobs_menuWindow()
            break;
        case 'locaciones':
            return createLocationWindow()
            break;
        case 'departamentos_list':
            return createDepartamentListWindow()
            break;
        default:
            break;
    }
}

function menu_public() {

    const result = menu_items.filter(item => item.watch == true);
    return result;

}
module.exports = {
    createMainWindow, createMenuWindow, openSelectView, createConfigWindow, createPublic_menuWindow, menu_public
}
