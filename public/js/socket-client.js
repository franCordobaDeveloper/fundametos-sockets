// Referencias HTML
const lblOnline  = document.getElementById('lblOnline');
const lblOffline = document.getElementById('lblOffline');
const txtMensaje = document.getElementById('txtMensaje');
const btnEnviar  = document.getElementById('btnEnviar');


// Socket del cliente 
const socket = io();


// listener - escuchar cambios o eventos

socket.on('connect', () => {
    console.log('Conectado');

    lblOffline.style.display = 'none';
    lblOnline.style.display  = '';
});



socket.on('disconnect', () => {
    console.log('Desconectado');

    lblOnline.style.display  = 'none';
    lblOffline.style.display = '';
});

// El front escucha el msj
socket.on('enviar-mensaje', ( payload ) => {
    console.log( payload );
})

btnEnviar.addEventListener('click', () => {

    const mensaje = txtMensaje.value;
    // Enviar mensaje al servidor
    const payload = {
        mensaje,
        id: '123',
        fecha: new Date().getTime()
    }
    socket.emit('enviar-mensaje', payload, ( id ) => {
        console.log('Desde el server: ', id );
    });

    console.log( payload );
})

