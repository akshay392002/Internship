function validateEmail() {
  var email = document.querySelector(".enter-yout-email").value;

  var pattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/;

  if (pattern.test(email)) {
    alert("Subscribed successfully 🎊🎊🎊");
  } else {
    alert("Oops email is not valid! 😞😞😞");
  }
}

window.onload = function () {
  var button = document.querySelector(".text39");
  button.addEventListener("click", validateEmail);
};
