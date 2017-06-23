(function() {

    var signinFormElem = document.querySelector('#signin-form');
    var fieldsetElem = signinFormElem.querySelector("fieldset");

    function showAlert() {
        if (!fieldsetElem.firstElementChild.classList.contains("alert")) {
            var alertElem = document.createElement('div');
            alertElem.className = "alert alert-danger alert-dismissible fade show";
            alertElem.innerHTML = '<button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>Incorrect username or password'
            fieldsetElem.insertBefore(alertElem, fieldsetElem.firstElementChild);
        }
    }

    signinFormElem.addEventListener('submit', function(event) {
        event.preventDefault();
        
        var formData = new FormData(signinFormElem);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/signin');
        xhr.send(formData);

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                showAlert();
            } else {
                window.location.replace('/');
            }
        }
    });

})();