document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Simple XSS protection: sanitize inputs
    function sanitizeInput(input) {
      const temp = document.createElement('div');
      temp.textContent = input;
      return temp.innerHTML;
    }
  
    const firstName = sanitizeInput(document.getElementById('firstName').value.trim());
    const lastName = sanitizeInput(document.getElementById('lastName').value.trim());
    const email = sanitizeInput(document.getElementById('email').value.trim());
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
  
    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
  
    alert('Form submitted successfully!');
    // You can now send sanitized data to the server
  });
  