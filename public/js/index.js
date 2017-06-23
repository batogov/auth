(function() {

    var signoutBtn = document.querySelector("#signout");

    signoutBtn.addEventListener("click", function(event) {
        event.preventDefault();

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/signout');
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status === 200) {
                window.location.replace('/');
            }
        }
    });

})();