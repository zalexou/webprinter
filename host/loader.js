/**
 * Created by alex on 08/10/2016.
 */
const $ = require('jquery');
const fs = require('fs');

console.log("coucou ma gueule");

function run(window, url) {
    window.loadURL(url);
    console.log("All set, waiting for page to render...")
    setTimeout(() => {
        window.webContents.printToPDF({
            marginsType: 1,
            pageSize: 'A4',
            landscape: false,
            printBackground: true
        }, onPrintDone);
    }, 5000);
}

function onPrintDone(err, d) {
    if(err) {
        console.error("Print failed: ", err);
    }  else {
        fs.writeFile('page.pdf', d, function (err) {
            if (err) {
                return console.log(err);
            } else {
                console.log('Print done');
            }
        });
    }
}

module.exports = {
    run: run
};