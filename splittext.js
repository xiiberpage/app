console.clear();

var el = document.querySelector('blockquote');


var s = new SplitText(
  el, 
  {
    type:"lines, words", 
    linesClass:"ts-line"
  }
);

var tl = new TimelineMax({ 
  delay: 0.5,
  repeatDelay: 0.5,
  repeat: -1
});

tl.addLabel('enter');

tl.staggerFromTo(
    s.words, 
    0.6, 
    {
      yPercent: 100,
    },
    {
      yPercent: 0,
      ease: 'Circ.easeOut'
    },
    0.2,
    'enter'
  );

tl.staggerFromTo(
    s.words, 
    0.6, 
    {
      opacity: 0,
    },
    {
      opacity: 1,
      ease: 'Power1.easeOut'
    },
    0.2,
  'enter'
  );


tl.fromTo('.note', 1, { opacity: 0 },{ opacity: 0.6, ease: 'Linear.easeNone' });
tl.addPause();

tl.addLabel('exit');

tl.to('.note', 0.5, { opacity: 0, ease: 'Linear.easeNone' });

tl.staggerTo(
    s.words, 
    0.4, 
    {
      yPercent: -200,
      ease: 'Circ.easeIn'
    }, 
    0.1,
    'exit'
  );

tl.staggerTo(
    s.words, 
    0.4, 
    {
      opacity: 0,
      ease: 'Power1.easeIn'
    }, 
    0.1,
    'exit'
  );

el.addEventListener('click',function(){
  console.log('click!');
  tl.play(); // tl.reversed() ? tl.play() : tl.reverse()
});