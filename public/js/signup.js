function myFunction() {
    var x = document.getElementById("pass");
    var y = document.getElementById("confirm");
    if (x.type === "password" && y.type ==="password") {
      x.type = "text";
      y.type = "text";
    } 
    else {
      x.type = "password";
      y.type = "password";
    }
  }

function check() {
    var pass = document.getElementById("pass")
    var confirm = document.getElementById("confirm")
  
    if( pass.value != confirm.value)
    {
        window.alert("Password doesn't Match please input correct password.")
    }
}