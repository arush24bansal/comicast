var check = function() {
    if (document.getElementById('password').value == document.getElementById('confirm_password').value) {
        document.getElementById('confirm_password').style.border = '1px solid lightgreen';
    } else {
        document.getElementById('confirm_password').style.border = '1px solid red';
    }
}