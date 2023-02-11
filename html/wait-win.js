//@ts-check
'use strict';

module.exports = {
    show: () => {
        visible(true);
    },
    hide: () => {
        visible(false);
    }
}

function get() {
    let win = document.getElementById('wait-lay');
    if (!win) {
        win = create();
        let body = document.getElementsByTagName('body')[0];
        body.appendChild(win);
    }
    return win;
}

function create() {
    let modal = document.createElement('div');
    modal.id = 'wait-lay';
    modal.className = 'modality-lay hide';

    let win = document.createElement('div');
    win.className = 'wait-window';

    let i = document.createElement('i');
    i.className = 'gg-spinner-two';

    win.appendChild(i);
    modal.appendChild(win);
    return modal;
}

function visible(isVisible) {
    if (isVisible) {
        get().classList.remove("hide")
    } else {
        get().classList.add("hide");
    }
}
