const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreenable: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: false
    }
  });

  //Load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.setMenu(null)
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.