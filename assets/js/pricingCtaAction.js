// Determine the base URL based on the environment
const BASE_URL = window.location.origin.includes("localhost")
    ? "http://localhost:3000"
    : "https://app.jobbox.one";

// Function to handle "Claim HR" button click
function handleClaimHr() {
   // console.log("Claim HR button clicked");
    const userCookie = getCookie('user');
    const tokenCookie = getCookie('token');

    if (!userCookie || !tokenCookie || isTokenExpired(tokenCookie)) {
        // User is not logged in
        window.location.href = `${BASE_URL}/hr-sign-in`; // Redirect to sign-in page
    } else {
        // User is logged in
        const user = JSON.parse(userCookie);
        if (user.userRole === 'HR') {
            window.location.href = `${BASE_URL}/hr-dashboard`; // Redirect to HR dashboard
        }
    }
}

// Function to handle "Join Now" button click for Job Seekers
function handleJoinNowClick() {
   // console.log("Join Now button clicked");
    const userCookie = getCookie('user');
    const tokenCookie = getCookie('token');

    if (!userCookie || !tokenCookie || isTokenExpired(tokenCookie)) {
        // User is not logged in
        window.location.href = `${BASE_URL}/signin`; // Redirect to sign-in page
    } else {
        // User is logged in
        const user = JSON.parse(userCookie);
        if (user.userRole === 'Candidate') {
            window.location.href = `${BASE_URL}/candidate-dashboard/payment`; // Redirect to Candidate dashboard
        }
    }
}

// Function to handle "Claim HR" button click in CTA section
function handleHrSeekers() {
   // console.log("Claim HR button clicked in CTA section");
    const userCookie = getCookie('user');
    const tokenCookie = getCookie('token');

    if (!userCookie || !tokenCookie || isTokenExpired(tokenCookie)) {
        // User is not logged in
        window.location.href = `${BASE_URL}/hr-sign-in`; // Redirect to sign-in page
    } else {
        // User is logged in
        const user = JSON.parse(userCookie);
        if (user.userRole === 'HR') {
            window.location.href = `${BASE_URL}/hr-dashboard`; // Redirect to HR dashboard
        }
    }
}

// Function to handle "Create your profile" button click
function handleCandidateSeekers() {
   // console.log("Create your profile button clicked");
    const userCookie = getCookie('user');
    const tokenCookie = getCookie('token');

    if (!userCookie || !tokenCookie || isTokenExpired(tokenCookie)) {
        // User is not logged in
        window.location.href = `${BASE_URL}/signin`; // Redirect to sign-in page
    } else {
        // User is logged in
        const user = JSON.parse(userCookie);
        if (user.userRole === 'Candidate') {
            window.location.href = `${BASE_URL}/candidate-dashboard`; // Redirect to Candidate dashboard
        }
    }
}

// Function to handle "Create your profile" button click in job seekers page
function handleJobSeekers() {
   // console.log("Create your profile button clicked");
    const userCookie = getCookie('user');
    const tokenCookie = getCookie('token');

    if (!userCookie || !tokenCookie || isTokenExpired(tokenCookie)) {
        // User is not logged in
        window.location.href = `${BASE_URL}/candidate-signup`; // Redirect to sign-in page
    } else {
        // User is logged in
        const user = JSON.parse(userCookie);
        if (user.userRole === 'Candidate') {
            window.location.href = `${BASE_URL}/candidate-dashboard`; // Redirect to Candidate dashboard
        }
    }
}

// Function to handle "Create your profile" button click in job seekers page
function handleComapniesHRSeekers() {
   // console.log("Create your profile button clicked");
    const userCookie = getCookie('user');
    const tokenCookie = getCookie('token');

    if (!userCookie || !tokenCookie || isTokenExpired(tokenCookie)) {
        // User is not logged in
        window.location.href = `${BASE_URL}/hr-signup`; // Redirect to sign-in page
    } else {
        // User is logged in
        const user = JSON.parse(userCookie);
        if (user.userRole === 'HR') {
            window.location.href = `${BASE_URL}/hr-dashboard`; // Redirect to Candidate dashboard
        }
    }
}
window.onload = function () {
    toggleMenu();

    // Add event listener to "Claim HR" button in Pricing section
    const claimButton = document.querySelector('.claim-button');
    if (claimButton) {
        claimButton.addEventListener('click', handleClaimHr);
    }

    // Add event listener to "Join Now" button in Pricing section
    const joinNowButton = document.querySelector('.join-now-button');
    if (joinNowButton) {
        joinNowButton.addEventListener('click', handleJoinNowClick);
    }

    // Add event listener to "Claim HR" button in CTA section
    const hrSeekersButton = document.querySelector('.hr-seekers');
    if (hrSeekersButton) {
        hrSeekersButton.addEventListener('click', handleHrSeekers);
    }

    // Add event listener to "Create your profile" button in CTA section
    const candidateSeekersButton = document.querySelector('.candidate-seekers');
    if (candidateSeekersButton) {
        candidateSeekersButton.addEventListener('click', handleCandidateSeekers);
    }

    // Add event listener to "Create your profile" button in jobseekers page
    const jobSeekersButton = document.querySelector('.job-seekers');
    if (jobSeekersButton) {
        jobSeekersButton.addEventListener('click', handleJobSeekers);
    }


     // Add event listener to "Create your profile" button in jobseekers page
     const companiesHRSeekers = document.querySelector('.companies-hr-seekers');
     if (companiesHRSeekers) {
        companiesHRSeekers.addEventListener('click', handleComapniesHRSeekers);
     }
};

// Also update the menu on window resize
window.onresize = function () {
    toggleMenu();
};