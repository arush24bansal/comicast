var allForms = document.getElementsByTagName("form");
var inputs = document.getElementsByTagName("input");
var textInputs = document.getElementsByClassName("text");
var submits = document.getElementsByClassName("submitButton");
var resets = document.getElementsByClassName("resetButton");
var infoBox = document.getElementById("infoBox");

var remove = document.getElementById("remove") ;
var removeLink = remove.getAttribute("href") ;
var about = document.getElementById("about") ;

window.onload = function () {

    for(var i=1; i < allForms.length; i++){
        allForms[i].method = "post" ;
        allForms[i].autocomplete = "off" ;
    }

    for(var i=1; i < inputs.length; i++){
        inputs[i].classList.add("btn", "btn-info") ;
        inputs[i].setAttribute("onInput", "this.setCustomValidity('')") ;
        inputs[i].title = "" ;
    }

    for(var i=5; i <= 7; i++){
        inputs[i].setAttribute("type", "password") ;
        inputs[i].setAttribute("maxlength", "25") ;
        inputs[i].required = true
    }

    for(var i=0; i < submits.length; i++){
        submits[i].type = "submit" ;
        submits[i].classList.add("btn", "btn-success") ;
        submits[i].innerHTML = "Submit"
    }

    for(var i=0; i < resets.length; i++){
        resets[i].type = "button" ;
        resets[i].classList.add("btn", "btn-primary") ;
        resets[i].innerHTML = "Reset" ;
        resets[i].disabled = true ;
    }

    if(document.getElementsByClassName("image")[0].getAttribute("src") == "/avatar_uploads/noimage.png"){
        remove.disabled = true ;
    } else {
        remove.disabled = false ;
    }

}

// ------ Setting List

var listItem = document.getElementsByClassName("items");
var boxes = document.getElementsByClassName("boxes");

listItem[0].addEventListener("click", function() {
    listItem[0].style.backgroundColor = "#213045";
    boxes[0].style.display = "flex"; 
    
    for(var i=1; i < boxes.length; i++){
        listItem[i].style.backgroundColor = "#2f435e";
        boxes[i].style.display = "none" ;
    }
});

listItem[1].addEventListener("click", function() {    
    for(var i=0; i < boxes.length; i++){
        listItem[i].style.backgroundColor = "#2f435e";
        boxes[i].style.display = "none" ;
    }

    listItem[1].style.backgroundColor = "#213045";
    boxes[1].style.display = "block";
});

listItem[2].addEventListener("click", function() {
    for(var i=0; i < boxes.length; i++){
        listItem[i].style.backgroundColor = "#2f435e";
        boxes[i].style.display = "none" ;
    }

    listItem[2].style.backgroundColor = "#213045";
    boxes[2].style.display = "block";
});

listItem[3].addEventListener("click", function() {
    for(var i=0; i < boxes.length; i++){
        listItem[i].style.backgroundColor = "#2f435e";
        boxes[i].style.display = "none" ;
    }

    listItem[3].style.backgroundColor = "#213045";
    boxes[3].style.display = "block";
});

listItem[4].addEventListener("click", function() {
    listItem[4].style.backgroundColor = "#213045";
    boxes[4].style.display = "block";

    for(var i=0; i < boxes.length -1; i++){
        listItem[i].style.backgroundColor = "#2f435e";
        boxes[i].style.display = "none" ;
    }
});

// ------ Edit List

var listItemEdit = document.getElementsByClassName("items-edit");
var boxesEdit = document.getElementsByClassName("boxes-edit");

listItemEdit[0].addEventListener("click", function() {
    listItemEdit[0].style.backgroundColor = "#213045";
    boxesEdit[0].style.display = "block"; 
    
    for(var i=1; i < boxesEdit.length; i++){
        listItemEdit[i].style.backgroundColor = "#2f435e";
        boxesEdit[i].style.display = "none" ;
    }
});

listItemEdit[1].addEventListener("click", function() {    
    for(var i=0; i < boxesEdit.length; i++){
        listItemEdit[i].style.backgroundColor = "#2f435e";
        boxesEdit[i].style.display = "none" ;
    }

    listItemEdit[1].style.backgroundColor = "#213045";
    boxesEdit[1].style.display = "block";
});

listItemEdit[2].addEventListener("click", function() {
    listItemEdit[2].style.backgroundColor = "#213045";
    boxesEdit[2].style.display = "block";

    for(var i=0; i < boxesEdit.length -1; i++){
        listItemEdit[i].style.backgroundColor = "#2f435e";
        boxesEdit[i].style.display = "none" ;
    }
});

// ---- picture

// function alertPage(title, message) {
//     document.getElementsByClassName("modal-title").innerHTML = title ;
//     document.getElementsByClassName("modal-body").innerHTML = message ;  
// }

var file = inputs[1] ;

var submitPicture = submits[0] ;
var modalTitle = document.getElementsByClassName("modal-title")[0] ;
var modalBody = document.getElementsByClassName("modal-body")[0] ;
var modalFooter = document.getElementsByClassName("modal-footer")[0];

file.addEventListener("change", function(){
    var file = inputs[1].value ;
    var res =  file.toLowerCase().split(".").pop();
    var authorizedMimetypes = ['jpeg', 'jpg', 'png']
    var final = authorizedMimetypes.indexOf(res)
    if(final > -1){
        submitPicture.style.display = "block" ;
        remove.style.display = "none"
        $('#myModal').modal('hide');
    } else {
        submitPicture.style.display = "none" ;
        remove.style.display = "block" ;
        modalTitle.innerHTML = "Error" ;
        modalBody.innerHTML = "Please enter a valid image" ;
        modalFooter.style.display = "none" ;
        $('#myModal').modal('show');
    }
});

