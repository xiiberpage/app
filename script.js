    // Open and close the sidebar on medium and small screens
    function w3_open() {
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("myOverlay").style.display = "block";
    }

    function w3_close() {
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("myOverlay").style.display = "none";
    }

    // Change style of top container on scroll
    window.onscroll = function() {
        myFunction()
    };

    function myFunction() {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            document.getElementById("myTop").classList.add("w3-card-4", "w3-animate-opacity");
            document.getElementById("myIntro").classList.add("w3-show-inline-block");
        } else {
            document.getElementById("myIntro").classList.remove("w3-show-inline-block");
            document.getElementById("myTop").classList.remove("w3-card-4", "w3-animate-opacity");
        }
    }



    // The tab modal

    document.getElementsByClassName("modtablink01")[0].click();

    function openfichaxib(evt, fichaxibName) {
        var i, x, modtablink01s;
        x = document.getElementsByClassName("fichaxib");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        modtablink01s = document.getElementsByClassName("modtablink01");
        for (i = 0; i < x.length; i++) {
            modtablink01s[i].classList.remove("w3-light-grey");
        }
        document.getElementById(fichaxibName).style.display = "block";
        evt.currentTarget.classList.add("w3-light-grey");
    }

    // When the user clicks anywhere outside of the modal, close it
    var modal = document.getElementById('ticketModal');
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Dark Mode
    function myFunctiondark() {
        var element = document.body;
        element.classList.toggle("dark-mode");
    }

    // Overlay agotado


    function onagotado() {
        document.getElementById("overlayagotado").style.display = "block";
    }

    function offagotado() {
        document.getElementById("overlayagotado").style.display = "none";
    }

    // whatsa v1

    $(".box-input input").on("focus", function() {
        $(this).addClass("focus");
    });

    $(".box-input input").on("blur", function() {
        if ($(this).val() == "") {
            $(this).removeClass("focus");
        }
    });



    function isMobile() {
        if (sessionStorage.desktop)
            return false;
        else if (localStorage.mobile)
            return true;
        var mobile = ['iphone', 'ipad', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];
        for (var i in mobile)
            if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) return true;
        return false;
    }

    const formulario = document.querySelector('#formulario');
    const buttonSubmit = document.querySelector('#submit');
    const urlDesktop = 'https://web.whatsapp.com/';
    const urlMobile = 'whatsapp://';
    const telefono = '525539793727';

    formulario.addEventListener('submit', (event) => {
        event.preventDefault()
        buttonSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin "></i>'
        buttonSubmit.disabled = true
        setTimeout(() => {
            let nombre = document.querySelector('#nombre').value
            let apellidos = document.querySelector('#apellidos').value
            let email = document.querySelector('#email').value
            let mensaje = 'send?phone=' + telefono + '&text=*_Vestidor_*%0A*¿Cual es tu nombre?*%0A' + nombre + '%0A*¿Cuáles son tus apellidos?*%0A' + apellidos + '%0A*¿Cuál es tu correo electrónico?*%0A' + email + ''
            if (isMobile()) {
                window.open(urlMobile + mensaje, '_blank')
            } else {
                window.open(urlDesktop + mensaje, '_blank')
            }
            buttonSubmit.innerHTML = '<i class="fab fa-whatsapp "></i> Enviar WhatsApp'
            buttonSubmit.disabled = false
        }, 3000);
    });

    // whatsa v1