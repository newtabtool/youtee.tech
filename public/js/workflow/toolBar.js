
let size = 12
let myCodeMirror; // variável global para armazenar a instância do CodeMirror
var editor = null;


const toolBarNoteFunctions = {

    save: function () {
        let objectNote

        if(editor){
            objectNote = { note: editor.getValue(), id: globalVideoId }
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
        if(!editor){        
            let textArea = document.getElementById('workflow')
            textArea.value = ''
        }else{
            editor.setValue('')
        }

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
    turnCode: function() {
        var textarea = document.getElementById("workflow");
        var originalTextareaValue = textarea.value;
    
        if (!editor) {
            editor = ace.edit("editor");
            editor.setTheme("ace/theme/monokai");
            editor.setOptions({
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
            });
            editor.getSession().setMode("ace/mode/javascript");
    
            var languageRadiosContainer = document.createElement("div");
            languageRadiosContainer.id = "language-label";
    
            var languages = [
                { value: "javascript", label: "JavaScript" },
                { value: "html", label: "HTML" },
                { value: "css", label: "CSS" },
                { value: "python", label: "Python" }
            ];
    
            languages.forEach(function(language) {
                var label = document.createElement("label");
                var input = document.createElement("input");
                input.type = "radio";
                input.name = "language";
                input.value = language.value;
                input.onchange = function() {
                    changeMode(this.value);
                };
    
                if (language.value === "javascript") {
                    input.checked = true;
                }
    
                label.appendChild(input);
                label.appendChild(document.createTextNode(language.label));
    
                languageRadiosContainer.appendChild(label);
            });
    
            document.getElementById("notes-conteiner").appendChild(languageRadiosContainer);
    
            editor.setValue(textarea.value);
            editor.clearSelection();
            editor.container.style.display = "block";
            textarea.style.display = "none";
        } else {
            textarea.value = editor.getValue();
            textarea.style.display = "block";
            editor.container.style.display = "none";
            document.getElementById("language-label").remove();
            editor.destroy();
            editor = null;
        }
    
        function changeMode(mode) {
            var language;
            switch (mode) {
                case 'javascript':
                    language = 'ace/mode/javascript';
                    break;
                case 'html':
                    language = 'ace/mode/html';
                    break;
                case 'css':
                    language = 'ace/mode/css';
                    break;
                case 'python':
                    language = 'ace/mode/python';
                    break;
                default:
                    language = 'ace/mode/javascript';
                    break;
            }
            editor.getSession().setMode(language);
        }
    }
    ,
    turnPaint: function () {

    }

}


