/**
 * Created by alex on 08/10/2016.
 */
const config = require('electron').remote.getGlobal('sharedObject').config;

function run(webview, callback) {
    webview.setAttribute('src', config.url);
    webview.addEventListener('dom-ready', () => {
        callback(null, webview);
    });
}
module.exports = {
    run: run
};