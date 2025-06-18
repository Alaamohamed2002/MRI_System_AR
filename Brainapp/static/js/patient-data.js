document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    // const staffId = sessionStorage.getItem('staffId');
    // if (!staffId) {
    //     window.location.href = '/';
    //     return;
    // }

    // Set back button href based on user role
    const backBtn = document.getElementById('backBtn');
    // backBtn.href = staffId.startsWith('D') ? 'doctor-home.html' : 'receptionist-home.html';

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

    // Search form submission
    const searchForm = document.getElementById('searchForm');
    const patientData = document.getElementById('patientData');
    const noData = document.getElementById('noData');

    searchForm.addEventListener('submit', (e) => {
        // e.preventDefault();
        
        const patientId = document.getElementById('patientId').value.trim();
        
        if (!patientId) {
            showAlert('Please enter a patient ID', 'error');
            return;
        }

        // Here you would typically fetch data from your backend
        // For now, we'll simulate a response with mock data
        // simulatePatientData(patientId);
    });
});

function simulatePatientData(patientId) {
    // Mock data - replace with actual API call
    const mockData = {
        name: 'John Doe',
        age: 45,
        email: 'john.doe@email.com',
        phone: '+1 234-567-8900',
        reports: [
            {
                date: '2024-03-15',
                type: 'MRI Scan',
                description: 'Brain MRI showing normal results'
            },
            {
                date: '2024-02-28',
                type: 'MRI Scan',
                description: 'Spine MRI showing minor disc degeneration'
            }
        ]
    };

    // Update patient information
    document.getElementById('patientName').textContent = mockData.name;
    document.getElementById('patientAge').textContent = mockData.age;
    document.getElementById('patientEmail').textContent = mockData.email;
    document.getElementById('patientPhone').textContent = mockData.phone;

    // Update reports list
    const reportsList = document.getElementById('reportsList');
    reportsList.innerHTML = mockData.reports.map(report => `
        <div class="report-item">
            <div class="report-header">
                <span class="report-date">${report.date}</span>
                <span class="report-type">${report.type}</span>
            </div>
            <p class="report-description">${report.description}</p>
        </div>
    `).join('');

    // Show patient data
    document.getElementById('patientData').style.display = 'block';
    document.getElementById('noData').style.display = 'none';
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
    }, 3000);
} 