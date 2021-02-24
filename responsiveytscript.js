var search_button = document.querySelector('.search button')
var nav = document.querySelector('nav');
var previous = nav.querySelector('.previous')

search_button.addEventListener('click', () => {
    if (window.innerWidth <= 660) {
        nav.classList.add('open');
    }
});
previous.addEventListener('click', () => {
    nav.classList.remove('open');
})
window.onresize = function(event) {
    if (window.innerWidth > 660) {
        nav.classList.remove('open');
    }
};