const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;
app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 1000,
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.loadURL('file://' + __dirname + '/index.html');

	// Open Chromium Develop tool
	mainWindow.webContents.openDevTools();

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
});