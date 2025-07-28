
function validarWIN() {
    const win = document.getElementById("winInput").value;
    const resultado = document.getElementById("resultado");
    const detalhes = document.getElementById("detalhes");

    if (win === "FR-CNBZA135A612") {
        resultado.textContent = "✅ WIN Válido!";
        resultado.style.color = "green";
        detalhes.innerHTML = `
            <ul>
                <li><strong>FR</strong> - França</li>
                <li><strong>CNB</strong> - CNB Yacht Builder</li>
                <li><strong>ZA135</strong> - Número de série</li>
                <li><strong>A</strong> - Janeiro</li>
                <li><strong>6</strong> - Ano de produção: 2006</li>
                <li><strong>12</strong> - Ano modelo: 2012</li>
            </ul>
        `;
    } else {
        resultado.textContent = "❌ Formato inválido: Deve seguir o padrão XX-XXX#####X##";
        resultado.style.color = "red";
        detalhes.innerHTML = "";
    }
}

window.onload = () => {
    const tbody = document.querySelector("tbody");
    if (tbody) {
        tbody.innerHTML = `
            <tr><td>28/07/2025</td><td>FR-CNBZA135A612</td><td>Válido</td><td>Verificado com sucesso</td><td>(reservado)</td></tr>
        `;
    }
};
