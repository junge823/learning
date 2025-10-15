// Get elements
const input = document.getElementById('numbersInput');
const button = document.getElementById('calculateBtn');
const resultsDiv = document.getElementById('results');

// Function to calculate sum, average, min, max
function calculateNumbers(numbers) {
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  const average = sum / numbers.length;
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return { sum, average, min, max };
}

// Event listener for button click
button.addEventListener('click', () => {
  const inputValues = input.value.split(',').map(num => parseFloat(num.trim()));

  // Validate input
  if (inputValues.some(isNaN)) {
    resultsDiv.innerHTML = '<p style="color:red;">Please enter valid numbers separated by commas.</p>';
    return;
  }

  const { sum, average, min, max } = calculateNumbers(inputValues);

  resultsDiv.innerHTML = `
    <p><strong>Sum:</strong> ${sum}</p>
    <p><strong>Average:</strong> ${average}</p>
    <p><strong>Minimum:</strong> ${min}</p>
    <p><strong>Maximum:</strong> ${max}</p>
  `;
});