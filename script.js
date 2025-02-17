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

    // Inicializa o nome do estabelecimento
    initEstablishmentName();
}

// Inicializa o EmailJS
(function() {
    emailjs.init("yBK-sZTSf2ez5JgMu");
})();

// Função para inicializar o nome do estabelecimento
function initEstablishmentName() {
    const establishmentForm = document.getElementById('establishment-form');
    const savedName = localStorage.getItem('establishmentName');
    console.log('Nome salvo:', savedName); // Debug

    if (savedName) {
        // Se já existe um nome salvo, apenas mostra
        establishmentForm.innerHTML = `
            <div class="form-group saved-name">
                <h2>Estabelecimento: ${savedName}</h2>
                <button onclick="resetEstablishmentName()" class="btn btn-sm btn-secondary">Alterar Nome</button>
            </div>
        `;
    } else {
        // Se não existe nome salvo, mostra o formulário
        establishmentForm.innerHTML = `
            <div class="form-group">
                <label for="establishment-name">Nome do Estabelecimento:</label>
                <input type="text" class="form-control" id="establishment-name" placeholder="Digite o nome do estabelecimento">
                <button onclick="saveEstablishmentName()" class="btn btn-primary mt-2">Salvar</button>
            </div>
        `;
    }
}

// Função para salvar o nome do estabelecimento
function saveEstablishmentName() {
    const input = document.getElementById('establishment-name');
    const name = input.value.trim();
    
    if (name) {
        try {
            localStorage.setItem('establishmentName', name);
            console.log('Nome salvo com sucesso:', name); // Debug
            
            const establishmentForm = document.getElementById('establishment-form');
            establishmentForm.innerHTML = `
                <div class="form-group saved-name">
                    <h2>Estabelecimento: ${name}</h2>
                    <button onclick="resetEstablishmentName()" class="btn btn-sm btn-secondary">Alterar Nome</button>
                </div>
            `;
            alert('Nome do estabelecimento salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar:', error); // Debug
            alert('Erro ao salvar o nome. Por favor, tente novamente.');
        }
    } else {
        alert('Por favor, digite um nome válido');
    }
}

// Função para resetar o nome do estabelecimento
function resetEstablishmentName() {
    try {
        localStorage.removeItem('establishmentName');
        initEstablishmentName();
    } catch (error) {
        console.error('Erro ao resetar:', error);
    }
}

// Resto do código permanece igual...
