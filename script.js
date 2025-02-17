window.onload = function() {
    // Máscara para telefone
    var telefoneInput = document.getElementById('telefone');
    VMasker(telefoneInput).maskPattern('(99) 99999-9999');

    // Máscara para valor em reais
    var valorInput = document.getElementById('valor');
    VMasker(valorInput).maskMoney({
        precision: 2,
        separator: ',',
        delimiter: '.',
        unit: 'R$ '
    });

    // Ajuste para garantir valor numérico correto ao imprimir
    valorInput.addEventListener('change', function(e) {
        let valor = e.target.value.replace('R$ ', '')
            .replace('.', '')
            .replace(',', '.');
        e.target.dataset.valor = valor;
    });

    // Carrega o nome do estabelecimento se existir
    const savedName = localStorage.getItem('establishmentName');
    if (savedName) {
        document.getElementById('establishment-name').value = savedName;
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
        alert('Nome do estabelecimento salvo com sucesso!');
    } else {
        alert('Por favor, digite um nome válido');
    }
}

function imprimirPedido() {
    // Coleta os dados do formulário
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const produtos = document.getElementById('produtos').value;
    const pagamento = document.getElementById('pagamento').value;
    const endereco = document.getElementById('endereco').value;
    const valor = document.getElementById('valor').value;
    const estabelecimento = document.getElementById('establishment-name').value || 'Estabelecimento';

    // Verifica se todos os campos estão preenchidos
    if (!nome || !telefone || !produtos || !pagamento || !endereco || !valor) {
        alert('Por favor, preencha todos os campos');
        return;
    }

    // Envia o email
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
            console.log("Email enviado com sucesso!", response);
            alert("Pedido enviado com sucesso!");
            imprimirNaImpressora();
        },
        function(error) {
            console.log("Erro ao enviar email:", error);
            alert("Erro ao enviar pedido. Por favor, tente novamente.");
        }
    );

    function imprimirNaImpressora() {
        // Formata o texto para impressão
        const textoImpressao = 
            "\x1B\x40" +          // Initialize printer
            "\x1B\x61\x01" +      // Center alignment
            estabelecimento + "\n" +
            "PEDIDO\n" +
            "=================\n" +
            `Cliente: ${nome}\n` +
            `Telefone: ${telefone}\n` +
            `\nProdutos:\n${produtos}\n` +
            `\nForma de Pagamento: ${pagamento}\n` +
            `Endereco: ${endereco}\n` +
            `Valor Total: ${valor}\n` +
            "=================\n\n" +
            "\x1B\x64\x02";       // Feed 2 lines

        try {
            if (typeof rawbt !== 'undefined') {
                // Tenta imprimir e mostra mensagem de sucesso/erro
                rawbt.print(textoImpressao, function(success) {
                    if (success) {
                        limparFormulario();
                    } else {
                        alert('Erro ao imprimir. Verifique se a impressora está conectada.');
                    }
                });
            } else {
                alert('RawBT não está disponível.\n\nVerifique se:\n1. Você está usando o navegador do RawBT\n2. A impressora está conectada no aplicativo');
                console.log('Texto que seria impresso:', textoImpressao);
                limparFormulario();
            }
        } catch (error) {
            alert('Erro ao tentar imprimir: ' + error.message);
            console.error(error);
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
}
