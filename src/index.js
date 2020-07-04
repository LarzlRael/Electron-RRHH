const { createMainWindow } = require('./main');

const { app } = require('electron');

require('electron-reload')(__dirname);
app.allowRendererProcessReuse = false;

app.whenReady().then(createMainWindow)