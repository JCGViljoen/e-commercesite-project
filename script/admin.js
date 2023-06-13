const form = document.getElementById('product-form');
const table = document.getElementById('product-table');
// Event listener for form submission
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  // Get form values
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  // Create a new row in the table
  const row = table.insertRow();
  const nameCell = row.insertCell();
  const priceCell = row.insertCell();
  const descriptionCell = row.insertCell();
  const actionCell = row.insertCell();
  // Set cell values
  nameCell.textContent = name;
  priceCell.textContent = price;
  descriptionCell.textContent = description;
  actionCell.innerHTML = '<button onclick="deleteProduct(this)">Delete</button>';
  // Save product to local storage
  saveProduct(name, price, description);
  // Reset the form
  form.reset();
});
// Function to save product to local storage
function saveProduct(name, price, description) {
  let products = [];
  // Check if products already exist in local storage
  if (localStorage.getItem('products')) {
    products = JSON.parse(localStorage.getItem('products'));
  }
  // Add new product to the array
  products.push({
    name: name,
    price: price,
    description: description
  });
  // Store the updated products array in local storage
  localStorage.setItem('products', JSON.stringify(products));
}
// Function to load products from local storage
function loadProducts() {
  if (localStorage.getItem('products')) {
    const products = JSON.parse(localStorage.getItem('products'));
    for (let i = 0; i < products.length; i++) {
      const row = table.insertRow();
      const nameCell = row.insertCell();
      const priceCell = row.insertCell();
      const descriptionCell = row.insertCell();
      const actionCell = row.insertCell();
      nameCell.textContent = products[i].name;
      priceCell.textContent = products[i].price;
      descriptionCell.textContent = products[i].description;
      actionCell.innerHTML = '<button onclick="deleteProduct(this)">Delete</button>';
    }
  }
}
// Function to delete a product
function deleteProduct(button) {
  const row = button.parentNode.parentNode;
  const productName = row.cells[0].textContent;
  // Remove the row from the table
  table.deleteRow(row.rowIndex);
  // Remove the product from local storage
  removeProductFromStorage(productName);
}
// Function to remove product from local storage
function removeProductFromStorage(productName) {
  const products = JSON.parse(localStorage.getItem('products'));
  for (let i = 0; i < products.length; i++) {
    if (products[i].name === productName) {
      products.splice(i, 1);
      break;
    }
  }
  // Update the products array in local storage
  localStorage.setItem('products', JSON.stringify(products));
}
// Load products from local storage on page load
loadProducts();