// Authentication Modal Logic
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const chatModal = document.getElementById("chatModal");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const logoutBtn = document.getElementById("logoutBtn");

// OPEN MODALS
document.querySelectorAll("[data-toggle='login']").forEach(btn =>
  btn.addEventListener("click", () => {
    loginModal.style.display = "flex";
  })
);
document.querySelectorAll("[data-toggle='register']").forEach(btn =>
  btn.addEventListener("click", () => {
    registerModal.style.display = "flex";
  })
);
document.querySelectorAll("[data-toggle='chat']").forEach(btn =>
  btn.addEventListener("click", () => {
    chatModal.style.display = "flex";
  })
);

// CLOSE MODALS
document.querySelectorAll(".modal .close-btn").forEach(btn =>
  btn.addEventListener("click", () => {
    btn.closest(".modal").style.display = "none";
  })
);

// LOGIN
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = loginForm.querySelector("input[name='email']").value;
  const password = loginForm.querySelector("input[name='password']").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password");
    return;
  }

  localStorage.setItem("user", JSON.stringify(user));
  alert("Logged in successfully");
  loginModal.style.display = "none";
  updateAuthUI();
});

// REGISTER
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = registerForm.querySelector("input[name='name']").value;
  const email = registerForm.querySelector("input[name='email']").value;
  const password = registerForm.querySelector("input[name='password']").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.find(u => u.email === email)) {
    alert("Email already registered.");
    return;
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("user", JSON.stringify(newUser));
  alert("Registered and logged in!");
  registerModal.style.display = "none";
  updateAuthUI();
});

// LOGOUT
logoutBtn?.addEventListener("click", function () {
  localStorage.removeItem("user");
  alert("You have been logged out.");
  updateAuthUI();
});

// AUTH UI (Show user info or login/register)
function updateAuthUI() {
  const user = JSON.parse(localStorage.getItem("user"));
  const authLinks = document.getElementById("authLinks");
  const userPanel = document.getElementById("userPanel");

  if (user) {
    if (authLinks) authLinks.style.display = "none";
    if (userPanel) {
      userPanel.style.display = "block";
      userPanel.querySelector(".username").textContent = user.name;
    }
  } else {
    if (authLinks) authLinks.style.display = "block";
    if (userPanel) userPanel.style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", updateAuthUI);