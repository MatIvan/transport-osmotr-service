//@ts-check
'use strict';

module.exports = {
    getDiv: getDiv,
    getInput: getInput,
    fillList: (element, data) => {
        let rows = `<option value=-1>-</option>`;
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            rows += `<option value=${item.id}>${item.name}</option>`
        }
        element.innerHTML = rows;
    },
}

/**
 * @param {string} id
 * @returns {HTMLElement}
 */
function getDiv(id) {
    const elem = document.getElementById(id);
    if (!elem) {
        throw 'Empty object';
    }
    // @ts-ignore
    return elem;
}

/**
 * @param {string} id
 * @returns {HTMLInputElement}
 */
function getInput(id) {
    // @ts-ignore
    return getDiv(id);
}
