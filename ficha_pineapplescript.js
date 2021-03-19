console.clear();

const elApp = document.querySelector('#app');
const elHero = document.querySelector('.active-nav');


const elSecondaryNavItems = document.querySelectorAll('.secondary-nav-item');
const elHeaderNavItems = Array.from(document.querySelectorAll('.header-nav-item'));
const elNav = document.querySelector('.section-navigation');

console.log(elSecondaryNavItems);

Array.from(elSecondaryNavItems).forEach((navItem, i) => {
  navItem.addEventListener('click', e => {
    elNav.style.setProperty('--selected', i);

    const allSelected = document.querySelectorAll('[data-selected]');

    Array.from(allSelected).forEach(selected => {
      delete selected.dataset.selected;
    });

    elHeaderNavItems[i].dataset.selected = true;

    navItem.dataset.selected = true;
  });
});