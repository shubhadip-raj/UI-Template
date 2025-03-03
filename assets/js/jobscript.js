const latestJobsContainer = document.getElementById("latest-jobs-container");
const noJobsMessage = document.getElementById("no-jobs");
const defaultLogo = "https://static.vecteezy.com/system/resources/previews/013/899/376/original/cityscape-design-corporation-of-buildings-logo-for-real-estate-business-company-vector.jpg";

// Function to calculate "days ago" for job postings
function calculateDaysAgo(postingDate) {
    const today = new Date();
    const postedDate = new Date(postingDate);
    const difference = Math.floor((today - postedDate) / (1000 * 60 * 60 * 24));

    if (difference < 0) return "Invalid date";
    if (difference === 0) return "Posted today";
    if (difference === 1) return "1 day ago";
    return `${difference} days ago`;
}

// Function to fetch company logo
async function fetchCompanyLogo(companyName) {
    try {
        const response = await fetch(`${CONFIG.API_URL}/logo?companyName=${encodeURIComponent(companyName)}`);
        
        if (!response.ok) throw new Error("Failed to fetch logo");

        const arrayBuffer = await response.arrayBuffer();
        const base64String = btoa(
            new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), "")
        );
        return `data:image/jpeg;base64,${base64String}`;
    } catch (error) {
        console.error(`Error fetching logo for ${companyName}:`, error);
        return defaultLogo; // Fallback logo
    }
}

// Function to display latest jobs
async function displayLatestJobs(jobs) {
    latestJobsContainer.innerHTML = "";

    if (jobs.length === 0) {
        noJobsMessage.style.display = "block";
        return;
    } else {
        noJobsMessage.style.display = "none";
    }

    for (const job of jobs) {
        const logoUrl = await fetchCompanyLogo(job.companyName);

        const jobCard = document.createElement("div");
        jobCard.classList.add("card");

        jobCard.innerHTML = `
            <img src="${logoUrl}" alt="${job.companyName} logo">
            <div class="card-title">${job.jobTitle}</div>
            <div class="card-subtitle">${job.companyName}</div>
            <div>${calculateDaysAgo(job.postingDate)}</div>
        `;

        jobCard.addEventListener("click", () => {
            const params = new URLSearchParams({
                companyName: encodeURIComponent(job.companyName),
                jobId: encodeURIComponent(job.jobId)
            }).toString();
            window.open(`/browse-jobs/job-details?${params}`, '_blank', 'noopener,noreferrer');
        });

        latestJobsContainer.appendChild(jobCard);
    }
}

// Function to fetch job listings
async function fetchJobs(page = 0, size = 10) {
    try {
        const response = await fetch(`${CONFIG.API_URL}/latestJobs?page=${page}&size=${size}`);
        const data = await response.json();
        console.log("Fetched Jobs:", data);

        // Delay display for a better user experience
        setTimeout(() => {
            displayLatestJobs(data.content);
        }, 1000);
    } catch (error) {
        console.error("Error fetching jobs:", error);
    }
}

// Load jobs when the page is ready
document.addEventListener("DOMContentLoaded", () => fetchJobs());
