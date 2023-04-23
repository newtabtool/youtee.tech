function loadPainter() {
    if (canvas) {
      const ctx = canvas.getContext('2d');
  
      let isDrawing = false;
  
      canvas.addEventListener('mousedown', function(event) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
      });
  
      canvas.addEventListener('mousemove', function(event) {
        if (isDrawing) {
          ctx.strokeStyle = state.brushColor;
          ctx.lineTo(event.offsetX, event.offsetY);
          ctx.stroke();
        }
      });
  
      canvas.addEventListener('mouseup', function(event) {
        isDrawing = false;
      });
  
      // Adiciona evento para o botão "Apagar tudo"
      const clearBtn = document.getElementById('clearBtn');
      clearBtn.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (state.originalImage) {
          ctx.drawImage(state.originalImage, 0, 0);
        }
      });
  
      // Adiciona eventos para os botões de cor do pincel
      const blackBtn = document.getElementById('blackBtn');
      blackBtn.addEventListener('click', function() {
        state.brushColor = 'black';
      });
  
      const blueBtn = document.getElementById('blueBtn');
      blueBtn.addEventListener('click', function() {
        state.brushColor = 'blue';
      });
  
      const greenBtn = document.getElementById('greenBtn');
      greenBtn.addEventListener('click', function() {
        state.brushColor = '#0f9';
      });
  
      const redBtn = document.getElementById('redBtn');
      redBtn.addEventListener('click', function() {
        state.brushColor = 'red';
      });
    }
  }
  