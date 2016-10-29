/**
 * Created by alex on 08/10/2016.
 */
const config = require('./config');
const q = require('q');

function run(webview, callback) {
    var delayDefered = q.defer();
    var delayPromise = delayDefered.promise;

    var waitForDefered = q.defer();
    var waitForPromise = waitForDefered.promise;
    
    if(config.args.delay) {
        setTimeout(() => {
            delayDefered.resolve();
        }, config.args.delay)
    } else {
        delayDefered.resolve();
    }

    if(config.args.waitFor) {
        webview.addEventListener('console-message', (message) => {
            console.log("MESSAGE RECIEVED", message)
            if(message == config.args.waitFor) {
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
        pageSize: config.args.pageSize,
        landscape: config.args.orientation === 'landscape',
        printBackground: config.args.printBackground
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