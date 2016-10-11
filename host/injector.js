/**
 * Created by alex on 11/10/2016.
 */
const config = require('./config');
const q = require('q');

function run(window, callback) {
    var jsLoad = q.defer();
    var jsLoadPromise = jsLoad.promise;

    var js = config.args.js;
    var css = config.args.css;
    if(css) {
        injectCSS(window, ""+css);
    }

    if(js) {
        var start = Date.now;
        injectJS(window, js, () => {
            jsLoad.resolve(Date.now - start);
        });
    } else {
        jsLoad.resolve();
    }

    q.all([
        jsLoadPromise
    ], onInjected(window, callback))
}

function onInjected(window, callback) {
    return () => {
        callback(null, window);
    }
}

function injectCSS(window, css) {
    window.webContents.insertCSS(css);
}

function injectJS(window, js, callback) {
    window.webContents.executeJavaScript(js, true, callback);
}

module.exports = {
    run: run
};