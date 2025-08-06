
console.log("validador-win.js carregado");

function validarWIN() {
  const numero = document.getElementById("winInput").value.trim();
  const foto = document.getElementById("fotoWin").value.trim();
  const resultadoDiv = document.getElementById("resultadoWIN");

  let valido = false;
  let interpretacao = "";

  if (numero.length !== 14 && numero.length !== 16) {
    resultadoDiv.innerHTML = "<span class='erro'>❌ Número WIN inválido: deve conter 14 ou 16 caracteres.</span>";
    guardarNoHistoricoWIN(numero, "Inválido", "Número com comprimento incorreto.", foto);
    return;
  }

  const pais = numero.slice(0, 2).toUpperCase();
  const fabricante = numero.slice(2, 5).toUpperCase();
  const serie = numero.slice(5, numero.length === 14 ? 10 : 12).toUpperCase();
  const letraMes = numero.charAt(numero.length === 14 ? 10 : 12).toUpperCase();
  const ano = numero.charAt(numero.length === 14 ? 11 : 13);
  const modelo = numero.slice(-2);

  // Verificações básicas
  const letrasValidas = "ABCDEFGHJKLMNPRSTUVWXYZ";
  if (!letrasValidas.includes(letraMes)) {
    resultadoDiv.innerHTML = "<span class='erro'>❌ Letra do mês inválida no número WIN.</span>";
    guardarNoHistoricoWIN(numero, "Inválido", "Letra de mês inválida.", foto);
    return;
  }

  valido = true;
  interpretacao += `<div><strong>País:</strong> ${pais}</div>`;
  interpretacao += `<div><strong>Fabricante:</strong> ${fabricante}</div>`;
  interpretacao += `<div><strong>Série:</strong> ${serie}</div>`;
  interpretacao += `<div><strong>Mês:</strong> ${letraMes}</div>`;
  interpretacao += `<div><strong>Ano:</strong> ${ano}</div>`;
  interpretacao += `<div><strong>Modelo:</strong> ${modelo}</div>`;

  if (valido) {
    resultadoDiv.innerHTML = `<div class='sucesso'>✅ Número WIN válido</div>${interpretacao}`;
    guardarNoHistoricoWIN(numero, "Válido", interpretacao, foto);
  }
}

function guardarNoHistoricoWIN(numero, resultado, interpretacao, foto) {
  const historico = JSON.parse(localStorage.getItem("historicoWIN")) || [];
  const entrada = {
    data: new Date().toLocaleString(),
    numero: numero,
    resultado: resultado,
    interpretacao: interpretacao,
    foto: foto || "(reservado)"
  };
  historico.push(entrada);
  localStorage.setItem("historicoWIN", JSON.stringify(historico));
}
