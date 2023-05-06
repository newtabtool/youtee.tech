let popup_view = false
let previous_analyze = ""
let waiting_for_response = false
const premiumFunctions = {
  aiAnalysis: function () {
    if(popup_view === false && !waiting_for_response){
    const popup = document.createElement("div")
    popup.id = "popup-ai-text"
    popup.classList.add("popup-ai-text")
    const text_ai_conteiner = document.createElement("p")
    text_ai_conteiner.id = "ai-result-conteiner"
    waiting_for_response = true
    if(previous_analyze){
        text_ai_conteiner.innerHTML = previous_analyze + `<div class="typewriter" id="loader-ai"><div class="slide"><i></i></div><div class="paper"></div><div class="keyboard"></div></div>`
    }else{
        text_ai_conteiner.innerHTML = `<div class="typewriter" id="loader-ai"><div class="slide"><i></i></div><div class="paper"></div><div class="keyboard"></div></div>`
    }
    popup.appendChild(text_ai_conteiner)
    popup_view = true
    document.body.appendChild(popup)
    const text_to_analyze = document.getElementById("workflow").value;
    const title = globalVideoData.title;
    const data = {
        text_to_analyze,
        title
      };



     /*  fetch("/ai-analysis-text", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(async (response) => {
        if (response.ok) {
            const data_returned = await response.json();
            document.getElementById("loader-ai").remove();
            
            const result = data_returned.result;
            const paragraphs = Array.isArray(result) ? result : [result];
            
            paragraphs.forEach((paragraph) => {
                text_ai_conteiner.textContent += paragraph
                text_ai_conteiner.innerHTML += "<br><br>";
                previous_analyze += paragraph;
            });
            previous_analyze += "<hr>";
            waiting_for_response = false;
        } else {
            throw new Error("Erro ao enviar texto para análise");
        }
    })
    .catch((error) => {
        console.error("Houve um erro:", error);
    });
     */


  }else if(popup_view === true){
    console.log("mostrado")
    document.getElementById("popup-ai-text").remove()
    popup_view = false
    waiting_for_response = false
  }
  },
};
