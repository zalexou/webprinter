/**
 * Created by alex on 08/10/2016.
 */
const config = require('electron').remote.getGlobal('sharedObject').config;
const q = require('q');

function run(webview, callback) {
    var delayDefered = q.defer();
    var delayPromise = delayDefered.promise;

    var waitForDefered = q.defer();
    var waitForPromise = waitForDefered.promise;
    
    if(config.delay) {
        setTimeout(() => {
            delayDefered.resolve();
        }, config.delay)
    } else {
        delayDefered.resolve();
    }

    if(config.waitFor) {
        webview.addEventListener('console-message', (message) => {
            console.log("MESSAGE RECIEVED", message)
            if(message == config.waitFor) {
                waitForDefered.resolve();
            }
        });
    } else {
        console.log("w8 resolved")
        waitForDefered.resolve();
    }
    
    var rdy = q.all([
        delayPromise,
        waitForPromise
    ]);

    rdy.then(() => {
        doPrintPdf(webview, callback);
    })
}

function doPrintPdf(webview, callback) {
    webview.printToPDF({
        marginsType: 1,
        pageSize: config.pageSize,
        landscape: config.orientation === 'landscape',
        printBackground: config.printBackground
    }, dataReady(callback));
}

function dataReady(callback) {
    return (err, data) => {
        if(err) {
            callback(err);
        } else {
            callback(null, data);
        }
    }
}

module.exports = {
    run: run
};