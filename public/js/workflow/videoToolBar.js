const chatButton = document.getElementById('')
const col3 = document.getElementById('col3')

function deleteVideo(id) {
    fetch(`/video/delete/${globalVideoData._id}`).then(() => {
      location.reload();
    });
  }
  

async function getFrame() {
    await html2canvas(document.body, {timeout:10000}).then(async (canvas) => {
        await document.body.appendChild(canvas)
    });
    
    
}

async function loadTranscription() {
    try {
        let col3 = document.getElementById('col3')

        if (col3 && globalVideoData) {
            col3.remove();
        }

        col3 = document.createElement('div')
        col3.id = 'col3'
        col3.classList.add('transcription')
        col3.textContent = globalVideoData.transcription
        document.body.appendChild(col3)




    } catch (err) {

    }

}


async function loadOCR(){
    try {
        let col3 = document.getElementById('col3')

        if (col3 && globalVideoData) {
            col3.remove();
        }

        col3 = document.createElement('div')
        col3.id = 'col3'
        col3.classList.add('ocr')
        col3.innerHTML = `<div id="paste-area" contenteditable="true" class="center-text" onclick="cl()">
        <p id="info-ocr"> Coloque o vídeo em fullscreen, pressione a tecla PrtScr, depois clique aqui e pressione CRTL + V
         </p>
         <img id="pasted-image" style="display:none;" />
         <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6802591759052757"
     crossorigin="anonymous"></script>
     </div>`
        document.body.appendChild(col3)




    } catch (err) {

    }

    const area = document.getElementById('paste-area')
        area.addEventListener('paste', (e) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
            const blob = item.getAsFile();
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = document.getElementById('pasted-image');
                img.src = event.target.result;
                img.style.display = 'block';
            }
            reader.readAsDataURL(blob)
        }
    }

    document.getElementById('col3').innerHTML += `<button onclick="ocrImage()" id="button-ocr-read">Analizar e extrair texto</button>
    <div id="text-ocr-display" class="center-text">
        O texto extraido aparecerá aqui
    </div>`

})

}
function cl(){
    if(document.getElementById('info-ocr')){
    document.getElementById('info-ocr').remove()
    }
}
    function ocrImage() {
        document.getElementById('text-ocr-display').textContent = "0%"
const img = document.getElementById('pasted-image');
Tesseract.recognize(img, 'por', {
     logger: m => {
        if(m.status === 'recognizing text'){
            console.log(m.progress)
            document.getElementById('text-ocr-display').textContent =  Math.round(100*m.progress) + "%  aguarde"
        }
     } 

    }).then(({ data: { text } }) => {
        document.getElementById('text-ocr-display').textContent = text;
        document.getElementById('text-ocr-display').style.fontSize = '12px'
});
}


async function loadNote() {
    try {
        let col3 = document.getElementById('col3')

        if (col3) {
            col3.remove();
        }
        if(globalVideoData){
        col3 = document.createElement('div')
        col3.id = 'col3'
        col3.classList.add('workspace')
        col3.classList.add('notes')
        
        col3.innerHTML = `<textarea name="workflow" id="workflow" ></textarea>
        <div class="workflow-options">
    
    
            <button type="button" class="btn btn-default" onclick="toolBarNoteFunctions.save()" title="Salvar" id="save-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
            </button>
            
            <button type="button" class="btn btn-default" onclick="toolBarNoteFunctions.clear()" title="Limpar tudo" id="clear-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
            </button>
            
            <button type="button" onclick="toolBarNoteFunctions.fontDown()" class="btn btn-default" title="Diminuir fonte" id="button-down">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                </svg>
            </button>
            
            <button type="button" class="btn btn-default" onclick="toolBarNoteFunctions.fontUp()" title="Aumentar fonte" id="button-up">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
            </button>
            
            <button type="button" class="btn btn-default" onclick="toolBarNoteFunctions.turnCode()" title="Bloco de codigo">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z"/>
          </svg>
                  </button>`
                  document.body.appendChild(col3)
                  document.getElementById('workflow').value = globalVideoData.notes

        }
    } catch (err) {
    }
}





/* 
// Obter o elemento do vídeo
var video = document.getElementById("video");

// Criar um canvas para desenhar o vídeo
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

// Definir as dimensões do canvas
canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

// Desenhar o vídeo no canvas
ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

// Obter a imagem do canvas em formato base64
var dataURL = canvas.toDataURL();

// Definir a imagem como plano de fundo do vídeo
video.style.backgroundImage = "url(" + dataURL + ")";

// Chamar o html2canvas no elemento que contém o vídeo
html2canvas(document.getElementById("container"), {useCORS: true}).then(function(canvas) {
    // Fazer algo com o canvas gerado
}); */