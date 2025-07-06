// Function to set real viewport height (vh)
function setRealVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// Function to set real viewport width (vw)
function setRealVw() {
  let vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty("--vw", `${vw}px`);
}

setRealVh();
setRealVw();
window.addEventListener("resize", setRealVh);
window.addEventListener("resize", setRealVw);

const scrollBtn = document.querySelector(".scroll-btn");
const mainSection = document.querySelector("main");
const header = document.querySelector(".header-wrapper");
let lastScrollY = window.scrollY;

function handleScrollToMain() {
  if (mainSection) {
    mainSection.scrollIntoView({ behavior: "smooth" });
  }
}

function handleHeaderScroll() {
  if (window.scrollY > lastScrollY) {
    header.style.top = "-80px";
  } else {
    header.style.top = "0";
  }
  lastScrollY = window.scrollY;
}

if (scrollBtn) {
  scrollBtn.addEventListener("click", handleScrollToMain);
}
if (header) {
  window.addEventListener("scroll", handleHeaderScroll);
}

const burger = document.querySelector(".burger-bar");
const mobileMenu = document.getElementById("mobileMenu");
const closeMobileMenuBtn = document.getElementById("closeMobileMenu");

if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    if (mobileMenu.classList.contains("active")) {
      window.removeEventListener("scroll", handleHeaderScroll);
    } else {
      window.addEventListener("scroll", handleHeaderScroll);
    }
  });
}

if (closeMobileMenuBtn && mobileMenu) {
  closeMobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    window.addEventListener("scroll", handleHeaderScroll);
  });
}

window.addEventListener("resize", () => {
  setRealVh();
  setRealVw();
  if (window.innerWidth > 885) {
    if (mobileMenu) {
      mobileMenu.classList.remove("active");
    }
    if (header) {
      window.addEventListener("scroll", handleHeaderScroll);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cookieNotice = document.getElementById("cookie-notice");
  const acceptCookiesBtn = document.getElementById("acceptCookies");
  const closeCookiesBtn = document.querySelector(".close-cookies");

  const cookieAcceptedKey = "cookiesAccepted";

  function checkCookieAcceptance() {
    return (
      typeof Cookies !== "undefined" &&
      Cookies.get(cookieAcceptedKey) === "true"
    );
  }

  function showCookieNotice() {
    if (cookieNotice) {
      cookieNotice.style.display = "flex";
    }
  }

  function hideCookieNotice() {
    if (cookieNotice) {
      cookieNotice.style.display = "none";
    }
  }

  function setCookieAcceptance() {
    if (typeof Cookies !== "undefined") {
      Cookies.set(cookieAcceptedKey, "true", {
        expires: 365,
        secure: true,
        sameSite: "Lax",
      });
    }
    hideCookieNotice();
  }

  if (!checkCookieAcceptance()) {
    showCookieNotice();
  } else {
    hideCookieNotice();
  }

  if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener("click", setCookieAcceptance);
  }

  if (closeCookiesBtn) {
    closeCookiesBtn.addEventListener("click", hideCookieNotice);
  }
});
