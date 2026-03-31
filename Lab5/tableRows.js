const infoForm = document.getElementById('infoForm');
const dataTableBody = document.querySelector('#dataTable tbody');

infoForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;

    if (!gender) {
        alert("Please select a gender.");
        return;
    }

    addRowToTable(name, email, gender, dateOfBirth);

    infoForm.reset();
});

function addRowToTable(name, email, gender, dateOfBirth) {
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${gender}</td>
        <td>${dateOfBirth}</td>
    `;

    dataTableBody.appendChild(newRow);
}