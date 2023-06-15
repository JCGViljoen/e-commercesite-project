const form = document.getElementById('product-form');
const table = document.getElementById('product-table');

form.addEventListener('submit', function(event) {
  event.preventDefault(); 
  
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  
  const row = table.insertRow();
  
  const ImageCell = row.insertCell()
  const nameCell = row.insertCell();
  const priceCell = row.insertCell();
  const descriptionCell = row.insertCell();
  const actionCell = row.insertCell();
  
  ImageCell.innerHTML =`<input type= "text" id = "image" class = "image-input">`
  nameCell.textContent = name;
  priceCell.textContent = price;
  descriptionCell.textContent = description;
  actionCell.innerHTML = '<button onclick="deleteProduct(this)">Delete</button>';
  
  saveProduct(name, price, description, image);
  
  form.reset();
});

function saveProduct(name, price, description, image) {
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
      
      const imageCell = row.insertCell();
      const nameCell = row.insertCell();
      const priceCell = row.insertCell();
      const descriptionCell = row.insertCell();
      const actionCell = row.insertCell();

      
      
      imageCell.innerHTML = `<img src="${products[i].image}"/>`; 
      nameCell.textContent = products[i].name;
      priceCell.textContent = products[i].price;
      descriptionCell.textContent = products[i].description;
      actionCell.innerHTML = '<button class="btn btn-outline-success" onclick="deleteProduct(this)">Delete</button>'; 
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

function editProduct(button) {
  const row = button.parentNode.parentNode;
  const nameCell = row.cells[1];
  const priceCell = row.cells[2];
  const descriptionCell = row.cells[3];
  const imageCell = row.cells[0];
  const name = nameCell.textContent;
  const price = priceCell.textContent;
  const description = descriptionCell.textContent;
  const image = imageCell.querySelector('.image-input').value;
  // Update the form inputs with the values for editing
  document.getElementById('name').value = name;
  document.getElementById('price').value = price;
  document.getElementById('description').value = description;
  document.getElementById('image').value = image;
  // Remove the row from the table
  table.deleteRow(row.rowIndex);
  // Remove the product from storage
  removeProductFromStorage(name);
}
