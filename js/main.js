/**
 * Marsland Properties - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            // Remove from DOM after transition
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    }

    // 2. Sticky Navbar & Mobile Menu
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (navToggle) {
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
            
            // Set active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 3. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // 4. Animated Counters
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.innerText = Math.ceil(current) + '+';
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.innerText = target + '+';
                        }
                    };
                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });

    const statsStrip = document.querySelector('.stats-strip');
    if (statsStrip) {
        counterObserver.observe(statsStrip);
    }

    // 5. Project Filtering
    const filterBtns = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    // Trigger reflow for animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 6. Testimonial Carousel
    const dots = document.querySelectorAll('.dot');
    const track = document.getElementById('testimonial-track');
    let currentSlide = 0;
    const slideCount = dots.length;

    function goToSlide(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');
        currentSlide = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Auto slide every 5 seconds
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % slideCount;
        goToSlide(nextSlide);
    }, 5000);

    // 7. Enquiry Form submission (WhatsApp redirect)
    const form = document.getElementById('enquiry-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const project = document.getElementById('project').value;
            const message = document.getElementById('message').value;
            
            const text = `Hello Marsland Properties,\n\nI am interested in your projects.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Interested In:* ${project}\n*Message:* ${message ? message : 'Please share more details.'}`;
            
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/919894980940?text=${encodedText}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }

    // 9. Set default date for site visit form (tomorrow)
    const visitDateInput = document.getElementById('visit-date');
    if (visitDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        visitDateInput.value = tomorrow.toISOString().split('T')[0];
        visitDateInput.min = tomorrow.toISOString().split('T')[0];
    }

    // 10. Site Visit Booking Form submission (WhatsApp redirect)
    const visitForm = document.getElementById('site-visit-form');
    if (visitForm) {
        visitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('visit-name').value;
            const phone = document.getElementById('visit-phone').value;
            const project = document.getElementById('visit-project').value;
            const date = document.getElementById('visit-date').value;
            const time = document.getElementById('visit-time').value;
            const people = document.getElementById('visit-people').value;
            const notes = document.getElementById('visit-notes').value;
            
            const formattedDate = date ? new Date(date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'Not specified';
            
            const text = `Hello Marsland Properties,\n\nI would like to schedule a site visit.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Interested Project:* ${project}\n*Preferred Date:* ${formattedDate}\n*Preferred Time:* ${time}\n*Number of People:* ${people}\n*Notes:* ${notes ? notes : 'None'}`;
            
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/919894980940?text=${encodedText}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }
});

// 8. Project Modal Logic
const projectData = {
    'krs': {
        title: 'KRS Avenue',
        location: 'Near Trichy–Chennai NH 45',
        img: 'assets/project-krs.jpg',
        specs: [
            { label: 'Type', value: 'Premium Plots' },
            { label: 'Approval', value: 'DTCP & RERA' },
            { label: 'Status', value: 'Completed' },
            { label: 'Distance', value: '3km from NH' }
        ],
        desc: 'KRS Avenue is a premium residential layout strategically located near Trichy–Chennai NH 45, offering both convenience and connectivity. The layout is surrounded by reputed colleges, schools, and educational institutions, making it an ideal choice for families.',
        features: [
            '<i class="fa-solid fa-check"></i> Gated Community',
            '<i class="fa-solid fa-check"></i> EB Facility',
            '<i class="fa-solid fa-check"></i> Ground water',
            '<i class="fa-solid fa-check"></i> 25 ft Thar road'
        ],
        brochures: [
            { name: 'Project Brochure', url: 'assets/brochure-krs.pdf', icon: 'fa-file-pdf' },
            { name: 'Price List', url: 'assets/pricelist-krs.pdf', icon: 'fa-money-bill' },
            { name: 'Site Plan', url: 'assets/siteplan-krs.pdf', icon: 'fa-map' }
        ]
    },
    'rasi': {
        title: 'KN Rasi Nagar',
        location: 'Manachanallur, Trichy',
        img: 'assets/project-rasi.jpg',
        specs: [
            { label: 'Type', value: 'Plots' },
            { label: 'Approval', value: 'DTCP & RERA' },
            { label: 'Status', value: 'Completed' },
            { label: 'Distance', value: '200m from Bus Stand' }
        ],
        desc: 'Just 200m from Manachanallur Bus Stand, KN RASI NAGAR offers a prime location with Cauvery water supply, flood-free surroundings, and proximity to schools and colleges. Already 10 houses have been built within the layout, making it a vibrant and secure neighborhood.',
        features: [
            '<i class="fa-solid fa-check"></i> Tasty Groundwater',
            '<i class="fa-solid fa-check"></i> Corporation Water Facility',
            '<i class="fa-solid fa-check"></i> 30ft & 23ft Tar Road',
            '<i class="fa-solid fa-check"></i> Bank Loan Facility'
        ],
        brochures: [
            { name: 'Project Brochure', url: 'assets/brochure-rasi.pdf', icon: 'fa-file-pdf' },
            { name: 'Price List', url: 'assets/pricelist-rasi.pdf', icon: 'fa-money-bill' },
            { name: 'Site Plan', url: 'assets/siteplan-rasi.pdf', icon: 'fa-map' }
        ]
    },

    'srilakshmi': {
        title: 'Sri Lakshmi Nagar',
        location: 'Trichy',
        img: 'assets/project-srilakshmi.jpg',
        specs: [
            { label: 'Type', value: 'Plots' },
            { label: 'Approval', value: 'DTCP & RERA' },
            { label: 'Status', value: 'Completed' },
            { label: 'Distance', value: 'Trichy City' }
        ],
        desc: 'Sri Lakshmi Nagar is a premium residential layout in Trichy offering well-planned plots with excellent connectivity. The project features wide tar roads, underground drainage, and is strategically located near key amenities.',
        features: [
            '<i class="fa-solid fa-check"></i> Gated Community',
            '<i class="fa-solid fa-check"></i> Wide Tar Roads',
            '<i class="fa-solid fa-check"></i> Underground Drainage',
            '<i class="fa-solid fa-check"></i> 24/7 Security'
        ],
        brochures: [
            { name: 'Project Brochure', url: 'assets/brochure-srilakshmi.pdf', icon: 'fa-file-pdf' },
            { name: 'Price List', url: 'assets/pricelist-srilakshmi.pdf', icon: 'fa-money-bill' },
            { name: 'Site Plan', url: 'assets/siteplan-srilakshmi.pdf', icon: 'fa-map' }
        ]
    },
    'alamelu': {
        title: 'Alamelu Mangai Nagar',
        location: 'Trichy',
        img: 'assets/project-alamelu.jpg',
        specs: [
            { label: 'Type', value: 'Plots' },
            { label: 'Approval', value: 'DTCP & RERA' },
            { label: 'Status', value: 'Completed' },
            { label: 'Distance', value: 'Trichy City' }
        ],
        desc: 'Alamelu Mangai Nagar is a well-planned residential layout in Trichy offering premium plots with modern infrastructure. The project boasts excellent road connectivity and proximity to educational institutions and healthcare facilities.',
        features: [
            '<i class="fa-solid fa-check"></i> Gated Community',
            '<i class="fa-solid fa-check"></i> Wide Tar Roads',
            '<i class="fa-solid fa-check"></i> EB & Water Facility',
            '<i class="fa-solid fa-check"></i> Avenue Trees'
        ],
        brochures: [
            { name: 'Project Brochure', url: 'assets/brochure-alamelu.pdf', icon: 'fa-file-pdf' },
            { name: 'Price List', url: 'assets/pricelist-alamelu.pdf', icon: 'fa-money-bill' },
            { name: 'Site Plan', url: 'assets/siteplan-alamelu.pdf', icon: 'fa-map' }
        ]
    },
    'antony': {
        title: 'Antony Garden',
        location: 'Manikandam, Trichy',
        img: 'assets/project-antony.jpg',
        specs: [
            { label: 'Type', value: 'Plots' },
            { label: 'Approval', value: 'DTCP & RERA' },
            { label: 'Status', value: 'Ongoing' },
            { label: 'Distance', value: '7 kms from IBT' }
        ],
        desc: 'Antony Garden offers premium DTCP & RERA approved plots in Manikandam. Just 7 kms from IBT & Panjappur. Enjoy 24x7 bus facility, delicious drinking water, and a fully gated community.',
        features: [
            '<i class="fa-solid fa-check"></i> Gated Community',
            '<i class="fa-solid fa-check"></i> 24×7 Bus Facility',
            '<i class="fa-solid fa-check"></i> Surveillance Cameras',
            '<i class="fa-solid fa-check"></i> 100% Clear Title'
        ],
        brochures: []
    },
    'kumaran': {
        title: 'Kumaran Nagar',
        location: 'Pudukkottai NH, Trichy',
        img: 'assets/project-kumaran.jpg',
        specs: [
            { label: 'Type', value: 'Plots' },
            { label: 'Approval', value: 'DTCP & RERA' },
            { label: 'Status', value: 'Ongoing' },
            { label: 'Distance', value: 'Near Bharani Bhavan' }
        ],
        desc: 'Kumaran Nagar is a premium gated community located on the Trichy – Pudukkottai NH Road. Near IIM Trichy, Anna University, and Bharathidasan University. "Three Universities… One Smart Investment!"',
        features: [
            '<i class="fa-solid fa-check"></i> Close to 3 Universities',
            '<i class="fa-solid fa-check"></i> Gated Community',
            '<i class="fa-solid fa-check"></i> EB & Water Facility',
            '<i class="fa-solid fa-check"></i> Excellent ROI'
        ],
        brochures: []
    },
    'arunachala': {
        title: 'Arunachala Nagar',
        location: 'Panjappur - Thuvakudi Ring Road, Trichy',
        img: 'assets/project-arunachala.jpg',
        specs: [
            { label: 'Type', value: 'Plots' },
            { label: 'Approval', value: 'DTCP & RERA' },
            { label: 'Status', value: 'Ongoing' },
            { label: 'Distance', value: 'On Ring Road' }
        ],
        desc: 'Arunachala Nagar offers strategic DTCP & RERA approved plots right on the Panjappur - Thuvakudi Ring Road. Experience rapid appreciation and excellent connectivity.',
        features: [
            '<i class="fa-solid fa-check"></i> Ring Road Connectivity',
            '<i class="fa-solid fa-check"></i> Clear Titles',
            '<i class="fa-solid fa-check"></i> Gated Community',
            '<i class="fa-solid fa-check"></i> Great Investment'
        ],
        brochures: []
    },
    'sairam': {
        title: 'Sai Ram Garden',
        location: 'Near Vayalur Murugan Kovil, Trichy',
        img: 'assets/project-sairam.jpg',
        specs: [
            { label: 'Type', value: 'Apartments' },
            { label: 'Approval', value: 'Approved' },
            { label: 'Status', value: 'Ongoing' },
            { label: 'Distance', value: 'Near Temple' }
        ],
        desc: 'Sai Ram Garden features premium 2BHK and 3BHK ready-to-move apartments near the famous Vayalur Murugan Kovil. Enjoy a peaceful environment with modern apartment amenities.',
        features: [
            '<i class="fa-solid fa-check"></i> 2BHK & 3BHK',
            '<i class="fa-solid fa-check"></i> Peaceful Location',
            '<i class="fa-solid fa-check"></i> Modern Amenities',
            '<i class="fa-solid fa-check"></i> Ample Parking'
        ],
        brochures: []
    },
    'officer': {
        title: "Officer's Town",
        location: 'Alampattipudur, Trichy',
        img: 'assets/project-officer.jpg',
        specs: [
            { label: 'Type', value: 'Plots' },
            { label: 'Approval', value: 'DTCP & RERA' },
            { label: 'Status', value: 'Ongoing' },
            { label: 'Distance', value: 'On NH Road' }
        ],
        desc: "Officer's Town provides well-laid DTCP & RERA approved plots on the Trichy–Dindigul NH Road. A perfect location for both immediate construction and long-term investment.",
        features: [
            '<i class="fa-solid fa-check"></i> On NH Road',
            '<i class="fa-solid fa-check"></i> Clear Documents',
            '<i class="fa-solid fa-check"></i> Avenue Trees',
            '<i class="fa-solid fa-check"></i> Bank Loan Arranged'
        ],
        brochures: []
    }
};

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalLocation = document.getElementById('modal-location');
const modalImg = document.getElementById('modal-img');
const modalSpecs = document.getElementById('modal-specs');
const modalDesc = document.getElementById('modal-desc');
const modalFeatures = document.getElementById('modal-features');
const modalBrochure = document.getElementById('modal-brochure');

function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalTitle.innerText = data.title;
    modalLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.location}`;
    modalImg.src = data.img;
    modalDesc.innerText = data.desc;

    // Populate specs
    modalSpecs.innerHTML = '';
    data.specs.forEach(spec => {
        modalSpecs.innerHTML += `
            <div class="modal-spec-item">
                <span>${spec.label}</span>
                <span>${spec.value}</span>
            </div>
        `;
    });

    // Populate features
    modalFeatures.innerHTML = '';
    data.features.forEach(feat => {
        modalFeatures.innerHTML += `
            <div class="modal-feature-point">
                ${feat}
            </div>
        `;
    });

    // Populate brochures
    modalBrochure.innerHTML = '';
    if (data.brochures) {
        data.brochures.forEach(brochure => {
            modalBrochure.innerHTML += `
                <a href="${brochure.url}" class="brochure-btn" target="_blank" rel="noopener">
                    <i class="fa-solid ${brochure.icon}"></i>
                    ${brochure.name}
                </a>
            `;
        });
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
