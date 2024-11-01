function myDropDown(button) {
    // Toggle 'show' on the next sibling, which should be the dropdown content
    const dropdownContent = button.nextElementSibling;
    if (dropdownContent) {
        dropdownContent.classList.toggle('show');
    }
}

// Hide the dropdown when clicking outside of it
window.addEventListener('click', function (event) {
    // Get all dropdown content elements
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target) && !event.target.matches('.dropdown-btn')) {
            dropdown.classList.remove('show'); // Hide if clicking outside
        }
    });
});


