// Author: Ali Soueidan
// Author URI: https//: www.alisoueidan.com

// select all listitems
  var listItem = document.querySelectorAll(".list-element");
  var identity = document.querySelector("#head > p");

// Functionality for identity change of emoji man
  function changeIdenttity() {
    var newIdentity = this.innerHTML;
    identity.classList.add("changed");
    identity.innerHTML = newIdentity;
    setTimeout(function(){ identity.classList.remove("changed"); }, 500);
  };

let i = 0;
// set clickevent for each item
  listItem.forEach( function() {
    listItem[i].addEventListener( "click", changeIdenttity );
    ++i;
  });