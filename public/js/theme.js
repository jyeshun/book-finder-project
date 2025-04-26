// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {

    const darkModeBtn = document.getElementById('dark-mode-btn');
    const lightModeBtn = document.getElementById('light-mode-btn');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // Apply the saved theme or use system preference
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // Check if user prefers dark mode
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }
    
    // Function to set theme
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };
    
    // Event listeners for theme buttons
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            setTheme('dark');
        });
    }
    
    if (lightModeBtn) {
        lightModeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            setTheme('light');
        });
    }
});
