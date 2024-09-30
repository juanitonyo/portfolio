window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const homeSection = document.getElementById('home');
    const homeHeight = homeSection.offsetHeight;

    // Show the navbar with opacity transition when scrolling past the home section
    if (window.scrollY > homeHeight) {
        navbar.classList.remove('opacity-0');
        navbar.classList.add('opacity-100');
    } else {
        navbar.classList.add('opacity-0');
        navbar.classList.remove('opacity-100');
    }

    // Highlight active button based on scroll position
    const sections = document.querySelectorAll('section'); // Assuming each section has the <section> tag
    const navHeight = navbar.offsetHeight;
    const scrollPosition = window.scrollY + navHeight; // Add navbar height to account for the sticky navbar

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // If the current scroll position is within the section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveButton(section.id); // Set the active button based on the section in view
        }
    });
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

function setActiveButton(sectionId) {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.classList.remove('active'); // Remove active class from all buttons
        if (button.dataset.section === sectionId) {
            button.classList.add('active'); // Add active class to the current button
        }
    });
}

// Intersection Observer for section animations
const sections = document.querySelectorAll('section'); // Get all sections
const options = {
    threshold: 0.1 // Trigger animation when 10% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add 'visible' class when entering the section
            entry.target.classList.add('visible');
        } else {
            // Remove 'visible' class when exiting the section
            entry.target.classList.remove('visible');
        }
    });
}, options);

// Observe each section for visibility
sections.forEach(section => {
    observer.observe(section);
});

const videoModal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('videoPlayer');

// Open the modal with the YouTube video
document.getElementById('openModal').onclick = function() {
    videoPlayer.src = 'https://www.youtube.com/embed/EinYC1YLHR0'; // Replace with your YouTube video ID
    videoModal.classList.remove('hidden');
};

// Close the modal and stop the video
document.getElementById('closeModal').onclick = function() {
    videoModal.classList.add('hidden');
    videoPlayer.src = ''; // Stop the video when modal is closed
};

// Close the modal when clicking outside of it
videoModal.onclick = function(event) {
    if (event.target === videoModal) {
        videoModal.classList.add('hidden');
        videoPlayer.src = ''; // Stop the video when modal is closed
    }
};

let isToggled = false;
    
document.getElementById('see-more-btn').addEventListener('click', function() {
    const wrapper = document.getElementById('grid-wrapper');
    const fadeOut = document.getElementById('fade-out');
    const btn = document.getElementById('see-more-btn');
    
    // Toggle the height and button text
    if (!isToggled) {
        wrapper.classList.remove('max-h-[100px]');
        fadeOut.classList.add('hidden');
        btn.textContent = 'See Less';
        isToggled = true;
    } else {
        wrapper.classList.add('max-h-[100px]');
        fadeOut.classList.remove('hidden');
        btn.textContent = 'See More';
        isToggled = false;
    }
});