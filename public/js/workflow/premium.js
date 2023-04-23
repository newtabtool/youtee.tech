const premiumBtn = document.querySelector('.premium-function');
const premiumModal = document.getElementById('premiumModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const premiumPriceBtn = document.getElementById('premiumPriceBtn');

if(premiumBtn){
premiumBtn.addEventListener('click', function() {
  premiumModal.style.display = 'block';
});
}
closeModalBtn.addEventListener('click', function() {
  premiumModal.style.display = 'none';
});

premiumPriceBtn.addEventListener('click', function() {
  // redirecionar para a página de preços
  window.location.href = '/prices';
});
