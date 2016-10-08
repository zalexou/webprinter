/**
 * Created by alex on 08/10/2016.
 */
function run(window, callback) {
    window.webContents.printToPDF({
        marginsType: 1,
        pageSize: 'A4',
        landscape: false,
        printBackground: true
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