// ************************************
// This file is part of a package from:
// www.freecontactform.com
// See license for details
// ************************************

new JustValidate('.fcf-form-class', {
    rules: {
        LicenseKey: {
            required: true,
            minLength: 4,
            maxLength: 40
        },
        EmailTo: {
            required: true,
            email: true
        },
        EmailToName: {
            required: false,
            minLength: 4,
            maxLength: 60
        },
        EmailFrom: {
            required: true,
            minLength: 7,
            maxLength: 60
        },
        EmailFromName: {
            required: false,
            minLength: 4,
            maxLength: 60
        },
        EmailSubject: {
            required: true,
            minLength: 4,
            maxLength: 60
        },
        SMTPHost: {
            required: false,
            minLength: 4,
            maxLength: 60
        },
        SMTPUser: {
            required: false,
            minLength: 4,
            maxLength: 60
        },
        SMTPPass: {
            required: false,
            minLength: 4,
            maxLength: 60
        },
        SMTPPort: {
            required: false,
            minLength: 1,
            maxLength: 6
        }
    },
    colorWrong: '#dc3545',
    focusWrongField: true,
    submitHandler: function(cform, values, ajax) {
        var button_value = getButtonValue('fcf-button');
        disableButton('fcf-button');
        ajax({
            url: cform.getAttribute("action"),
            method: 'POST',
            data: values,
            async: true,
            callback: function(response) {
                var done = false;
                if(response.indexOf('Fail:') == 0) {
                    // configration problem
                    showFailMessage(response);
                    enableButon('fcf-button', button_value);
                    done = true;
                }

                if(response.indexOf('Error:') == 0) {
                    // validation problem
                    showErrorMessage(response);
                    enableButon('fcf-button', button_value);
                    done = true;
                }

                if(response.indexOf('Success') == 0) {
                    // success
                    showSuccessMessage(response);
                    done = true;
                }

                if(done == false) {
                    showErrorMessage("Error:Sorry, an unexpected error occurred. Please try later.");
                    enableButon('fcf-button', button_value);
                }

            }
        });

    },
});

function getButtonValue(id) {
    return document.getElementById(id).innerText;
}

function disableButton(id) {
    document.getElementById(id).innerText = 'Please wait...';
    document.getElementById(id).disabled = true;
}

function enableButon(id, val) {
    document.getElementById(id).innerText = val;
    document.getElementById(id).disabled = false;
}

function showFailMessage(message) {
    var display = '<strong>Unexpected errors. </strong>(form has been misconfigured)<br>';
    display += message.substring(5);
    document.getElementById('fcf-status').innerHTML = display;
}

function showErrorMessage(message) {
    var display = '<strong>Validation problem:</strong><br>';
    display += message.substring(6);
    document.getElementById('fcf-status').innerHTML = display;
}

function showSuccessMessage() {
    document.getElementById('fcf-status').innerHTML = '';
    document.getElementById('fcf-form').style.display = "none";
    document.getElementById('fcf-thank-you').style.display = "block";
}