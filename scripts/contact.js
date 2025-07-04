const forms = document.querySelector(".help-options");

const username = document.getElementById("fname");
const email = document.getElementById("email");
const message = document.getElementById("messege");

forms.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  const nameValue = username.value.trim();
  const emailValue = email.value.trim();
  const messageValue = message.value.trim();

  if (!nameValue) {
    setErrorFor(fname, "Name cannot be emtpy");
  } else {
    setSuccessFor(fname);
  }

  if (!emailValue) {
    setErrorFor(email, "Email cannot be blank");
  } else if (!isValidEmail(emailValue)) {
    setErrorFor(email, "Email is not valid");
  } else {
    setSuccessFor(email);
  }

  if (!messageValue) {
    setErrorFor(message, "You must enter messege");
  } else {
    setSuccessFor(message);
  }
}
function setErrorFor(input, message) {
  const inputContainer = input.parentElement;
  const small = inputContainer.querySelector("small");
  const successIcon = inputContainer.querySelector(".fa-check-circle");
  const errorIcon = inputContainer.querySelector(".fa-exclamation-circle");

  inputContainer.classList.remove("success");
  inputContainer.classList.add("error");

  small.innerText = message;

  if (successIcon) successIcon.style.visibility = "hidden";
  if (errorIcon) {
    errorIcon.style.visibility = "visible";
    small.style.visibility = "visible";
  }
}

function setSuccessFor(input) {
  const inputContainer = input.parentElement;
  const small = inputContainer.querySelector("small");
  const successIcon = inputContainer.querySelector(".fa-check-circle");
  const errorIcon = inputContainer.querySelector(".fa-exclamation-circle");

  inputContainer.classList.remove("error");
  inputContainer.classList.add("success");

  small.innerText = "";

  if (successIcon) successIcon.style.visibility = "visible";
  if (errorIcon) errorIcon.style.visibility = "hidden";
}

const isValidEmail = (email) => {
  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailReg.test(email);
};
