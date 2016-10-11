//Vendors
const {app, BrowserWindow} = require('electron');
const waterfall = require('async/waterfall');

//Homebrew
const loader = require('./host/loader');
const injector = require('./host/injector');
const printer = require('./host/printer');
const writer = require('./host/writer');
const config = require('./host/config');

let win;

function createWindow () {
    config.run();

    win = new BrowserWindow(config.args.windowSize);
    win.on('closed', () => {
        win = null;
    });

    win.webContents.openDevTools();

    waterfall([
        (cb) => { cb(null, win)},
        loader.run,
        injector.run,
        printer.run,
        writer.run
    ]);
}

function pleaseStop() {
    console.log('stopping process');
    if (process.platform !== 'darwin') {
        app.quit()
    }
}

app.on('ready', createWindow);

app.on('window-all-closed', pleaseStop);

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});
