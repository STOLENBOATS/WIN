
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");
    const userDisplay = document.getElementById("userDisplay");

    const users = {
        "admin": "Admin2025",
        "ricardo": "R1c4rd0!"
    };

    // LOGIN
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value;

            if (users[username] && users[username] === password) {
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("username", username);
                window.location.href = "validador.html";
            } else {
                alert("Credenciais inválidas.");
            }
        });
    }

    // PROTEÇÃO DE PÁGINAS
    if (document.body.dataset.protected === "true") {
        const loggedIn = localStorage.getItem("loggedIn");
        if (loggedIn !== "true") {
            window.location.href = "login.html";
        }
    }

    // MOSTRAR NOME DO UTILIZADOR ATIVO
    if (userDisplay) {
        const username = localStorage.getItem("username");
        userDisplay.textContent = username ? username : "Utilizador";
    }

    // LOGOUT
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("username");
            window.location.href = "login.html";
        });
    }
});
