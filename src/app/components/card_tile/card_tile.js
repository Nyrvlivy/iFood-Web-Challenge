// card_tile.js
function createCardTile(icon, title, value, color) {
    return `
        <div class="col-md-3 mb-4">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-subtitle mb-2 text-muted">${title}</h6>
                            <h4 class="card-title mb-0">R$ ${value}</h4>
                        </div>
                        <div class="rounded-circle p-3" style="background-color: ${color};">
                            <i class="bi ${icon} text-white"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
