

const premiumFunctions = {
  aiAnalysis: function () {
    premiumModal.style.display = "block";
    closeModalBtn.addEventListener("click", function () {
      premiumModal.style.display = "none";
    });

    premiumPriceBtn.addEventListener("click", function () {
      // redirecionar para a página de preços
      window.location.href = "/prices";
    });
  },
};
