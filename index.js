//Vendors
const {app, BrowserWindow} = require('electron');
const waterfall = require('async/waterfall');

//Homebrew
const loader = require('./host/loader');
const printer = require('./host/printer');
const writer = require('./host/writer');
const config = require('./host/config');

let win;

function createWindow () {
    win = new BrowserWindow({width: 1440, height: 900});
    //win.loadURL(`file://${__dirname}/index.html`);
    win.on('closed', () => {
        win = null
    });

    win.webContents.openDevTools();
    config.run();

    waterfall([
        (cb) => { cb(null, win)},
        loader.run,
        printer.run,
        writer.run
    ]);
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
