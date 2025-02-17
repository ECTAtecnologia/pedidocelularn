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
}

function imprimirPedido() {
    // Coleta os dados do formulário
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const produtos = document.getElementById('produtos').value;
    const pagamento = document.getElementById('pagamento').value;
    const endereco = document.getElementById('endereco').value;
    const valor = document.getElementById('valor').value;

    // Formata o texto para impressão
    const textoImpressao = 
        "\x1B\x40" +          // Initialize printer
        "\x1B\x61\x01" +      // Center alignment
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
                    alert('Pedido enviado para impressão!');
                } else {
                    alert('Erro ao imprimir. Verifique se a impressora está conectada.');
                }
            });
        } else {
            alert('RawBT não está disponível.\n\nVerifique se:\n1. Você está usando o navegador do RawBT\n2. A impressora está conectada no aplicativo');
            console.log('Texto que seria impresso:', textoImpressao);
        }
    } catch (error) {
        alert('Erro ao tentar imprimir: ' + error.message);
        console.error(error);
    }
}

// Função para verificar e gerenciar o nome do estabelecimento
function handleEstablishmentName() {
    const establishmentForm = document.getElementById('establishment-form');
    const establishmentInput = document.getElementById('establishment-name');
    const saveButton = document.getElementById('save-establishment');
    
    // Verifica se já existe um nome salvo
    const savedName = localStorage.getItem('establishmentName');
    
    if (savedName) {
        establishmentForm.innerHTML = `<h2>Estabelecimento: ${savedName}</h2>`;
    } else {
        saveButton.addEventListener('click', () => {
            const name = establishmentInput.value.trim();
            if (name) {
                localStorage.setItem('establishmentName', name);
                establishmentForm.innerHTML = `<h2>Estabelecimento: ${name}</h2>`;
            } else {
                alert('Por favor, digite um nome válido');
            }
        });
    }
}

// Chama a função quando a página carregar
document.addEventListener('DOMContentLoaded', handleEstablishmentName);
