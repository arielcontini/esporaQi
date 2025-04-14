// script.js
const dropdownBtn = document.querySelectorAll(".dropdown-btn");
const dropdown = document.querySelectorAll(".dropdown");
const hamburgerBtn = document.getElementById("hamburger");
const navMenu = document.querySelector(".menu");
const links = document.querySelectorAll(".dropdown a");

// Toggle the dropdown menu's active state
function toggleDropdown(dropdownElement) {
  dropdownElement.classList.toggle("active");
}

// Close all dropdown menus
function closeDropdownMenu() {
  dropdown.forEach((drop) => {
    drop.classList.remove("active");
  });
}

// Set aria-expanded attribute to false for all dropdown buttons
function setAriaExpandedFalse() {
  dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

// Toggle the navigation menu (hamburger menu)
function toggleHamburger() {
  navMenu.classList.toggle("show");
}

// Add click event listener to each dropdown button
dropdownBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const dropdownIndex = e.currentTarget.dataset.dropdown;
    const dropdownElement = document.getElementById(dropdownIndex);

    toggleDropdown(dropdownElement);
    dropdown.forEach((drop) => {
      if (drop.id !== btn.dataset["dropdown"]) {
        drop.classList.remove("active");
      }
    });
    
    // Toggle aria-expanded attribute
    const isExpanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", isExpanded ? "false" : "true");

    e.stopPropagation();
  });
});

// Add click event listener to each dropdown link
links.forEach((link) =>
  link.addEventListener("click", () => {
    closeDropdownMenu();
    setAriaExpandedFalse();
    if (navMenu.classList.contains('show')) {
      toggleHamburger(); // Close the navigation menu if open
    }
  })
);

// Close dropdown menu and hide navigation menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
    closeDropdownMenu();
    setAriaExpandedFalse();
    if (navMenu.classList.contains('show')) {
      toggleHamburger(); // Close the navigation menu if open
    }
  }
});

// Close dropdown menu and hide navigation menu when pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDropdownMenu();
    setAriaExpandedFalse();
    if (navMenu.classList.contains('show')) {
      toggleHamburger(); // Close the navigation menu if open
    }
  }
});

// Toggle the navigation menu when the hamburger button is clicked
hamburgerBtn.addEventListener("click", toggleHamburger);
