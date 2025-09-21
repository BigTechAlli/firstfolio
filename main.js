// Select elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const themeToggle = document.getElementById('theme-toggle');
const navbar = document.getElementById('navbar');
const themeIcon = themeToggle.querySelector('i');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = hamburger.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.classList.replace('fa-bars', 'fa-times');
  } else {
    icon.classList.replace('fa-times', 'fa-bars');
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  if (document.body.classList.contains('light-mode')) {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'dark');
  }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe animated elements
document.querySelectorAll('.fade-in, .slide-in').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// Skills slider functionality
function initSkillsSlider() {
  const skillsTrack = document.querySelector('.skills-track');
  const skillItems = document.querySelectorAll('.skill-item');
  const originalItems = Array.from(skillItems).slice(0, 8); // Get first 8 unique items
  
  // Remove duplicate items (they're only for the infinite loop effect)
  skillsTrack.innerHTML = '';
  originalItems.forEach(item => {
    skillsTrack.appendChild(item.cloneNode(true));
  });
  
  // Duplicate items for seamless loop
  originalItems.forEach(item => {
    skillsTrack.appendChild(item.cloneNode(true));
  });
}

// Initialize skills slider when page loads
document.addEventListener('DOMContentLoaded', initSkillsSlider);

// Optional: Add touch/swipe functionality for mobile
let touchStartX = 0;
let touchEndX = 0;
const skillsSlider = document.querySelector('.skills-slider');

skillsSlider.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, false);

skillsSlider.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, false);

function handleSwipe() {
  if (touchEndX < touchStartX) {
    // Swipe left - do nothing (animation continues)
  }
  if (touchEndX > touchStartX) {
    // Swipe right - do nothing (animation continues)
  }
}