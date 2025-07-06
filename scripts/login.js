const loginForm = document.getElementById("login");
const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", () => {
  loginForm.innerHTML = "";

  const workForm = document.createElement("form");
  workForm.classList.add("login-fields");
  workForm.id = "login-fields";
  workForm.action = "";

  const exitBtn = document.createElement("button");
  exitBtn.setAttribute("aria-label", "Close Login Form");
  exitBtn.classList.add("close-btn");
  exitBtn.innerHTML = "&times;";

  const header = document.createElement("h3");
  header.textContent = "Login";

  // === EMAIL FIELD ===
  const emailDiv = document.createElement("div");
  emailDiv.classList.add("email-wrapper", "form-control");

  const emailLabel = document.createElement("label");
  emailLabel.setAttribute("for", "email");
  emailLabel.textContent = "Email:";

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.name = "email";
  emailInput.id = "email";
  emailInput.classList.add("email");

  const emailIcon = document.createElement("i");
  emailIcon.classList.add("fa-solid", "fa-exclamation");
  emailIcon.style.visibility = "hidden";

  const emailError = document.createElement("small");
  emailError.innerHTML = "";

  emailDiv.append(emailLabel, emailInput, emailIcon, emailError);

  // === PASSWORD FIELD ===
  const passDiv = document.createElement("div");
  passDiv.classList.add("password-wrapper", "form-control");

  const passLabel = document.createElement("label");
  passLabel.setAttribute("for", "password");
  passLabel.textContent = "Password:";

  const passInput = document.createElement("input");
  passInput.type = "password";
  passInput.name = "password";
  passInput.id = "password";
  passInput.classList.add("password");

  const passIcon = document.createElement("i");
  passIcon.classList.add("fa-solid", "fa-exclamation");
  passIcon.style.visibility = "hidden";

  const showPass = document.createElement("i");
  showPass.classList.add("far", "fa-eye");
  showPass.id = "show";

  const hidePass = document.createElement("i");
  hidePass.classList.add("far", "fa-eye-slash");
  hidePass.id = "hide";
  hidePass.style.visibility = "hidden";

  const passError = document.createElement("small");
  passError.innerHTML = "";

  passDiv.append(passLabel, passInput, passIcon, showPass, hidePass, passError);

  // === SUBMIT BUTTON ===
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Login";
  submitBtn.classList.add("login-submit");

  // === ASSEMBLE FORM ===
  workForm.append(header, emailDiv, passDiv, submitBtn);
  loginForm.append(exitBtn, workForm);
  loginForm.style.display = "block";

  // === Close Form ===
  exitBtn.addEventListener("click", () => {
    loginForm.innerHTML = "";
    loginForm.style.display = "none";
  });

  // === Submit Handler ===
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
  });

  // === Password Toggle
  showPass.addEventListener("click", togglePassword);
  hidePass.addEventListener("click", togglePassword);

  // === Functions ===

  function checkInputs() {
    const emailValue = emailInput.value.trim();
    const passwordValue = passInput.value.trim();

    // Check email
    if (!emailValue) {
      setErrorFor(
        emailDiv,
        emailInput,
        emailIcon,
        emailError,
        "Email cannot be blank"
      );
    } else if (!isEmail(emailValue)) {
      setErrorFor(
        emailDiv,
        emailInput,
        emailIcon,
        emailError,
        "Invalid email format"
      );
    } else {
      setSuccessFor(emailInput, emailIcon, emailError);
    }

    // Check password
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!passwordValue) {
      setErrorFor(
        passDiv,
        passInput,
        passIcon,
        passError,
        "Password cannot be blank"
      );
    } else if (passwordValue.length < 8) {
      setErrorFor(
        passDiv,
        passInput,
        passIcon,
        passError,
        "Password too short"
      );
    } else if (!re.test(passwordValue)) {
      setErrorFor(
        passDiv,
        passInput,
        passIcon,
        passError,
        "Must contain upper, lower and number"
      );
    } else {
      setSuccessFor(passInput, passIcon, passError);
    }
  }

  function setErrorFor(wrapperDiv, inputEl, iconEl, smallEl, message) {
    smallEl.innerText = message;
    wrapperDiv.classList.add("error");
    wrapperDiv.classList.remove("success");
    iconEl.style.visibility = "visible";
    iconEl.style.color = "red";
  }

  function setSuccessFor(inputEl, iconEl, smallEl) {
    const wrapperDiv = inputEl.closest(".form-control");
    smallEl.innerText = "";
    wrapperDiv.classList.remove("error");
    wrapperDiv.classList.add("success");
    iconEl.style.visibility = "hidden";
  }

  function isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function togglePassword() {
    const isHidden = passInput.type === "password";
    passInput.type = isHidden ? "text" : "password";
    showPass.style.visibility = isHidden ? "hidden" : "visible";
    hidePass.style.visibility = isHidden ? "visible" : "hidden";
  }
});
