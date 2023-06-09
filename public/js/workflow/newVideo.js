const input = document.getElementById('url')
const button = document.getElementById('btn-new-video')
const form = document.getElementById('new-video')
const idElement = document.getElementById('trail-id')
const links = document.getElementsByClassName('link')
const sidebar = document.getElementById('sidebar')
const player = document.getElementById('player')
let relatedVideos = []
let globalVideoId = null

const socket = io();
let last = 0;

const meuCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('jwt_token=')).split('=')[1];

socket.on('connect', function getNewNotifications() {
    socket.emit('get-notifications', { token: meuCookie })
})

function validateYouTubeUrl(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        return true;
    } else {
        return false;
    }
}

function addNewVideoFromRelateds(e){
    let url_atual = window.location.href;

    // Divide a URL em um array de strings
    let partes_url = url_atual.split('/');

    // Obtem o último elemento do array, que deve ser o ID
    let id = partes_url[partes_url.length - 1];


    if (validateYouTubeUrl(e.target.id)) {
        socket.emit('new-video', { url: e.target.id, trailId: id, cookie: meuCookie })
        input.value = ''
    } else {
        alert('Url inválida')
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Obtem a URL atual
    let url_atual = window.location.href;

    // Divide a URL em um array de strings
    let partes_url = url_atual.split('/');

    // Obtem o último elemento do array, que deve ser o ID
    let id = partes_url[partes_url.length - 1];


    if (validateYouTubeUrl(input.value)) {
        socket.emit('new-video', { url: input.value, trailId: id, cookie: meuCookie })
        input.value = ''
    } else {
        alert('Url inválida')
    }
})


//recebendo novas notificações do servidor ----------





socket.on('new-video-added', (data) => {
    const list = document.querySelector('ul#videos-list');
    let arrayVideos = document.querySelectorAll(".link");
    let videosQuant = arrayVideos.length;
    let thisId = videosQuant + 1;
    list.insertAdjacentHTML('beforeend', `
    <button onclick="loadWorkflow(event)" " id=${thisId} title="${data.title}" class="link added" data-id="${data._id}" >
    <li class="line">${data.title}</li>
  </button>
    `);

    list.lastElementChild.scrollIntoView()

});

