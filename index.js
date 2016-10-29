//Vendors
const {app, BrowserWindow} = require('electron');
const config = require('./host/config');

let win;

global.sharedObject = {
    someProperty: 'default value'
};

function createWindow () {
    global.sharedObject.config = config.run();
    win = new BrowserWindow(config.args.windowSize);
    win.on('closed', () => {
        win = null;
    });
    win.webContents.openDevTools();
    win.loadURL(`file://${__dirname}/renderer.html`);
    //createWebview();
    
   /* waterfall([
        (cb) => { cb(null, webview)},
        loader.run,
        injector.run,
        printer.run,
        writer.run
    ]);*/
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
