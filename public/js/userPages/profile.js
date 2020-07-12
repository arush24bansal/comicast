//-------- URL

var url = document.getElementById("url");
var original = url.getAttribute("href");
var split = original.split('://').pop();
var about = document.getElementById("about")

window.onload = function(){
    let result;
    if(split.length >= 21){
        var subString = split.substr(0, 20);
        result = subString + "..."
    } else {
        result = split;
    }
    url.innerHTML = result;
}