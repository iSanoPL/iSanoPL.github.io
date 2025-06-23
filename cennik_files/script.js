let data;

document.addEventListener("DOMContentLoaded", async () => {
  const modelSelect = document.getElementById("modelSelect");
  const repairSelect = document.getElementById("repairSelect");
  const priceEl = document.getElementById("price");
  const descriptionEl = document.getElementById("description");
  const imageEl = document.getElementById("deviceImage");

  // Wczytanie danych z JSON
  const res = await fetch("cennik_files/data.json");
  data = await res.json();

  // Załaduj modele
  Object.keys(data).forEach(model => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    modelSelect.appendChild(option);
  });

  // Zmiana modelu = nowa lista napraw
  modelSelect.addEventListener("change", () => {
    repairSelect.innerHTML = `<option disabled selected>Wybierz rodzaj naprawy</option>`;
    const repairs = Object.keys(data[modelSelect.value]);
    repairs.forEach(repair => {
      const option = document.createElement("option");
      option.value = repair;
      option.textContent = repair;
      repairSelect.appendChild(option);
    });
    // Reset grafiki i szczegółów
    imageEl.src = "";
    imageEl.style.opacity = 0;
    priceEl.textContent = "";
    descriptionEl.textContent = "";
  });

  // Zmiana naprawy = pokaż cenę, opis i grafikę
  repairSelect.addEventListener("change", () => {
    const selectedData = data[modelSelect.value][repairSelect.value];
    
    imageEl.style.opacity = 0;

    setTimeout(() => {
      imageEl.src = selectedData.image;
      imageEl.onload = () => {
        imageEl.style.opacity = 1;
      };
    }, 100);

    priceEl.textContent = selectedData.price;
    descriptionEl.textContent = selectedData.description;
  });
});