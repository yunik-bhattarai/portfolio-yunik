// Select all project cards
const projectCards = document.querySelectorAll('.project-card');

// Add click event listener
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const url = card.getAttribute('data-url');
        if (url) {
            window.location.href = url; // redirect to the project
        }
    });
});
