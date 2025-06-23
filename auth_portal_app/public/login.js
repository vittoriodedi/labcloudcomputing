document.addEventListener('DOMContentLoaded', () => {

    // Obtains the login form and message elements
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    // Add an event listener to the login form
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        // Takes the username and password from the form
        const username = document.getElementById('logUsername').value;
        const password = document.getElementById('logPassword').value;

        try {
            // Sends a POST request to the login endpoint
            const response = await fetch('/auth/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }) // Sends data as JSON
            });

            const message = await response.text(); // Reads the response message

            if (response.ok) {
                // If the response is OK, displays a success message and redirects after a delay
                loginMessage.style.color = 'green';
                loginMessage.textContent = `Login riuscito! Attendi...`;
                loginForm.reset(); 
                setTimeout(() => {
                    window.location.href = '/app/';
                }, 1000);
            } else {
                // Else, displays an error message
                loginMessage.style.color = 'red';
                loginMessage.textContent = `Errore: ${message}`;
            }
        } catch (error) {
            // Handles network errors or server issues
            console.error('Error during login request:', error);
            loginMessage.style.color = 'red';
            loginMessage.textContent = 'Network error or Server not available.';
        }
    });
});