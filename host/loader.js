/**
 * Created by alex on 08/10/2016.
 */
function run(window, callback) {
    window.loadURL("http://google.com");
    window.webContents.on('dom-ready', () => {
        callback(null, window);
    });
}
module.exports = {
    run: run
};