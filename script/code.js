// Get reference to product container
const productContainer = document.getElementById('product-container');
// Function to load products from local storage and display them as cards
function loadProducts() {
  if (localStorage.getItem('products')) {
    const products = JSON.parse(localStorage.getItem('products'));
    for (let i = 0; i < products.length; i++) {
      const card = document.createElement('div');
      card.classList.add('col-lg-4', 'col-md-6', 'mb-4');
      const cardContent = `
        <div class="card">
          <img src="image-url-here" class="card-img-top" alt="Product Image">
          <div class="card-body">
            <h5 class="card-title">${products[i].name}</h5>
            <p class="card-text">${products[i].description}</p>
            <p class="card-text"><strong>Price: $${products[i].price}</strong></p>
          </div>
        </div>
      `;
      card.innerHTML = cardContent;
      productContainer.appendChild(card);
    }
  }
}
// Load products from local storage on page load
loadProducts();






