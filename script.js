
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "admin" && pass === "1234") {
    window.location.href = "validador.html";
  } else {
    document.getElementById("error").innerText = "Credenciais inválidas.";
  }
}

function terminarSessao() {
  window.location.href = "login.html";
}

function verHistorico() {
  window.location.href = "historico.html";
}

function voltar() {
  window.location.href = "validador.html";
}

function validarWIN() {
  const input = document.getElementById("winInput").value.trim();
  const resultado = document.getElementById("resultado");
  let mensagem = "";
  let valido = false;
  let motivo = "";

  if (input.length === 14) {
    if (/^[A-Z]{2}-[A-Z0-9]{3}-[0-9]{5}$/.test(input)) {
      valido = true;
      mensagem = "Número de casco VÁLIDO.";
    } else {
      motivo = "Formato inválido.";
    }
  } else if (input.length === 12) {
    if (/^[A-Z]{3}[0-9]{9}$/.test(input)) {
      valido = true;
      mensagem = "Número de casco VÁLIDO.";
    } else {
      motivo = "Estrutura inválida.";
    }
  } else {
    motivo = "Comprimento inválido.";
  }

  resultado.className = "mostrar " + (valido ? "valido" : "invalido");
  resultado.innerText = valido ? mensagem : "Inválido: " + motivo;

  const registo = {
    data: new Date().toLocaleString(),
    win: input,
    resultado: valido ? "Válido" : "Inválido",
    motivo: motivo,
    foto: null
  };

  const historico = JSON.parse(localStorage.getItem("historico")) || [];
  historico.push(registo);
  localStorage.setItem("historico", JSON.stringify(historico));
}

document.addEventListener("DOMContentLoaded", () => {
  const tabela = document.getElementById("historicoTable");
  if (tabela) {
    const historico = JSON.parse(localStorage.getItem("historico")) || [];
    const corpo = tabela.querySelector("tbody");
    historico.forEach(registo => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${registo.data}</td>
        <td>${registo.win}</td>
        <td>${registo.resultado || ''}</td>
        <td>${registo.motivo || ''}</td>
        <td>${registo.foto ? '<img src="' + registo.foto + '">' : '—'}</td>
      `;
      corpo.appendChild(linha);
    });
  }
});
