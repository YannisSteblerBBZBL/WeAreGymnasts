document.addEventListener("DOMContentLoaded", () => {
    const loadBlogs = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token nicht gefunden");
            }

            const response = await fetch("http://localhost:8080/api/blogs", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            if (!response.ok) throw new Error("Network response was not ok");

            const blogs = await response.json();
            const blogList = document.getElementById("blogs");
            blogList.innerHTML = "";
            blogs.forEach((blog) => {
                const blogItem = document.createElement("div");
                blogItem.className = "blog-item";
                blogItem.innerHTML = `
                    <h3>${blog.author}</h3>
                    <p>${blog.content}</p>
                    <small>${new Date(blog.timestamp).toLocaleString("de-DE", {
                        timeZone: "Europe/Zurich",
                    })}</small>
                `;
                blogList.appendChild(blogItem);
            });
        } catch (error) {
            console.error("Error loading blogs:", error);
        }
    };

    const username = localStorage.getItem("username");
    if (username) {
        document.getElementById("user-status").innerHTML = `
            ${username} 
            <button class="button logout-button" id="logout-button">Abmelden</button>
        `;
        document.getElementById("logout-button").addEventListener("click", () => {
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            window.location.href = "/templates/index.html";
        });
        document.getElementById("blog-form-container").style.display = "block";
        loadBlogs(); // Nur laden, wenn der Benutzer eingeloggt ist
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const messageDiv = document.getElementById("message");
            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem("username", username);
                localStorage.setItem("token", token);
                messageDiv.textContent =
                    "Login erfolgreich! Sie werden in Kürze weitergeleitet.";
                messageDiv.style.color = "green";
                setTimeout(() => {
                    window.location.href = "/templates/index.html";
                }, 2000);
            } else {
                const errorText = await response.text();
                messageDiv.textContent = "Login fehlgeschlagen: " + errorText;
                messageDiv.style.color = "red";
            }
        });
    }

    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response = await fetch("http://localhost:8080/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const messageDiv = document.getElementById("message");
            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem("username", username);
                localStorage.setItem("token", token);
                messageDiv.textContent =
                    "Registrierung erfolgreich! Sie werden in Kürze weitergeleitet.";
                messageDiv.style.color = "green";
                setTimeout(() => {
                    window.location.href = "/templates/index.html";
                }, 2000);
            } else {
                const errorText = await response.text();
                messageDiv.textContent = "Registrierung fehlgeschlagen: " + errorText;
                messageDiv.style.color = "red";
            }
        });
    }

    const blogForm = document.getElementById("blogForm");
    if (blogForm) {
        blogForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const content = document.getElementById("content").value;
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Sie müssen eingeloggt sein, um einen Blogeintrag zu erstellen.");
                return;
            }

            const response = await fetch("http://localhost:8080/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({ content }),
            });

            const messageDiv = document.getElementById("message");
            if (response.ok) {
                messageDiv.textContent = "Blogeintrag erfolgreich erstellt!";
                messageDiv.style.color = "green";
                document.getElementById("content").value = "";
                loadBlogs();
            } else {
                const errorText = await response.text();
                messageDiv.textContent = "Fehler: " + errorText;
                messageDiv.style.color = "red";
            }
        });
    }

    if (username) {
        loadBlogs().catch((error) => console.error("Error loading blogs:", error));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleSidebar = document.querySelector('.toggle-sidebar');
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('active');
        });
    }
});
