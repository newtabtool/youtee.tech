
let size = 12


const toolBarNoteFunctions = {
    save: function(){
        const textArea = document.getElementById('workflow')
        const objectNote = {note: textArea.value, id: globalVideoId}
        fetch('/note/save',{
            method: 'POST',
            body: JSON.stringify(objectNote),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(()=>{
            const success = document.createElement('p')
            success.innerText = 'Salvo com sucesso'
            success.classList.add('success')
            document.body.appendChild(success)
            //console.log(success)

            setTimeout(()=>{
                success.remove()
            },2000)

         } ).catch((error)=>{ 
            const errorMsg = document.createElement('p')
            errorMsg.innerText = 'Erro ao salvar, tente novamente'
            errorMsg.classList.add('error')
            document.body.appendChild(errorMsg)
            //console.log(errorMsg)

            setTimeout(()=>{
                error.remove()
            },2000)

        })
    },
    clear: function(){
        let textArea = document.getElementById('workflow')
        textArea.value = ''
    },
    fontUp: function(){
        const textArea = document.getElementById('workflow')
        if(size < 80){
        textArea.style.fontSize = size + 2 + 'px';
        size = size + 2;
        //console.log(size)
        return size
        }
    },
    fontDown: function(){
        const textArea = document.getElementById('workflow')
        if(size > 10){
        textArea.style.fontSize = size - 2 + 'px';
        size = size - 2;
        return size
        }

    },
    turnCode: function(){
        
    }

}


