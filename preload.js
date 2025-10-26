const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveStopwatch: (data) => ipcRenderer.send('save-stopwatch', data),
  getStopwatch: () => ipcRenderer.invoke('get-stopwatch'),
});

