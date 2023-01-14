const path = require('path');

module.exports = {
    mode: 'development',
    //mode: 'production',
    entry: {
        main: './html/main/main.js',
        //ts: './html/ts-all/ts-all.js',
      },
    output: {
        path: path.resolve(__dirname, 'html', 'renderers'),
        filename: '[name]-renderer.js'
    }
}