const config = document.getElementById("settings-btn");
const notifications = document.getElementById("notifications-btn");
const notifications_conteiner = document.getElementById("notifications");
const config_conteiner = document.getElementById("settings");
const menu = document.getElementById("menu");
let current = 0;
const cardConteiner = document.getElementById("c1")
const mainConteiner = document.getElementById("new");

config.onclick = () => toggleSidebar(1);
notifications.onclick = () => toggleSidebar(2);



async function toggleSidebar(n) {
  if (current === n) {
    mainConteiner.classList.remove("hidden");
    notifications_conteiner.classList.add("hidden");
    config_conteiner.classList.add("hidden");
    menu.classList.remove("hidden");
    document.getElementById("new").classList.remove("hidden");
    if(document.getElementById("notification-box")){
    document.getElementById("notification-box").remove()
    }
    current = 0;
  } else if (n === 1) {
    notifications_conteiner.classList.add("hidden");
    config_conteiner.classList.remove("hidden");
    menu.classList.add("hidden");
    current = 1;
  } else if (n === 2) {
    notifications_conteiner.classList.remove("hidden");
    config_conteiner.classList.add("hidden");
    menu.classList.add("hidden");
    current = 2;
  }
}


async function loadNotification(id, title, body, link) {
/* 
    mainConteiner.classList.add("hidden");
    let linkContent
    if(link != ''){
         linkContent = `<a href="${link}" class="notifiaction-link" target="_blank">Ir</a>`;
    }else{
         linkContent = ''
    }
    let notificationBox = document.getElementById("notification-box");
    if (!notificationBox) {
      cardConteiner.innerHTML += `<div class="notification-card" id="notification-box"><h2>${title}</h2><p>${body}</p>${linkContent}</div>`
    } else {
      notificationBox.querySelector("h2").textContent = title;
      notificationBox.querySelector("p").textContent = body;
      if (link) {
        let linkEl = notificationBox.querySelector(".notifiaction-link");
        if (!linkEl) {
          notificationBox.insertAdjacentHTML('beforeend', linkContent);
        } else {
          linkEl.setAttribute("href", link);
        }
      } else {
        let linkEl = notificationBox.querySelector(".notifiaction-link");
        if (linkEl) {
          linkEl.remove();
        }
      }
    } */
}
document.getElementById("promo").onchange = changePromo
document.getElementById("news").onchange = changeNews
document.getElementById("contact").onchange = changeContact


function changePromo(){
    fetch('/change-promo',{
        method: 'POST',
        body: "change_promo"
    }).then((response) =>{
        console.log(response)
    }).catch((error) =>{
        
    })
}
function changeNews(){
    fetch('/change-news',{
        method: 'POST',
        body: "change_news"
    }).then((response) =>{
        console.log(response)
    }).catch((error) =>{
        
    })
}
function changeContact(){
    fetch('/change-contact',{
        method: 'POST',
        body: "change_contact"
    }).then((response) =>{
        console.log(response)
    }).catch((error) =>{
        
    })
}

let sidebar_state = false
const toggle_conteiner = document.getElementById("toggle-conteiner")
const toggleButtonRespons = document.getElementById("toggle-sidebar")
toggleButtonRespons.onclick = ()=>{
  const sidebar = document.getElementById("sidebar")
  if(sidebar_state === false){
    sidebar.style.display = "grid";
    toggle_conteiner.style.position = "fixed";
    sidebar_state = !sidebar_state;
  }else{
    sidebar.style.display = "none";
    toggle_conteiner.style.position = "relative";
    sidebar_state = !sidebar_state;
  }
}