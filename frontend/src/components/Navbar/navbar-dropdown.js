const profile = document.querySelector('.navbar-profile');
const dropdown = document.querySelector('.nav-profile-dropdown');

let timeoutId;

// Show dropdown when hovering over the profile
profile.addEventListener('mouseenter', () => {
    clearTimeout(timeoutId); // Cancel any existing timeout
    dropdown.classList.add('show'); // Show the dropdown
});

// Keep dropdown visible for 5 seconds after mouse leaves
profile.addEventListener('mouseleave', () => {
    timeoutId = setTimeout(() => {
        dropdown.classList.remove('show'); // Hide the dropdown after 5 seconds
    }, 5000); // 5-second delay
});
