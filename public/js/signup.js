// Sign Up Form Functionality
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
         
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const emailConfirmation = document.getElementById('email_confirmation').value.trim();
            const password = document.getElementById('password').value;
            const passwordConfirmation = document.getElementById('password_confirmation').value;
            const termsChecked = document.getElementById('terms').checked;
            
            // Validate form
            let isValid = true;
            let errorMessage = '';
            
            // Validate name
            if (name === '') {
                isValid = false;
                errorMessage = 'Please enter your name';
            }
            
            // Validate email
            else if (email === '') {
                isValid = false;
                errorMessage = 'Please enter your email';
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            } else if (email !== emailConfirmation) {
                isValid = false;
                errorMessage = 'Email addresses do not match';
            }
            
            // Validate password
            else if (password === '') {
                isValid = false;
                errorMessage = 'Please enter a password';
            } else if (password.length < 8) {
                isValid = false;
                errorMessage = 'Password must be at least 8 characters';
            }
            
            // Validate password confirmation
            else if (password !== passwordConfirmation) {
                isValid = false;
                errorMessage = 'Passwords do not match';
            }
            
            // Validate terms
            else if (!termsChecked) {
                isValid = false;
                errorMessage = 'Please agree to the Terms of Service and Privacy Policy';
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
