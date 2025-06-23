const open = document.getElementById('addBeneficiary');
const close = document.getElementById('closeButton');
const modal = document.getElementById('modal');

open.addEventListener('click', () => {
    modal.classList.add('show');
});

close.addEventListener('click', () => {
    modal.classList.remove('show');
});

document.getElementById("SaveDoc").addEventListener("click", function () {
    const templateDiv = document.getElementById("template");
    const content = templateDiv.innerHTML;

    // Save content to localStorage
    localStorage.setItem("savedDoc", content);

    // Show alert or modal
    alert("Document saved locally and downloaded as PDF.");

    // Generate and save as PDF
    html2pdf()
  .set({
    margin: 0, // Remove extra space
    filename: 'SavedDocument.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 1.5,   // Reduce if too large
      useCORS: true
    },
    jsPDF: {
      unit: 'pt',
      format: 'a4', // 'a4' = 595.28 x 841.89 points
      orientation: 'landscape'
    },
    pagebreak: { avoid: 'div' } // Prevent unwanted breaks
  })
  .from(document.getElementById('template'))
  .save();

  });

  function sortTable() {
    const table = document.getElementById("myTable");
    const rows = Array.from(table.tbodies[0].rows);

    rows.sort((a,b) => {
        const lastA = a.cells[2].textContent.tolowerCase();
        const lastB = b.cells[2].textContent.tolowerCase();
        const firstA = a.cells[3].textContent.tolowerCase();
        const firstB = b.cells[3].textContent.tolowerCase();

        if (lastA !== lastB)  return lastA < lastB ? -1 : 1;
      if (firstA !== firstB) return firstA < firstB ? -1 : 1;
      return 0;
    });

    rows.forEach(row => table.tBodies[0].appendChild(row));
        }

    document.getElementById('addBenee').addEventListener('click', sortTable);
  
    document.getElementById("addBenee").addEventListener("click", function () {
    const province = document.getElementById("Province").value.trim();
    const municipality = document.getElementById("Municipality").value.trim();
    const PayrollNo = document.getElementById("payrollNum").value.trim();
    const BatchNum = document.getElementById("batchCode").value.trim();
    const Table = document.getElementById("myTable");
    const firstRow = Table.tBodies[0].rows[0];

    const headingText = `Region X Province of ${province} City/Municipality of ${municipality}`;
    document.getElementById("heading1target").innerText = headingText;

    const Payroll = `Payroll No: ${PayrollNo}`;
    document.getElementById("payrollNumber").innerText = Payroll;

    if (firstRow) {
        firstRow.cells[0].textContent = BatchNum;
    } else {
        alert("No row exist to update.");
    }
  });