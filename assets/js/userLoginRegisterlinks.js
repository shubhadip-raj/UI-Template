   // Ensure the script runs after the DOM is fully loaded
   document.addEventListener('DOMContentLoaded', function () {
    const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://app.jobbox.one';

    // Set the href attributes for the links
    document.getElementById('registerLink').href = `${baseUrl}/hr-signup`;
    document.getElementById('loginLink').href = `${baseUrl}/hr-sign-in`;
    // Add click event listeners to buttons
    // Set href attributes dynamically for Candidate Signup and Signin
    document.querySelector('.loginBtn').href = `${baseUrl}/signin`;
    document.querySelector('.signUpBtn').href = `${baseUrl}/candidate-signup`;

  });