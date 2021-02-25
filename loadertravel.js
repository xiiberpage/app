(function(){
  var a=document.querySelector('#el_NLrue608j'),
      b=a.querySelectorAll('style'),
      c=function(d){
        b.forEach(function(f){
          var g=f.textContent;g&amp;&amp;(f.textContent=g.replace(/transform-box:[^;\r\n]*/gi,'transform-box: '+d))})};
  c('initial'),window.requestAnimationFrame(function(){
    return c('fill-box')})})();