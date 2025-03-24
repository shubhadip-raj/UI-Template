// Determine the base URL based on the environment
const BASE_URL = window.location.origin.includes("localhost")
    ? "http://localhost:3000"
    : "https://app.jobbox.one";

// Function to handle "Claim HR" button click
function handleClaimHr() {
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

// Function to handle "Join Now" button click
function handleJoinNowClick() {
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

window.onload = function () {
    toggleMenu();

    // Add event listener to "Claim HR" button
    const claimButton = document.querySelector('.claim-button');
    if (claimButton) {
        claimButton.addEventListener('click', handleClaimHr);
    }

    // Add event listener to "Join Now" button
    const joinNowButton = document.querySelector('.join-now-button');
    if (joinNowButton) {
        joinNowButton.addEventListener('click', handleJoinNowClick);
    }
};

// Also update the menu on window resize
window.onresize = function () {
    toggleMenu();
};
