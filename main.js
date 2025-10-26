import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import Store from 'electron-store';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const store = new Store();

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

ipcMain.on('save-project', (event, project) => {
  const projects = store.get('projects') || [];
  projects.push(project);
  store.set('projects', projects);

  // Update unique titles set in store (as array)
  const existingTitles = new Set(store.get('uniqueTitles') || []);
  existingTitles.add(project.title); // add the new title
  store.set('uniqueTitles', Array.from(existingTitles)); // convert Set to array

  console.log('whats in store:', store.get('projects'));
  console.log('✅ Project saved:', project);
});

ipcMain.handle('get-projects', () => {
  const projects = store.get('projects') || [];
  return projects;
});

ipcMain.handle('get-unique-titles', () => {
  return store.get('uniqueTitles') || [];
});


ipcMain.on('go-to-dashboard', (event, data) => {
  mainWindow.loadFile('dashboard.html');
});
