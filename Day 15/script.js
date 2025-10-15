// 🎯 Selecting the button using getElementById
const colorButton = document.getElementById('colorBtn');

// 🎨 Function to generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// 🎧 Event Listener for button click
colorButton.addEventListener('click', () => {
  // Select the body using querySelector
  const body = document.querySelector('body');
  const newColor = getRandomColor();
  body.style.backgroundColor = newColor;

  console.log(`Background color changed to: ${newColor}`);
});