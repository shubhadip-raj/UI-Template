
document.addEventListener("DOMContentLoaded", function () {
  const companiesnavbar = document.getElementById("companiesnavbar");
  const BASE_URL = window.location.origin.includes("localhost")
      ? "http://localhost:3001"
      : "https://jobbox.one";

      companiesnavbar.setAttribute("href", `${BASE_URL}/companies.html`);
      companiesnavbar.setAttribute("target", "_blank");  // Opens in a new tab
      companiesnavbar.setAttribute("rel", "noopener noreferrer"); // Security best practice
});
