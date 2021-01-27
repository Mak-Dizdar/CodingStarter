function validation() {
    var fullname = document.getElementById('fullname').value;
    var message = document.getElementById('message').value;
    var text = '';

    if (fullname.length < 2) {
        document.getElementById('error').innerHTML = 'Name should be more than 2 letters';
        return false;
    }

    if (message.length < 50) {
        document.getElementById('error').innerHTML = 'Message should be more than  50 letters';
        return false;
    } else {
        document.getElementById('error').innerHTML = 'Your message is succesfully sent';
        return false;
    }
}