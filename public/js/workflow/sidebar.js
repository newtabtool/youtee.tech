
let sidebarTg = true
function sidebarToggle() {
  if (sidebarTg === true) {
    document.body.style.gridTemplateColumns = "0 30px minmax(610px, 50%) minmax(270px, auto)";
    sidebarTg = false;
    document.getElementById('toggleButton').style.transform = 'rotate(180deg)'
    document.getElementById('player').style.height = '350px'
  } else {
    document.body.style.gridTemplateColumns = "minmax(260px, 15%) 30px minmax(350px, 30%) minmax(270px, auto)";
    sidebarTg = true;
    document.getElementById('toggleButton').style.transform = 'rotate(0deg)'
    document.getElementById('player').style.height = '100%'


  }
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
    !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

function toggleVisibility() {
  fetch(`/trail/toggle-visibility/${trailId}`)
  .then(response => response.json())
  .then((data) => {
    let buttonVisibility
    if(data.visibility === true){
       buttonVisibility = document.createElement('button');
       buttonVisibility.title = "Tornar privado";
       buttonVisibility.id = "visibility";
       buttonVisibility.onclick = toggleVisibility
      buttonVisibility.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye"
          viewBox="0 0 16 16">
          <path
              d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
      </svg>`
    }
    else{
       buttonVisibility = document.createElement('button');
       buttonVisibility.title = "Tornar público";
       buttonVisibility.id = "visibility";
       buttonVisibility.onclick = toggleVisibility
      buttonVisibility.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash"
          viewBox="0 0 16 16">
          <path
              d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
          <path
              d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
          <path
              d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
      </svg>`
    }
    document.getElementById('bar').replaceChild(buttonVisibility, document.getElementById('visibility') )
    //document.getElementById('visibility').remove()
    console.log(data)
  })
  }