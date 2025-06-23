document.addEventListener("DOMContentLoaded", function () {
  const modelSelect = document.getElementById("modelSelect");
  const repairSelect = document.getElementById("repairSelect");
  const priceEl = document.getElementById("price");
  const descriptionEl = document.getElementById("description");
  const imageEl = document.getElementById("deviceImage");

  let data = {};

  fetch("cennik_files/data.json")
    .then((res) => res.json())
    .then((json) => {
      data = json;
      populateModels();
    });

  function populateModels() {
    Object.keys(data).forEach((model) => {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });
  }

  modelSelect.addEventListener("change", () => {
    const selectedModel = modelSelect.value;
    repairSelect.innerHTML = `<option disabled selected>Wybierz rodzaj naprawy</option>`;
    Object.keys(data[selectedModel]).forEach((repair) => {
      const option = document.createElement("option");
      option.value = repair;
      option.textContent = repair;
      repairSelect.appendChild(option);
    });
    resetDisplay();
  });

  repairSelect.addEventListener("change", () => {
    const model = modelSelect.value;
    const repair = repairSelect.value;
    if (data[model] && data[model][repair]) {
      const info = data[model][repair];

      // Fade image in
      imageEl.style.opacity = 0;
      setTimeout(() => {
        imageEl.src = info.image;
        imageEl.style.opacity = 1;
      }, 100);

      priceEl.textContent = info.price;
      descriptionEl.textContent = info.description;
    }
  });

  function resetDisplay() {
    priceEl.textContent = "";
    descriptionEl.textContent = "";
    imageEl.style.opacity = 0;
  }
});