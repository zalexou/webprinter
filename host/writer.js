/**
 * Created by alex on 08/10/2016.
 */
const fs = require('fs');
const config = require('electron').remote.getGlobal('sharedObject').config;

function run(documentData, callback) {
    fs.writeFile(config.filename, documentData, onFileReady(callback));
};

function onFileReady(callback) {
    return (err, d) => {
        if(err) {
            callback(err);
        } else {
            callback(null);
        }
    }
}
module.exports = {
    run: run
};