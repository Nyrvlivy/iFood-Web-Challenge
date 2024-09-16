// payout_table.js
function createPayoutTable(payouts) {
    let tableRows = payouts.map(payout => `
        <tr>
            <td><span class="status-icon status-${payout.status.toLowerCase().replace(' ', '-')}"></span>${payout.status}</td>
            <td>${payout.start_date}</td>
            <td>${payout.end_date}</td>
            <td>R$ ${payout.sales_value}</td>
            <td>R$ ${payout.payout_value}</td>
            <td><i class="bi bi-chevron-right"></i></td>
        </tr>
    `).join('');

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
                <div class="d-flex justify-content-end mt-3">
                    <button class="btn btn-danger me-2">Exportar</button>
                    <button class="btn btn-outline-secondary">Ver Todos</button>
                </div>
            </div>
        </div>
    `;
}
