/*

Copyright © David Bushell | @dbushell | http://dbushell.com

*/

var $html = $(document.documentElement),
    $site = $('.site'),
		$body = $('body');

// animating clip-path is not playing nice in Safari
// http://browserhacks.com/

var hasCSSClipPaths = !!window.chrome && !/constructor/i.test(window.HTMLElement);

if (hasCSSClipPaths) {
  $html.addClass('cssclippaths');
}

$(window).scrollTop(0);

var $modal   = null,
		$overlay = $('.overlay'),
    $wrapper = $('.modal-wrapper'),
    $ripple  = $('.overlay__ripple');

function lockScroll(pointer)
{
//   var st = $(window).scrollTop();
  var w2, w1 = $html[0].clientWidth;
  $body.addClass('js-lock-scroll' + (pointer ? ' js-lock-pointer' : ''));
//   $site.css('margin-top', -st);  
  w2 = $html[0].clientWidth;
  // replace scrollbar with padding
  if (w2 > w1) {
	  $body.css('padding-right', w2 - w1);
  }
}

function unlockScroll()
{
//   var st = Math.abs(parseInt($site.css('margin-top'), 10));
//   $site.css('margin-top', 0);
  $body.css('padding-right', '').removeClass('js-lock-scroll js-lock-pointer');
//   $('html,body').scrollTop(st);
}

// return distance between two points
function dist(p1, p2)
{
  var xs = p2[0] - p1[0];
  var ys = p2[1] - p1[1];
  return Math.sqrt((xs * xs) + (ys * ys));
}

// return max width of a circle needed to cover a rectangle
function fillViewport(p1, width, height)
{
  // calc radius from centre to each corner
  var nw = dist(p1, [0,          0]),
      ne = dist(p1, [width,      0]),
      se = dist(p1, [width, height]),
      sw = dist(p1, [0,     height]);
  // return diameter required
  return 2 * Math.max(nw, ne, se, sw);
}

var openOverlay = function(btn, id)
{
  $modal = $('.modal[data-modal="' + id + '"]');

  lockScroll(true);
  
  requestAnimationFrame(function() {
  
    $overlay.addClass('js-open').attr('data-modal', id);
    var bounds = btn.getBoundingClientRect();

    // get viewport dimensions
    var vw = $(window).width(),
        vh = $(window).height();

    // get position of the button centre
    var p1 = [bounds.left + bounds.width / 2, bounds.top + bounds.height / 2];

    // calc max diameter required to fill viewport
    var diameter = fillViewport(p1, vw, vh);
    
    // pixels per second (animation speed)
    var pps = 3000;

    // scale minimum duration somewhat proportionally 
    var duration = 400 + (Math.round((diameter / pps) * 1000) * 0.5);

    $ripple.css({ 
      'transition-duration' : duration + 'ms',
      'width'  : diameter,
      'height' : diameter,
      'left'   : p1[0],
      'top'    : p1[1]
    });
    
    if (hasCSSClipPaths && id === 'test') {
      $modal.css('transition-duration', '300ms, ' + duration + 'ms');
      $modal.css('-webkit-clip-path', 'circle(' + (diameter/2) + 'px at 50% 50%)');
    }

    requestAnimationFrame(function() {
      $overlay.addClass('js-animate-in');

      $ripple.one('transitionend', function() {
        $overlay.addClass('js-animate-done');
        $body.removeClass('js-lock-pointer');
        $ripple.removeAttr('style');
      	
      })
    });
    
  });
};

var closeOverlay = function() {
  $body.addClass('js-lock-pointer');
  
  requestAnimationFrame(function() {
    $modal.removeAttr('style');
  	$overlay.removeClass('js-animate-in');
  });  

  $ripple.one('transitionend', function() {
    $wrapper.scrollTop(0);
  	$overlay.removeClass('js-open js-animate-done').removeAttr('data-modal');
    unlockScroll();
  });
}

$('[data-modal][data-action="open"]').on('click', function() {
  var btn = this;
  requestAnimationFrame(function() {
	  openOverlay(btn, $(btn).data('modal'));
  });
});

$overlay.on('click', function() {
  requestAnimationFrame(function() {
    closeOverlay();
  });
});

$wrapper.on('click', function(e) {
  var $target = $(e.target);
  if ($target.hasClass('modal')) return;
  if ($target.parents('.modal').length && $target.data('action') !== 'close') {
    if (!$target.parents('[data-action="close"]').length) {
    	return;
    }
  }
  e.preventDefault();
  requestAnimationFrame(function() {
    closeOverlay();
  });
});

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 
// MIT license
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());