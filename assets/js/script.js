'use strict';

// Element toggle function for showing/hiding elements
const toggleActiveClass = (elem) => {
  elem.classList.toggle("active");
};

// Sidebar toggle setup
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", () => toggleActiveClass(sidebar));

// Testimonials modal setup
const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Function to toggle the modal and overlay
const toggleTestimonialsModal = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Set up each testimonial item to open the modal when clicked
testimonialsItems.forEach(item => {
  item.addEventListener("click", () => {
    const avatar = item.querySelector("[data-testimonials-avatar]").src;
    const title = item.querySelector("[data-testimonials-title]").innerText;
    const text = item.querySelector("[data-testimonials-text]").innerText;

    modalContainer.querySelector("[data-modal-img]").src = avatar;
    modalContainer.querySelector("[data-modal-title]").innerText = title;
    modalContainer.querySelector("[data-modal-text] p").innerText = text;

    toggleTestimonialsModal();
  });
});

// Close modal on overlay or close button click
modalCloseBtn.addEventListener("click", toggleTestimonialsModal);
overlay.addEventListener("click", toggleTestimonialsModal);

// Custom select box for project filtering
const selectBox = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValueDisplay = document.querySelector("[data-select-value]");
const filterButtons = document.querySelectorAll("[data-filter-btn]");
const projectItems = document.querySelectorAll("[data-filter-item]");

// Toggle visibility of select dropdown
selectBox.addEventListener("click", () => toggleActiveClass(selectBox));

// Function to filter project items based on selected category
const applyFilter = (category) => {
  console.log("Filtering category:", category); // Debug statement
  projectItems.forEach(item => {
    console.log("Project category:", item.dataset.category); // Debug statement
    if (category === "all" || category === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Set up each select item to filter projects
selectItems.forEach(item => {
  item.addEventListener("click", () => {
    const category = item.innerText.toLowerCase();
    console.log("Selected category:", category); // Debug statement
    selectValueDisplay.innerText = item.innerText;
    toggleActiveClass(selectBox);
    applyFilter(category);
  });
});

// Set up each filter button to filter projects
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.innerText.toLowerCase();
    console.log("Button category:", category); // Debug statement
    selectValueDisplay.innerText = button.innerText;
    applyFilter(category);

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// Contact form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Enable form submit button only if form is valid
formInputs.forEach(input => {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
});

// Page navigation setup
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Function to handle page navigation
navigationLinks.forEach(link => {
  link.addEventListener("click", () => {
    const pageName = link.innerText.toLowerCase();

    // Remove 'active' class from all pages and navigation links
    pages.forEach(page => page.classList.remove("active"));
    navigationLinks.forEach(navLink => navLink.classList.remove("active"));

    // Activate the clicked page and link
    const currentPage = document.querySelector(`[data-page="${pageName}"]`);
    if (currentPage) {
      currentPage.classList.add("active");
      link.classList.add("active");
    }

    // Scroll to the top after navigation
    window.scrollTo(0, 0);
  });
});

// Theme toggle functionality with localStorage support
const themeToggle = document.getElementById('theme-toggle');

// Load saved theme preference
if (localStorage.getItem('theme') === 'light') {
  document.documentElement.classList.add('light-mode');
  themeToggle.classList.add('light-mode');
}

// Toggle theme and save the current preference to localStorage
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('light-mode');
  themeToggle.classList.toggle('light-mode');
  
  const currentTheme = document.documentElement.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', currentTheme);
});
