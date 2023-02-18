//@ts-check
'use strict';

module.exports = {
    show: (message) => {
        visible(true);
        let msgElem = document.getElementById('alert-window-message');
        if (msgElem) {
            msgElem.innerHTML = message;
        }
    },
    hide: () => {
        visible(false);
    }
}


function get() {
    let win = document.getElementById('alert-lay');
    if (!win) {
        win = create();
        let body = document.getElementsByTagName('body')[0];
        body.appendChild(win);

        let btn = document.getElementById('btnAlertClose');
        if (btn) {
            btn.onclick = () => {
                visible(false);
            };
        }

    }
    return win;
}

function create() {
    let modal = document.createElement('div');
    modal.id = 'alert-lay';
    modal.className = 'modality-lay hide';
    modal.innerHTML = HTML;
    return modal;
}

function visible(isVisible) {
    if (isVisible) {
        get().classList.remove("hide")
    } else {
        get().classList.add("hide");
    }
}

const HTML = `
    <div class='modality-window alert-window'>
        <div class='ver-panel main-box'>
            <div id='alert-window-message' class='alert-window-message'>
                Сообщение
            </div>
            <div class='ui-panel'>
                <div id="btnAlertClose" class="button"> Закрыть </div>
            </div>
        </div>
    </div>
`;
