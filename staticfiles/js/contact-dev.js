document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const staffId = sessionStorage.getItem('staffId');
    const staffName = sessionStorage.getItem('staffName');
    
    // if (!staffId || !(staffId.startsWith('D') || staffId.startsWith('R'))) {
    //     window.location.href = 'index.html';
    //     return;
    // }
    
    // Set staff ID in the form
    // document.getElementById('staffId').value = staffId;
    
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

    // Handle back button navigation
    
    const backBtn = document.querySelector('.back-btn');
if (backBtn) {
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const role = sessionStorage.getItem('role');
        if (role === 'doctor') {
            window.location.href = '/doctor_dashboard/';
        } else if (role === 'admin') {
            window.location.href = '/admin_dashboard/';
        } else {
            window.location.href = '/';  // fallback
        }
    });
}

    // Handle form submission
//     document.getElementById('contactForm').addEventListener('submit', (e) => {
//         // e.preventDefault();
        
//         const issueType = document.getElementById('issueType').value;
//         const issueTitle = document.getElementById('issueTitle').value;
//         const issueDescription = document.getElementById('issueDescription').value;
//         const priority = document.getElementById('priority').value;
        
//         // Here you would typically send this data to a server
//         console.log('Issue submitted:', {
//             staffId,
//             staffName,
//             issueType,
//             issueTitle,
//             issueDescription,
//             priority
//         });
        
//         // Show success message
//          alert('Issue submitted successfully!');
        
//          // Redirect back to appropriate dashboard
//           if (user.role=='doctor') {
//               window.location.href = '{% url "Doctor_dashboard" %}';
//           } else {
//             window.location.href = '{% url "Admin_dashboard" %}';
//          }
//      });
});


function validateForm(data) {
    // Validate issue title
    if (data.issueTitle.length < 5) {
        showAlert('Please enter a more descriptive issue title', 'error');
        return false;
    }

    // Validate issue description
    if (data.issueDescription.length < 20) {
        showAlert('Please provide a more detailed description of the issue', 'error');
        return false;
    }

    // Validate issue type
    if (!data.issueType) {
        showAlert('Please select an issue type', 'error');
        return false;
    }

    // Validate priority
    if (!data.priority) {
        showAlert('Please select a priority level', 'error');
        return false;
    }

    return true;
}

function simulateSubmission(data) {
    // Show success message
    showAlert('Issue submitted successfully! The development team will review your request.', 'success');
    
    // Reset form
    document.getElementById('contactForm').reset();
    document.getElementById('staffId').value = sessionStorage.getItem('staffId');
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
