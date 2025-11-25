// ---- Storage helpers (per user) ----
const loadUsers = () => JSON.parse(localStorage.getItem("users") || "{}");
const saveUsers = (u) => localStorage.setItem("users", JSON.stringify(u));

const txKey = (user) => `transactions_${user}`;
const loadTx = (user) => JSON.parse(localStorage.getItem(txKey(user)) || "[]");
const saveTx = (user, tx) => localStorage.setItem(txKey(user), JSON.stringify(tx));

// ---- App state ----
let users = loadUsers();
let currentUser = null;
let transactions = []; // always bound to currentUser after login

// ---- Page switching ----
function showPage(pageId) {
  document.querySelectorAll(".container").forEach(div => div.classList.add("hidden"));
  const target = document.getElementById(pageId);
  if (target) target.classList.remove("hidden");
}

// ---- Auth ----
function signup() {
  const user = document.getElementById("signupUser").value.trim();
  const pass = document.getElementById("signupPass").value.trim();
  if (!user || !pass) return alert("Please fill all fields.");
  if (users[user]) return alert("User already exists. Please login.");

  users[user] = pass;
  saveUsers(users);
  alert("Sign Up successful! Please login.");
  showPage("loginPage");
}

function login() {
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();
  if (!user || !pass) return alert("Enter username and password.");

  if (users[user] && users[user] === pass) {
    currentUser = user;
    transactions = loadTx(currentUser);
    alert("Login successful! Welcome " + user);
    showPage("dashboard");
    updateSummary();
    renderAllTransactions();
  } else {
    alert("Invalid credentials. Please try again.");
  }
}