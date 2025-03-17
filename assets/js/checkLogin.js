// // Function to get a cookie by name
// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//     return null;
// }

// // Accessing the 'user' and 'token' cookies
// const userCookie = getCookie('user');
// const tokenCookie = getCookie('token');

// console.log('User Cookie:', userCookie);
// console.log('Token Cookie:', tokenCookie);
// // Check for 'user' and 'token' cookies on page load
// // Check for 'user' and 'token' cookies on page load
// window.onload = function() {
//     const userCookie = getCookie('user');
//     const tokenCookie = getCookie('token');

//     // If user and token cookies are set, update UI
//     if (userCookie && tokenCookie) {
//         const user = JSON.parse(userCookie); // Assuming 'user' is stored as a JSON string
//         const authButtons = document.getElementById('authButtons');
//         const userGreeting = document.getElementById('userGreeting');
//         const welcomeMessage = document.getElementById('welcomeMessage');
//         const logoutButton = document.getElementById('logoutButton');
//         const dashboardButton = document.getElementById('dashboardButton');

//         // Hide login/register buttons
//         authButtons.style.display = 'none';

//         // Show welcome message and dashboard button
//         userGreeting.style.display = 'block';
//         welcomeMessage.textContent = `Welcome ${user.userName}`;

//         // Set dashboard link based on user role
//         if (user.userRole === 'HR') {
//             dashboardButton.setAttribute('href', `https://app.jobbox.one/hr-dashboard?userEmail=${encodeURIComponent(user.userEmail)}&userName=${encodeURIComponent(user.userName)}`); // HR dashboard
//         } else if (user.userRole === 'Candidate') {
//             dashboardButton.setAttribute('href', `https://app.jobbox.one/candidate-dashboard?userId=${encodeURIComponent(user.userId)}&userName=${encodeURIComponent(user.userName)}`); // Candidate dashboard
//         }

//         // Add event listener to logout button
//         logoutButton.addEventListener('click', function() {
//             // Clear the cookies
//             document.cookie = 'user=; path=/; domain=jobbox.one; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
//             document.cookie = 'token=; path=/; domain=jobbox.one; expires=Thu, 01 Jan 1970 00:00:00 GMT;';

//             // Reload the page to update the UI
//             window.location.reload();
//         });
//     }
// };






// /// Function to get a cookie by name
// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//     return null;
// }

// // Function to toggle the menus based on screen size and user login status
// function toggleMenu() {
//     const userCookie = getCookie('user');
//     const tokenCookie = getCookie('token');
//     const isMobile = window.innerWidth < 1024;

//     const candidateMenu = document.getElementById('candidateMenu');
//     const welcomeUserMenu = document.getElementById('welcomeUserMenu');
//     const authButtons = document.getElementById('authButtons');
//     const userGreeting = document.getElementById('userGreeting');
//     const welcomeMessage = document.getElementById('welcomeMessage');
//     const logoutButton = document.getElementById('logoutButton');
//     const dashboardButton = document.getElementById('dashboardButton');
//     const welcomeMessage1 = document.getElementById('welcomeMessage1');
//     const logoutButton1 = document.getElementById('logoutButton1');
//     const dashboardButton1 = document.getElementById('dashboardButton1');

//     // "Employee" menu item
//     const employeeMenu = document.getElementById('employeeMenu');

//     // If user and token cookies are set (logged in), update the UI
//     if (userCookie && tokenCookie) {
//         const user = JSON.parse(userCookie); // Assuming 'user' is stored as a JSON string

//         // For mobile view (less than 1024px)
//         if (isMobile) {
//             candidateMenu.style.display = 'none'; // Hide Candidate menu
//             welcomeUserMenu.style.display = 'block'; // Show Welcome User menu
//             employeeMenu.style.display = 'none'; // Hide Employee menu (if user is logged in)
//         } else {
//             // For non-mobile view (desktop or larger screens)
//             candidateMenu.style.display = 'none';
//             welcomeUserMenu.style.display = 'none';
//             employeeMenu.style.display = 'none'; // Hide Employee menu (if user is logged in)
//         }

//         // Hide login/register buttons
//         authButtons.style.display = 'none';

