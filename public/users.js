document.addEventListener("DOMContentLoaded", async function () {
  const userList = document.getElementById("user-list");

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const response = await fetch("http://localhost:3000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    users.forEach((user) => {
      const item = document.createElement("div");
      item.classList.add("user-item");

      const icon = document.createElement("i");
      icon.classList.add("fas", "fa-user-circle");

      const username = document.createElement("span");
      username.textContent = user.name;

      item.appendChild(icon);
      item.appendChild(username);
      userList.appendChild(item);
    });
  } catch (error) {
    console.error("Error:", error);
  }
});
