// dashboard.js
function loadDashboard() {
    const dashboardElement = document.getElementById('app-content');
    dashboardElement.innerHTML = createDashboard();

    // Inicializar os gráficos após o conteúdo ser carregado
    initializeCharts();
}

function createDashboard() {
    const cardData = [
        { icon: 'bi-cart', title: 'Valor bruto das vendas', value: '80.903,51', color: '#FFA500' },
        { icon: 'bi-currency-dollar', title: 'Valor recebido na loja', value: '13.502,31', color: '#FF69B4' },
        { icon: 'bi-wallet2', title: 'Valor recebido via Zoop', value: '67.437,34', color: '#FF0000' },
        { icon: 'bi-graph-up', title: 'Valor líquido', value: '54.213,46', color: '#32CD32' }
    ];

    const payoutData = [
        { status: 'Agendado', start_date: '30/06/2024', end_date: '06/07/2024', sales_value: '3.119,56', payout_value: '2.575,70' },
        { status: 'Aprovado', start_date: '23/06/2024', end_date: '29/06/2024', sales_value: '2.681,92', payout_value: '2.214,59' },
        { status: 'Em aberto', start_date: '09/06/2024', end_date: '22/06/2024', sales_value: '9.513,92', payout_value: '7.723,39' },
        { status: 'Pago', start_date: '02/06/2024', end_date: '08/06/2024', sales_value: '2.321,83', payout_value: '2.536,43' },
        { status: 'Pago', start_date: '19/05/2024', end_date: '02/06/2024', sales_value: '632,45', payout_value: '8.371,88' },
        { status: 'Pago', start_date: '12/05/2024', end_date: '26/05/2024', sales_value: '8.648,70', payout_value: '6.597,24' }
    ];

    // Gere os cards
    const cardsHtml = cardData.map(card => createCardTile(card.icon, card.title, card.value, card.color)).join('');

    // Gere a tabela de repasses
    const payoutTableHtml = createPayoutTable(payoutData);

    // Retorne o HTML completo do dashboard
    return `
        <h2 class="mb-4">Dashboard</h2>
        <div class="row">
            ${cardsHtml}
        </div>
        <div class="row">
            <div class="col-md-8">
                <!-- Gráfico Overview -->
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Overview</h5>
                        <canvas id="overviewChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <!-- Gráfico Desempenho Diário -->
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Desempenho Diário</h5>
                        <canvas id="dailyPerformanceChart"></canvas>
                    </div>
                </div>
                <!-- Gráfico Progresso de Metas -->
                <div class="card mt-4">
                    <div class="card-body">
                        <h5 class="card-title">Progresso de Metas</h5>
                        <canvas id="goalsChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
        ${payoutTableHtml}
    `;
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
