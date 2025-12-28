// DNA Helix Generator
function generateDNAHelix() {
  const helix = document.getElementById('dna-helix');
  const nucleotides = ['adenine', 'thymine', 'guanine', 'cytosine'];
  const pairs = { 'adenine': 'thymine', 'guanine': 'cytosine', 'thymine': 'adenine', 'cytosine': 'guanine' };
  const numPairs = 12;

  for (let i = 0; i < numPairs; i++) {
    const basePair = document.createElement('div');
    basePair.className = 'base-pair';

    const yPos = (i / numPairs) * 100;
    basePair.style.top = `${yPos}%`;

    const angle = (i / numPairs) * 360 * 2;
    const xOffset = Math.sin(angle * Math.PI / 180) * 40;
    const zIndex = Math.cos(angle * Math.PI / 180);

    basePair.style.transform = `translateX(calc(-50% + ${xOffset}px))`;
    basePair.style.zIndex = Math.round(zIndex * 10);
    basePair.style.opacity = 0.5 + (zIndex + 1) / 4;

    const leftNuc = document.createElement('div');
    const leftType = nucleotides[i % 4];
    leftNuc.className = `nucleotide ${leftType}`;

    const bond = document.createElement('div');
    bond.className = 'bond';

    const rightNuc = document.createElement('div');
    rightNuc.className = `nucleotide ${pairs[leftType]}`;

    basePair.appendChild(leftNuc);
    basePair.appendChild(bond);
    basePair.appendChild(rightNuc);
    helix.appendChild(basePair);
  }
}

// Carousel - Infinite Scroll
const carouselContainer = document.getElementById('carousel-container');
const originalSlides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
const dotsContainer = document.getElementById('carousel-dots');

let currentIndex = 0;
let isTransitioning = false;
let slides = [];
let autoPlayInterval;

function isMobile() {
  return window.innerWidth <= 768;
}

function getSlideWidth() {
  return isMobile() ? 100 : 50;
}

function getVisibleSlides() {
  return isMobile() ? 1 : 2;
}

// Setup Carousel with Clones
function setupCarousel() {
  // Clear existing content to avoid duplicate clones on resize
  carouselContainer.innerHTML = '';

  // Re-add original slides
  originalSlides.forEach(slide => {
    carouselContainer.appendChild(slide.cloneNode(true));
  });

  const slidesToClone = getVisibleSlides();
  const allSlides = carouselContainer.children;

  // Clone last slides and prepend
  for (let i = 0; i < slidesToClone; i++) {
    const clone = allSlides[allSlides.length - 1 - i].cloneNode(true);
    clone.classList.add('clone');
    carouselContainer.insertBefore(clone, carouselContainer.firstChild);
  }

  // Clone first slides and append
  for (let i = 0; i < slidesToClone; i++) {
    const clone = originalSlides[i].cloneNode(true);
    clone.classList.add('clone');
    carouselContainer.appendChild(clone);
  }

  slides = document.querySelectorAll('.carousel-slide');

  // Set initial position (offset by prepended clones)
  currentIndex = slidesToClone;
  updateCarousel(false);
  createDots();
  updateDots();
}

// Create dots for original slides only
function createDots() {
  dotsContainer.innerHTML = '';
  originalSlides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    dot.addEventListener('click', () => {
      if (isTransitioning) return;
      // Calculate target index accounting for clones
      const slidesToClone = getVisibleSlides();
      currentIndex = i + slidesToClone;
      updateCarousel();
      resetAutoPlay();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = document.querySelectorAll('.carousel-dot');
  const slidesToClone = getVisibleSlides();
  // Calculate "real" index (0 to totalSlides-1)
  let realIndex = currentIndex - slidesToClone;

  // Handle boundary cases for dots
  if (realIndex < 0) realIndex = originalSlides.length - 1;
  if (realIndex >= originalSlides.length) realIndex = 0;

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === realIndex);
  });
}

function updateCarousel(animate = true) {
  const slideWidth = getSlideWidth();
  if (!animate) {
    carouselContainer.style.transition = 'none';
  } else {
    carouselContainer.style.transition = 'transform 0.5s ease-in-out';
  }
  carouselContainer.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
  updateDots();
}

function nextSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex++;
  updateCarousel();

  const slidesToClone = getVisibleSlides();
  const totalSlides = slides.length;

  // If we reached the end (first clone set), jump back to start
  if (currentIndex >= totalSlides - slidesToClone) {
    setTimeout(() => {
      carouselContainer.style.transition = 'none';
      currentIndex = slidesToClone; // Jump to real first slide
      updateCarousel(false);
      isTransitioning = false;
    }, 500);
  } else {
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }
}

function prevSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex--;
  updateCarousel();

  const slidesToClone = getVisibleSlides();

  // If we reached the start (last clone set), jump to end
  if (currentIndex < slidesToClone) {
    setTimeout(() => {
      carouselContainer.style.transition = 'none';
      currentIndex = slides.length - (2 * slidesToClone); // Jump to real last slide
      updateCarousel(false);
      isTransitioning = false;
    }, 500);
  } else {
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(nextSlide, 6000);
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    setupCarousel();
  }, 150);
});

// Initial Setup
setupCarousel();

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoPlay();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoPlay();
});

autoPlayInterval = setInterval(nextSlide, 6000);

// Mobile Menu
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  const icon = mobileToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    mobileToggle.querySelector('i').classList.add('fa-bars');
    mobileToggle.querySelector('i').classList.remove('fa-times');
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Active Nav
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Theme Toggle
const themeCheckbox = document.getElementById('theme-checkbox');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  htmlElement.setAttribute('data-theme', 'light');
  themeCheckbox.checked = true;
}

themeCheckbox.addEventListener('change', () => {
  if (themeCheckbox.checked) {
    htmlElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    htmlElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  generateDNAHelix();


  // Radar Plot for Skills Visualization
  // Each skill has a proficiency value assigned to its primary role category
  // Skills are ordered clockwise: NGS → Data → Ecology, with shared skills at boundaries
  const RADAR_DATA = [
    // NGS Scientist skills
    { subject: 'Lib Prep', NGS: 90, Data: 0, Ecology: 0 },
    { subject: 'Illumina', NGS: 90, Data: 0, Ecology: 0 },
    { subject: 'Nanopore', NGS: 75, Data: 0, Ecology: 0 },
    { subject: 'MGI', NGS: 75, Data: 0, Ecology: 0 },
    { subject: 'Metagenomics', NGS: 70, Data: 0, Ecology: 0 },

    // Data Scientist skills (Nextflow shared with NGS)
    { subject: 'Nextflow', NGS: 50, Data: 50, Ecology: 0 },  // Shared NGS + Data
    { subject: 'AWS/GCP', NGS: 0, Data: 75, Ecology: 0 },
    { subject: 'HPC/SLURM', NGS: 0, Data: 90, Ecology: 0 },
    { subject: 'Docker', NGS: 0, Data: 80, Ecology: 0 },
    { subject: 'Python', NGS: 0, Data: 40, Ecology: 0 },
    { subject: 'Shiny', NGS: 0, Data: 90, Ecology: 0 },
    { subject: 'Data Wrangling', NGS: 0, Data: 80, Ecology: 0 },
    { subject: 'R', NGS: 75, Data: 75, Ecology: 75 },  // Shared across all roles

    // Microbial Ecologist skills
    { subject: 'GIT', NGS: 0, Data: 90, Ecology: 90 },
    { subject: 'QIIME2/DADA2', NGS: 0, Data: 0, Ecology: 90 },
    { subject: 'Metabarcoding', NGS: 0, Data: 0, Ecology: 90 },
    { subject: 'PCR', NGS: 0, Data: 0, Ecology: 95 },
    { subject: 'Extraction', NGS: 100, Data: 0, Ecology: 100 }  // Shared NGS + Ecology
  ];

  const CATEGORY_CONFIG = {
    NGS: { color: '#00ffd5', label: 'NGS Scientist' },       // cyan
    Data: { color: '#ff00ff', label: 'Data Scientist' },     // magenta
    Ecology: { color: '#ff6b35', label: 'Microbial Ecologist' }  // orange (distinct)
  };

  function initRadarPlot() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return; // Exit if canvas not found

    const ctx = canvas.getContext('2d');
    const tooltip = document.getElementById('radarTooltip');

    // Canvas dimensions
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 80;

    // Get theme state
    function isDarkMode() {
      return !document.documentElement.hasAttribute('data-theme');
    }

    // Draw function
    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw grid
      drawGrid();

      // Draw data layers (three overlapping areas)
      drawDataLayer('NGS', CATEGORY_CONFIG.NGS.color);
      drawDataLayer('Data', CATEGORY_CONFIG.Data.color);
      drawDataLayer('Ecology', CATEGORY_CONFIG.Ecology.color);

      // Draw axis labels
      drawLabels();
    }

    function drawGrid() {
      const levels = 5;
      ctx.strokeStyle = isDarkMode() ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 1;

      // Draw concentric polygons
      for (let level = 1; level <= levels; level++) {
        ctx.beginPath();
        const levelRadius = (radius / levels) * level;

        RADAR_DATA.forEach((item, i) => {
          const angle = (Math.PI * 2 * i) / RADAR_DATA.length - Math.PI / 2;
          const x = centerX + Math.cos(angle) * levelRadius;
          const y = centerY + Math.sin(angle) * levelRadius;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });

        ctx.closePath();
        ctx.stroke();
      }

      // Draw axis lines
      RADAR_DATA.forEach((item, i) => {
        const angle = (Math.PI * 2 * i) / RADAR_DATA.length - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
      });
    }

    function drawDataLayer(category, color) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.fillStyle = color + '80'; // 50% opacity
      ctx.lineWidth = 3;

      RADAR_DATA.forEach((item, i) => {
        const score = item[category]; // Get the score for this category
        const angle = (Math.PI * 2 * i) / RADAR_DATA.length - Math.PI / 2;
        const distance = (score / 100) * radius;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    function drawLabels() {
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      RADAR_DATA.forEach((item, i) => {
        const angle = (Math.PI * 2 * i) / RADAR_DATA.length - Math.PI / 2;
        const labelDistance = radius + 40;
        const x = centerX + Math.cos(angle) * labelDistance;
        const y = centerY + Math.sin(angle) * labelDistance;

        // Determine primary category for color
        const primaryCategory = item.NGS >= item.Data && item.NGS >= item.Ecology ? 'NGS' :
          item.Data >= item.NGS && item.Data >= item.Ecology ? 'Data' : 'Ecology';
        const color = CATEGORY_CONFIG[primaryCategory].color;

        ctx.fillStyle = color;
        ctx.fillText(item.subject, x, y);
      });
    }

    // Mouse interaction
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if hovering over a data point
      let hoveredSkill = null;
      let minDist = Infinity;

      RADAR_DATA.forEach((item, i) => {
        const angle = (Math.PI * 2 * i) / RADAR_DATA.length - Math.PI / 2;

        // Check all three layers
        ['NGS', 'Data', 'Ecology'].forEach(category => {
          const score = item[category];
          const distance = (score / 100) * radius;
          const pointX = centerX + Math.cos(angle) * distance;
          const pointY = centerY + Math.sin(angle) * distance;

          const dist = Math.sqrt((x - pointX) ** 2 + (y - pointY) ** 2);
          if (dist < 15 && dist < minDist) {
            minDist = dist;
            hoveredSkill = { ...item, hoveredCategory: category };
          }
        });
      });

      if (hoveredSkill) {
        tooltip.style.display = 'block';

        // Calculate tooltip position with boundary checking
        let tooltipX = e.clientX + 10;
        let tooltipY = e.clientY - 10;

        // Get tooltip dimensions (approximate)
        const tooltipWidth = 200; // Approximate width
        const tooltipHeight = 120; // Approximate height

        // Check right boundary
        if (tooltipX + tooltipWidth > window.innerWidth) {
          tooltipX = e.clientX - tooltipWidth - 10;
        }

        // Check bottom boundary
        if (tooltipY + tooltipHeight > window.innerHeight) {
          tooltipY = e.clientY - tooltipHeight - 10;
        }

        // Check left boundary
        if (tooltipX < 0) {
          tooltipX = 10;
        }

        // Check top boundary
        if (tooltipY < 0) {
          tooltipY = 10;
        }

        tooltip.style.left = tooltipX + 'px';
        tooltip.style.top = tooltipY + 'px';

        // Find the primary role (non-zero value)
        const primaryRole = hoveredSkill.NGS > 0 ? 'NGS' : hoveredSkill.Data > 0 ? 'Data' : 'Ecology';
        const proficiency = Math.max(hoveredSkill.NGS, hoveredSkill.Data, hoveredSkill.Ecology);

        tooltip.innerHTML = `
          <div style="font-weight: bold; color: ${CATEGORY_CONFIG[primaryRole].color}; margin-bottom: 0.25rem;">${hoveredSkill.subject}</div>
          <div style="color: #a1a1aa; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">${CATEGORY_CONFIG[primaryRole].label}</div>
          <div style="font-size: 1.5rem; font-weight: bold; color: ${CATEGORY_CONFIG[primaryRole].color};">${proficiency}%</div>
          <div style="margin-top: 0.5rem; font-size: 0.7rem; color: #71717a;">Proficiency Level</div>
        `;
      } else {
        tooltip.style.display = 'none';
      }
    });

    canvas.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });

    // Initial draw
    draw();

    // Redraw on theme change
    const themeCheckbox = document.getElementById('theme-checkbox');
    if (themeCheckbox) {
      themeCheckbox.addEventListener('change', draw);
    }
  }

  // Initialize radar plot
  initRadarPlot();

  // Reveal on Scroll Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
});
