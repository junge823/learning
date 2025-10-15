// Get elements
const lengthInput = document.getElementById('length');
const widthInput = document.getElementById('width');
const calculateBtn = document.getElementById('calculateBtn');
const resultsDiv = document.getElementById('results');

// Function to calculate area
function calculateArea(length, width) {
  return length * width;
}

// Function to calculate perimeter
function calculatePerimeter(length, width) {
  return 2 * (length + width);
}

// Event listener for button click
calculateBtn.addEventListener('click', () => {
  const length = parseFloat(lengthInput.value);
  const width = parseFloat(widthInput.value);

  if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
    resultsDiv.innerHTML = '<p style="color:red;">Please enter valid positive numbers for length and width.</p>';
    return;
  }

  const area = calculateArea(length, width);
  const perimeter = calculatePerimeter(length, width);

  resultsDiv.innerHTML = `
    <p><strong>Area:</strong> ${area}</p>
    <p><strong>Perimeter:</strong> ${perimeter}</p>
  `;
});