//@ts-check
'use strict';

const STYLE_BAD = "bad";

module.exports = {
    getDiv: getDiv,
    getInput: getInput,
    getSelector: getSelector,
    getDate: getDate,

    fillList: (element, data) => {
        let rows = `<option value=-1>-</option>`;
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            rows += `<option value=${item.id}>${item.name}</option>`
        }
        element.innerHTML = rows;
    },

    bindUpperValue: (/** @type { HTMLInputElement } */ element) => {
        element.addEventListener('keyup', () => {
            element.value = element.value.toUpperCase();
        });
        element.addEventListener('change', () => {
            element.value = element.value.toUpperCase();
        });
    },

    markAsBad: (/** @type { HTMLElement } */ elem, /** @type {boolean} */ isBad) => {
        if (isBad) {
            if (!elem.classList.contains(STYLE_BAD)) {
                elem.classList.add(STYLE_BAD);
            }
        } else {
            elem.classList.remove(STYLE_BAD);
        }
    }
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

/**
 * @param {string} id
 * @returns {HTMLSelectElement}
 */
function getSelector(id) {
    // @ts-ignore
    return getDiv(id);
}

/**
 * @param {string} id
 * @returns {HTMLDataElement}
 */
function getDate(id) {
    // @ts-ignore
    return getDiv(id);
}
