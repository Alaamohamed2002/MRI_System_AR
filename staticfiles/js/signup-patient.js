document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in and is a receptionist
    // const staffId = sessionStorage.getItem('staffId');
    // if (!staffId || !staffId.startsWith('R')) {
    //     window.location.href = 'index.html';
    //     return;
    // }

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkMode');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.checked = true;
    }
    
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.clear();
        window.location.href = '/';
    });

    // Form submission
    const form = document.getElementById('signupForm');
    
    form.addEventListener('submit', (e) => {
        // e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('patientName').value.trim(),
            age: document.getElementById('patientAge').value,
            email: document.getElementById('patientEmail').value.trim(),
            phone: document.getElementById('patientPhone').value.trim(),
            address: document.getElementById('patientAddress').value.trim(),
            emergencyContact: document.getElementById('emergencyContact').value.trim(),
            emergencyPhone: document.getElementById('emergencyPhone').value.trim()
        };

        // Validate form data
        if (!validateForm(formData)) {
            return;
        }

        // Here you would typically send the data to your backend
        // For now, we'll simulate a successful registration
        // simulateRegistration(formData);
    });
});

// function validateForm(data) {
//     // Validate name
//     if (data.name.length < 3) {
//         showAlert('Please enter a valid name (at least 3 characters)', 'error');
//         return false;
//     }

//     // Validate age
//     if (data.age < 0 || data.age > 120) {
//         showAlert('Please enter a valid age (0-120)', 'error');
//         return false;
//     }

//     // Validate email
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(data.email)) {
//         showAlert('Please enter a valid email address', 'error');
//         return false;
//     }

//     // Validate phone numbers
//     const phoneRegex = /^\+?[\d\s-]{10,}$/;
//     if (!phoneRegex.test(data.phone)) {
//         showAlert('Please enter a valid phone number', 'error');
//         return false;
//     }
//     if (!phoneRegex.test(data.emergencyPhone)) {
//         showAlert('Please enter a valid emergency contact phone number', 'error');
//         return false;
//     }

//     // Validate address
//     if (data.address.length < 10) {
//         showAlert('Please enter a complete address', 'error');
//         return false;
//     }

//     // Validate emergency contact
//     if (data.emergencyContact.length < 3) {
//         showAlert('Please enter a valid emergency contact name', 'error');
//         return false;
//     }

//     return true;
// }

function simulateRegistration(data) {
    // Generate a random patient ID (P + 6 digits)
    const patientId = 'P' + Math.floor(100000 + Math.random() * 900000);
    
    // Show success message with patient ID
    showAlert(`Patient registered successfully! Patient ID: ${patientId}`, 'success');
    
    // Reset form
    document.getElementById('signupForm').reset();
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    document.querySelector('.content-card').insertBefore(
        alertDiv,
        document.querySelector('.content-card').firstChild
    );
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
} 