//----- USERNAME
var a = document.getElementById("username");

a.addEventListener("input", function() {
    a.value = a.value.toLowerCase();
})

//------ INVALID & TITLE
var b = document.getElementsByClassName("btn-info");

window.onload = function(){
    for(var i=0; i < b.length; i++){
        b[i].setAttribute("oninput", "this.setCustomValidity('')")
        b[i].title = "";
    }
}



