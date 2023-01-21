//@ts-check
'use strict';

const path = require('path');

function getAbdolutePath(name) {
    console.log(global.appRoot, 'html', name, name + '.html');
    return path.join(global.appRoot, 'html', name, name + '.html');
}

module.exports = {
    startPage: getAbdolutePath('startpage'),
    editTs: getAbdolutePath('edit-ts-page'),
}
