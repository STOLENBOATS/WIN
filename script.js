function validarWIN() {
  const input = document.getElementById('winInput');
  const resultado = document.getElementById('resultado');
  const win = input.value.trim().toUpperCase();
  let mensagem = '';
  let valido = true;
  let justificacao = '';

  if (!/^([A-Z]{2})-([A-Z0-9]{3})([0-9]{5,})$/.test(win)) {
    mensagem = 'Formato inválido: Deve seguir o padrão XX-XXX#####';
    valido = false;
    justificacao = 'Formato não reconhecido.';
  } else {
    const partes = win.split('-');
    const pais = partes[0];
    const fabricante = partes[1].slice(0, 3);
    const numero = partes[1].slice(3);

    mensagem = `País: ${pais}<br>Fabricante: ${fabricante}<br>Número Série: ${numero}`;
    justificacao = 'Formato válido e reconhecido.';
  }

  resultado.innerHTML = mensagem;
  resultado.className = 'resultado ' + (valido ? 'ok' : 'erro');

  // Gravar no histórico
  const historico = JSON.parse(localStorage.getItem('historicoWIN') || '[]');
  historico.unshift({
    data: new Date().toLocaleString(),
    win: win,
    resultado: valido ? 'Válido' : 'Inválido',
    justificacao: justificacao,
    foto: ''
  });
  localStorage.setItem('historicoWIN', JSON.stringify(historico));
}

// Mostrar histórico
function carregarHistorico() {
  const tabela = document.getElementById('tabelaHistorico');
  const historico = JSON.parse(localStorage.getItem('historicoWIN') || '[]');

  if (!tabela) return;

  tabela.innerHTML = historico.map(reg => `
    <tr>
      <td>${reg.data}</td>
      <td>${reg.win}</td>
      <td>${reg.resultado}</td>
      <td>${reg.justificacao}</td>
      <td><i>(reservado)</i></td>
    </tr>
  `).join('') || '<tr><td colspan="5">Sem registos.</td></tr>';
}

window.onload = carregarHistorico;