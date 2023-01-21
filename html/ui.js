//@ ts-check
'use strict'

module.exports = {

    div: function (className) {
        let div = document.createElement('div');
        div.className = className;
        return div;
    },

    fillList: function (listId, data) {
        let rows = `<option value=-1>-</option>`;
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            rows += `<option value=${item.id}>${item.name}</option>`
        }
        document.getElementById(listId).innerHTML = rows;
    }

}
