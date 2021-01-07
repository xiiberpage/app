$('.ui.accordion ')
    .accordion();

$('.ui.rating')
    .rating({
        initialRating: 3,
        maxRating: 5
    });
$('.ui.menu .item')
    .tab({
        history: true,
        historyType: 'state',
        path: '/modules/tab.html'
    });
$('.menu .item')
    .tab();
$('.activating.element')
    .popup();
$('.button')
    .popup({
        inline: true
    });
$('.special.cards .image').dimmer({
    on: 'hover'
});

filterSelection("all")

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("column");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}
// Get the elements with class="column"
var elements = document.getElementsByClassName("columne");
// Declare a loop variable
var i;
// Full-width images
function one() {
    for (i = 0; i < elements.length; i++) {
        elements[i].style.msFlex = "100%"; // IE10
        elements[i].style.flex = "100%";
    }
}

// Two images side by side
function two() {
    for (i = 0; i < elements.length; i++) {
        elements[i].style.msFlex = "50%"; // IE10
        elements[i].style.flex = "50%";
    }
}

// Four images side by side
function four() {
    for (i = 0; i < elements.length; i++) {
        elements[i].style.msFlex = "25%"; // IE10
        elements[i].style.flex = "25%";
    }
}

// Add active class to the current button (highlight it)
var header = document.getElementById("myHeader");
var btns = header.getElementsByClassName("btne");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("activee");
        current[0].className = current[0].className.replace(" activee", "");
        this.className += " activee";
    });
}
import { MDCRipple } from '@material/ripple';

const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));