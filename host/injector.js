/**
 * Created by alex on 11/10/2016.
 */
const config = require('./config');
const q = require('q');

function run(webview, callback) {
    var jsLoad = q.defer();
    var jsLoadPromise = jsLoad.promise;

    var js = config.args.js;
    var css = config.args.css;
    if(css) {
        injectCSS(webview, ""+css);
    }

    if(js) {
        injectJS(webview, js, () => {
            jsLoad.resolve();
        });
    } else {
        jsLoad.resolve();
    }
    
    var rdy = q.all([
        jsLoadPromise
    ]);

    rdy.then(() => {
        callback(null, webview);
    })
}

function injectCSS(webview, css) {
    webview.insertCSS(css);
}

function injectJS(webview, js, callback) {
    webview.executeJavaScript(js, true, callback);
}

module.exports = {
    run: run
};