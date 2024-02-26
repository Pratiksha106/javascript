// script.js
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const closePopupButton = document.getElementById("closePopup");

    overlay.style.display = "flex"; // Show the overlay automatically

    closePopupButton.addEventListener("click", () => {
        overlay.style.display = "none"; // Hide the overlay when the close button is clicked
    });
});
