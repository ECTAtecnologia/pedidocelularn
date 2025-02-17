window.onload = function() {
    // Máscara para telefone
    var telefoneInput = document.getElementById('telefone');
    VMasker(telefoneInput).maskPattern('(99) 99999-9999');

    // Máscara para valor em reais (ajustada para números)
    var valorInput = document.getElementById('valor');
    VMasker(valorInput).maskPattern('999999');

    // Carrega o nome do estabelecimento se existir
    const savedName = localStorage.getItem('establishmentName');
    if (savedName) {
        document.getElementById('establishment-name').value = savedName;
        document.getElementById('establishment-form').innerHTML = `
            <div class="form-group saved-name">
                <h2>Estabelecimento: ${savedName}</h2>
                <button onclick="resetEstablishmentName()" class="btn btn-sm btn-secondary">Alterar Nome</button>
            </div>
        `;
    }
}

// Inicializa o EmailJS
(function() {
    emailjs.init("yBK-sZTSf2ez5JgMu");
})();

// Função para salvar o nome do estabelecimento
function saveEstablishmentName() {
    const input = document.getElementById('establishment-name');
    const name = input.value.trim();
    
    if (name) {
        localStorage.setItem('establishmentName', name);
        document.getElementById('establishment-form').innerHTML = `
            <div class="form-group saved-name">
                <h2>Estabelecimento: ${name}</h2>
                <button onclick="resetEstablishmentName()" class="btn btn-sm btn-secondary">Alterar Nome</button>
            </div>
        `;
    } else {
        alert('Por favor, digite um nome válido');
    }
}

// Função para resetar o nome do estabelecimento
function resetEstablishmentName() {
    localStorage.removeItem('establishmentName');
    location.reload();
}

function imprimirPedido() {
    // Coleta os dados do formulário
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const produtos = document.getElementById('produtos').value;
    const pagamento = document.getElementById('pagamento').value;
    const endereco = document.getElementById('endereco').value;
    const valor = document.getElementById('valor').value;
    const estabelecimento = localStorage.getItem('establishmentName') || 'Estabelecimento';

    // Verifica se todos os campos estão preenchidos
    if (!nome || !telefone || !produtos || !pagamento || !endereco || !valor) {
        alert('Por favor, preencha todos os campos');
        return;
    }

    // Formata o texto para impressão
    const textoImpressao = 
        "\x1B\x40" +          // Initialize printer
        "\x1B\x61\x01" +      // Center alignment
        estabelecimento + "\n\n" +
        "PEDIDO\n" +
        "=================\n\n" +
        "\x1B\x61\x00" +      // Left alignment
        `Nome: ${nome}\n` +
        `Telefone: ${telefone}\n\n` +
        `Produtos:\n${produtos}\n\n` +
        `Forma de Pagamento: ${pagamento}\n` +
        `Endereco: ${endereco}\n` +
        `Valor Total: R$ ${valor}\n\n` +
        "\x1B\x61\x01" +      // Center alignment
        "=================\n" +
        "\x1B\x64\x02";       // Feed 2 lines

    try {
        var link = document.createElement('a');
        link.href = 'rawbt://print?text=' + encodeURIComponent(textoImpressao);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Envia o email com confirmação
        emailjs.send("service_2frhpqp", "template_29ewlfj", {
            estabelecimento: estabelecimento,
            nome_cliente: nome,
            telefone: telefone,
            produtos: produtos,
            pagamento: pagamento,
            endereco: endereco,
            valor: valor,
            data: new Date().toLocaleString()
        }).then(
            function(response) {
                console.log("Email enviado:", response);
                limparFormulario();
            },
            function(error) {
                console.error("Erro ao enviar email:", error);
                // Ainda limpa o formulário mesmo se o email falhar
                limparFormulario();
            }
        );
    } catch (error) {
        console.error("Erro:", error);
        limparFormulario();
    }
}

function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('produtos').value = '';
    document.getElementById('pagamento').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('nome').focus();
}
