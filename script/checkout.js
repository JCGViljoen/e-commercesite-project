// Get reference to selected products list and total price element
const selectedProductsList = document.getElementById('selected-products-list');
const totalPriceElement = document.getElementById('total-price');

// Function to calculate the total price
function calculateTotal() {
  const products = JSON.parse(localStorage.getItem('products'));
  let totalPrice = 0;

  products.forEach((product) => {
    if (product.selected) {
      totalPrice += product.price;
    }
  });

  return totalPrice;
}

// Function to update the selected products list and total price
function updateSelectedProducts() {
  const products = JSON.parse(localStorage.getItem('products'));

  selectedProductsList.innerHTML = '';
  products.forEach((product) => {
    if (product.selected) {
      const listItem = document.createElement('li');
      listItem.textContent = `${product.name} - $${product.price}`;
      selectedProductsList.appendChild(listItem);
    }
  });

  const totalPrice = calculateTotal();
  totalPriceElement.textContent = `$${totalPrice}`;
}

// Load products from local storage on page load
window.addEventListener('DOMContentLoaded', () => {
  updateSelectedProducts();
});

// Handle checkout button click
const checkoutButton = document.getElementById('checkout-button');
checkoutButton.addEventListener('click', () => {
  const totalPrice = calculateTotal();
  console.log('Total Price:', totalPrice);
  // Customize this code to perform the desired action with the total price
  // For example, you can redirect the user to a payment page or perform additional validation.
});