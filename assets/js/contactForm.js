// src/main/resources/static/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Get the form and submit button
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');

    // Form submit event listener
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Disable the button to prevent multiple submissions
        submitButton.disabled = true;
        submitButton.innerText = 'Sending...';

        // Gather form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Send form data to backend using Fetch API
        fetch(`${CONFIG.API_URL}/savemessage`, { // Replace with your actual backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Send the data as JSON
        })
            .then(response => {
                // Log the full response for debugging purposes
               // console.log('Response:', response.json());

                // Check if the response was successful
                if (response.ok) {
                    // Show success Toastify message
                    Toastify({
                        text: "Your message has been sent successfully!",
                        duration: 3000, // Toast duration in ms
                        close: true, // Show close button
                        gravity: "top", // Position: top or bottom
                        position: "right", // Position: left, center, or right
                        backgroundColor: "#28a745", // Green for success
                        stopOnFocus: true, // Stops toast on focus
                    }).showToast();
                    form.reset(); // Reset form fields after success
                }
                else {
                    Toastify({
                        text: "Oops! Something went wrong.",
                        duration: 3000,
                        close: true,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "#dc3545", // Red for error
                        stopOnFocus: true,
                    }).showToast();
                }
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
                alert('There was an error submitting the form.');
            })
            .finally(() => {
                // Re-enable the submit button
                submitButton.disabled = false;
                submitButton.innerText = 'Send';
            });
    });
});
