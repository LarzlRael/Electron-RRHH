

const { BrowserWindow, Notification } = require('electron');

let mainWindow;
let menuWindow;

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
    menuWindow.loadFile('src/ui/menu.html')
}

module.exports = {
    createMainWindow, createMenuWindow
}
