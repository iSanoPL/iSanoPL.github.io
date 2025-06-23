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
  });

  repairSelect.addEventListener("change", () => {
    const selectedData = data[modelSelect.value][repairSelect.value];
    imageEl.src = selectedData.image;
    priceEl.textContent = selectedData.price;
    descriptionEl.textContent = selectedData.description;
  });
});