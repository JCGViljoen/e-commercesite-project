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


function updateSelectedProducts() {
  const products = JSON.parse(localStorage.getItem('products'));

  selectedProductsList.innerHTML = '';
  products.forEach((product) => {
    if (product.selected) {
      const listItem = document.createElement('li');
      listItem.textContent = `${product.name} - R${product.price}`;
      selectedProductsList.appendChild(listItem);
    }
  });

  const totalPrice = calculateTotal();
  totalPriceElement.textContent = `R${totalPrice}`;
}


window.addEventListener('DOMContentLoaded', () => {
  updateSelectedProducts();
});


const checkoutButton = document.getElementById('checkout-button');
checkoutButton.addEventListener('click', () => {
  const totalPrice = calculateTotal();
  console.log('Total Price:', totalPrice);
  
});