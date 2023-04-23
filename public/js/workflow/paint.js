const state = {
    brushColor: 'black',
    originalImage: null,
  };
  
function loadPaint(){
    try {
        let col3 = document.getElementById('col3')
        if(col3){
            col3.remove();
        }

        if (globalVideoData) {
        

        col3 = document.createElement('div')
        col3.id = 'col3'
        col3.classList.add('painter')
        col3.innerHTML = `<canvas id="canvas" width="500" height="600" style="background-color:#fff;"></canvas><div id="canva-options">
        <button id="blackBtn">Preto</button>
        <button id="blueBtn">Azul</button>
        <button id="greenBtn">Verde</button>
        <button id="redBtn">Vermelho</button>
        <button id="clearBtn">Apagar tudo</button>
        </div>
        `
        document.body.appendChild(col3)
        const width = document.getElementById('col3').offsetWidth
        const height = document.getElementById('col3').offsetHeight - 70
        document.getElementById('canvas').width = width
        document.getElementById('canvas').height = height
    }
        loadPainter()


    } catch (err) {

    }
}