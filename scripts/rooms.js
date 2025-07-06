fetch("https://dummyjson.com/c/c27e-e412-4c2b-86b5")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((room, index) => {
      const roomKey = `rooms${index + 1}`;
      const container = document.getElementById(roomKey);
      const line1 = container.querySelector(".line1");
      const descTxt = container.querySelector(".desc-txt");
      const targetBtn = container.querySelector(".first-btn");

      if (container && line1 && descTxt && targetBtn) {
        // Room data elements
        const header = document.createElement("h3");
        header.textContent = room.roomName;

        const price = document.createElement("p");
        price.textContent = `€${room.price}`;

        const desc = document.createElement("p");
        desc.textContent = room.description;

        // Clear and append
        line1.innerHTML = "";
        line1.appendChild(header);
        line1.appendChild(price);
        descTxt.innerHTML = "";
        descTxt.appendChild(desc);

        // Create the facilities container ONCE, append to descTxt
        let facilitiesContainer = document.createElement("div");
        facilitiesContainer.classList.add("room-facilities");
        descTxt.appendChild(facilitiesContainer);

        let isClicked = false;

        targetBtn.addEventListener("click", () => {
          if (!isClicked) {
            targetBtn.textContent = "Show Less";

            // Fill facilitiesContainer
            const ul = document.createElement("ul");
            room.facilities.forEach((item) => {
              const li = document.createElement("li");
              li.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${item}`;
              ul.appendChild(li);
            });

            facilitiesContainer.innerHTML = "";
            facilitiesContainer.appendChild(ul);

            isClicked = true;
          } else {
            // Hide facilities (clear container content)
            facilitiesContainer.innerHTML = "";
            targetBtn.textContent = "Facilities";
            targetBtn.style.background = "darkgoldenrod";
            isClicked = false;
          }
        });
      } else {
        console.warn(`Missing elements in ${roomKey}`);
      }
    });
  })
  .catch((error) => {
    console.error("Failed to load room data:", error);
    document.querySelectorAll(".room-content").forEach((c) => {
      c.innerHTML = "Failed to load data.";
    });
  });
