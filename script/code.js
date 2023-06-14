const productContainer = document.getElementById('product-container');



//load products from local storage and display them as cards
// Function to toggle the selection of a product
function toggleSelection(index) {
  const products = JSON.parse(localStorage.getItem('products'));
  products[index].selected = !products[index].selected;
  localStorage.setItem('products', JSON.stringify(products));
  updateSelectedProducts();
}

// Function to create a product card
function createProductCard(product, index) {
  const card = document.createElement('div');
  card.classList.add('col-lg-4', 'col-md-6', 'mb-4');
  const cardContent = `
    <div class="card">
      <img src="image-url-here" class="card-img-top" alt="Product Image">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text"><strong>Price: $${product.price}</strong></p>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary add-to-cart" onclick="toggleSelection(${index})">${
    product.selected ? 'Remove from Cart' : 'Add to Cart'
  }</button>
      </div>
    </div>
  `;
  card.innerHTML = cardContent;
  return card;
}

// Load products from local storage on page load
function loadProducts() {
  if (localStorage.getItem('products')) {
    const products = JSON.parse(localStorage.getItem('products'));
    const productContainer = document.getElementById('product-container');

    products.forEach((product, index) => {
      const card = createProductCard(product, index);
      productContainer.appendChild(card);
    });
  }
}

// Load products from local storage on page load
loadProducts();









