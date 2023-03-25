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

socket.on('connect', function getNewNotifications(){
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
socket.on('news', async (data)=>{

    const news = data.news
    news.forEach(n => {
        let status = n.read ? "read" : "unread";
        let title = n.title;
        let body = n.body;
        let link = n.link;
        let id = n._id;

        document.getElementById("notifications-conteiner").innerHTML = `
        <span id="notifications">
            <a href="#" onclick="openNotificationsOnClick('${title}','${body}', '${link}', '${id}','${status}')" class="${status}" title="Clique para abrir" id="${id}">
                ${n.title}
            </a>
        </span>`

        const newOne = document.getElementById('notify')
        if(n.read === false && !newOne.classList.contains('new-one')){
                newOne.classList.add('new-one')
        }

    })
})




socket.on('new-video-added', (data) => {
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

