const btn = document.getElementById("menuToggle");
const menu = document.getElementById("navMenu");

btn.addEventListener("click", () => {
  menu.classList.toggle("active");
});
