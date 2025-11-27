const body = document.body;
const btn = document.getElementById("themeBtn");

let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
} else {
  body.classList.add("light");
}

btn.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    body.classList.replace("light", "dark");
    localStorage.setItem("theme", "dark"); // save
  } else {
    body.classList.replace("dark", "light");
    localStorage.setItem("theme", "light"); // save
  }
});