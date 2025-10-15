// Smooth scrolling for nav links
const navLinks = document.querySelectorAll('.nav-link, .scroll-btn');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll fade-in animation
const faders = document.querySelectorAll('.animate-fade');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('fade-in');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Project button click events
const projectButtons = document.querySelectorAll('.project-btn');
projectButtons.forEach(button => {
  button.addEventListener('click', () => {
    const projectName = button.dataset.project;
    alert(`You clicked on ${projectName}!`);
  });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you! Your message has been sent.');
  contactForm.reset();
});