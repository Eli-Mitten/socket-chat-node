var socket = io();

var urlParams = new URLSearchParams(window.location.search);

//Si no hay nombre en url redirige al index
if (!urlParams.has('nombre')) {
    window.location = 'index.html'
    throw new Error('El nombre es necesario')
}

var usuraio = {
    nombre: urlParams.get('nombre')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    // emite el usuario cogido por params y espera un calback del servidor
    socket.emit('entrarChat', usuraio, function(resp) {
        console.log('Usuarios conectados', resp)
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('abandonaChat', function(mensaje) {

    console.log('Servidor: abandona Chat', mensaje);

});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del char


socket.on('listaPersonasConectadas', function(personasConectadas) {

    console.log('Servidor: Lista de usuarios:', personasConectadas);

});