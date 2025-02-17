// ... resto do código permanece igual ...

function imprimirPedido() {
    // ... código anterior permanece igual até a parte da impressão ...

    // Tenta imprimir usando o RawBT diretamente
    try {
        if (typeof rawbt !== 'undefined') {
            rawbt.printText(textoImpressao); // Mudado para printText
            
            // Envia o email após a impressão
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
                    limparFormulario();
                },
                function(error) {
                    console.log("Erro ao enviar email:", error);
                    alert("Erro ao enviar pedido por email. Por favor, tente novamente.");
                }
            );
        } else {
            alert('RawBT não está disponível. Verifique se você está usando o navegador correto.');
        }
    } catch (error) {
        console.error('Erro na impressão:', error);
        alert('Erro ao imprimir. Por favor, verifique se a impressora está conectada.');
    }
}

// ... resto do código permanece igual ...
