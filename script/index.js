// script.js

const signInBtn = document.getElementById("sign-in-btn");
const signUpBtn = document.getElementById("sign-up-btn");
const container = document.querySelector(".container");

signUpBtn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

signInBtn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

function initializeDashboard() {
    const tracker = new Tracker();
    tracker.initiate();
}

document
    .getElementById("createAccountForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        var username = document.getElementById("signupUsername").value;
        var email = document.getElementById("signupEmail").value;
        var password = document.getElementById("signupPassword").value;
        var confirmPassword = document.getElementById("confirmPassword").value;

        if (!username || !email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        // clearUserData();

        const userId = Math.random().toString(36).substr(2, 9);

        // Store user data
        localStorage.setItem(
            email,
            JSON.stringify({ userId: userId, username: username, password: password })
        );
        alert("Account created successfully!");

        initializeDashboard();
    });

document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        var email = document.getElementById("loginEmail").value;
        var password = document.getElementById("loginPassword").value;

        if (!email || !password) {
            alert("Please fill in both email and password fields.");
            return;
        }

        var userData = JSON.parse(localStorage.getItem(email));

        if (!userData) {
            alert("Email not found. Creating a new account.");
            return;
        }
        if (!userData || password !== userData.password) {
            alert("Incorrect email or password. Please try again.");
            return;
        }

        alert("Login successful!");

        window.location.href = `dashboard.html?userId=${userData.userId}`;
    });
