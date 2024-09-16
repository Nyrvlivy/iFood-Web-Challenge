// dashboard.js

function loadDashboard() {
    // Carrega o conteúdo HTML do dashboard
    fetch('src/app/pages/dashboard/dashboard.html')
        .then(response => response.text())
        .then(html => {
            const dashboardElement = document.getElementById('app-content');
            dashboardElement.innerHTML = html;

            // Após carregar o HTML, carregar os dados dinâmicos
            loadDashboardData();
        })
        .catch(error => {
            console.error('Erro ao carregar o dashboard:', error);
        });
}

// dashboard.js

function loadDashboardData() {
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

    // Carregar os dados da tabela de repasses
    fetch('src/data/payout-data.json')
        .then(response => response.json())
        .then(payoutData => {
            console.log('Dados da tabela de repasses:', payoutData);  // Log para verificar o conteúdo

            // Mapeamento dos dados para criar as linhas da tabela
            let tableRows = payoutData.map(payout => `
                <tr>
                    <td><span class="status-icon status-${payout.status.toLowerCase().replace(' ', '-')}"></span>${payout.status}</td>
                    <td>${payout.start_date}</td>
                    <td>${payout.end_date}</td>
                    <td>R$ ${payout.sales_value}</td>
                    <td>R$ ${payout.payout_value}</td>
                    <td><i class="bi bi-chevron-right"></i></td>
                </tr>
            `).join('');

            // Chamar a função createPayoutTable passando as linhas da tabela
            const payoutTableHtml = createPayoutTable(tableRows);
            const payoutTableContainer = document.getElementById('payout-table-container');
            payoutTableContainer.innerHTML = payoutTableHtml;

            // Inicializar gráficos
            // initializeCharts();
        })
        .catch(error => {
            console.error('Erro ao carregar os dados de repasses:', error);
        });
}


function initializeCharts() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js não está carregado.');
        return;
    }

    // Gráfico Overview
    new Chart(document.getElementById('overviewChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['09/06', '10/06', '11/06', '12/06', '13/06', '14/06', '15/06'],
            datasets: [{
                label: 'Vendas',
                data: [12000, 19000, 15000, 17000, 22000, 24000, 25000],
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
                fill: false
            }, {
                label: 'Repasses',
                data: [10000, 15000, 13000, 14000, 20000, 22000, 23000],
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Gráfico Desempenho Diário
    new Chart(document.getElementById('dailyPerformanceChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['10:00', '12:00', '14:00', '16:00', '18:00'],
            datasets: [{
                label: 'Vendas',
                data: [1200, 1900, 1500, 2200, 2500],
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Gráfico Progresso de Metas
    new Chart(document.getElementById('goalsChart').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Vendas', 'Repasses', 'Novos Clientes', 'Retenção'],
            datasets: [{
                data: [70, 85, 60, 90],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}
