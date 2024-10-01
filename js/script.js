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
        button.classList.remove('active');
        if (button.dataset.section === sectionId) {
            button.classList.add('active');
        }
    });
}

function resetInputs() {
    const name = document.getElementsByName('name')[0];
    const email = document.getElementsByName('email')[0];
    const message = document.getElementsByName('message')[0];

    name.value = '';
    email.value = '';
    message.value = '';
}

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const homeSection = document.getElementById('home');
    const homeHeight = homeSection.offsetHeight;

    if (window.scrollY > homeHeight) {
        navbar.classList.remove('opacity-0');
        navbar.classList.add('opacity-100');
    } else {
        navbar.classList.add('opacity-0');
        navbar.classList.remove('opacity-100');
    }

    const sections = document.querySelectorAll('section');
    const navHeight = navbar.offsetHeight;
    const scrollPosition = window.scrollY + navHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveButton(section.id);
        }
    });
});

window.onload = function() {
    resetInputs()
};

const contact_form = document.getElementById('contact-form');

contact_form.addEventListener('submit', function(e) {
    setTimeout(function() {
        resetInputs()
    }, 1000);
});

const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

const videoModal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('videoPlayer');

document.getElementById('openModal').onclick = function() {
    videoPlayer.src = 'https://www.youtube.com/embed/EinYC1YLHR0';
    videoModal.classList.remove('hidden');
};

document.getElementById('closeModal').onclick = function() {
    videoModal.classList.add('hidden');
    videoPlayer.src = '';
};

videoModal.onclick = function(event) {
    if (event.target === videoModal) {
        videoModal.classList.add('hidden');
        videoPlayer.src = '';
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

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const name = document.getElementsByName('name')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const message = document.getElementsByName('message')[0].value;

    // Send the email using EmailJS
    emailjs.send("service_e2grt66", "template_6e2u6we", {
        name: name,
        email: email,
        message: message
    })
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message sent successfully!');
        resetInputs(); // Clear form inputs on success
    }, function(error) {
        console.log('FAILED...', error);
        alert('Failed to send message. Please try again.');
    });
});