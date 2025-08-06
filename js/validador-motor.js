
console.log("validador-motor.js carregado");

function validarMotor() {
  const marca = document.getElementById("marcaMotor").value.toLowerCase();
  const numero = document.getElementById("motorInput").value.trim();
  const foto = document.getElementById("fotoMotor").value.trim();
  const resultadoDiv = document.getElementById("resultadoMotor");

  let resultado = "";
  let valido = false;
  let interpretacao = "";

  if (!marca || numero === "") {
    resultadoDiv.innerHTML = "<span class='erro'>Por favor selecione a marca e insira o número de motor.</span>";
    return;
  }

  // Yamaha
  if (marca === "yamaha") {
    const regexYamaha = /^([A-Z0-9]{3})\s?([A-Z])\s?(\d{7})$/i;
    const match = numero.match(regexYamaha);

    if (match) {
      interpretacao += `<div><strong>Marca:</strong> Yamaha</div>`;
      interpretacao += `<div><strong>Código do Modelo:</strong> ${match[1]}</div>`;
      interpretacao += `<div><strong>Ano (letra):</strong> ${match[2]}</div>`;
      interpretacao += `<div><strong>Número de Série:</strong> ${match[3]}</div>`;
      valido = true;
    }
  }

  // Honda
  else if (marca === "honda") {
    const regexHonda = /^([A-Z]{4}-)(\d{7})$/i;
    const match = numero.match(regexHonda);

    if (match) {
      interpretacao += `<div><strong>Marca:</strong> Honda</div>`;
      interpretacao += `<div><strong>Prefixo do Modelo:</strong> ${match[1]}</div>`;
      interpretacao += `<div><strong>Número de Série:</strong> ${match[2]}</div>`;
      valido = true;
    }
  }

  // Resultado final
  if (valido) {
    resultado = `<div class='sucesso'>✅ Número de motor válido</div>${interpretacao}`;
    guardarNoHistoricoMotor(marca, numero, "Válido", interpretacao, foto);
  } else {
    resultado = `<div class='erro'>❌ Número de motor inválido ou estrutura incorreta para a marca selecionada.</div>`;
    guardarNoHistoricoMotor(marca, numero, "Inválido", "Formato ou estrutura não reconhecida.", foto);
  }

  resultadoDiv.innerHTML = resultado;
}

function guardarNoHistoricoMotor(marca, numero, resultado, interpretacao, foto) {
  const historico = JSON.parse(localStorage.getItem("historicoMotor")) || [];
  const entrada = {
    data: new Date().toLocaleString(),
    marca: marca,
    numero: numero,
    resultado: resultado,
    interpretacao: interpretacao,
    foto: foto || "(reservado)"
  };
  historico.push(entrada);
  localStorage.setItem("historicoMotor", JSON.stringify(historico));
}
