let data;

document.addEventListener("DOMContentLoaded", async () => {
  const modelSelect = document.getElementById("modelSelect");
  const repairSelect = document.getElementById("repairSelect");
  const priceEl = document.getElementById("price");
  const descriptionEl = document.getElementById("description");
  const imageEl = document.getElementById("deviceImage");

  // Wczytaj dane z JSON
  const res = await fetch("cennik_files/data.json");
  data = await res.json();

  // Załaduj modele
  Object.keys(data).forEach(model => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    modelSelect.appendChild(option);
  });

  // Po zmianie modelu
  modelSelect.addEventListener("change", () => {
    repairSelect.innerHTML = `<option disabled selected>Wybierz rodzaj naprawy</option>`;
    const repairs = Object.keys(data[modelSelect.value]);
    repairs.forEach(repair => {
      const option = document.createElement("option");
      option.value = repair;
      option.textContent = repair;
      repairSelect.appendChild(option);
    });

    imageEl.style.opacity = 0;
    imageEl.src = "";
    priceEl.textContent = "";
    descriptionEl.textContent = "";
  });

  // Po zmianie naprawy
  repairSelect.addEventListener("change", () => {
    const selectedData = data[modelSelect.value][repairSelect.value];

    imageEl.style.transition = 'none';
    imageEl.style.opacity = 0;
    imageEl.src = selectedData.image;

    imageEl.onload = () => {
      setTimeout(() => {
        imageEl.style.transition = 'opacity 0.5s ease-in-out';
        imageEl.style.opacity = 1;
      }, 50);
    };

    priceEl.textContent = selectedData.price;
    descriptionEl.textContent = selectedData.description;
  });
});