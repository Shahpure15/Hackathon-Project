// Sidebar toggle function
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}

// Function to dynamically load sidebar
function loadSidebar() {
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            document.querySelector('.toggle-btn').addEventListener('click', toggleSidebar);
        })
        .catch(error => console.error('Error loading sidebar:', error));
}

// Load sidebar on page load
document.addEventListener("DOMContentLoaded", loadSidebar);

// Login form handling
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Login successful! Redirecting...");
            window.location.href = "app.html";
        });
    }

    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Signup successful! Redirecting...");
            window.location.href = "login.html";
        });
    }
});
