
let globalVideoData;
function getYouTubeVideoId(url) {
    // Define uma expressão regular para capturar o ID do vídeo
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    // Aplica a expressão regular na URL e obtém um array de resultados
    var match = url.match(regExp);
    // Retorna o sétimo elemento do array, que é o ID do vídeo, ou falso se não houver correspondência
    return (match && match[7].length == 11) ? match[7] : false;
}

async function loadWorkflow(event) {
    const idUnit = event.currentTarget.dataset.id;
    console.log(idUnit)
    const actives = document.querySelectorAll('.active')
    if(actives.length > 0) {
    actives.forEach((element) => {
        element.classList.remove('active');
        this.classList.add('active');

    });
    }
    let id = await Number(event.currentTarget.id);
    globalVideoId = idUnit;
    try {
        console.log(globalVideoId)
        const videosData = await fetch(`/video/${idUnit}`).then((res) => {
            return res.json();
        })
        globalVideoData = videosData.videoData[id]
        let relatedVideos = videosData.videoData[id].related
        let note = videosData.videoData[id].notes
        let url = videosData.videoData[id].url
        let href = getYouTubeVideoId(url)
        //NoteAppend(note)
        getRelatedVideos(relatedVideos)
        player.setAttribute('src', `https://www.youtube.com/embed/${href}`)
        let col3 = document.getElementById('col3')

        if (col3 && globalVideoData) {
            col3.remove();
        }


    } catch (err) {

    }
}


