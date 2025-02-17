// ... resto do código permanece igual ...

function imprimirPedido() {
    // ... código anterior permanece igual ...

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
        `Valor Total: ${valor}\n\n` +
        "\x1B\x61\x01" +      // Center alignment
        "=================\n" +
        "\x1B\x64\x02";       // Feed 2 lines

    // ... resto do código permanece igual ...
}

// ... resto do código permanece igual ...
