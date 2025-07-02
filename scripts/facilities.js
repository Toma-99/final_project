const targetBtn = document.querySelectorAll(".first-btn");

targetBtn.forEach((button, index) => {
  let isClicked = false; // Separate state for each button

  button.addEventListener("click", () => {
    const roomContent = button.closest(".room-content");
    const facilitiesContainer = roomContent.querySelector(".room-facilities");

    if (!isClicked) {
      button.innerHTML = "Show Less";
      button.style.background = "red";
      facilitiesContainer.innerHTML = "Loading facilities...";

      fetch("https://dummyjson.com/c/2395-b587-4a39-b1eb")
        .then((response) => response.json())
        .then((data) => {
          const roomKey = `room${index + 1}`;
          const facilities = data[roomKey];

          if (facilities) {
            let ul = document.createElement("ul");
            facilities.forEach((item) => {
              let li = document.createElement("li");
              li.textContent = item;
              ul.appendChild(li);
            });
            facilitiesContainer.innerHTML = "";
            facilitiesContainer.appendChild(ul);
          } else {
            facilitiesContainer.innerHTML = "No facilities found.";
          }
        })
        .catch((error) => {
          facilitiesContainer.innerHTML = "Failed to load facilities.";
          console.error("Fetch error:", error);
        });

      isClicked = true;
    } else {
      button.innerHTML = "Facilities";
      button.style.background = "darkgoldenrod";
      facilitiesContainer.innerHTML = "";
      isClicked = false;
    }
  });
});
