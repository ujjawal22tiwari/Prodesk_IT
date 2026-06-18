
const root = document.documentElement;
const themeToggleButtons = document.querySelectorAll("#theme-toggle, #theme-toggle-mobile");
const menuButton = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

 
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "dark") {
  root.classList.add("dark");
}

function updateThemeUI() {
  const isDark = root.classList.contains("dark");
  
  themeToggleButtons.forEach((button) => {
    const sunIcon = button.querySelector(".theme-sun");
    const moonIcon = button.querySelector(".theme-moon");
    const label = button.querySelector(".theme-label");
    
    if (sunIcon && moonIcon) {
      // Show sun in light mode, moon in dark mode
      if (isDark) {
        sunIcon.classList.add("hidden");
        moonIcon.classList.remove("hidden");
      } else {
        sunIcon.classList.remove("hidden");
        moonIcon.classList.add("hidden");
      }
    }
    
    if (label) {
      label.textContent = isDark ? "DARK" : "LIGHT";
    }
    
    button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    button.dataset.mode = isDark ? "dark" : "light";
  });
}

// Toggle theme on button click
themeToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    root.classList.toggle("dark");
    localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
    updateThemeUI();
  });
});

// Mobile menu toggle
if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.toggle("hidden");
    menuButton.setAttribute("aria-expanded", !isHidden);
    menuButton.setAttribute("aria-label", isHidden ? "Open menu" : "Close menu");
    menuButton.textContent = isHidden ? "=" : "X";
  });
}

// Initialize UI on page load
updateThemeUI();
  