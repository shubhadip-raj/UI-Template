// document.addEventListener("DOMContentLoaded", function() {
//     // Retrieve user and token from localStorage
//     // const loggedInUser = JSON.parse(localStorage.getItem('user'));
//     // const token = localStorage.getItem('token');
//     function getCookie(name) {
//         let value = "; " + document.cookie;
//         let parts = value.split("; " + name + "=");
//         if (parts.length === 2) return parts.pop().split(";").shift();
//         return null;
//     }
    
//     // Get the 'user' cookie
//     const userCookie = getCookie('user');
//     const tokenCookie = getCookie('token');
    
//     if (userCookie) {
//         const user = JSON.parse(userCookie);
//         console.log("User:", user);
//     } else {
//         console.log("User cookie not found.");
//     }
    
//     if (tokenCookie) {
//         console.log("Token:", tokenCookie);
//     } else {
//         console.log("Token cookie not found.");
//     }
    
    
//     const loggedInUser = JSON.parse(getCookie('user'));
//     const token = getCookie('token');
    
//   console.log(loggedInUser);
//     // Check if both user and token are present, indicating a logged-in state
//     if (loggedInUser && loggedInUser.userName && token) {
//       // Show the "Go to Dashboard" button
//       document.getElementById("goToDashboardBtn").style.display = 'block';
//       document.getElementById("goToDashboardBtnCandidate").style.display = 'block';
  
//       // Hide Register and Login options
//       document.querySelectorAll(".submenu-item a[href*='signup'], .submenu-item a[href*='signin']").forEach(function(link) {
//         link.style.display = 'none';
//       });
  
//       // Add event listener for dashboard button
//       const goToDashboardBtn = document.getElementById("goToDashboardBtn");
//       const goToDashboardBtnCandidate = document.getElementById("goToDashboardBtnCandidate");
  
//       goToDashboardBtn.addEventListener('click', function() {
//         // Navigate to HR dashboard if user is HR
//         if (loggedInUser.userRole === 'HR' && loggedInUser.userStatus === 'Approved') {
//           window.location.href = '/hr-dashboard';
//         } else if (loggedInUser.userRole === 'Candidate') {
//           // Navigate to candidate dashboard if user is Candidate
//           window.location.href = '/candidate-dashboard';
//         }
//       });
  
//       goToDashboardBtnCandidate.addEventListener('click', function() {
//         // Navigate to candidate dashboard if user is Candidate
//         if (loggedInUser.userRole === 'Candidate') {
//           window.location.href = '/candidate-dashboard';
//         }
//       });
//     } else {
//       // If no user or token, show Register/Login options
//       document.querySelectorAll(".submenu-item a[href*='signup'], .submenu-item a[href*='signin']").forEach(function(link) {
//         link.style.display = 'block';
//       });
//     }
//   });
  


document.addEventListener("DOMContentLoaded", function() {
    // Function to retrieve a cookie by name
    function getCookie(name) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    }

    // Retrieve user and token from cookies
    const userCookie = getCookie('user');
    const tokenCookie = getCookie('token');

    // Check if both cookies exist
    if (userCookie && tokenCookie) {
        const loggedInUser = JSON.parse(userCookie);
        console.log("User:", loggedInUser);

        // Show the "Go to Dashboard" buttons
        document.getElementById("goToDashboardBtn").style.display = 'block';
        document.getElementById("goToDashboardBtnCandidate").style.display = 'block';

        // Hide Register and Login options
        document.querySelectorAll(".submenu-item a[href*='signup'], .submenu-item a[href*='signin']").forEach(function(link) {
            link.style.display = 'none';
        });

        // Add event listener for dashboard button
        const goToDashboardBtn = document.getElementById("goToDashboardBtn");
        const goToDashboardBtnCandidate = document.getElementById("goToDashboardBtnCandidate");

        goToDashboardBtn.addEventListener('click', function() {
            // Navigate to HR dashboard if user is HR
            if (loggedInUser.userRole === 'HR' && loggedInUser.userStatus === 'Approved') {
                window.location.href = '/hr-dashboard';
            } else if (loggedInUser.userRole === 'Candidate') {
                // Navigate to candidate dashboard if user is Candidate
                window.location.href = '/candidate-dashboard';
            }
        });

        goToDashboardBtnCandidate.addEventListener('click', function() {
            // Navigate to candidate dashboard if user is Candidate
            if (loggedInUser.userRole === 'Candidate') {
                window.location.href = '/candidate-dashboard';
            }
        });
    } else {
        // If no user or token, show Register/Login options
        document.querySelectorAll(".submenu-item a[href*='signup'], .submenu-item a[href*='signin']").forEach(function(link) {
            link.style.display = 'block';
        });

        // Hide "Go to Dashboard" buttons when not logged in
        document.getElementById("goToDashboardBtn").style.display = 'none';
        document.getElementById("goToDashboardBtnCandidate").style.display = 'none';
    }
});

