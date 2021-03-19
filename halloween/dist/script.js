/*
Designed by: Andreas Maris
Original image: https://dribbble.com/shots/7864355-It-s-Halloween-season
*/


var x = document.getElementById("myAudio");
function playAudio() {
   x.loop = true;
   x.play();
}
document.body.addEventListener("click", playAudio)