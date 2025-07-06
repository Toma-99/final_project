function setRealVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

setRealVh();
window.addEventListener("resize", setRealVh);

const scrollBtn = document.querySelector(".scroll-btn");
const mainSection = document.querySelector("main");

scrollBtn.addEventListener("click", () => {
  mainSection.scrollIntoView({ behavior: "smooth" });
});

let lastScrollY = window.scrollY;
const header = document.querySelector(".header-wrapper");

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    // Scrolling down
    header.style.top = "-80px";
  } else {
    // Scrolling up
    header.style.top = "0";
  }
  lastScrollY = window.scrollY;
});

function setRealVw() {
  let vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty("--vw", `${vw}px`);
}

setRealVw();
window.addEventListener("resize", setRealVw);
