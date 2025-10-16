// Select elements
const form = document.getElementById('emailForm');
const emailInput = document.getElementById('email');
const errorMsg = document.getElementById('errorMsg');

// Function to check email validity
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Form submit event
form.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent reload
  const emailValue = emailInput.value.trim();

  if (emailValue === '') {
    errorMsg.textContent = '❌ Please enter your email address.';
    emailInput.classList.remove('valid');
    emailInput.classList.add('invalid');
  } else if (!isValidEmail(emailValue)) {
    errorMsg.textContent = '⚠️ Invalid email format. Please enter a valid email.';
    emailInput.classList.remove('valid');
    emailInput.classList.add('invalid');
  } else {
    errorMsg.textContent = '';
    emailInput.classList.remove('invalid');
    emailInput.classList.add('valid');
    alert(`✅ Email submitted successfully: ${emailValue}`);
    form.reset();
    emailInput.classList.remove('valid'); // reset color after submission
  }
});