let currentSortCol = "";
let currentSortAsc = true;

function renderTable(filterIndustry = "", searchText = "") {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  let filtered = deals
    .filter(d => (filterIndustry === "" || d.industry.includes(filterIndustry)))
    .filter(d => (searchText === "" || d.startup.toLowerCase().includes(searchText.toLowerCase())));

  // Sorting
  if (currentSortCol) {
    filtered.sort((a, b) => {
      let valA = (a[currentSortCol] || "").toString().toLowerCase();
      let valB = (b[currentSortCol] || "").toString().toLowerCase();
      if (valA < valB) return currentSortAsc ? -1 : 1;
      if (valA > valB) return currentSortAsc ? 1 : -1;
      return 0;
    });
  }

  filtered.forEach(d => {
    const row = `
      <tr>
        <td>${d.startup}</td>
        <td>${d.acquiredBy}</td>
        <td>${d.industry}</td>
        <td>${d.employees}</td>
        <td>${d.info}</td>
        <td>${d.date || "Not specified"}</td>
        <td>${d.source}</td>
      </tr>`;
    tbody.innerHTML += row;
  });
}

// Filters
document.getElementById("filterIndustry").addEventListener("change", e => {
  renderTable(e.target.value, document.getElementById("searchStartup").value);
});
document.getElementById("searchStartup").addEventListener("input", e => {
  renderTable(document.getElementById("filterIndustry").value, e.target.value);
});

// Sorting
document.querySelectorAll("th").forEach(th => {
  th.addEventListener("click", () => {
    const col = th.getAttribute("data-col");
    if (col) {
      if (currentSortCol === col) {
        currentSortAsc = !currentSortAsc;
      } else {
        currentSortCol = col;
        currentSortAsc = true;
      }
      renderTable(document.getElementById("filterIndustry").value, document.getElementById("searchStartup").value);
    }
  });
});

// Initial render
renderTable();
