let texts = [
    "Cansado de estudar aleatoriamente?",
    "Crie trilhas de estudos com seus videos favoritos",
    "Disponibilize-as pra comunidade ou mantenha privada"

];
let n = 0;
console.log(texts)

function changeUp(){
    if(n < 3){
        document.getElementById('change-text').textContent = texts[n]
        n = n + 1;
    }else{
        document.getElementById('change-text').textContent = texts[0]
        n = 0

    }
}
function changeDown(){
    if(n >= 0){
        document.getElementById('change-text').textContent = texts[n]
        n = n - 1;
        
    }else{
        document.getElementById('change-text').textContent = texts[2]
        n = 2

    }
}

setInterval(changeUp, 2500)
setInterval(()=>{
    let width = window.innerWidth;
    console.log(width)
}
    ,1000)