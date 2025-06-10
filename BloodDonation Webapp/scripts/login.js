document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.login form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault(); 
            const email = loginForm.querySelector('.input[type="email"]').value;
            const password = loginForm.querySelector('.password[type="password"]').value;

          
            if (email && password) {
                
                window.location.href = 'app.html'; 
            } else {
                alert('Please enter email and password.');
            }
        });
    }
});

