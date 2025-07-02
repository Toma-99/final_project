const forms = document.querySelector(".help-options");

const username = document.getElementById("fname");
const email = document.getElementById("email");
const message = document.getElementById("messege");

forms.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  const nameValue = fname.value.trim();
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
}
