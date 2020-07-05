//-------- URL

var url = document.getElementById("url");
var original = url.getAttribute("href");

window.onload = function(){
    var result = original.split('://').pop();
    url.innerHTML = result;
}