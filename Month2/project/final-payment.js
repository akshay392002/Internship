function validateInputs() {
  var firstName = document.querySelector(".anna2").value;
  var lastName = document.querySelector(".carinn").value;
  var mobileNumber = document.querySelector(".enter-your-emailgmailcom3").value;
  var cardNumber = document.querySelector(".enter-your-emailgmailcom4").value;
  var cvc = document.querySelector(".text-icon6").value;
  var expiryDate = document.querySelector(".text-icon7").value;

  if (
    !firstName ||
    !lastName ||
    !mobileNumber ||
    !cardNumber ||
    !cvc ||
    !expiryDate
  ) {
    alert("Please fill in all fields.🙏🙏🙏");
    return false;
  }

  if (!isNaN(firstName[0]) || !isNaN(lastName[0])) {
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
  var button = document.querySelector(".button29");
  button.addEventListener("click", validateInputs);
});

function validateEmail() {
  var email = document.querySelector(".enter-yout-email2").value;

  var pattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/;

  if (pattern.test(email)) {
    alert("Subscribed successfully 🎊🎊🎊");
  } else {
    alert("Oops email is not valid! 😞😞😞");
  }
}

window.onload = function () {
  var button = document.querySelector(".text114");
  button.addEventListener("click", validateEmail);
};
