
function login(event) {
    event.preventDefault();
    window.location.href = 'validador.html';
    return false;
}

function validarWIN() {
    const inputRaw = document.getElementById('winInput').value.trim().toUpperCase();
    const input = inputRaw.replace(/-/g, ''); // remove hífen para validação interna
    const mensagem = document.getElementById('mensagemValidacao');

    if (input.length !== 14 && input.length !== 16) {
        mensagemErro('Número deve ter 14 (UE) ou 16 (EUA) caracteres');
        adicionarAoHistorico(inputRaw, 'Inválido', 'Tamanho inválido');
        return;
    }

    if (input.length === 15) {
        mensagemErro('Formato de 15 caracteres é inválido');
        adicionarAoHistorico(inputRaw, 'Inválido', '15 caracteres não permitido');
        return;
    }

    const isEU = input.length === 14;
    const isUS = input.length === 16 || input.length === 14; // EUA pode ter 14 ou 16

    const pais = input.slice(0, 2);
    const fabricante = input.slice(2, 5);
    const serie = isEU ? input.slice(5, 10) : input.slice(5, 12);
    const mes = isEU ? input[10] : input[12];
    const ano = isEU ? input[11] : input[13];
    const modelo = isEU ? input.slice(12, 14) : input.slice(14, 16);

    // Regras de caracteres
    if (!/^[A-Z]{2}$/.test(pais)) {
        mensagemErro('Código do país inválido');
        adicionarAoHistorico(inputRaw, 'Inválido', 'Código do país inválido');
        return;
    }
    if (!/^[A-Z]{3}$/.test(fabricante)) {
        mensagemErro('Código do fabricante inválido');
        adicionarAoHistorico(inputRaw, 'Inválido', 'Código do fabricante inválido');
        return;
    }
    if (!/^[A-HJ-NPR-Z]$/.test(mes)) {
        mensagemErro('Mês inválido: deve ser letra (exceto I, O, Q)');
        adicionarAoHistorico(inputRaw, 'Inválido', 'Letra de mês inválida');
        return;
    }
    if (!/^[0-9]$/.test(ano)) {
        mensagemErro('Ano de produção inválido');
        adicionarAoHistorico(inputRaw, 'Inválido', 'Ano de produção inválido');
        return;
    }
    if (!/^[0-9]{2}$/.test(modelo)) {
        mensagemErro('Ano do modelo inválido');
        adicionarAoHistorico(inputRaw, 'Inválido', 'Ano do modelo inválido');
        return;
    }

    // País e fabricante devem corresponder ao tipo
    const europeus = ['PT', 'ES', 'FR', 'DE', 'NL', 'IT', 'SE'];
    const americanos = ['US', 'CA'];

    const paisEuropeu = europeus.includes(pais);
    const paisAmericano = americanos.includes(pais);

    if (isEU && !paisEuropeu) {
        mensagemErro('País não compatível com casco europeu');
        adicionarAoHistorico(inputRaw, 'Inválido', 'País incompatível (UE)');
        return;
    }

    if (isUS && !paisAmericano && input.length === 16) {
        mensagemErro('País não compatível com formato americano');
        adicionarAoHistorico(inputRaw, 'Inválido', 'País incompatível (EUA)');
        return;
    }

    mensagemSucesso('WIN válido!');
    adicionarAoHistorico(inputRaw, 'Válido', 'Formato e estrutura corretos');
}

function mensagemErro(msg) {
    const m = document.getElementById('mensagemValidacao');
    m.style.color = 'red';
    m.textContent = msg;
}

function mensagemSucesso(msg) {
    const m = document.getElementById('mensagemValidacao');
    m.style.color = 'green';
    m.textContent = msg;
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
