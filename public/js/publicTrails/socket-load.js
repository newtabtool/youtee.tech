const socket = io()
const videoConteiner = document.querySelector('#videos-conteiner')

let videos
socket.on('connect', function getNewNotifications() {
    socket.emit('get-videos-from-public-trails', { id: trailD})
    socket.on('stream', (videoData) =>{
      videoConteiner.innerHTML += `<div class="card-video">
                <img src=${videoData.thumbnail_url
                } alt="${videoData.title}">
                <b>${videoData.title}</b>
                <hr>
                <p>${videoData.author_name
                }</p>
            </div>`
      

    })
})
