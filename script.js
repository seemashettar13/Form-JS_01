const name = document.getElementById("stdname");
const id = document.getElementById("stdid");
const rollNumber = document.getElementById("stdrlnbr");
const email = document.getElementById("stdemail");
const number = document.getElementById("stdnbr");

const button = document.querySelector("#btn");
let editingRow = null; // tracking the row being edited

button.addEventListener("click", btnClick);

// Load data from local storage on page load
window.onload = loadData;

function validateFields(){
  let valid = true;
  document.getElementById("name-error").innerText = "";
  document.getElementById("id-error").innerText = "";
  document.getElementById("rollNumber-error").innerText = "";
  document.getElementById("email-error").innerText = "";
  document.getElementById("number-error").innerText = "";
  

  // Validating student name 
  if(!/^[a-zA-Z\s]+$/.test(name.value)){
  document.getElementById("name-error").innerText = "*enter only letters and spaces";
  valid = false;
  }

   // Validating student ID
   if (!/^\d+$/.test(id.value) || id.value <= 0) {
    document.getElementById("id-error").innerText = "*enter only positive numbers";
    valid = false;
   }
     // Validating roll number
  if (!/^\d+$/.test(rollNumber.value) || rollNumber.value <= 0) {
    document.getElementById("rollNumber-error").innerText = "*enter only positive numbers";
    valid = false;
  }

  // Validating email 
  if (!email.value.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
    document.getElementById("email-error").innerText = "*enter a avalid email adress";
    valid = false;
  }
    // Validating contact number
    if (!/^\d{10}$/.test(number.value)) {
      document.getElementById("number-error").innerText = "*enter 10 dig ph number";
      valid = false;
    }
  
    return valid;
  
}


  function btnClick(event) {
  event.preventDefault();

    // Validate the fields
    if (!validateFields()) {
      return; // Stop the form submission if validation fails
    }

  const student = {
    name: name.value,
    id: id.value,
    rollNumber: rollNumber.value,
    email: email.value,
    number: number.value,
  };

  if (editingRow) {
    // Update existing row
   const cells = editingRow.querySelectorAll("td:not(:last-child)");
    cells[0].innerText = student.name;
    cells[1].innerText = student.id;
    cells[2].innerText = student.rollNumber;
    cells[3].innerText = student.email;
    cells[4].innerText = student.number;

    // Update local storage
    updateStudentInStorage(editingRow.dataset.index, student);
    editingRow = null; // Reset editing state
  } else {
    // Add new student to local storage
    addStudentToStorage(student);
  }

  // Refresh table display
  displayStudents();

  // Clear the form
  resetForm();
}

function resetForm() {
  name.value = "";
  id.value = "";
  rollNumber.value = "";
  email.value = "";
  number.value = "";
  editingRow = null; // Reset editing state
}

function addStudentToStorage(student) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
}

function updateStudentInStorage(index, student) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students[index] = student;
  localStorage.setItem("students", JSON.stringify(students));
}

function loadData() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.forEach((student, index) => addStudentToTable(student, index));
}

function displayStudents() {
  const table = document.querySelector("#tables");
  const tBody = table.querySelector("tbody") || document.createElement("tbody");
  tBody.innerHTML = ""; // Clear current table rows

  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.forEach((student, index) => addStudentToTable(student, index));

  table.appendChild(tBody);

}

  function addStudentToTable(student, index) {
  const table = document.querySelector("#tables");
  const tBody = table.querySelector("tbody") || document.createElement("tbody");
console.log(student.name,student.id,student.rollNumber,student.email,student.number);
  const newRow = document.createElement("tr");
  newRow.dataset.index = index; // Add an index for tracking

  newRow.innerHTML = `
    <td class="datacell">${student.name}</td>
    <td class="datacell">${student.id}</td>
    <td class="datacell">${student.rollNumber}</td>
    <td class="datacell">${student.email}</td>
    <td class="datacell">${student.number}</td>
    <td>
      <button class="editCls"><i class="fa-solid fa-rotate-right"></i></button>
      <button class="trashCls"><i class="fa-regular fa-trash-can"></i></button>
    </td>
  `;
  console.log(student);

  tBody.appendChild(newRow);
  table.appendChild(tBody);
}

// Handle table actions (edit and delete)
document.querySelector("#tables").addEventListener("click", (event) => {
  const target = event.target.closest("button");

  if (!target) return;

  const row = target.closest("tr");
  const index = row.dataset.index;

  if (target.classList.contains("editCls")) {
    // Populate form fields with row data
    const cells = row.querySelectorAll("td:not(:last-child)");
    name.value = cells[0].innerText;
    id.value = cells[1].innerText;
    rollNumber.value = cells[2].innerText;
    email.value = cells[3].innerText;
    number.value = cells[4].innerText;

    editingRow = row; // Set the editing row
  } else if (target.classList.contains("trashCls")) {
    // Delete row and update local storage
    deleteStudentFromStorage(index);
    displayStudents();
  }
});

function deleteStudentFromStorage(index) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.splice(index, 1); // Remove student from array
  localStorage.setItem("students", JSON.stringify(students)); // Update local storage
}



















  