//         // Show welcome message and dashboard button
//         userGreeting.style.display = 'block';
//         welcomeMessage.textContent = `Welcome ${user.userName}`;
//         welcomeMessage1.textContent = `Welcome ${user.userName}`;

//         // Set dashboard link based on user role
//         const dashboardUrl = user.userRole === 'HR' ?
//             `https://app.jobbox.one/hr-dashboard?userEmail=${encodeURIComponent(user.userEmail)}&userName=${encodeURIComponent(user.userName)}` :
//             `https://app.jobbox.one/candidate-dashboard?userId=${encodeURIComponent(user.userId)}&userName=${encodeURIComponent(user.userName)}`;

//         // Set both dashboard buttons
//         dashboardButton.setAttribute('href', dashboardUrl);
//         dashboardButton1.setAttribute('href', dashboardUrl);

//         // Add event listener to logout button
//         const logoutHandler = function () {
//             // Clear the cookies
//             document.cookie = 'user=; path=/; domain=jobbox.one; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
//             document.cookie = 'token=; path=/; domain=jobbox.one; expires=Thu, 01 Jan 1970 00:00:00 GMT;';

//             // Call toggleMenu() to immediately update the UI after logout
//             toggleMenu();
//         };

//         logoutButton.addEventListener('click', logoutHandler);
//         logoutButton1.addEventListener('click', logoutHandler);

//     } else {
//         // If user is not logged in, show "Candidate" menu and hide "Welcome User" menu
//         const candidateMenu = document.getElementById('candidateMenu');
//         const welcomeUserMenu = document.getElementById('welcomeUserMenu');

//         // For mobile view (less than 1024px)
//         if (isMobile) {
//             candidateMenu.style.display = 'block'; // Show Candidate menu on mobile
//             welcomeUserMenu.style.display = 'none'; // Hide Welcome User menu on mobile
//             employeeMenu.style.display = 'block'; // Show Employee menu if user is not logged in
//         } else {
//             // For non-mobile view (desktop or larger screens)
//             candidateMenu.style.display = 'none';
//             welcomeUserMenu.style.display = 'none';
//             employeeMenu.style.display = 'block'; // Show Employee menu if user is not logged in
//         }

//         // Show login/register buttons if user is not logged in
//         authButtons.style.display = 'block'; // Show login/register buttons if not logged in
//     }
// }

// // Ensure the menu is updated on page load
// window.onload = function () {
//     toggleMenu();
// };

// // Also update the menu on window resize
// window.onresize = function () {
//     toggleMenu();
// };




