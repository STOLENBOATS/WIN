function validarWIN() {
  const input = document.getElementById('winInput');
  const resultado = document.getElementById('resultado');
  const valor = input.value.trim();
  if (valor.length >= 12 && valor.includes('-')) {
    resultado.textContent = 'Formato base aparentemente correto.';
    resultado.className = 'resultado ok';
  } else {
    resultado.textContent = 'Inválido: Comprimento inválido.';
    resultado.className = 'resultado erro';
  }
}