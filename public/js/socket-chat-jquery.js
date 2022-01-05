var params = new URLSearchParams(window.location.search);

let nombre = params.get('nombre');
let sala = params.get('sala');

// referencias de jQuery
let divUsuarios = $('#divUsuarios');
let formEnviar = $('#formEnviar');
let txtMensaje = $('#txtMensaje');
let divChatbox = $('#divChatbox');


// Funciones para renderizar usuarios
function renderizarUsuarios(personas) {

    console.log(personas);

    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (let i = 0; i < personas.length; i++) {

        html += '<li>'
        html += '<a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + ' <small class="text-success">online</small></span></a>'
        html += '</li>'

    }

    divUsuarios.html(html);


}

function renderizarMensajes( mensaje, yo ) {

    let fecha = new Date(mensaje.fecha);
    let hora = fecha.getHours() + ':' + fecha.getMinutes();

    let adminClass = 'info';
    let styleDisplayAdmin = '';
    if(mensaje.nombre === 'Administrador'){
        adminClass = 'danger';
        styleDisplayAdmin = 'display: none;'
    }

    let html = `
            <li class="animated fadeIn">
                <div style="${styleDisplayAdmin}" class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
                <div class="chat-content">
                    <h5>${mensaje.nombre}</h5>
                    <div class="box bg-light-${adminClass}">${mensaje.mensaje}</div>
                </div>
                <div class="chat-time">${hora}</div>
            </li>
            `;

    let htmlYo = `
        <li class="reverse">
            <div class="chat-content">
                <h5>${mensaje.nombre}</h5>
                <div class="box bg-light-inverse">${mensaje.mensaje}</div>
            </div>
            <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
            <div class="chat-time">${hora}</div>
        </li>
    `;

    divChatbox.append((yo ? htmlYo : html));

}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// Listeners
divUsuarios.on('click', 'a', () => {

    let id = $(this).data('id');

    if (id) {

    }

});

formEnviar.on('submit', (e) => {

    e.preventDefault();
    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function (mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });

});
