import { app, BrowserWindow} from 'electron';
import * as path from 'path';
import * as url from 'url';

// import menuTemplate from './menu';

let mainWindow: BrowserWindow | null;

function createWindow() {

    let mainWindow;
    mainWindow = new BrowserWindow({
      width: 1200, height: 1000,
      x: 50,
      y: 50
    });
  

  // const menu = Menu.buildFromTemplate(menuTemplate);
  // Menu.setApplicationMenu(menu);

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  mainWindow.on('closed', () => {
    mainWindow = null
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
});