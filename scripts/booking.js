const bookCall = document.querySelector(".registration-button");
const bookForm = document.querySelector(".pop-up-wrapper");
const closeBtn = document.querySelector(".pop-up .close-btn");

// Select input elements for the booking form
const username = document.getElementById("usernamefield");
const surname = document.getElementById("surnamefield");
const tel = document.getElementById("telfield");
const email = document.getElementById("emailfield");
const persons = document.getElementById("personsfield");
const room = document.getElementById("roomfield");
const checkin = document.getElementById("checkinfield");
const checkout = document.getElementById("checkoutfield");

// Date for comparison
const today = new Date();
today.setHours(0, 0, 0, 0);
bookCall.addEventListener("click", () => {
  bookForm.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  bookForm.style.display = "none";
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  const nameValue = username.value.trim();
  const surnameValue = surname.value.trim();
  const telValue = tel.value.trim();
  const emailValue = email.value.trim();
  const perValue = persons.value.trim();
  const roomValue = room.value.trim();
  const checkinValue = checkin.value;
  const checkoutValue = checkout.value;

  // --- Name Validation ---
  if (!nameValue) {
    setErrorFor(username, "Name cannot be blank");
  } else {
    setSuccessFor(username);
  }

  // --- Surname Validation ---
  if (!surnameValue) {
    setErrorFor(surname, "Surname cannot be blank");
  } else {
    setSuccessFor(surname);
  }

  // --- Phone Number Validation ---
  if (!telValue) {
    setErrorFor(tel, "Phone number cannot be blank");
  } else if (!isValidnumber(telValue)) {
    setErrorFor(tel, "Phone number must be exactly 10 digits");
  } else if (telValue.length !== 10) {
    setErrorFor(tel, "Phone number length must be 10 digits");
  } else {
    setSuccessFor(tel);
  }

  // --- Email Validation ---
  if (!emailValue) {
    setErrorFor(email, "Email cannot be blank");
  } else if (!isValidEmail(emailValue)) {
    setErrorFor(email, "Email is not valid");
  } else {
    setSuccessFor(email);
  }

  // --- Persons Validation ---
  if (!perValue) {
    setErrorFor(persons, "Number of persons cannot be blank");
  } else if (Number(perValue) < 1) {
    // Ensure it's a number and greater than 0
    setErrorFor(persons, "Number of persons cannot be less than 1");
  } else {
    setSuccessFor(persons);
  }

  // --- Rooms Validation ---
  if (!roomValue) {
    setErrorFor(room, "Room cannot be blank");
  } else {
    setSuccessFor(room);
  }

  const checkinDate = new Date(checkinValue);
  const checkoutDate = new Date(checkoutValue);

  // --- Check-in Date Validation ---
  if (!checkinValue) {
    setErrorFor(checkin, "Check-in date cannot be blank");
  } else if (checkinDate < today) {
    setErrorFor(checkin, "Check-in date cannot be in the past");
  } else {
    setSuccessFor(checkin);
  }

  // --- Check-out Date Validation ---
  if (!checkoutValue) {
    setErrorFor(checkout, "Check-out date cannot be blank");
  } else if (checkoutDate <= checkinDate) {
    setErrorFor(checkout, "Check-out date must be after check-in date");
  } else {
    setSuccessFor(checkout);
  }
}

const setErrorFor = (input, message) => {
  const inputContainer = input.parentElement;
  const small = inputContainer.querySelector("small");
  const successIcon = inputContainer.querySelector(".fa-check-circle");
  const errorIcon = inputContainer.querySelector(".fa-exclamation-circle");

  small.innerText = message;
  inputContainer.className = "input-container error";

  if (successIcon) successIcon.style.visibility = "hidden";
  if (errorIcon) errorIcon.style.visibility = "visible";
};

const setSuccessFor = (input) => {
  const inputContainer = input.parentElement;
  const small = inputContainer.querySelector("small");
  const successIcon = inputContainer.querySelector(".fa-check-circle");
  const errorIcon = inputContainer.querySelector(".fa-exclamation-circle");

  small.innerText = "";
  inputContainer.className = "input-container success";

  // Explicitly manage icon visibility
  if (successIcon) successIcon.style.visibility = "visible";
  if (errorIcon) errorIcon.style.visibility = "hidden";
};

// --- Email Regex Validation
const isValidEmail = (email) => {
  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailReg.test(email);
};

// --- Phone Number Regex Validation
const isValidnumber = (tel) => {
  const numReg = /^\d{10}$/; // This regex ensures exactly 10 digits
  return numReg.test(tel);
};
