function validateInputs() {
  var firstName = document.querySelector(".input-14").value;
  var middleName = document.querySelector(".input-18").value;
  var lastName = document.querySelector(".input-112").value;
  var mobileNumber = document.querySelector(".enter-your-emailgmailcom1").value;
  var cardNumber = document.querySelector(".enter-your-emailgmailcom2").value;
  var cvc = document.querySelector(".text90").value;
  var expiryDate = document.querySelector(".text89").value;
  var email = document.querySelector(".enter-your-emailgmailcom").value;
  var country = document.querySelector(".text71").value;
  var fullName = document.querySelector(".text86").value;

  if (
    !firstName ||
    !middleName ||
    !lastName ||
    !mobileNumber ||
    !cardNumber ||
    !cvc ||
    !expiryDate ||
    !email ||
    !country ||
    !fullName
  ) {
    alert("Please fill in all fields.🙏🙏🙏");
    return false;
  }

  if (
    !isNaN(firstName[0]) ||
    !isNaN(lastName[0] || !isNaN(fullName[0] || isNaN(middleName[0])))
  ) {
    alert("Name should not start with a number.🔢🔢🔢");
    return false;
  }

  if (mobileNumber[0] === "0" || mobileNumber.length !== 10) {
    alert(
      "Mobile number should not start with 0 and should have 10 numbers.🔢🔢🔢"
    );
    return false;
  }

  var regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(expiryDate)) {
    alert("Expiry date should be in the MM/YY format.🗓️🗓️🗓️");
    return false;
  }

  var pattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/;

  if (!pattern.test(email)) {
    alert("Email not correct");
  }

  var expiryMonth = parseInt(expiryDate.split("/")[0]);
  var expiryYear = parseInt(expiryDate.split("/")[1]);

  var currentDate = new Date();
  var currentMonth = currentDate.getMonth() + 1;
  var currentYear = currentDate.getFullYear() % 100;

  if (
    expiryYear < currentYear ||
    (expiryYear == currentYear && expiryMonth < currentMonth)
  ) {
    alert("Expiry date should be in the future.📅📅📅");
    return false;
  }
  alert("You're good to go.🏎️🏎️🏎️");
  return true;
}
document.addEventListener("DOMContentLoaded", function () {
  var button = document.querySelector(".button24");
  button.addEventListener("click", validateInputs);
});

function validateEmail() {
  var email = document.querySelector(".enter-yout-email1").value;

  var pattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/;

  if (pattern.test(email)) {
    alert("Subscribed successfully 🎊🎊🎊");
  } else {
    alert("Oops email is not valid! 😞😞😞");
  }
}

window.onload = function () {
  var button = document.querySelector(".text96");
  button.addEventListener("click", validateEmail);
};
