document.addEventListener("DOMContentLoaded", function () {
  const signoutLink = document.getElementById("signout");

  if (signoutLink) {
    signoutLink.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.removeItem("token");
      alert("You have been signed out.");
      window.location.href = "signin.html";
    });
  }

  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        alert("Login successful, token stored in localStorage");
        window.location.href = "users.html"; // Redirect to Users page
      } catch (error) {
        console.error("Error:", error);
        alert("Login failed");
      }
    });
  }

  // Update the navigation bar based on authentication status
  updateNavBar();

  function updateNavBar() {
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;

    const home = document.getElementById("home");
    const users = document.getElementById("users");
    const profile = document.getElementById("profile");
    const signout = document.getElementById("signout");
    const signup = document.getElementById("signup");
    const signin = document.getElementById("signin");

    if (isAuthenticated) {
      users.style.display = "block";
      profile.style.display = "block";
      signout.style.display = "block";
      signup.style.display = "none";
      signin.style.display = "none";
    } else {
      users.style.display = "none";
      profile.style.display = "none";
      signout.style.display = "none";
      signup.style.display = "block";
      signin.style.display = "block";
    }
  }

  window.signOut = function () {
    localStorage.removeItem("token");
    updateNavBar();
    window.location.href = "index.html";
  };
});
