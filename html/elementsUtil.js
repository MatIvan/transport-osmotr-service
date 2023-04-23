//@ts-check
'use strict';

const STYLE_BAD = "bad";
const STYLE_WARN = "warn";

module.exports = {
    getDiv: getDiv,
    getInput: getInput,
    getSelector: getSelector,
    getDate: getDate,

    /**
     * @param {HTMLSelectElement} element 
     * @param {{id: number, name: string}[]} data 
     */
    fillList: (element, data) => {
        let rows = `<option value=-1>-</option>`;
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            rows += `<option value=${item.id}>${item.name}</option>`
        }
        element.innerHTML = rows;
    },

    /**
     * @param {HTMLInputElement} element 
     */
    bindUpperValue: (element) => {
        element.addEventListener('keyup', () => {
            element.value = element.value.toUpperCase();
        });
        element.addEventListener('change', () => {
            element.value = element.value.toUpperCase();
        });
    },

    /**
     * @param {HTMLElement} elem 
     * @param {boolean} isBad 
     */
    markAsBad: (elem, isBad) => {
        if (isBad) {
            if (!elem.classList.contains(STYLE_BAD)) {
                elem.classList.add(STYLE_BAD);
            }
        } else {
            elem.classList.remove(STYLE_BAD);
        }
    },

    /**
 * @param {HTMLElement} elem 
 * @param {boolean} isWarn
 */
    markAsWarn: (elem, isWarn) => {
        if (isWarn) {
            if (!elem.classList.contains(STYLE_WARN)) {
                elem.classList.add(STYLE_WARN);
            }
        } else {
            elem.classList.remove(STYLE_WARN);
        }
    },

    /**
     * @param {string} className
     * @returns {HTMLElement}
     */
    createDiv: (className) => {
        const elem = document.createElement('div');
        elem.className = className;
        return elem;
    },

    setChangeHandler: (element, handler) => {
        element.onchange = handler;
        element.onkeyup = handler;
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
