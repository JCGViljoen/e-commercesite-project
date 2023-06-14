const form = document.getElementById('product-form');
const table = document.getElementById('product-table');

form.addEventListener('submit', function(event) {
  event.preventDefault(); 
  
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  
  const row = table.insertRow();
  
  const nameCell = row.insertCell();
  const priceCell = row.insertCell();
  const descriptionCell = row.insertCell();
  const actionCell = row.insertCell();
  
  
  nameCell.textContent = name;
  priceCell.textContent = price;
  descriptionCell.textContent = description;
  actionCell.innerHTML = '<button onclick="deleteProduct(this)">Delete</button>';
  
  saveProduct(name, price, description);
  
  form.reset();
});

function saveProduct(name, price, description) {
  let products = [];
  
  if (localStorage.getItem('products')) {
    products = JSON.parse(localStorage.getItem('products'));
  }
  // Add new product to the array
  products.push({
   
    name: name,
    price: price,
    description: description
  });
  
  localStorage.setItem('products', JSON.stringify(products));
}

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
      actionCell.innerHTML = '<button clas="btn btn-ouline-success" onclick="deleteProduct(this)">Delete</button>';
    }
  }
}
// Function to delete a product
function deleteProduct(button) {
  const row = button.parentNode.parentNode;
  const productName = row.cells[0].textContent;
  
  table.deleteRow(row.rowIndex);
  
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
  localStorage.setItem('products', JSON.stringify(products));
}

loadProducts();
