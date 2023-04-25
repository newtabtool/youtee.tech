const load = document.getElementById("load");
      const nameInput = document.getElementById("name");
      const contentConteiner = document.getElementById("new");
      const btnCreate = document.getElementById("btn-create");
      const formCreate = document.getElementById("form-create");
      const test = document.getElementById("test");
      const conteiner = document.getElementById("new");
      const form = document.getElementById("consultation-form");

    
      
      function loadPrivatesTrails(event) {
        fetch("/trails")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            /* let cards = document.querySelectorAll('.card')
                    cards.forEach(card => {
                        card.remove()
                    }) */
            

                    const trails = data.trails;
                    if(trails.length === 0){
                      console.log(trails)
                      showNewTrail("none")
                    }
            // Use os dados das trilhas aqui
            //console.log(trails)
            load.remove();
            contentConteiner.classList.remove("hidden");
            //document.getElementById('card-new').classList.remove('hidden')
            const newTrailDiv = document.getElementById("new");
            trails.forEach((trail) => {
              //console.log(trail.name)

              newTrailDiv.innerHTML += `
              <div class="card" id="${trail._id}">
        <h3>${trail.name}</h3>
        <i>
          
        </i>
        <div>
            <a href="/trail/${trail._id}" title="${trail.description}">Acessar</a>
             <span>
                <button id="delete-trail" onclick="deleteTrail('${trail._id}')"><i class="bx bx-trash"></i></button>
            </span>
        </div>
      </div>
      `;

              // Anexe o elemento criado ao elemento pai
            });
            //conteiner.appendChild(newTrailDiv);
          });
      }

      

      btnCreate.onclick = (e) => showNewTrail(e)

      function showNewTrail(e){
        if(sidebar_state === true){
          sidebar.style.display = "none";
    toggle_conteiner.style.position = "relative";
    sidebar_state = !sidebar_state;
        }
        conteiner.innerHTML = `<section class="section_form container" id="form-create">
                <form
                  id="consultation-form"
                  class="feed-form"
                  method="post"
                  action="/trails/create"
                >
                  <input
                    required
                    placeholder="Nome da trilha"
                    name="name"
                    id="name"
                    type="text"
                  />
          
                  <button class="button_submit">Criar</button>
                </form>
              </section>
      `;
      conteiner.style.display = 'block';
      };
      if(formCreate){
      formCreate.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = nameInput.value;
        const response = await fetch("/trails/testname", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        });
        const data = await response.json();
        if (data.valid === true) {
          // Name is valid
          form.submit();
        } else {
          // Name is not valid
          nameInput.style.borderColor = "red";
          nameInput.style.borderWidth = "1px";
          nameInput.style.borderStyle = "solid";
          alert("Este nome já está em uso");
          nameInput.addEventListener("input", () => {
            nameInput.style.borderColor = "none";
            nameInput.style.borderWidth = "0";
            nameInput.style.borderStyle = "none";
          });
        }
      });}