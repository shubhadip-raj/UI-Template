const latestJobsContainer = document.getElementById("latest-jobs-container");
const noJobsMessage = document.getElementById("no-jobs");
const defaultLogo = "https://static.vecteezy.com/system/resources/previews/013/899/376/original/cityscape-design-corporation-of-buildings-logo-for-real-estate-business-company-vector.jpg";

// // Function to calculate "days ago" for job postings
// function calculateDaysAgo(postingDate) {
//     const today = new Date();
//     const postedDate = new Date(postingDate);
//     const difference = Math.floor((today - postedDate) / (1000 * 60 * 60 * 24));

//     if (difference < 0) return "Invalid date";
//     if (difference === 0) return "Posted today";
//     if (difference === 1) return "1 day ago";
//     return `${difference} days ago`;
// }

// Function to calculate days ago text
function calculateDaysAgo(postingDate) {
    const today = new Date();
    const postDate = new Date(postingDate);
    const timeDiff = today - postDate; // Difference in milliseconds
    const daysAgo = Math.floor(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

    // If the job is within 7 days, show "X days ago"
    if (daysAgo <= 7) {
        return `${daysAgo} days ago`;
    }

    // If the job is older than 7 days, show "> 7 days ago"
    return "> 7 days ago";
};

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

        // Add styles similar to the second card (React component)
        jobCard.style.width = '100%';
        jobCard.style.maxWidth = '250px';
        jobCard.style.margin = '10px';
        jobCard.style.paddingTop = '0px';
        jobCard.style.boxSizing = 'border-box';
        jobCard.style.position = 'relative'; // For logo positioning

        jobCard.innerHTML = `
            <img src="${logoUrl}" alt="${job.companyName} logo" style="width: 30%; height: 40px; position: absolute; top: 5px; right: 10px; cursor: pointer;">
            <div class="card-body">
                <div class="card-subtitle" style="font-weight: bold; font-size: 16px; cursor: pointer;">
                    ${job.companyName}
                </div>
                <div class="card-title" style="margin-top: 40px; font-size: 12px; cursor: pointer;">
                    ${job.jobTitle}
                </div>
                <div class="card-text" style="font-size: ${calculateDaysAgo(job.postingDate) === '> 7 days ago' ? '10px' : '14px'}; margin-right: 150px">
                    ${calculateDaysAgo(job.postingDate)}
                </div>
            </div>
        `;
        const baseUrl = window.location.hostname === "localhost"
            ? "http://localhost:3000"
            : "https://app.jobbox.one";

        // Add event listener for logo click (similar to redirect logic in React component)
        jobCard.querySelector("img").addEventListener("click", () => {
            const companyUrl = `${baseUrl}/companyPage/companyName/${encodeURIComponent(job.companyName)}`;
            window.open(companyUrl, '_blank', 'noopener,noreferrer');
        });

        // Add event listener for company name click
        jobCard.querySelector(".card-subtitle").addEventListener("click", () => {
            const companyUrl = `${baseUrl}/companyPage/companyName/${encodeURIComponent(job.companyName)}`;
            window.open(companyUrl, '_blank', 'noopener,noreferrer');
        });

        // // Add event listener for job title click
        // jobCard.querySelector(".card-title").addEventListener("click", () => {
        //     const jobUrl = `${baseUrl}/browse-jobs/job-details`;
        //     const params = new URLSearchParams({
        //         companyName: encodeURIComponent(job.companyName || ''),
        //         jobId: encodeURIComponent(job.jobId || ''),
        //     }).toString();
        //     const fullUrl = `${jobUrl}?${params}`;
        //     window.open(fullUrl, '_blank', 'noopener,noreferrer');
        // });
        // Add event listener for job title click
        jobCard.querySelector(".card-title").addEventListener("click", () => {
             const slug = `${job.jobId}-${job.jobTitle.replace(/\s+/g, '-').toLowerCase()}-${job.companyName.replace(/\s+/g, '-').toLowerCase()}`;
            const fullUrl = `${baseUrl}/browse-jobs/job-details/${slug}`;
            window.open(fullUrl, '_blank', 'noopener,noreferrer');
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
