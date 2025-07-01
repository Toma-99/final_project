const bookCall = document.querySelector(".registration-button");
const bookForm = document.querySelector(".pop-up-wrapper");
const closeBtn = document.querySelector(".pop-up .close-btn");

bookCall.addEventListener("click", () => {
  bookForm.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  bookForm.style.display = "none";
});

let formEl = document.querySelector(".book.form");

formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  let errors = {};

  let username = document.getElementById("usernamefield").value;
  if (username === "") {
    errors.username = "Username field cannot be empty";
  }

  let surname = document.getElementById("surnamefield").value;
  if (surname === "") {
    errors.surname = "Surname field cannot be empty";
  }

  let phonenumber = document.getElementById("telfield").value;
  if (phonenumber === "") {
    errors.tel = "Phone number is required";
  } else if (isNaN(phonenumber)) {
    errors.tel = "Phone number must be numeric";
  } else if (phonenumber.length < 10) {
    errors.tel = "Phone number must be at least 10 digits";
  }

  let email = document.getElementById("emailfield").value;
  let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email === "") {
    errors.email = "Email is required";
  } else if (!pattern.test(email)) {
    errors.email = "Invalid email format";
  }

  let person = document.getElementById("personsfield").value;
  if (person === "" || person === "0") {
    errors.persons = "Please enter number of persons (1–3)";
  }

  let room = document.getElementById("roomfield").value;
  if (room === "") {
    errors.room = "Room selection is required";
  }

  let checkinValue = document.getElementById("checkinfield").value;
  let checkinDate = new Date(checkinValue);
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  if (checkinValue === "") {
    errors.checkin = "Check-in date is required";
  } else if (checkinDate < today) {
    errors.checkin = "Check-in cannot be in the past";
  }

  let checkoutValue = document.getElementById("checkoutfield").value;
  let checkoutDate = new Date(checkoutValue);
  checkoutDate.setHours(0, 0, 0, 0);

  if (checkoutValue === "") {
    errors.checkout = "Check-out date is required";
  } else if (checkoutDate <= checkinDate) {
    errors.checkout = "Check-out must be after check-in";
  }

  let agree = document.getElementById("check").checked;
  if (!agree) {
    errors.agree = "You must agree to the terms";
  }

  // Clear previous errors
  this.querySelectorAll(".error-text").forEach((element) => {
    element.textContent = "";
  });

  for (let key in errors) {
    const errorElement = document.getElementById("error-" + key);
    if (errorElement) {
      errorElement.textContent = errors[key];
    }
  }

  if (Object.keys(errors).length === 0) {
    this.submit(); // Or send data via AJAX
  }
});
