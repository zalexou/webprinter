/**
 * Created by alex on 08/10/2016.
 */
const config = require('./config');

function run(window, callback) {
    window.webContents.printToPDF({
        marginsType: 1,
        pageSize: config.args.pageSize,
        landscape: config.args.orientation === 'landscape',
        printBackground: config.args.printBackground
    }, dataReady(callback));
};

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