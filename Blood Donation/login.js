const forms = document.querySelector(".forms"),
  pwShowHide = document.querySelectorAll(".eye-icon"),
  links = document.querySelectorAll(".link");
pwShowHide.forEach(eyeIcon => {
  eyeIcon.addEventListener("click", () => {
    let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
    pwFields.forEach(password => {
      if (password.type === "password") { 
        password.type = "text"; 
        eyeIcon.classList.replace("bx-hide", "bx-show"); 
        return;
      }
      password.type = "password"; 
      eyeIcon.classList.replace("bx-show", "bx-hide"); 
    });
  });
});
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
document.addEventListener('DOMContentLoaded', function () {
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');

  if (forgotPasswordForm) {
      forgotPasswordForm.addEventListener('submit', function (e) {
          e.preventDefault();

          
          const email = document.getElementById('email').value;

      
          if (email) {
              alert(`Password reset link has been sent to ${email}`);
              window.location.href = 'login.html';
          } else {
              alert('Please enter your email.');
          }
      });
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signupForm');

  if (signupForm) {
      signupForm.addEventListener('submit', function (e) {
          e.preventDefault();
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const confirmPassword = document.getElementById('confirmPassword').value;

        
          if (email && password && confirmPassword) {
              if (password === confirmPassword) {
                
                  alert('Signup successful! Redirecting to login page...');
                 
                  window.location.href = 'login.html';
            
                } else {
                  alert('Passwords do not match.');
              }
          } else {
              alert('Please fill all fields.');
          }
      });
  }
});
