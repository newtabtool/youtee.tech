

function deleteTrail(id){
    fetch(`/delete-trail/${id}`).then((response)=>{
        document.getElementById(id).remove()
    }).catch((error)=>{
        
    })
  }
  /* function renameTrail(id){
    console.log("Rename trail", id);
  } */