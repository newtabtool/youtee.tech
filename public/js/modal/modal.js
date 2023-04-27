const modal = document.querySelector('dialog')
const buttonShowModal = document.querySelector('#visibility')
const closeModalButton = document.querySelector('#modal-cancel-button')
const saveModalButton = document.querySelector('#modal-save-button')
const modalTrailName = document.querySelector('#trail-name')
const modalTrailDescription = document.querySelector('#trail-description')
const modalTrailtags = document.querySelector('#trail-tags')
const modalTrailCategory = document.querySelector('#trail-category')
const inputTags = document.querySelector('#trail-tags');
const tagConteiner = document.querySelector('#tag-content')
const videosOpt = document.querySelector('videos')
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const descSize = document.querySelector('#count-desc-size') 
const modalContent = document.querySelector('#modal-content')
const sponsoredElement = document.querySelector('#sponsored')



let tags = [];
let videos = [];
if(buttonShowModal){
buttonShowModal.onclick = function() {
    modal.showModal()
}
}

closeModalButton.onclick = function() {
    modal.close()
}
modalTrailDescription.oninput = function(){
    descSize.textContent = modalTrailDescription.value.length + "/5000"
}
modalTrailDescription.onkeydown = function(event){
    if(modalTrailDescription.value.length >= 5000){
        if(event.key != 'Delete' && event.key != 'Backspace'){
        event.preventDefault()
        }
    }
}
saveModalButton.onclick = function () {
     if (modalTrailName.value === "") {
        modalTrailName.style.border = "1px solid red"
        return
    }
    if (modalTrailDescription.value === "") {
        modalTrailDescription.style.border = "1px solid red"
        return
    }
    if (modalTrailCategory.value === "") {
        modalTrailCategory.style.border = "1px solid red"
        return
    }
    if (tags.length < 1) {
        inputTags.style.border = "1px solid red"
        return
    }

    savePublicTrail()


}
modalTrailName.oninput = function () {

}

inputTags.addEventListener('keydown', (event) => {
    // Verifica se a tecla pressionada foi a vírgula
    if (tags.length <= 9) {
        if (event.keyCode === 188 || event.key === ',' && modalTrailtags.value.length > 2) {
            event.preventDefault();
            // Executa a função quando o usuário digita a vírgula
            const tag = modalTrailtags.value
            tagConteiner.innerHTML += `<i>${tag}</i>`
            modalTrailtags.value = ""
            tags.push(tag)

        }
    } else {
        event.preventDefault()
    }
});


async function savePublicTrail() {
    const name = modalTrailName.value
    const description = modalTrailDescription.value
    const category = modalTrailCategory.value
    const sponsored = sponsoredElement.value
    const checkedValues = [];
    let currentUrl = window.location.href;
    let partes_url = currentUrl.split('/');
    let id = partes_url[partes_url.length - 1];
    saveModalButton.remove()
    modalContent.innerHTML = `<div id="center-loading"><svg viewBox="25 25 50 50">
    <circle r="20" cy="50" cx="50"></circle>
  </svg></div>`
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            videos.push(checkbox.value);
        }
    });

    fetch('/create-public-trail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, category, videos, tags, sponsored, id })
      }).then((response) => response.json()).then((data) => {
        if(data.status === true){
        document.querySelector("#center-loading").innerHTML = `<a class="modal-button" id="modal-btn-access" target="_blank" href="/public-trails/${data.id}">Acessar trilha</a>`
            return
        }
        if(data.status === false){
            document.querySelector("#center-loading").innerHTML = `<b style="color:#f00">Houve um erro, tente novamente mais tarde</b>`
            return
        }
    })
      
}