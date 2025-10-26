const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let stopwatchData = {}; 

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),  // or use preload if you want
      contextIsolation: true, 
      nodeIntegration: false,       // or:
      // nodeIntegration: true,    // (not recommended for security)
      // contextIsolation: false   // must be false to use nodeIntegration
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.on('load-page', (event, page) => {
  mainWindow.loadFile(page);
});

// Handle data
ipcMain.on('save-stopwatch', (event, data) => {
  stopwatchData = data;
  mainWindow.loadFile('project-details.html');
});

ipcMain.handle('get-stopwatch', () => stopwatchData);

