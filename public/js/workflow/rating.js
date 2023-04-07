const buttonRating = document.querySelector("#rating")
const sidebarSize = document.querySelector("#sidebar").offsetWidth
const ratingConteiner = document.querySelector("#rating-conteiner")
if(buttonRating){
    buttonRating.onclick = toggleRating
}
function toggleRating(){
    if(ratingConteiner.classList.contains("hidden")){
        ratingConteiner.classList.remove("hidden")
    }else{
        ratingConteiner.classList.add("hidden")
    }
}
const ratingContainer = document.getElementById('rating-conteiner');
const svgRating = document.getElementById('svg-rating');
const emojis = [
  '',
  '<i class="bi bi-emoji-angry"></i><b>Dá até nervoso</b>',
  '<i class="bi bi-emoji-frown"></i><b>Ruim</b>',
  '<i class="bi bi-emoji-expressionless"></i><b>Mais ou menos</b>',
  '<i class="bi bi-emoji-smile"></i><b>Boa</b>',
  '<i class="bi bi-emoji-heart-eyes"></i><b>Amei</b>',
];

for (let i = 1; i <= 5; i++) {
  if(ratingContainer){
  const star = ratingContainer.querySelector(`[title="${i}"]`);

  star.addEventListener('mouseover', () => {
    svgRating.innerHTML = emojis[i];
  });
  star.addEventListener('mouseout', () => {
    svgRating.innerHTML = '';
  });}
}

document.querySelectorAll(".rating-start").forEach(rating => {
    rating.onclick = ratingFunction
})

async function ratingFunction(e) {
  const stars = e.target.dataset.value;
  try {
    const response = await fetch(`/rating/${trailId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ stars })
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.rating);
    } else {
      console.error('Erro ao enviar avaliação:', response.status);
    }
  } catch (error) {
    // Ocorreu um erro de rede ou de outra natureza
    console.error('Erro ao enviar avaliação:', error);
  }
}

  