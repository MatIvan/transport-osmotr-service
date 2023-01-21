const path = require('path');

module.exports = {
    mode: 'development',
    //mode: 'production',
    entry: {
        'startpage': './html/startpage/startpage.js',
        'edit-ts-page': './html/edit-ts-page/edit-ts-page.js',
      },
    output: {
        path: path.resolve(__dirname, 'html', 'renderers'),
        filename: '[name]-renderer.js'
    }
}