document.addEventListener("DOMContentLoaded", async function () {
  const profileName = document.getElementById("profile-name");
  const profileEmail = document.getElementById("profile-email");

  try {
    const response = await fetch("http://localhost:3000/api/users/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const user = await response.json();

    if (response.ok) {
      profileName.textContent = user.name;
      profileEmail.textContent = user.email;
    } else {
      console.error("Failed to fetch profile", user);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
