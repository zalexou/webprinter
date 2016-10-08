const {app, BrowserWindow} = require('electron');
const loader = require('./host/loader');

let win;

function createWindow () {
    win = new BrowserWindow({width: 1440, height: 900});
    //win.loadURL(`file://${__dirname}/index.html`);

    //win.webContents.openDevTools();
    var url = "http://spotify.com/";
    loader.run(win, url);
    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
    app.quit()
}
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});
