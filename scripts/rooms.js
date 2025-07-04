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
            targetBtn.style.background = "red";

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

// targetBtn.forEach((button, index) => {
//   let isClicked = false; // Separate state for each button

//   button.addEventListener("click", () => {
//     const roomContent = button.closest(".room-content");
//     const facilitiesContainer = roomContent.querySelector(".room-facilities");

//     if (!isClicked) {
//       button.innerHTML = "Show Less";
//       button.style.background = "red";
//       facilitiesContainer.innerHTML = "Loading facilities...";

//       fetch("https://dummyjson.com/c/2395-b587-4a39-b1eb")
//         .then((response) => response.json())
//         .then((data) => {
//           const roomKey = `room${index + 1}`;
//           const facilities = data[roomKey];

//           if (facilities) {
//             let ul = document.createElement("ul");
//             facilities.forEach((item) => {
//               let li = document.createElement("li");
//               li.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${item}`;
//               ul.appendChild(li);
//             });
//             facilitiesContainer.innerHTML = "";
//             facilitiesContainer.appendChild(ul);
//           } else {
//             facilitiesContainer.innerHTML = "No facilities found.";
//           }
//         })
//         .catch((error) => {
//           facilitiesContainer.innerHTML = "Failed to load facilities.";
//           console.error("Fetch error:", error);
//         });

//       isClicked = true;
//     } else {
//       button.innerHTML = "Facilities";
//       button.style.background = "darkgoldenrod";
//       facilitiesContainer.innerHTML = "";
//       isClicked = false;
//     }
//   });
// });
