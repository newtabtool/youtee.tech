//carrega 50 resultados da categoria selecionada
const conteiner = document.getElementById('conteiner');
document.querySelectorAll(".category")
.forEach(button => addEventListener("click", getByCategory))

async function getByCategory(e){
    const category = e.target.value // texto que será enviado no corpo da requisição

    fetch(`/sort-by-category/${category}`)
  .then(response => response.json()) // transforma a resposta em objeto JSON
  .then(data => {
    conteiner.innerHTML = buildTrailCards(data.arrayTrails);
  })
  .catch(error => console.error(error));

function buildTrailCards(trails) {
  return trails.map(trail => `
    <div class="card-trail">
      <div class="card-header">
        <h1>${trail.name}</h1>
        <span>
          <i>${trail.videos.length} Vídeos</i>
          <i class="bi bi-star svg-yellow"></i>
          ${Math.round(trail.stars / trail.votes) || 0}
          <i>- ${trail.votes || 0} classificações</i>
        </span>
      </div>
      <p>${trail.description}</p>
      <a href='/public-trails/${trail._id}'>Ver esta trilha</a>
    </div>
  `).join('');
}

    
}