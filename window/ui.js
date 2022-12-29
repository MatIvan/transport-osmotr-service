//@ts-check
'use strict'

const UI = {

    div: function (className) {
        let div = document.createElement('div');
        div.className = className;
        return div;
    },

    echo: function (params) {
        console.log('ECHO: ', params);
    }

}
