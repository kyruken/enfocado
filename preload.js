const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveStopwatch: (data) => ipcRenderer.send('save-stopwatch', data),
  getStopwatch: () => ipcRenderer.invoke('get-stopwatch'),
  saveProject: (project) => ipcRenderer.send('save-project', project),
  getProjects: () => ipcRenderer.invoke('get-projects'),
  getUniqueTitles: () => ipcRenderer.invoke('get-unique-titles'),
});

