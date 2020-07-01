var a = document.getElementById('password');
var b = document.getElementById('confirm_password');
var hint = document.getElementById('hint');
var hint2 = document.getElementById('hint2');
var submit = document.getElementById('submit');
var info = document.getElementById('info');

a.addEventListener("input", function() {
    hint.innerHTML = "" ;
    submit.style.display = "block" ;
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
            submit.style.display = "block" ;
        } else {
            hint.innerHTML = "Password should be minimum 8 characters" ;
            submit.style.display = "none" ;
        }
    } else {        
        hint.innerHTML = "" ;
        submit.style.display = "block" ;
    }
})

//--------------------------------------------------------------------------------------------------------------------------------------

b.addEventListener("input", function() {
    hint2.innerHTML = "" ;
    submit.style.display = "block" ;

    if(a.value !== b.value) {
        b.style.border = "1px solid red" ;
    } else { 
        b.style.border = "1px solid lightgreen" ;
    }
})

b.addEventListener("blur", function() {
    if(a.value !== b.value) {
        hint2.innerHTML = "password doesn't match" ;
        submit.style.display = "none";
    } else {
        hint2.innerHTML = "" ;
        submit.style.display = "block" ;
    } 
})