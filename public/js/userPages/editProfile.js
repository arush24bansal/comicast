var list1 = document.getElementById("pictureList");
var list2 = document.getElementById("bioList");
var list3 = document.getElementById("detailsList");
var box1 = document.getElementById("pictureBox");
var box2 = document.getElementById("bioBox");
var box3 = document.getElementById("detailsBox");
var file = document.getElementById("file");
var remove = document.getElementById("remove");
var submit = document.getElementById("submit");
var removeLink = remove.getAttribute("href");
var about = document.getElementById("about");
var website = document.getElementById("website");
var reset = document.getElementById("reset");
var form2 = document.getElementById("bioForm");
var submit2 = document.getElementById("submit2");

list1.addEventListener("click", function() {
    list1.style.backgroundColor = "#213045";
    box1.style.display = "block";
    list2.style.backgroundColor = "#2f435e";
    box2.style.display = "none";
    list3.style.backgroundColor = "#2f435e";
    box3.style.display = "none";
})

list2.addEventListener("click", function() {
    list2.style.backgroundColor = "#213045";
    box2.style.display = "block";
    list1.style.backgroundColor = "#2f435e";
    box1.style.display = "none";
    list3.style.backgroundColor = "#2f435e";
    box3.style.display = "none";
})

list3.addEventListener("click", function() {
    list3.style.backgroundColor = "#213045";
    box3.style.display = "block";
    list2.style.backgroundColor = "#2f435e";
    box2.style.display = "none";
    list1.style.backgroundColor = "#2f435e";
    box1.style.display = "none";
})

file.addEventListener("input", function(){
    if ($('#file')[0].files.length === 0) { 
        submit.style.display = "none";
        remove.style.display = "block";
    } else { 
        submit.style.display = "block";
        remove.style.display = "none";
    } 
}); 

remove.addEventListener("click", function(){
    var res = confirm("Deleting your Profile Picture. Go Ahead?");
    if (res == true) {
        remove.href = removeLink;
    } else {
        remove.removeAttribute("href");
    }
});

about.addEventListener("keyup", function(){
    reset.disabled = false;
    submit2.disabled = false;
})

website.addEventListener("keyup", function(){
    reset.disabled = false;
    submit2.disabled = false;
})

function onClick(){
    form2.reset();
    reset.disabled = true;
    submit2.disabled = true;
}
