let selectedRow = null;
function onFormSubmit(event) {
  event.preventDefault();
  let formData = readFormData();
  if (selectedRow === null) {
    insertNewRecord(formData);
  } else {
    updateRecord(formData);
  }
  resetForm();
}
// Retrieve data
function readFormData() {
  let formData = {};
  formData['productCode'] = document.getElementById('productCode').value;
  formData['product'] = document.getElementById('product').value;
  formData['qty'] = document.getElementById('qty').value;
  formData['price'] = document.getElementById('price').value;
  formData['image'] = document.getElementById('image').value; // Add the image field
  return formData;
}
// Insert data
function insertNewRecord(data) {
  let table = document.getElementById('storeList').getElementsByTagName('tbody')[0];
  let newRow = table.insertRow(table.length);
  let cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.productCode;
  let cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.product;
  let cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.qty;
  let cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.price;
  let cell5 = newRow.insertCell(4);
  cell5.innerHTML = data.image; // Use the 'image' field value
  let cell6 = newRow.insertCell(5);
  cell6.innerHTML = '<button onclick="editRecord(this)">Edit</button> <button onclick="deleteRecord(this)">Delete</button>';
  // Store the data in local storage
  let storedData = localStorage.getItem('storedData');
  let arr = storedData ? JSON.parse(storedData) : [];
  arr.push(data);
  localStorage.setItem('storedData', JSON.stringify(arr));
}
// Reset form fields
function resetForm() {
  document.getElementById('productCode').value = '';
  document.getElementById('product').value = '';
  document.getElementById('qty').value = '';
  document.getElementById('price').value = '';
  document.getElementById('image').value = '';
}
// Edit record
function editRecord(button) {
  let row = button.parentNode.parentNode;
  let productCode = row.cells[0].innerHTML;
  let product = row.cells[1].innerHTML;
  let qty = row.cells[2].innerHTML;
  let price = row.cells[3].innerHTML;
  let image = row.cells[4].innerHTML; // Add the image field
  document.getElementById('productCode').value = productCode;
  document.getElementById('product').value = product;
  document.getElementById('qty').value = qty;
  document.getElementById('price').value = price;
  document.getElementById('image').value = image;
  selectedRow = row;
}
// Update record
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.productCode;
  selectedRow.cells[1].innerHTML = formData.product;
  selectedRow.cells[2].innerHTML = formData.qty;
  selectedRow.cells[3].innerHTML = formData.price;
}
// Delete record
function deleteRecord(button) {
  let row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
  resetForm();
  selectedRow = null;
}