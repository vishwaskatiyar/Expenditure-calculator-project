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
    // Assuming Tracker class and initiate() method are defined elsewhere
    const tracker = new tracker();
    tracker.initiate();
}

document.getElementById("createAccountForm").addEventListener("submit", function (event) {
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

    // Check if user already exists
    var existingUser = localStorage.getItem(email);
    if (!existingUser) {
        // Generate user ID
        const userId = Math.random().toString(36).substr(2, 9);

        // Store user data
        localStorage.setItem(
            email,
            JSON.stringify({ userId: userId, username: username, password: password })
        );
        alert("Account created successfully!");

        // Reload the page
        window.location.reload();

        initializeDashboard();
    } else {
        alert("Email already exists. Please use a different email address.");
        return;
    }
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Please fill in both email and password fields.");
        return;
    }

    // Retrieve user data
    var userData = JSON.parse(localStorage.getItem(email));

    if (!userData) {
        alert("Email not found. Please create an account.");
        return;
    }

    if (password !== userData.password) {
        alert("Incorrect email or password. Please try again.");
        return;
    }

    alert("Login successful!");
    window.location.href = `dashboard.html?userId=${userData.userId}`;
});
