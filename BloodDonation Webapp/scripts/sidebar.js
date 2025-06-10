document.addEventListener("DOMContentLoaded", function() {
    fetch("sidebar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("sidebar-container").innerHTML = data;

            // Add event listener for the toggle button
            const toggleBtn = document.querySelector('.toggle-btn');
            toggleBtn.addEventListener('click', function() {
                document.querySelector('.sidebar').classList.toggle('active');
                toggleBtn.classList.toggle('active'); // Toggle the active class on the button
            });

            // Ensure the button has the active class initially if the sidebar is collapsed
            if (window.innerWidth <= 780) {
                toggleBtn.classList.add('active');
            }
        })
        .catch(error => console.error('Error loading sidebar:', error));
});