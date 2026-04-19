// THEME TOGGLE
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if (saved) html.setAttribute('data-theme', saved);
else if (window.matchMedia('(prefers-color-scheme: dark)').matches) html.setAttribute('data-theme','dark');

themeToggle.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 0.08 + 's';
  observer.observe(el);
});

// PROJECT ACCORDION
function selectProject(index) {
  document.querySelectorAll('.proj-list-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.proj-panel').forEach(el => el.classList.remove('active'));
  const listItem = document.querySelector(`.proj-list-item[data-proj="${index}"]`);
  const panel = document.querySelector(`.proj-panel[data-proj="${index}"]`);
  if (listItem) listItem.classList.add('active');
  if (panel) {
    panel.classList.add('active');
    // On mobile, scroll the detail panel into view
    if (window.innerWidth <= 860) {
      panel.closest('.proj-detail').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-icon').textContent = '+';
  });
  if (!isOpen) {
    item.classList.add('open');
    btn.querySelector('.faq-icon').textContent = '−';
  }
}
