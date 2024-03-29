const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

// For Signup Form
document.getElementById("createAccountForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var email = document.getElementById("signupEmail").value;
    var password = document.getElementById("signupPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Account created successfully!");
    window.location.href = "index.html";
});

// For Login Form
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    var storedEmail = localStorage.getItem("email");
    var storedPassword = localStorage.getItem("password");

    // Check if email and password fields are filled
    if (!email || !password) {
        alert("Please fill in both email and password fields.");
        return; // Stop the login process if fields are not filled
    }

    if (email === storedEmail && password === storedPassword) {
        alert("Login successful!");
        // Redirect or perform any other action after successful login
        window.location.href = "dashboard.html";
    } else if (email === storedEmail && password !== storedPassword) {
        alert("Incorrect password. Please try again.");
    } else if (email !== storedEmail) {
        alert("Email not found. Creating a new account.");
        window.location.href = "index.html";
    }
});