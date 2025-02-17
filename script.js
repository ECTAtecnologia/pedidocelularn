function imprimirPedido() {
    // ... código anterior permanece igual até a impressão ...

    // Tenta imprimir primeiro
    try {
        var link = document.createElement('a');
        link.href = 'rawbt://print?text=' + encodeURIComponent(textoImpressao);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Depois de imprimir, envia o email e limpa o formulário
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
                limparFormulario();
            },
            function(error) {
                console.error("Erro ao enviar email:", error);
            }
        );
    } catch (error) {
        console.error(error);
    }
}
