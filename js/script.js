
function login(event) {
    event.preventDefault();
    window.location.href = 'validador.html';
    return false;
}

const paises = {
    'PT': 'Portugal',
    'FR': 'França',
    'NL': 'Países Baixos',
    'ES': 'Espanha',
    'DE': 'Alemanha',
    'IT': 'Itália',
    'SE': 'Suécia',
    'US': 'Estados Unidos',
    'CA': 'Canadá'
};

const fabricantes = {
    'CNB': 'CNB Yacht Builder',
    'AQW': 'AQW Yachts',
    'BAV': 'Bavaria Yachts',
    'BEN': 'Beneteau',
    'SEA': 'Sea Ray'
};

const meses = {
    'A': 'Janeiro', 'B': 'Fevereiro', 'C': 'Março', 'D': 'Abril',
    'E': 'Maio', 'F': 'Junho', 'G': 'Julho', 'H': 'Agosto',
    'J': 'Setembro', 'K': 'Outubro', 'L': 'Novembro', 'M': 'Dezembro'
};

function interpretarAno(ano) {
    const num = parseInt(ano);
    const anoCompleto = num >= 90 ? 1900 + num : 2000 + num;
    return anoCompleto;
}

function validarWIN() {
    const inputRaw = document.getElementById('winInput').value.trim().toUpperCase();
    const input = inputRaw.replace(/-/g, '');
    const mensagem = document.getElementById('mensagemValidacao');
    const painel = document.getElementById('painelInterpretacao');
    painel.innerHTML = '';

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
    const isUS = input.length === 16 || input.length === 14;

    const pais = input.slice(0, 2);
    const fabricante = input.slice(2, 5);
    const serie = isEU ? input.slice(5, 10) : input.slice(5, 12);
    const mes = isEU ? input[10] : input[12];
    const ano = isEU ? input[11] : input[13];
    const modelo = isEU ? input.slice(12, 14) : input.slice(14, 16);

    const validacoes = [];

    validacoes.push(validarCampo('País', pais, /^[A-Z]{2}$/, paises[pais] || 'Desconhecido'));
    validacoes.push(validarCampo('Fabricante', fabricante, /^[A-Z]{3}$/, fabricantes[fabricante] || 'Fabricante não identificado'));
    validacoes.push(validarCampo('Número de série', serie, /^[A-Z0-9]+$/, serie));
    validacoes.push(validarCampo('Mês de produção', mes, /^[A-HJ-NPR-Z]$/, meses[mes] || 'Mês inválido'));
    validacoes.push(validarCampo('Ano de produção', ano, /^[0-9]$/, interpretarAno(ano)));
    validacoes.push(validarCampo('Ano do modelo', modelo, /^[0-9]{2}$/, interpretarAno(modelo)));

    let todosValidos = validacoes.every(v => v.valido);

    validacoes.forEach(v => {
        painel.innerHTML += `<div style="color: ${v.valido ? 'green' : 'red'}">✔️ <strong>${v.nome}</strong>: ${v.valor} → ${v.interpretacao}</div>`;
    });

    if (todosValidos) {
        mensagemSucesso('WIN válido!');
        adicionarAoHistorico(inputRaw, 'Válido', 'Formato e estrutura corretos');
    } else {
        mensagemErro('WIN inválido. Veja detalhes abaixo.');
        adicionarAoHistorico(inputRaw, 'Inválido', 'Erro na estrutura');
    }
}

function validarCampo(nome, valor, regex, interpretacao) {
    return {
        nome,
        valor,
        interpretacao,
        valido: regex.test(valor)
    };
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
};
