const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js')  // or use preload if you want
      // or:
      // nodeIntegration: true,    // (not recommended for security)
      // contextIsolation: false   // must be false to use nodeIntegration
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);
