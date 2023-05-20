function showModalNotification(id, title, text, link){
  if(!link){
    link = "https://youtee.tech/news"
  }
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });
  
  swalWithBootstrapButtons.fire({
    title: title,
    text: text,
    icon: false,
    showCancelButton: true,
    confirmButtonText: 'Visitar link',
    cancelButtonText: 'Fechar',
    reverseButtons: true
  }).then( async (result) => {
    if (result.isConfirmed) {

      await fetch(`/read-notification/${id}`).then(
          response => response.json()).then(
            data => {
          if(data.message === "ok"){
            document.getElementById(id).classList.remove("unread");
            document.getElementById(id).classList.add("read");
          }
        }).catch(err => console.log(err));
        swalWithBootstrapButtons.close(); // Fecha a caixa de diálogo
      window.open(link, '_blank'); // Abre uma nova guia com o link

    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await fetch(`/read-notification/${id}`).then(
        response => response.json()).then(
          data => {
        if(data.message === "ok"){
          document.getElementById(id).classList.remove("unread");
          document.getElementById(id).classList.add("read");
        }
      }).catch(err => console.log(err));
      swalWithBootstrapButtons.close(); // Fecha a caixa de diálogo
    }
  });
}
  
  