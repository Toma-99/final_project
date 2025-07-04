const scrollBtn = document.querySelector(".scroll-btn");
const mainSection = document.querySelector("main");

scrollBtn.addEventListener("click", () => {
  mainSection.scrollIntoView({ behavior: "smooth" });
});
