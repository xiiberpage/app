console.clear();

const navToggle = document.getElementById('sup');

const sidebar = document.querySelector('.l-aside');

navToggle.addEventListener('click', () => {
  sidebar.classList.toggle('is-open');
});

const darkTheme = () => {
  let toggle = document.querySelector('.c-toggle');
  toggle.classList.toggle('is-toggled');
  if (document.body.hasAttribute("dark")) {
    document.body.removeAttribute('dark', 'true');
  } else {
    document.body.setAttribute('dark', 'true');
  }
};