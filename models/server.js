const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server );

        // Middlewares
        this.middlewares();

        // Sockets
        this.sockets();

    }

    
    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    sockets() {
        
        this.io.on('connection', socket => {
            console.log('Cliente Conectado: ', socket.id );

            socket.on('disconnect', () => {
                console.log('Cliente Desconectado: ', socket.id );
            });

            // Cliente conectado - escuchar mensaje 
            socket.on('enviar-mensaje', ( payload, callback ) => {
                // console.log( payload );

                const id = 123456;
                callback( id );

                // Mandar un msj a todos los clientes conectados - servidor envia el msj
                this.io.emit('enviar-mensaje', 'desde el server ' + payload );
            });
        });
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;