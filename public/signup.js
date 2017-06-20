(function() {

    var signupFormElem = document.querySelector("#signup-form");

    signupFormElem.addEventListener("submit", function(event) {
        event.preventDefault();
        
        var formData = new FormData(signupFormElem);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/signup");
        xhr.send(formData);

        // xhr.onreadystatechange = function() {
        //     if (xhr.readyState != 4) return;
        // }
    });

})();