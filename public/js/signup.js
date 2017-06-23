(function() {

    var allInputs = document.querySelectorAll('input');
    var textInputs = document.querySelectorAll('input[type=text], input[type=email]');
    var passwordInputs = document.querySelectorAll('input[type=password]');

    function showDangers(errors) {
        Object.keys(errors).forEach(function(elem) {
            var inputElem = document.querySelector("#" + elem);
            inputElem.classList.add("form-control-danger");

            formGroupElem = inputElem.parentElement;
            formGroupElem.classList.add("has-danger");

            if (errors[elem] !== true) {
                feedbackElem = document.createElement("div");
                feedbackElem.classList.add("form-control-feedback");
                feedbackElem.textContent = errors[elem];

                formGroupElem.appendChild(feedbackElem);
            }
        });
    }

    function hideOneDanger(inputElem) {
        if (inputElem.classList.contains('form-control-danger')) {

            inputElem.classList.remove('form-control-danger');

            formGroupElem = inputElem.parentElement;
            formGroupElem.classList.remove("has-danger");

            if (formGroupElem.lastElementChild.classList.contains("form-control-feedback")) {
                formGroupElem.removeChild(formGroupElem.lastElementChild);
            }
        }
    }

    function hideDangers(inputs) {
        for (var i = 0; i < inputs.length; i++) {
            hideOneDanger(inputs[i]);
        }
    }

    for (var i = 0; i < textInputs.length; i++) {
        textInputs[i].addEventListener('input', function() {
            hideOneDanger(this);
        });
    }

    for (var i = 0; i < passwordInputs.length; i++) {
        passwordInputs[i].addEventListener('input', function() {
            hideOneDanger(passwordInputs[0]);
            hideOneDanger(passwordInputs[1]);
        });
    }

    var signupFormElem = document.querySelector('#signup-form');

    signupFormElem.addEventListener('submit', function(event) {
        event.preventDefault();
        
        var formData = new FormData(signupFormElem);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/signup');
        xhr.send(formData);

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                hideDangers(allInputs);
                showDangers(JSON.parse(xhr.responseText));
            }
        }
    });

})();