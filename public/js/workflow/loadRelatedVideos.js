const relatedVideosConteiner = document.getElementById('related-videos-list');

async function getRelatedVideos(relatedVideos){
    while (relatedVideosConteiner.firstChild) {
        relatedVideosConteiner.removeChild(relatedVideosConteiner.firstChild);
    }
    relatedVideos.forEach(relatedVideo => {

        const card = document.createElement('div');
        card.classList.add('card');
      
      
        const category = document.createElement('div');
        category.classList.add('category');
        category.classList.add('line');
        category.textContent = relatedVideo.channel
        card.appendChild(category);

        const buttonAdd = document.createElement('button');
        buttonAdd.classList.add('button-add');
        buttonAdd.textContent = "+";
        buttonAdd.id = relatedVideo.url
        buttonAdd.addEventListener('click', (e) => addNewVideoFromRelateds(e))
        card.appendChild(buttonAdd);
        
        const linkToVideoRelated = document.createElement('a');
        linkToVideoRelated.classList.add('link-related');
        linkToVideoRelated.setAttribute('href', relatedVideo.url)
        linkToVideoRelated.setAttribute('target', '_blank')
        card.appendChild(linkToVideoRelated);
      
        const heading = document.createElement('div');
        heading.classList.add('heading');
        category.classList.add('line');
        heading.textContent = relatedVideo.title;
        linkToVideoRelated.appendChild(heading);
      
        relatedVideosConteiner.appendChild(card);
        
    });
}