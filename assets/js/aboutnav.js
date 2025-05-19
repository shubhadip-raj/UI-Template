
document.addEventListener("DOMContentLoaded", function () {
    const aboutLink = document.getElementById("aboutLink");
    const BASE_URL = window.location.origin.includes("localhost")
        ? "http://localhost:3001"
        : "https://jobbox.one";

    aboutLink.setAttribute("href", `${BASE_URL}/about.html`);
    // aboutLink.setAttribute("target", "_blank");  // Opens in a new tab
    aboutLink.setAttribute("rel", "noopener noreferrer"); // Security best practice
});
