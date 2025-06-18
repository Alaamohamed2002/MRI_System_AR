document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const staffIdInput = document.getElementById('staffId');
    const staffNameInput = document.getElementById('staffName');
    const darkModeToggle = document.getElementById('darkModeLogin');

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (darkModeToggle) {
            darkModeToggle.checked = true;
        }
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (darkModeToggle) {
            darkModeToggle.checked = false;
        }
    }

    // Dark mode toggle functionality
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

        loginForm.addEventListener('submit', (e) => {
            // e.preventDefault();
        
            // const staffId = staffIdInput.value.trim();
            // const staffName = staffNameInput.value.trim();
        
            // Validate staff ID format
            // if (!staffId.match(/^[DR]\d{3}$/)) {
            //     showError('Please enter a valid staff ID (e.g., D001 or R001)');
            //     return;
            // }
        
            // Store user info in sessionStorage
            sessionStorage.setItem('staffId', staffId);
            sessionStorage.setItem('staffName', staffName);
            sessionStorage.setItem('role', role);

    // Redirect based on role
    if (role === 'doctor') {
        window.location.href = '/doctor_dashboard/';
    } else if (role === 'admin') {
        window.location.href = '/admin_dashboard/';
    }
        });
    
        function showError(message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
        
            // Remove any existing error message
            const existingError = document.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        
            // Add new error message
            loginForm.insertBefore(errorDiv, loginForm.firstChild);
        
            // Remove error message after 3 seconds
            setTimeout(() => {
                errorDiv.remove();
            }, 3000);
        }
    }); 
