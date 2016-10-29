/**
 * Created by alex on 29/10/2016.
 */
const remote = require('electron').remote;
const waterfall = require('async/waterfall');


//Homebrew
const loader = require('./host/loader');
const injector = require('./host/injector');
const printer = require('./host/printer');
const writer = require('./host/writer');

let webview;

function createWebview() {
    webview = document.createElement('webview');
    webview.style.width = '100%';
    webview.style.height = '100%';
    webview.setAttribute('src', "google.com/");
    document.getElementsByTagName('body')[0].appendChild(webview);
    return webview;
}

function run() {
    createWebview();
    waterfall([
     (cb) => { cb(null, webview)},
     loader.run,
     injector.run,
     printer.run,
     writer.run
    ]);
}

run();