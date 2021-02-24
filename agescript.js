$(function() {
  var burger = $('.burger-menu');
  var floatButton = $('.float-button');
  var floatContent = $('.float-button-content');
  var menu = $('.menu-wrap');
  
  floatButton.on('click', function() {
    $(this).stop().toggleClass('opened');
    floatContent.toggleClass('showed');
  })
  floatContent.on('click', function() {
    $(this).removeClass('showed')
    floatButton.removeClass('opened')
  })
  
  burger.on('click', function() {
    $(this).toggleClass('active');
    setTimeout(function() {
      $('.mobile-wrap').toggleClass('no-scroll');
    }, 200);
    $('.content').toggleClass('menu-opened');
    menu.toggleClass('opened');
  })
});