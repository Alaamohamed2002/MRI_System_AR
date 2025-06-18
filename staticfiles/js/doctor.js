document.addEventListener('DOMContentLoaded', () => {
    const staffName = sessionStorage.getItem('staffName');
    const staffNameElement = document.getElementById('staffName');
    if (staffNameElement) {
        staffNameElement.textContent = staffName;
    }

    const darkModeToggle = document.getElementById('darkMode');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' && darkModeToggle) {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.checked = true;
    }

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

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = '/';
        });
    }
});