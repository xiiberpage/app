const cta = document.querySelector('.cta_header');
const footer = document.querySelector(
'.toaster');
const expandIcon = document.querySelector('.expand_icon');
const airplaneIcon = document.querySelectorAll('.airplane_icon_wrapper');

function toggleFooter() {
  footer.classList.toggle('is_open');
  expandIcon.classList.toggle('is_reversed');
  Array.from(airplaneIcon).map(icon => icon.classList.toggle('is_moving'));
}

cta.addEventListener('click', toggleFooter);