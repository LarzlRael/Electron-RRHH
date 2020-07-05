



const { BrowserWindow, Notification } = require('electron');

let mainWindow;
let menuWindow;
let employes;
let requirements;
let newMembers;
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
    menuWindow.loadFile('src/ui/windows/menu.html')
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

function openSelectView(ventana) {
    switch (ventana) {
        case 0:
            //createEmployeWindow()
            break;

        case 1:
            return createEmployeWindow()
            break;
        case 2:
            return createRequirementsWindow()
        case 3:
            return createNewMembersWindow()
            break;
        default:
            break;
    }
}
module.exports = {
    createMainWindow, createMenuWindow, openSelectView
}
