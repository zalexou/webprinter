/**
 * Created by alex on 08/10/2016.
 */
const config = require('./config');

function run(window, callback) {
    window.loadURL(config.args.url);
    window.webContents.on('dom-ready', () => {
        callback(null, window);
    });
}
module.exports = {
    run: run
};