//@ts-check
'use strict';

module.exports = {
    show: show,
    hide: () => {
        visible(false);
    }
}

/**
 * @param {string} message
 * @param {() => void} okCallback
 */
function show(message, okCallback) {
    visible(true);
    let msgElem = document.getElementById('confirm-window-message');
    if (msgElem) {
        msgElem.innerHTML = message;
    }

    let btnOk = document.getElementById('btnConfirmOk');
    if (btnOk) {
        btnOk.onclick = () => {
            visible(false);
            okCallback();
        };
    }
}

function get() {
    let win = document.getElementById('confirm-lay');
    if (!win) {
        win = create();
        let body = document.getElementsByTagName('body')[0];
        body.appendChild(win);

        let btnClose = document.getElementById('btnConfirmClose');
        if (btnClose) {
            btnClose.onclick = () => {
                visible(false);
            };
        }
    }
    return win;
}

function create() {
    let modal = document.createElement('div');
    modal.id = 'confirm-lay';
    modal.className = 'modality-lay hide';
    modal.innerHTML = HTML;
    return modal;
}

/**
 * @param {boolean} isVisible
 */
function visible(isVisible) {
    if (isVisible) {
        get().classList.remove("hide")
    } else {
        get().classList.add("hide");

        let btnOk = document.getElementById('btnConfirmOk');
        if (btnOk) {
            btnOk.onclick = () => { };
        }
    }
}

const HTML = `
    <div class='modality-window confirm-window'>
        <div class='ver-panel main-box'>
            <div id='confirm-window-message' class='confirm-window-message'>
                Сообщение
            </div>
            <div class='ui-panel'>
                <div id="btnConfirmClose" class="button"> Отмена </div>
                <div id="btnConfirmOk" class="button"> Ок </div>
            </div>
        </div>
    </div>
`;
