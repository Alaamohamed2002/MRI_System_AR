document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in and is a doctor
    // const staffId = sessionStorage.getItem('staffId');
    // if (!staffId || !staffId.startsWith('D')) {
    //     window.location.href = '/';
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

    // File upload preview
    const mriImage = document.getElementById('mriImage');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const fileName = document.querySelector('.file-name');

    mriImage.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileName.textContent = file.name;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImg.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            fileName.textContent = 'No file chosen';
            imagePreview.style.display = 'none';
        }
    });

    // Form submission
        const form = document.getElementById('mriAnalysisForm');
        // form.addEventListener('submit', (e) => {
        //     // e.preventDefault();
        
        //     const patientId = document.getElementById('patientId').value;
        //     const file = mriImage.files[0];
        
        //     if (!patientId || !file) {
        //         showAlert('Please fill in all fields', 'error');
        //         return;
        //     }

            // Here you would typically send the data to your backend
            // For now, we'll just show a success message
            // showAlert('MRI image uploaded successfully!', 'success');
            form.reset();
            imagePreview.style.display = 'none';
            fileName.textContent = 'No file chosen';
        });
    //});

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
