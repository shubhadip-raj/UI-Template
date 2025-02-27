function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => document.getElementById(id).innerHTML = data)
        .catch(error => console.error(`Error loading ${file}:`, error));
}

// Load common components
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("navbar", "navbar.html");
    loadComponent("footer", "footer.html");
});
