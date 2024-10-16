function scrollToSection(sectionId, btn = null) {
    const section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }

    if (btn) {
        const buttons = document.querySelectorAll('#mobileNav button');
        
        // Reset all buttons
        buttons.forEach(button => {
            button.classList.remove('bg-white', 'text-[#051923]');
            button.classList.add('text-white');
        });

        // Set the clicked button as active
        btn.classList.remove('text-white');
        btn.classList.add('bg-white', 'text-[#051923]');
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

function renderNavBar() {
    const navBar = `<div id="navbar" class="flex justify-between h-full px-5 py-3 sticky top-0 bg-[#051923] z-10 opacity-0 shadow-lg transition-opacity duration-500">
            <div class="flex flex-col items-center justify-center text-center border border-white rounded-lg h-4 w-4 sm:h-8 sm:w-8 coolBeans">
                <p class="text-md sm:text-[18px] text-white font-semibold font-bebas -rotate-45">J</p>
            </div>
            <div class="flex justify-end items-center gap-5 mt-2 h-full sm:w-[50%] font-semibold">
                <button class="nav-btn text-xs sm:text-[16px] text-white relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full" onclick="scrollToSection('home')" data-section="home">Home</button>
                <button class="nav-btn text-xs sm:text-[16px] text-white relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full" onclick="scrollToSection('about')" data-section="about">About</button>
                <button class="nav-btn text-xs sm:text-[16px] text-white relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full" onclick="scrollToSection('projects')" data-section="projects">Projects</button>
                <button class="nav-btn text-xs sm:text-[16px] text-white relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full" onclick="scrollToSection('contact')" data-section="contact">Email Me</button>
                <a href="Pareja John Mark R - CV.pdf" download class="nav-btn text-xs sm:text-[16px] text-white relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Download CV</a>
            </div>
        </div>`;
    
    const mobileNavBar = `<div id="mobilenavbar" class="flex flex-col-reverse gap-3 fixed bottom-10 right-10">
            <button id="burgerNav" class="border-2 rounded-full flex items-center px-3 py-[10px] bg-white" onclick="toggleNav()">
                <i class="fa-solid fa-bars text-[20px]"></i>
            </button>
        </div>`;
    
    const homeDiv = document.getElementById('home');
    const navBarDiv = document.getElementById('navbar');
    const mobileNavDiv = document.getElementById('mobilenavbar');

    if (homeDiv) {
        if (window.innerWidth >= 640) {
            if (!navBarDiv) {
                homeDiv.insertAdjacentHTML('afterend', navBar);
                mobileNavDiv?.remove();
            }
        } else {
            if (navBarDiv) {
                navBarDiv.remove();
            }
            if (!mobileNavDiv) {
                document.getElementById('videoModal')?.insertAdjacentHTML('afterend', mobileNavBar);
            }
        }
    }
}

let isNavToggled = false;

function toggleNav() {
    const mobileNavHTML = `
        <div id="mobileNav" class="flex flex-col gap-3 py-3 rounded-xl bg-[#051923] text-white text-xs transition-opacity duration-500 opacity-0">
            <button class="flex justify-center w-full py-2 text-xs sm:text-[16px] text-white" onclick="scrollToSection('home', this)" data-section="home"><i class="fa-solid fa-house"></i></button>
            <button class="flex justify-center w-full py-2 text-xs sm:text-[16px] text-white" onclick="scrollToSection('about', this)" data-section="about"><i class="fa-solid fa-user"></i></button>
            <button class="flex justify-center w-full py-2 text-xs sm:text-[16px] text-white" onclick="scrollToSection('projects', this)" data-section="projects"><i class="fa-solid fa-list-check"></i></button>
            <button class="flex justify-center w-full py-2 text-xs sm:text-[16px] text-white" onclick="scrollToSection('contact', this)" data-section="contact"><i class="fa-solid fa-envelope"></i></button>
            <a href="Pareja John Mark R - CV.pdf" download class="flex justify-center w-full py-2 text-xs sm:text-[16px] text-white"><i class="fa-solid fa-file-arrow-down"></i></a>
        </div>`;

    const burgerNav = document.getElementById('burgerNav');
    isNavToggled = !isNavToggled;

    if (isNavToggled) {
        // Insert mobileNav
        burgerNav?.insertAdjacentHTML('afterend', mobileNavHTML);
        
        // Get the mobileNav element
        const mobileNavElement = document.getElementById('mobileNav');
        
        // Trigger the fade-in effect
        setTimeout(() => {
            mobileNavElement.classList.remove('opacity-0'); // Remove opacity-0 to fade in
            mobileNavElement.classList.add('opacity-100'); // Ensure it's fully opaque
        }, 10); // Small timeout to allow the element to be inserted

        // Update burgerNav styles
        burgerNav?.classList.remove('bg-white');
        burgerNav?.classList.add('bg-[#051923]', 'text-white', 'border-[#051923]');

    } else {
        const mobileNavElement = document.getElementById('mobileNav');
        if (mobileNavElement) {
            console.log('removed!')
            mobileNavElement.classList.remove('opacity-100');
            mobileNavElement.remove();
        }

        // Update burgerNav styles
        burgerNav?.classList.remove('bg-[#051923]', 'text-white', 'border-[#051923]');
        burgerNav?.classList.add('bg-white');
    }
}

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const homeSection = document.getElementById('home');
    const homeHeight = homeSection.offsetHeight;

    if (navbar) {
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
    }
});

window.onload = function() {
    resetInputs()
    renderNavBar()
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

window.onresize = renderNavBar