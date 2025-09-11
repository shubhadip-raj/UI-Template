document.addEventListener("DOMContentLoaded", async function () {
    const slides = document.querySelectorAll("#statsSlider .slide");
    let currentSlide = 0;
    const totalSlides = slides.length;
    const intervalTime = 5000;
    let interval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("hidden", i !== index);
            slide.classList.toggle("block", i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function startInterval() {
        interval = setInterval(nextSlide, intervalTime);
    }

    // === Fetch Data from Backend ===
    try {
        const response = await fetch(`${CONFIG.API_URL}/homeData`);
        const data = await response.json();

        // Populate Jobs
        const jobListContainer = document.getElementById("jobListContainer");
        jobListContainer.innerHTML = "";

        data.jobs.forEach(job => {
            const title = job.jobTitle || "No title";
            const salary = job.salary ? `$${job.salary}` : "Salary not listed";
            const company = job.companyName || "Unknown company";
            const location = job.location || "Location not specified";

            const jobCard = `
                <div class="border border-indigo-100 p-5 rounded-xl bg-indigo-50 hover:bg-indigo-100 hover:shadow-lg transition duration-300">
                    <div class="flex items-center justify-between">
                        <h3 class="text-xl font-bold text-indigo-900">${title}</h3>
                        <span class="text-green-600 font-semibold">${salary}</span>
                    </div>
                    <p class="text-gray-600 mt-1">${company} • <span class="italic">${location}</span></p>
                </div>
            `;
            jobListContainer.insertAdjacentHTML("beforeend", jobCard);
        });

        // Populate Stats
        const statsContainer = document.getElementById("statsContainer");
        statsContainer.innerHTML = `
  <div class="p-5 rounded-lg shadow-md hover:shadow-xl transition">
    <h3 class="text-xl font-bold text-blue-700">🚀 ${data.newUsers} New Users</h3>
    <p class="text-sm text-gray-600 mt-1">Joined This Month</p>
  </div>
  <div class=" p-5 rounded-lg shadow-md hover:shadow-xl transition">
    <h3 class="text-xl font-bold text-green-700">📄 ${data.applications} Applications</h3>
    <p class="text-sm text-gray-600 mt-1">Submitted This Month</p>
  </div>
  <div class="p-5 rounded-lg shadow-md hover:shadow-xl transition">
    <h3 class="text-xl font-bold text-purple-700">🏢 ${data.companies} Companies</h3>
    <p class="text-sm text-gray-600 mt-1">Joined Recently</p>
  </div>
`;

        statsContainer.insertAdjacentHTML("beforeend", statsHTML);

        // Refresh slides after data is inserted
        const newSlides = document.querySelectorAll("#statsSlider .slide");
        if (newSlides.length > 0) {
            showSlide(currentSlide);
            startInterval();
        }

    } catch (err) {
        console.error("Failed to load data:", err);
    }
});
