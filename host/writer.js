/**
 * Created by alex on 08/10/2016.
 */
const fs = require('fs');
const config = require('./config');

function run(documentData, callback) {
    fs.writeFile('page.pdf', documentData, onFileReady(callback));
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