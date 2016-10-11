/**
 * Created by alex on 08/10/2016.
 */
const argv = require('minimist')(process.argv.slice(2))
const _ = require('lodash');

var config = {

};

const argsConfigs = {
    'o': {
        list: ['portrait', 'landscape'],
        def: 'portrait'
    },
    'p': {
        list: ['Legal', 'Letter', 'Tabloid', 'A3', 'A4', 'A5'],
        def: 'A4',
        check: (value)  => {
            if(typeof value !== 'string') {
                return {err: true};
            }
            var sp = _.split(value, 'x');
            if(sp.length !== 2) {
                return {err: true};
            }
            return null;
        },
        format: (value) => {
            var sp = _.split(value, 'x');
            if(sp[1]) {
                return {
                    width: sp[0],
                    height: sp[1]
                }
            } else {
                return value;
            }
        }
    },
    'f': {
        def: "out"
    },
    'k': {
        list: ['true', 'false'],
        def: false,
        format: (value) => {
            if(value === 'true') {
                return true;
            } else {
                return false;
            }
        }
    },
    'j': {

    },
    's': {

    }
};

function run() {
    console.log(argv);
    config.url = argv._[0];

    config.orientation = getParam('o');
    config.pageSize = getParam('p');
    config.filename = getParam('f');
    config.printBackground = getParam('k');
    config.js = getParam('j');
    config.css = getParam('s');
    console.log(config);

}

function getParam(cat) {
    var value = _.get(argv, cat, null);
    if(value) {
        var check = checkArg(cat, value);
        if(check) {
            throw check;
        } else {
            return formatArg(cat, value);
        }
    } else {
        return argsConfigs[cat].def || null;
    }
}

function checkArg(cat, value) {
    var paramConfig = argsConfigs[cat];
    if(paramConfig.list && paramConfig.list.indexOf(value) !== -1) {
        return null;
    }
    if(paramConfig.check) {
        return paramConfig.check(value);
    } else {
        return null;
    }
}

function formatArg(cat, value) {
    var paramConfig = argsConfigs[cat];
    if(paramConfig.format) {
        return paramConfig.format(value);
    } else {
        return value;
    }
}

module.exports = {
    run: run,
    args: config
};