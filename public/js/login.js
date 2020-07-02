//----------------------------------------------------------INVALID---------------------------------------------------------------------

var a = document.getElementsByClassName('btn-info');

window.onload = function() {
    for(var i=0 ; i < a.length; i++){
        a[i].setAttribute("oninput", "setCustomValidity('')");
    }
}

//--------------------------------------------------------USERNAME----------------------------------------------------------------------

var b = document.getElementById("username");

b.addEventListener("input", function() {
    b.value = b.value.toLowerCase();
})