document.getElementById('winForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const winInput = document.getElementById('winInput').value.trim().toUpperCase();
  const resultDiv = document.getElementById('resultadoValidacao');
  const detailDiv = document.getElementById('detalhesValidacao');
  resultDiv.innerHTML = '';
  detailDiv.innerHTML = '';

  if (winInput.length < 14 || winInput.length > 16 || winInput.length === 15) {
    resultDiv.innerHTML = '<span style="color:red;">Formato inválido: Deve conter 14 ou 16 caracteres válidos</span>';
    return;
  }

  const valid = /^[A-Z]{2}-?[A-Z]{3}[A-Z0-9]{5,7}[A-HJ-NPR-Z][0-9][0-9]{2}$/.test(winInput.replace(/-/g, ''));

  if (!valid) {
    resultDiv.innerHTML = '<span style="color:red;">Formato inválido</span>';
  } else {
    resultDiv.innerHTML = '<span style="color:green;">Válido</span>';
    detailDiv.innerHTML = '<ul>' +
      '<li><strong>País:</strong> ' + winInput.substring(0, 2) + '</li>' +
      '<li><strong>Fabricante:</strong> ' + winInput.substring(3, 6) + '</li>' +
      '<li><strong>Série:</strong> ' + winInput.substring(6, 11) + '</li>' +
      '<li><strong>Mês:</strong> ' + winInput.charAt(11) + '</li>' +
      '<li><strong>Ano Produção:</strong> ' + winInput.charAt(12) + '</li>' +
      '<li><strong>Ano Modelo:</strong> ' + winInput.substring(13) + '</li>' +
      '</ul>';
  }
});
