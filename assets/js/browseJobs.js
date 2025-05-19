 document.addEventListener("DOMContentLoaded", function () {
      const browseJobsLink = document.getElementById("browseJobsLink");
      const baseUrl = window.location.hostname === "localhost"
        ? "http://localhost:3000/browse-jobs"
        : "https://app.jobbox.one/browse-jobs";

      browseJobsLink.href = baseUrl;
      browseJobsLink.setAttribute("target","_black")
    });