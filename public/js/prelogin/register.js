//------------PASSWORD
var a = document.getElementById('password');
var b = document.getElementById('confirm_password');
var hint = document.getElementById('hint');
var hint2 = document.getElementById('hint2');

a.addEventListener("input", function() {
    hint.innerHTML = "" ;
    hint2.innerHTML = "" ;
    b.value = "" ;
    b.style.border = "none" ;

    if(a.value.length <= 7) {
        b.disabled = true ;
    } else {
        b.disabled = false ;
    }
})

a.addEventListener("blur", function() {
    if(a.value.length <= 7) {
        if(a.value == "") {
            hint.innerHTML = "" ;
        } else {
            hint.innerHTML = "Password should be minimum <br> 8 characters" ;
        }
    } else {        
        hint.innerHTML = "" ;
    }
})

b.addEventListener("input", function() {
    hint2.innerHTML = "" ;

    if(a.value !== b.value) {
        b.style.border = "1px solid red" ;
    } else { 
        b.style.border = "1px solid lightgreen" ;
    }
})

b.addEventListener("blur", function() {
    if(a.value !== b.value) {
        hint2.innerHTML = "password doesn't match" ;
    } else {
        hint2.innerHTML = "" ;
    } 
})

//----------------USERNAME

var c = document.getElementById("username");
var hint3 = document.getElementById("hintUsername");

c.addEventListener("input", function() {
    c.value = c.value.toLowerCase();
})

c.addEventListener("keyup", function(){
    var format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/ ;  
    var result = format.test(c.value) ;

    if(result == true){
        hint3.innerHTML = "Special Characters are not allowed" ;
    } else {
        hint3.innerHTML = "" ;
    }
})

// ----- Date 

var d = document.getElementById("datefield")
const today = new Date();
const days = today.getDate();
const months = today.getMonth() + 1;
const year = today.getFullYear() - 16;

function zero (n) {
    return (n < 10) ? ("0" + n) : n;
}

const day = zero(days);
const month = zero(months)
const newDate = year+'-'+month+'-'+day;

//------- Title
var e = document.getElementsByClassName('btn');
var f = document.getElementsByClassName('req');

window.onload = function() {
    d.setAttribute('max', newDate);
    for(var i=0 ; i < e.length; i++){
        e[i].title = "";
        e[i].setAttribute("oninput", "this.setCustomValidity('')");
    }
    for(var j=0 ; j < f.length; j++){
        f[j].title = "Required";
    }   
}