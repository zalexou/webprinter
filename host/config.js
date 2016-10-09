/**
 * Created by alex on 08/10/2016.
 */
const argv = require('minimist')(process.argv.slice(2))
const _ = require('lodash');

var config = {

};

const possibleValues = {
    'o': {
        list: ['portrait', 'landscape'],
        def: 'portrait',
        check: () => {
            return {err: true};
        }
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
    }
};

function run() {
    config.url = argv._[0];

    config.orientation = getParam('o');
    config.pageSize = getParam('p');
    console.log(config);
    //config.orientation = argv['o'] || argv['orientation'] || 'portrait';
    //confiog.pageSize = argv['p'] || argv['page'] || argv['pageSize'] || 'A4';

};

function getParam(cat) {
    var value = _.get(argv, cat, null);
    if(value) {
        var check = checkArg(cat, value);
        if(check) {
            console.error('PROUT')
            throw check;
        } else {
            return formatArg(cat, value);
        }
    } else {
        return possibleValues[cat].def;
    }
}

function checkArg(cat, value) {
    var paramConfig = possibleValues[cat];
    if(paramConfig.list.indexOf(value) !== -1) {
        return null;
    }
    return paramConfig.check(value);
}

function formatArg(cat, value) {
    var paramConfig = possibleValues[cat];
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