// Function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}
// Function to toggle the menus based on screen size and user login status
function toggleMenu() {
    const userCookie = getCookie('user');
    const tokenCookie = getCookie('token');
    const isMobile = window.innerWidth < 1024;
    const candidateMenu = document.getElementById('candidateMenu');
    const welcomeUserMenu = document.getElementById('welcomeUserMenu');
    const authButtons = document.getElementById('authButtons');
    const userGreeting = document.getElementById('userGreeting');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const logoutButton = document.getElementById('logoutButton');
    const dashboardButton = document.getElementById('dashboardButton');
    const welcomeMessage1 = document.getElementById('welcomeMessage1');
    const logoutButton1 = document.getElementById('logoutButton1');
    const dashboardButton1 = document.getElementById('dashboardButton1');
    // "Employee" menu item
    const employeeMenu = document.getElementById('employeeMenu');
    // If user and token cookies are set (logged in), update the UI
    if (userCookie && tokenCookie) {
        const user = JSON.parse(userCookie); // Assuming 'user' is stored as a JSON string
        // For mobile view (less than 1024px)
        if (isMobile) {
            candidateMenu.style.display = 'none'; // Hide Candidate menu
            welcomeUserMenu.style.display = 'block'; // Show Welcome User menu
            employeeMenu.style.display = 'none'; // Hide Employee menu (if user is logged in)
        } else {
            // For non-mobile view (desktop or larger screens)
            candidateMenu.style.display = 'none';
            welcomeUserMenu.style.display = 'none';
            employeeMenu.style.display = 'none'; // Hide Employee menu (if user is logged in)
        }
        // Hide login/register buttons
        authButtons.style.display = 'none';
        // Show welcome message and dashboard button
        userGreeting.style.display = 'block';
        welcomeMessage.textContent = `Welcome ${user.userName}`;
        welcomeMessage1.textContent = `Welcome ${user.userName}`;
        // Set dashboard link based on user role
        // const dashboardUrl = user.userRole === 'HR' ?
        //     `https://app.jobbox.one/hr-dashboard?userEmail=${encodeURIComponent(user.userEmail)}&userName=${encodeURIComponent(user.userName)}` :
        //     `https://app.jobbox.one/candidate-dashboard?userId=${encodeURIComponent(user.userId)}&userName=${encodeURIComponent(user.userName)}`;
        // Set dashboard link based on user role
        const baseUrl = window.location.hostname === 'localhost'
            ? 'http://localhost:3000' // Local development URL
            : 'https://app.jobbox.one'; // Production URL

        const dashboardUrl = user.userRole === 'HR' ?
            `${baseUrl}/hr-dashboard?userEmail=${encodeURIComponent(user.userEmail)}&userName=${encodeURIComponent(user.userName)}` :
            `${baseUrl}/candidate-dashboard?userId=${encodeURIComponent(user.userId)}&userName=${encodeURIComponent(user.userName)}`;

        // Set both dashboard buttons
        dashboardButton.setAttribute('href', dashboardUrl);
        dashboardButton1.setAttribute('href', dashboardUrl);

        // Show the logout and dashboard buttons by changing their display property
        logoutButton.style.display = 'block';
        dashboardButton.style.display = 'block';
        logoutButton1.style.display = 'block';
        dashboardButton1.style.display = 'block';
        welcomeMessage.style.display = 'block';
        welcomeMessage1.style.display = 'block';
        // Logout event handler inside userGreeting
        const logoutHandler = function () {
            // Clear the cookies
            const domain = window.location.hostname === 'localhost' ? 'localhost' : 'jobbox.one';
            document.cookie = `user=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
            document.cookie = `token=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
            // document.cookie = 'user=; path=/; domain=jobbox.one; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
            // document.cookie = 'token=; path=/; domain=jobbox.one; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
            // Hide user greeting and dashboard button, show login/register buttons
            authButtons.style.display = 'block';  // Show login/register
            userGreeting.style.display = 'none';  // Hide welcome and dashboard
            // Hide the logout and dashboard buttons again
            logoutButton.style.display = 'none';
            dashboardButton.style.display = 'none';
            logoutButton1.style.display = 'none';
            dashboardButton1.style.display = 'none';
            welcomeMessage.style.display = 'none';
            welcomeMessage1.style.display = 'none';

            // Call toggleMenu() to immediately update the UI after logout
            toggleMenu();
        };
        // Add event listeners to logout buttons inside userGreeting
        logoutButton.addEventListener('click', logoutHandler);
        logoutButton1.addEventListener('click', logoutHandler);
    } else {
        // If user is not logged in, show "Candidate" menu and hide "Welcome User" menu
        const candidateMenu = document.getElementById('candidateMenu');
        const welcomeUserMenu = document.getElementById('welcomeUserMenu');
        // For mobile view (less than 1024px)
        if (isMobile) {
            candidateMenu.style.display = 'block'; // Show Candidate menu on mobile
            welcomeUserMenu.style.display = 'none'; // Hide Welcome User menu on mobile
            employeeMenu.style.display = 'block'; // Show Employee menu if user is not logged in
        } else {
            // For non-mobile view (desktop or larger screens)
            candidateMenu.style.display = 'none';
            welcomeUserMenu.style.display = 'none';
            employeeMenu.style.display = 'block'; // Show Employee menu if user is not logged in
        }
        // Show login/register buttons if user is not logged in
        authButtons.style.display = 'block'; // Show login/register buttons if not logged in
        userGreeting.style.display = 'none';  // Hide welcome and dashboard
    }
}
// Ensure the menu is updated on page load
window.onload = function () {
    toggleMenu();
};
// Also update the menu on window resize
window.onresize = function () {
    toggleMenu();
};