document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const commentForm = document.getElementById("commentForm");
  const commentsSection = document.getElementById("commentsSection");

  // Register
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = registerForm.querySelector("input[name='name']").value;
      const email = registerForm.querySelector("input[name='email']").value;
      const password = registerForm.querySelector("input[name='password']").value;

      let users = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = users.find(user => user.email === email);
      if (userExists) {
        alert("User already exists!");
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      // Store the logged-in user
      localStorage.setItem("currentUser", JSON.stringify({ name, email }));

      alert("Registered successfully!");
      window.location.href = "comment.html";
    });
  }

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = loginForm.querySelector("input[name='email']").value;
      const password = loginForm.querySelector("input[name='password']").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const matchedUser = users.find(user => user.email === email && user.password === password);

      if (!matchedUser) {
        alert("Invalid email or password!");
        return;
      }

      // Store the logged-in user
      localStorage.setItem("currentUser", JSON.stringify({ name: matchedUser.name, email }));

      alert("Logged in successfully!");
      window.location.href = "comment.html";
    });
  }

  // Load and display saved comments
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  if (commentsSection) {
    savedComments.forEach(({ name, comment }) => {
      appendComment(name, comment);
    });
  }

  // Post comment
  if (commentForm) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      alert("Please log in first.");
      window.location.href = "index.html";
      return;
    }

    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const comment = commentForm.querySelector("textarea").value;

      savedComments.push({ name: currentUser.name, comment });
      localStorage.setItem("comments", JSON.stringify(savedComments));

      appendComment(currentUser.name, comment);
      commentForm.reset();
    });
  }

  function appendComment(name, comment) {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${name}</strong>: ${comment}`;
    div.style.marginTop = "10px";
    commentsSection.appendChild(div);
  }
});
