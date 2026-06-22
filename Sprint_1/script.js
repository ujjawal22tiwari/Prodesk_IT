
const html = document.documentElement;
const themeBtns = document.querySelectorAll("#theme-toggle, #theme-toggle-mobile");
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (localStorage.getItem("theme") === "dark") {
  html.classList.add("dark");
}

function syncThemeUI() {
  const isDark = html.classList.contains("dark");

  themeBtns.forEach(btn => {

    const sun = btn.querySelector(".theme-sun");
    const moon = btn.querySelector(".theme-moon");
    const label = btn.querySelector(".theme-label");

    if (sun && moon) {
      sun.classList.toggle("hidden", isDark);
      moon.classList.toggle("hidden", !isDark);
    }

    if (label) label.textContent = isDark ? "DARK" : "LIGHT";

    btn.setAttribute("aria-label", isDark ? "Light mode" : "Dark mode");
  });
}


themeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const activeDark = html.classList.toggle("dark");
    localStorage.setItem("theme", activeDark ? "dark" : "light");
    syncThemeUI();
  });
});


if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    const isOpen = !mobileMenu.classList.contains("hidden");

    menuBtn.setAttribute("aria-expanded", isOpen);

    menuBtn.textContent = isOpen ? "X" : "=";
  });
}

syncThemeUI();


const loadHTML = async (elementId, filePath) => {
  try {
    const res = await fetch(filePath);
    document.getElementById(elementId).innerHTML = await res.text();
  } catch (err) {
    console.error(`Failed to load ${filePath}:`, err);
  }
};

loadHTML("main", "main.html");
loadHTML("footer", "footer.html");