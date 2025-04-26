// Sign In Form Functionality
document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signin-form');
    
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            // Form will be handled by the server, but we'll add client-side validation
            
            // Get form values
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            // Validate form
            let isValid = true;
            let errorMessage = '';
            
            // Validate email
            if (email === '') {
                isValid = false;
                errorMessage = 'Please enter your email';
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            
            // Validate password
            else if (password === '') {
                isValid = false;
                errorMessage = 'Please enter your password';
            }
            
            // If form is not valid, prevent submission and show error
            if (!isValid) {
                e.preventDefault();
                alert(errorMessage);
            }
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
