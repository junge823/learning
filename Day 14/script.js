// Array of product objects
const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Smartphone", price: 800 },
  { id: 3, name: "Headphones", price: 150 },
  { id: 4, name: "Smartwatch", price: 250 },
  { id: 5, name: "Keyboard", price: 100 },
  { id: 6, name: "Monitor", price: 300 }
];

// Function to filter products by price
function filterProducts() {
  const priceLimit = parseFloat(document.getElementById('priceLimit').value);
  const productList = document.getElementById('productList');
  productList.innerHTML = ''; // clear previous results

  if (isNaN(priceLimit)) {
    productList.innerHTML = '<p>Please enter a valid number.</p>';
    return;
  }

  // Filter products using Array.filter()
  const filtered = products.filter(p => p.price <= priceLimit);

  if (filtered.length === 0) {
    productList.innerHTML = `<p>No products found below $${priceLimit}.</p>`;
    return;
  }

  // Display filtered results
  filtered.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.textContent = `${product.name} — $${product.price}`;
    productList.appendChild(div);
  });
}