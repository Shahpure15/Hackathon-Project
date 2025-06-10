// filepath: /d:/BloodDonation Webapp/scripts/profile.js
document.addEventListener("DOMContentLoaded", function() {
    const profileForm = document.getElementById("profileForm");

    profileForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const fullName = document.getElementById("full-name").value;
        const bloodGroup = document.getElementById("blood-group").value;
        const location = document.getElementById("location").value;
        const phone = document.getElementById("phone").value;

        try {
            const response = await fetch('http://localhost:5000/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, full_name: fullName, blood_group: bloodGroup, location, phone })
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Fetch profile data
    async function fetchProfile() {
        const email = 'user@example.com'; // Replace with the logged-in user's email
        try {
            const response = await fetch(`http://localhost:5000/profile?email=${email}`);
            const data = await response.json();
            if (response.ok) {
                document.getElementById("email").value = data.email;
                document.getElementById("full-name").value = data.full_name;
                document.getElementById("blood-group").value = data.blood_group;
                document.getElementById("location").value = data.location;
                document.getElementById("phone").value = data.phone;
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }

    fetchProfile();
});