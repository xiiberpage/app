$(function() {
  var win = $('.window'),
      welcome = $('.welcome'),
      clear = $('.clear'),
      prev = $('.previous'),
      next = $('.next'),
      close = $('.close'),
      tiles = $('.tile'),
      screens = $('.screen'),
      currentScreen;
  
  // Not sure if this works, but whatever.
  welcome.delay(1000).fadeIn('slow');
  
  prev.on('click', function() {
    // This shouldn't happen, but a failsafe ;)
    if (currentScreen === undefined) return;
    
    if (currentScreen == 0) {
      // Go from first to last.
      tiles.eq(tiles.length - 1).click();
    } else {
      tiles.eq(currentScreen - 1).click();
    }
  });
  
  next.on('click', function() {
    // This shouldn't happen, but a failsafe ;)
    if (currentScreen === undefined) return;
    
    if (currentScreen == tiles.length - 1) {
      // Go from last to first.
      tiles.eq(0).click();
    } else {
      tiles.eq(currentScreen + 1).click();
    }
  });
  
  close.on('click', function() {
    // No screen visible now.
    currentScreen = undefined;
    
    clear.fadeOut('slow');
    win.fadeOut('slow');
    welcome
      .fadeOut('slow')
      .addClass('active');
    
  });
  
  
  $(".tile .close ").click(function(){
    
    currentScreen = 0;
    
  });
 
  
  tiles.on('click', function() {
    // Hide current screen.
    if (currentScreen !== undefined) {
      screens.eq(currentScreen).hide();
    } else {
      win.fadeIn('slow');
      clear.fadeIn('slow');
    }
    
    currentScreen = tiles.index(this);
    // Show tiles screen.
    screens.eq(currentScreen).show();
  });
});