/* --- Smart Header Logic --- */
const navbar = document.querySelector(".navbar");
let lastScrollY = window.scrollY;
const navbarHeight = navbar ? navbar.offsetHeight : 65; // Use calculated height or default

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    
    // 1. Scrolling Down (current position is greater than last position)
    if (currentScrollY > lastScrollY && currentScrollY > navbarHeight) {
        // User is scrolling down and past the header height
        navbar.classList.add("nav-hidden");
    } 
    
    // 2. Scrolling Up (current position is less than last position)
    else if (currentScrollY < lastScrollY) {
        // User is scrolling up
        navbar.classList.remove("nav-hidden");
    }
    
    // Update the last scroll position
    lastScrollY = currentScrollY;
});