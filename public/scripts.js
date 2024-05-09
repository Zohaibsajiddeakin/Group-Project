// Registration function
function register() {
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            alert('Registration successful!');
            // Optionally, redirect the user to the login page
            window.location.href = '/login';
        } else {
            alert('Registration failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Login function
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            alert('Login successful!');
            // Optionally, redirect the user to their profile page
            window.location.href = '/profile';
        } else {
            alert('Login failed. Please check your credentials.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Update profile function
function updateProfile() {
  const username = document.getElementById('profileUsername').value; // Assuming you have an input field with id 'profileUsername' for updating username
  const password = document.getElementById('profilePassword').value; // Assuming you have an input field with id 'profilePassword' for updating password
  fetch('/profile/:id', { // Assuming you're sending the user ID as a parameter in the URL
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
  })
  .then(response => {
      if (response.ok) {
          alert('Profile updated successfully!');
          // Optionally, redirect the user to their profile page or refresh the page to reflect the changes
          window.location.reload(); // Reload the page to reflect the changes
      } else {
          alert('Failed to update profile. Please try again.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
