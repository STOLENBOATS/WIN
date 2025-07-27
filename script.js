
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "admin" && pass === "123") {
    window.location.href = "validador.html";
  } else {
    document.getElementById("error").textContent = "Credenciais inválidas.";
  }
}

function logout() {
  window.location.href = "index.html";
}

function validarWIN() {
  const win = document.getElementById("winInput").value.trim();
  const cleanWIN = win.replace("-", "").toUpperCase();
  let result = "";
  if (cleanWIN.length !== 14 && cleanWIN.length !== 16) {
    result = "❌ Tamanho inválido (deve ter 14 ou 16 caracteres excluindo hífen).";
  } else {
    result = "✅ Formato base aparentemente correto.";
  }
  document.getElementById("resultado").textContent = result;
}
