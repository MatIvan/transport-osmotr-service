'use strict';
const information = document.getElementById('info');
information.innerHTML = `
    <ul>
        <li>Chrome (v${versions.chrome()})</li>
        <li>Node.js (v${versions.node()})</li>
        <li>Electron (v${versions.electron()})</li>
    </ul> 
    `;

window.handlers.onReady((event, data) => {
    console.log('onReady: ', data);
    //event.sender.send('event-name', data) //respose

    //TODO: load table from DB
    //TODO: render table
})

window.handlers.onError((event, err) => {
    console.log('onError: ', err);
})


window.service.ready();

UI.echo("test");

console.log('Renderer is loaded.');
