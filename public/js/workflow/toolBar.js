
let size = 12
let myCodeMirror; // variável global para armazenar a instância do CodeMirror


const toolBarNoteFunctions = {

    save: function () {
        let objectNote

        if(myCodeMirror){
            myCodeMirror.getValue()
             objectNote = { note: myCodeMirror.getValue(), id: globalVideoId }
        }else{
            const textArea = document.getElementById('workflow')
             objectNote = { note: textArea.value, id: globalVideoId }
        }
        
        fetch('/note/save', {
            method: 'POST',
            body: JSON.stringify(objectNote),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            const success = document.createElement('p')
            success.innerText = 'Salvo com sucesso'
            success.classList.add('success')
            document.body.appendChild(success)
            //console.log(success)

            setTimeout(() => {
                success.remove()
            }, 2000)

        }).catch((error) => {
            const errorMsg = document.createElement('p')
            errorMsg.innerText = 'Erro ao salvar, tente novamente'
            errorMsg.classList.add('error')
            document.body.appendChild(errorMsg)
            //console.log(errorMsg)

            setTimeout(() => {
                error.remove()
            }, 2000)

        })
    },
    clear: function () {
        let textArea = document.getElementById('workflow')
        textArea.value = ''
    },
    fontUp: function () {
        const textArea = document.getElementById('workflow')
        if (size < 80) {
            textArea.style.fontSize = size + 2 + 'px';
            size = size + 2;
            //console.log(size)
            return size
        }
    },
    fontDown: function () {
        const textArea = document.getElementById('workflow')
        if (size > 10) {
            textArea.style.fontSize = size - 2 + 'px';
            size = size - 2;
            return size
        }

    },
    turnCode: function () {

        const textArea = document.getElementById("workflow");

        // Verifica se o CodeMirror já foi inicializado
        if (myCodeMirror) {
            myCodeMirror.toTextArea(); // Transforma em textarea novamente
            myCodeMirror = null; // Limpa a referência para permitir a reinicialização
            return;
        }

        // Inicialize o editor
        myCodeMirror = CodeMirror.fromTextArea(textArea, {
            lineNumbers: true,
            mode: "javascript",
            theme: "dracula",
            autoCloseTags: true,
            autoCloseBrackets: true,
            styleActiveLine: true,
            lint: true,
            extraKeys: {
                "Ctrl-Space": "autocomplete"
            },
            hintOptions: {
                hint: CodeMirror.hint.javascript
            }

        });

        myCodeMirror.setSize("100%", "100%");



    },
    turnPaint: function () {

    }

}


