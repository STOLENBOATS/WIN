
function login(event) {
    event.preventDefault();
    window.location.href = 'validador.html';
    return false;
}

function validarWIN() {
    const input = document.getElementById('winInput').value.trim();
    const mensagem = document.getElementById('mensagemValidacao');
    const padrao = /^[A-Z]{2}-[A-Z]{3}\d{5}[A-Z]\d{2}$/;

    if (padrao.test(input)) {
        mensagem.style.color = 'green';
        mensagem.textContent = 'WIN válido!';
        adicionarAoHistorico(input, 'Válido', 'Formato reconhecido');
    } else {
        mensagem.style.color = 'red';
        mensagem.textContent = 'Formato inválido: Deve seguir o padrão XX-XXX#####X##';
        adicionarAoHistorico(input, 'Inválido', 'Formato não reconhecido');
    }
}

function adicionarAoHistorico(win, resultado, justificacao) {
    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    historico.unshift({
        data: new Date().toLocaleString(),
        win,
        resultado,
        justificacao,
        foto: '(reservado)'
    });
    localStorage.setItem('historico', JSON.stringify(historico));
}

window.onload = function() {
    const tabela = document.getElementById('tabelaHistorico');
    if (tabela) {
        const historico = JSON.parse(localStorage.getItem('historico')) || [];
        const tbody = tabela.querySelector('tbody');
        historico.forEach(reg => {
            const row = tbody.insertRow();
            row.innerHTML = `<td>${reg.data}</td><td>${reg.win}</td><td>${reg.resultado}</td><td>${reg.justificacao}</td><td>${reg.foto}</td>`;
        });
    }
}