remove.addEventListener("click", function(){
    modalTitle.innerHTML = "Confirmation" ;
    modalBody.innerHTML = "Are you Sure you want to Remove your Profile Picture?" ;
    modalFooter.style.display = "flex" ;
    $('#myModal').modal('show');
});

// ----- Bio
var website = inputs[2] ;
var resetBio = resets[0] ;
var formBio = allForms[2] ;
var submitBio = submits[1] ;

about.addEventListener("input", function(){
    resetBio.disabled = false;
    submitBio.disabled = false;
});

$("#about").on('keydown',function(evt) { 
    var textA = about.value ;
    var arrA = textA.replace(/\r\n/g,"\n").split("\n") ;

    if(arrA.length > 3){
        var keycode = evt.charCode || evt.keyCode;
        if (keycode  == 13) { //Enter key's keycode
            return false;
        }
        var lastLine = arrA.pop();
        if(lastLine.length > 25){
            lastLine = lastLine.substring(0, 25);
            finalValue = arrA[0] + "\n" + arrA[1] + "\n" + arrA[2] + "\n" + lastLine;
            about.value = finalValue;
        }    
    }
});

website.addEventListener("input", function(){
    resetBio.disabled = false;
    submitBio.disabled = false;
});

resetBio.addEventListener("click", function(){
    formBio.reset();
    resetBio.disabled = true;
    submitBio.disabled = true;
});

// ------ Details
var name1 = inputs[3] ;
var username = inputs[4] ;
var usernameValue = username.getAttribute("value"); 
var resetDetails = resets[1] ;
var formDetails = allForms[3] ;
var submitDetails = submits[2] ;
var hintDetails = document.getElementsByClassName("hintDetails");

name1.addEventListener("input", function(){
    resetDetails.disabled = false;

    if(name1.value == ""){
        submitDetails.disabled = true ;
        setTimeout(function(){hintDetails[0].innerHTML = "Name cannot be left blank"}, 1000) ;
    } else{
        hintDetails[0].innerHTML = "" ;

        if(username.value == ""){
            submitDetails.disabled = true ;
        } else{
            if(username.value.length <= 4){
                submitDetails.disabled = true ;
            } else{
                submitDetails.disabled = false ;
            }
        }
    }
});

username.addEventListener("input", function() {
    resetDetails.disabled = false;
    usernameSpacing = username.value.replace(" ", "");
    username.value = usernameSpacing.toLowerCase();
    var format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/ ;  
    var result = format.test(username.value) ;

    if(result == true){
        submitDetails.disabled = "true" ;
        hintDetails[1].innerHTML = "Special Characters are not allowed" ;
    } else {
        if(username.value.length <= 4){
            submitDetails.disabled = "true" ;
            if(username.value == ""){
                hintDetails[1].innerHTML = "Username Cannot be left blank" ;
            } else{
                hintDetails[1].innerHTML = "Username Should be minimum 5 characters" ;
            }
        } else{
            hintDetails[1].innerHTML = "";
            
            if(name1.value == ""){
                submitDetails.disabled = true;
            } else {
                submitDetails.disabled = false;
            }
        }
    }
});

submitDetails.addEventListener("click", function(){
    if(username.value == usernameValue){
        username.remove() ;
    }
});

resetDetails.addEventListener("click", function(){
    formDetails.reset() ;
    resetDetails.disabled = true ;
    submitDetails.disabled = true ;
    for(var i=0; i < hintDetails.length; i++){
        hintDetails[i].innerHTML = ""
    }
});

//------ Extra

function websiteAlert(){
    alert('Copy & Paste your Website URL, simply typing it may not work.');
}

// ----- Password

var original = inputs[5] ;
var newPass = inputs[6] ;
var confNew = inputs[7] ;
var minInfo = document.getElementById("minInfo") ;
var hintPass = document.getElementsByClassName("hintPassword") ;
var submitPassword = submits[3] ;

original.addEventListener("input", function(){
    if(original.value == ""){
        newPass.disabled = true;
    } else {
        newPass.disabled = false;
    }
});

newPass.addEventListener("input", function(){
    confNew.value = "" ;
    confNew.style.border = "none" ;
    minInfo.style.display = "block" ;
    hintPass[0].style.display = "none" ;
    hintPass[1].style.display = "none" ;
    submitPassword.disabled = true ;

    if(newPass.value.length <= 7){
        confNew.disabled = true ;
    } else {
        confNew.disabled = false ;
    }
});

newPass.addEventListener("blur", function(){
    if(newPass.value.length <= 7){
        minInfo.style.display = "none" ;
        hintPass[0].style.display = "block" ;
    } else {
        minInfo.style.display = "block" ;
        hintPass[0].style.display = "none" ;
    }
});

confNew.addEventListener("input", function(){
    hintPass[1].style.display = "none" ;
    submitPassword.disabled = false ;

    if(newPass.value == confNew.value){
        confNew.style.border = "1px solid lightgreen" ;
    } else {
        confNew.style.border = "1px solid red" ;
    }
});

confNew.addEventListener("blur", function(){
    if(newPass.value == confNew.value){
        hintPass[1].style.display = "none" ;
    } else {
        submitPassword.disabled = true ;
        hintPass[1].style.display = "block" ;
    }
});



