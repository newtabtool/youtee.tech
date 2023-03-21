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

function validateYouTubeUrl(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        return true;
    } else {
        return false;
    }
}


  



form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = idElement.value;
    if (validateYouTubeUrl(input.value)) {
        socket.emit('new-video', {url: input.value, trailId: id, cookie: meuCookie})
        input.value = ''
    } else {
        alert('Url inválida')
    }
})

socket.on('new-video-added', (data) => {
    console.log(data.title, data.id, data.url )
    const list = document.querySelector('ul#videos-list');
    let arrayVideos = document.querySelectorAll(".link");
    let videosQuant = arrayVideos.length;
    let thisId = videosQuant + 1;
    list.insertAdjacentHTML('beforeend', `
    <button onclick="loadWorkflow(event)" " id=${thisId} class="link" data-id="${data._id}" >
    <li class="line">${data.title}</li>
  </button>
    `);
});

