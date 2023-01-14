const path = require('path');

module.exports = {
    mode: 'development',
    //mode: 'production',
    entry: {
        startpage: './html/startpage/startpage.js',
        //ts: './html/ts-all/ts-all.js',
      },
    output: {
        path: path.resolve(__dirname, 'html', 'renderers'),
        filename: '[name]-renderer.js'
    }
}