// Function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Accessing the 'user' and 'token' cookies
const userCookie = getCookie('user');
const tokenCookie = getCookie('token');

console.log('User Cookie:', userCookie);
console.log('Token Cookie:', tokenCookie);
// Check for 'user' and 'token' cookies on page load
// Check for 'user' and 'token' cookies on page load
window.onload = function() {
    const userCookie = getCookie('user');
    const tokenCookie = getCookie('token');

    // If user and token cookies are set, update UI
    if (userCookie && tokenCookie) {
        const user = JSON.parse(userCookie); // Assuming 'user' is stored as a JSON string
        const authButtons = document.getElementById('authButtons');
        const userGreeting = document.getElementById('userGreeting');
        const welcomeMessage = document.getElementById('welcomeMessage');
        const logoutButton = document.getElementById('logoutButton');
        const dashboardButton = document.getElementById('dashboardButton');

        // Hide login/register buttons
        authButtons.style.display = 'none';

        // Show welcome message and dashboard button
        userGreeting.style.display = 'block';
        welcomeMessage.textContent = `Welcome ${user.userName}`;

        // Set dashboard link based on user role
        if (user.userRole === 'HR') {
            dashboardButton.setAttribute('href', `https://app.jobbox.one/hr-dashboard?userEmail=${encodeURIComponent(user.userEmail)}&userName=${encodeURIComponent(user.userName)}`); // HR dashboard
        } else if (user.userRole === 'Candidate') {
            dashboardButton.setAttribute('href', `https://app.jobbox.one/candidate-dashboard?userId=${encodeURIComponent(user.userId)}&userName=${encodeURIComponent(user.userName)}`); // Candidate dashboard
        }

        // Add event listener to logout button
        logoutButton.addEventListener('click', function() {
            // Clear the cookies
            document.cookie = 'user=; path=/; domain=jobbox.one; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
            document.cookie = 'token=; path=/; domain=jobbox.one; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
            
            // Reload the page to update the UI
            window.location.reload();
        });
    }
};