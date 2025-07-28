
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

function validarWIN() {
  const input = document.getElementById("winInput").value;
  const resultadoDiv = document.getElementById("resultado");
  let valido = input.length >= 14 && input.length <= 16; // Simplificação
  let just = valido ? "Formato reconhecido." : "Formato inválido.";
  resultadoDiv.innerHTML = `<p style="color:${valido ? 'green' : 'red'}">${just}</p>`;

  const historico = JSON.parse(localStorage.getItem("historico") || "[]");
  historico.unshift({ data: new Date().toLocaleString(), win: input, resultado: valido ? "Válido" : "Inválido", justificacao: just });
  localStorage.setItem("historico", JSON.stringify(historico));
}

function carregarHistorico() {
  const tbody = document.querySelector("#tabelaHistorico tbody");
  const historico = JSON.parse(localStorage.getItem("historico") || "[]");
  tbody.innerHTML = "";
  historico.forEach(reg => {
    let linha = `<tr><td>${reg.data}</td><td>${reg.win}</td><td>${reg.resultado}</td><td>${reg.justificacao}</td></tr>`;
    tbody.innerHTML += linha;
  });
}

function exportarHistorico() {
  const historico = localStorage.getItem("historico");
  const blob = new Blob([historico], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "historico_win.json";
  a.click();
}

if (location.pathname.includes("historico.html")) carregarHistorico();
