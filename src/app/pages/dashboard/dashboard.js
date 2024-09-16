// dashboard.js

function loadDashboard() {
    // Carrega o conteúdo HTML do dashboard
    fetch('src/app/pages/dashboard/dashboard.html')
        .then(response => response.text())
        .then(html => {
            const dashboardElement = document.getElementById('app-content');
            dashboardElement.innerHTML = html;

            // Após carregar o HTML, carregar os dados dinâmicos
            loadCardData();
            loadPayoutData();
        })
        .catch(error => {
            console.error('Erro ao carregar o dashboard:', error);
        });
}

function loadCardData() {
    // Carregar os dados dos cards
    fetch('src/data/card-data.json')
        .then(response => response.json())
        .then(cardData => {
            console.log('Dados dos cards:', cardData);  // Log para verificar o conteúdo
            const cardsHtml = cardData.map(card => createCardTile(card.icon, card.title, card.value, card.color)).join('');
            const cardsContainer = document.getElementById('cards-container');
            cardsContainer.innerHTML = cardsHtml;
        })
        .catch(error => {
            console.error('Erro ao carregar os dados dos cards:', error);
        });
}

function loadPayoutData() {
    fetch('src/data/payout-data.json')
        .then(response => response.json())
        .then(payoutData => {
            console.log('Dados da tabela de repasses:', payoutData);

            // Mapeamento dos dados para criar as linhas da tabela
            let tableRows = payoutData.map(payout => `
                <tr>
                    <td><span class="status-icon status-${payout.status.toLowerCase().replace(' ', '-')}"></span>${payout.status}</td>
                    <td>${payout.start_date}</td>
                    <td>${payout.end_date}</td>
                    <td>${formatCurrency(payout.sales_value)}</td>
                    <td>${formatCurrency(payout.payout_value)}</td>
                    <td><i class="bi bi-chevron-right"></i></td>
                </tr>
            `).join('');

            // Chamar a função createPayoutTable passando as linhas da tabela
            const payoutTableHtml = createPayoutTable(tableRows);
            const payoutTableContainer = document.getElementById('payout-table-container');
            payoutTableContainer.innerHTML = payoutTableHtml;

        })
        .catch(error => {
            console.error('Erro ao carregar os dados de repasses:', error);
        });
}

function formatCurrency(value) {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function createPayoutTable(tableRows) {
    return `
        <div class="card mt-4">
            <div class="card-body">
                <h5 class="card-title">Meus Repasses</h5>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Início</th>
                                <th>Fim</th>
                                <th>Valor de vendas</th>
                                <th>Valor do repasse</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}
