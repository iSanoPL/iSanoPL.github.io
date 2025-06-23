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

    // Reset danych
    imageEl.style.opacity = 0;
    imageEl.removeAttribute("src");
    priceEl.textContent = "";
    descriptionEl.textContent = "";
  });

  repairSelect.addEventListener("change", () => {
    const selectedData = data[modelSelect.value][repairSelect.value];

    // Jeśli grafika się nie zmieniła, nie nadpisuj
    if (imageEl.src.includes(selectedData.image)) return;

    imageEl.style.transition = 'none';
    imageEl.style.opacity = 0;

    const newImage = new Image();
    newImage.src = selectedData.image;
    newImage.onload = () => {
      imageEl.src = selectedData.image;
      setTimeout(() => {
        imageEl.style.transition = 'opacity 0.5s ease-in-out';
        imageEl.style.opacity = 1;
      }, 20);
    };

    priceEl.textContent = selectedData.price;
    descriptionEl.textContent = selectedData.description;
  });
});