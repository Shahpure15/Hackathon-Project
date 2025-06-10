// Function to toggle sidebar
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}

// Function to dynamically load sidebar
function loadSidebar() {
    fetch('sidebar.html') // Ensure 'sidebar.html' is in the correct location
        .then(response => {
            if (!response.ok) {
                throw new Error(`Sidebar not found: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Insert sidebar into the body at the beginning
            document.body.insertAdjacentHTML('afterbegin', data);

            // Wait for sidebar to be added before attaching event listener
            const toggleBtn = document.querySelector('.toggle-btn');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', toggleSidebar);
            } else {
                console.warn('Toggle button not found in sidebar');
            }
        })
        .catch(error => console.error('Error loading sidebar:', error));
}

// Load sidebar on page load
document.addEventListener("DOMContentLoaded", loadSidebar);
