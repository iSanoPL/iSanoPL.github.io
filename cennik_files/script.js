let data;

document.addEventListener("DOMContentLoaded", async () => {
  const modelSelect = document.getElementById("modelSelect");
  const repairSelect = document.getElementById("repairSelect");
  const priceEl = document.getElementById("price");
  const descriptionEl = document.getElementById("description");
  const imageEl = document.getElementById("deviceImage");

  const res = await fetch("cennik_files/data.json");
  data = await res.json();

  Object.keys(data).forEach(model => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    modelSelect.appendChild(option);
  });

  modelSelect.addEventListener("change", () => {
    repairSelect.innerHTML = `<option disabled selected>Wybierz rodzaj naprawy</option>`;
    const repairs = Object.keys(data[modelSelect.value]);
    repairs.forEach(repair => {
      const option = document.createElement("option");
      option.value = repair;
      option.textContent = repair;
      repairSelect.appendChild(option);
    });

    // Reset wszystkiego
    fadeOutImage();
    priceEl.textContent = "";
    descriptionEl.textContent = "";
  });

  repairSelect.addEventListener("change", () => {
    const selectedData = data[modelSelect.value][repairSelect.value];
    const newImagePath = selectedData.image;

    const tempImg = new Image();
    tempImg.src = newImagePath;
    tempImg.onload = () => {
      imageEl.style.opacity = 0;
      setTimeout(() => {
        imageEl.src = newImagePath;
        imageEl.style.opacity = 1;
      }, 50);
    };

    priceEl.textContent = selectedData.price;
    descriptionEl.textContent = selectedData.description;
  });

  function fadeOutImage() {
    imageEl.style.opacity = 0;
  }
});