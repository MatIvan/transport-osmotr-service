const path = require('path');

module.exports = {
    mode: 'development',
    //mode: 'production',
    entry: {
        'startpage': './html/startpage/startpage.js',
        'edit-ts-page': './html/edit-ts-page/edit-ts-page.js',
        'place-page': './html/place-page/place-page.js',
        'staff-page': './html/staff-page/staff-page.js',
    },
    output: {
        path: path.resolve(__dirname, 'html', 'renderers'),
        filename: '[name]-renderer.js'
    }
}