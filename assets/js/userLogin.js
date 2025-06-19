document.addEventListener('DOMContentLoaded', function() {
    const authButtonsContainer = document.getElementById('authButtons');
    const isLoggedIn = Cookies.get('userLoggedIn'); // Check if the cookie exists

    if (isLoggedIn) {
        // User is logged in
        authButtonsContainer.innerHTML = `
            <a href="http://localhost:3000/candidate-dashboard" 
               target="_blank" 
               class="signUpBtn rounded-md bg-white bg-opacity-20 px-6 py-2 text-base font-medium text-white duration-300 ease-in-out hover:bg-opacity-100 hover:text-dark">
                Dashboard
            </a>
        `;
    } else {
        // User is not logged in
        authButtonsContainer.innerHTML = `
            <a href="http://localhost:3000/signin" 
               target="_blank" 
               class="loginBtn px-[22px] py-2 text-base font-medium text-white hover:opacity-70">
                Login
            </a>
            <a href="http://localhost:3000/candidate-signup" 
               target="_blank" 
               class="signUpBtn rounded-md bg-white bg-opacity-20 px-6 py-2 text-base font-medium text-white duration-300 ease-in-out hover:bg-opacity-100 hover:text-dark">
                Register
            </a>
        `;
    }
});

// Listen for messages from the React app
window.addEventListener('message', function(event) {
    if (event.origin !== 'http://localhost:3000') return; // Check the origin
    //console.log("Message received from React app:", event.data); // Log the received message

    if (event.data.loggedIn) {
        // User logged in
        Cookies.set('userLoggedIn', true, { expires: 1 }); // Set the cookie
        document.getElementById('authButtons').innerHTML = `
            <a href="http://localhost:3000/candidate-dashboard" 
               target="_blank" 
               class="signUpBtn rounded-md bg-white bg-opacity-20 px-6 py-2 text-base font-medium text-white duration-300 ease-in-out hover:bg-opacity-100 hover:text-dark">
                Dashboard
            </a>
        `;
    } else {
        // User logged out
        Cookies.remove('userLoggedIn'); // Remove the cookie
        document.getElementById('authButtons').innerHTML = `
            <a href="http://localhost:3000/signin" 
               target="_blank" 
               class="loginBtn px-[22px] py-2 text-base font-medium text-white hover:opacity-70">
                Login
            </a>
            <a href="http://localhost:3000/candidate-signup" 
               target="_blank" 
               class="signUpBtn rounded-md bg-white bg-opacity-20 px-6 py-2 text-base font-medium text-white duration-300 ease-in-out hover:bg-opacity-100 hover:text-dark">
                Register
            </a>
        `;
    }
});