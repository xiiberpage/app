var menuBurger = document.querySelector('.menu-burger-input');
var headerNav = document.querySelector('.header__nav');

menuBurger.addEventListener('click', function() {
  headerNav.classList.toggle('header__nav--active');
});