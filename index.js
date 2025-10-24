async function loadExcelFiles() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/weedsman530/website/main/consult-adult.xlsx");
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });

    // حنقرأ أول 5 شيتات أو أقل لو عدد الشيتات أقل
    const sheetCount = Math.min(workbook.SheetNames.length, 10);

    for (let i = 0; i < sheetCount; i++) {
      const sheetName = workbook.SheetNames[i];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet);

      const container = document.getElementById(`gridContainer${i+1}`);
      container.innerHTML = "";

      rows.forEach(row => {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = row["photo"] || "https://via.placeholder.com/200x180?text=No+Image";
        card.appendChild(img);

        const name = document.createElement("h3");
        name.textContent = row["Product name"] || "Unnamed Product";
        card.appendChild(name);

        const ingredients = document.createElement("div");
        ingredients.className = "active-ingredients";
        ingredients.innerHTML = `
          <b>Code & Info: <br></b> ${row["Code and info"] || "—"}<br>
          <b>Content:<br></b> ${row["Content"] || "—"}<br>
        `;
        card.appendChild(ingredients);

        const dose = document.createElement("div");
        dose.className = "dose";
        dose.style.textAlign = "right";
        dose.innerHTML = `<b>الجرعه :<br></b> ${row["Dose"] || "—"}`;
        card.appendChild(dose);

        container.appendChild(card);
      });
    }

  } catch (error) {
    console.error("Error loading Excel file:", error);
  }
}

loadExcelFiles();

