const SETTLEMENT_TABLE_ID = "settlementTable";
const PAGE_ENTRYPOINT = "page-content";
const STYLE_ENTRYPOINT = "page-specific-css";
const TABLE_ENTRIES = "table-entries";
const NEXT_PAGE = "next-page";
const PREV_PAGE = "prev-page";
const PAGINATION_LABEL = "pagination-label";
const ITEMS_PER_PAGE = 10;

const TABLE_NAMES = {
    ENTRIES: "entries",
    SETTLEMENTS: "settlements",
};

const TOTAL_PAGES = {
    [TABLE_NAMES.SETTLEMENTS]: 0,
    [TABLE_NAMES.ENTRIES]: 0,
};

const TABLE_BY_ROUTE = {
    dashboard: [TABLE_NAMES.SETTLEMENTS, "src/app/components/tables/settlements.html"],
    "settlement-entries": [TABLE_NAMES.ENTRIES, "src/app/components/tables/settlementEntries.html"],
};

/**
 * @typedef {Object} Settlement
 * @property {string} status
 * @property {string} previsao
 * @property {string} periodo_apuracao
 * @property {string} valor_vendas
 * @property {string} valor_repasse
 **/

/**
 * @typedef {Object} Entry
 * @property {string} status
 * @property {string} data
 * @property {number} pedido
 * @property {string} canal
 * @property {string} valor_pedido
 * @property {string} frete
 * @property {string} tx_servico
 * @property {string} incentivo_promo
 * @property {string} base_calculo
 * @property {string} comissao_ifood
 * @property {string} tx_transacao
 * @property {string} outros_lanc
 * @property {string} valor_liquido
 **/

const ROUTE_MAP = {
    dashboard: "dashboard",

    settlements: "repasses",
    repasses: "settlements",

    "settlement-entries": "lancamentos-repasse",
    "lancamentos-repasse": "settlement-entries",

    lancamentos: "entries",
    entries: "lancamentos",

    performance: "desempenho",
    desempenho: "performance",

    "operation-health": "saude-operacional",
    "saude-operacional": "operation-health",

    "goals-and-projections": "metas-e-projecoes",
    "metas-e-projecoes": "goals-and-projections",
};

const makeSettlementsTableRow = (entry) => `
<a href="#/lancamentos-repasse" class="text-decoration-none text-reset">
    <div class="d-flex p-0 table-entry">
        <div class="col-md-2 p-0">
            <div class="border-start border-5 p-3 ${entry.borderColor}">
                <p class="fw-bold ${entry.textColor} mb-0 fs-6 fs-md-5">${entry.status}</p>
            </div>
        </div>
        <div class="col-md-2 border-start d-flex align-items-center">
            <p class="fw-bold mb-0 fs-7">${entry.previsao}</p>
        </div>
        <div class="col-md-2 border-start d-flex align-items-center">
            <p class="fw-bold mb-0 fs-7">${entry.periodo_apuracao}</p>
        </div>
        <div class="col-md-2 border-start d-flex align-items-center">
            <p class="fw-bold mb-0 fs-7">${entry.valor_vendas}</p>
        </div>
        <div class="col-md border-start d-flex align-items-center justify-content-between">
            <p class="fw-bold mb-0 fs-7">${entry.valor_repasse}</p>
            <div class="border-start h-100 d-flex align-items-center ps-md-3 cursor-pointer">
                <span class="material-symbols-outlined">chevron_right</span>
            </div>
        </div>
    </div>
</a>
`;

const makeSettlementEntriesTableRow = (entry) => `
<a href="#/lancamentos-repasse-" class="text-decoration-none text-reset">
    <div class="row bg-white table-entry">
        <div class="col p-0">
            <div class="border-start border-5 p-3 ${entry.borderColor}">
                <p class="fw-bold ${entry.textColor} mb-0">${entry.data}</p>
            </div>
        </div>
        <div class="col border-start d-flex align-items-center">
            <p class="fw-bold mb-0">${entry.pedido}</p>
        </div>
        <div class="col border-start d-flex align-items-center">
            <img src="src/assets/icons/ifood-red-logo-mini.svg" />
        </div>
        <div class="col border-start d-flex align-items-center">
            <p class="fw-bold mb-0">${entry.valor_pedido}</p>
        </div>
        <div class="col border-start d-flex align-items-center">
            <p class="fw-bold mb-0">${entry.frete}</p>
        </div>
        <div class="col border-start d-flex align-items-center">
            <p class="fw-bold mb-0">${entry.tx_servico}</p>
        </div>
        <div class="col border-start d-flex align-items-center">
            <p class="fw-bold mb-0">${entry.incentivo_promo}</p>
        </div>
        <div class="col border-start d-flex align-items-center">
            <p class="fw-bold mb-0">${entry.base_calculo}</p>
        </div>
        <div class="col border-start d-flex align-items-center">
            <p class="fw-bold mb-0">${entry.comissao_ifood}</p>
        </div>
        <div class="col border-start d-flex align-items-center">
            <p class="fw-bold mb-0">${entry.tx_transacao}</p>
        </div>
        <div class="col border-start d-flex align-items-center">
            <p class="fw-bold mb-0">${entry.outros_lanc}</p>
        </div>
        <div class="col border-start d-flex align-items-center">
            <p class="fw-bold mb-0">${entry.valor_liquido}</p>
        </div>
    </div>
</a>
`;

function maybeHideTable() {
    const table = document.getElementById(SETTLEMENT_TABLE_ID);
    if (!table) return;
    table.style.display = "none";
}

/** @param {string} route **/
async function hidratePage(route) {
    try {
        const appContent = document.getElementById(PAGE_ENTRYPOINT);
        let pageTemplate = `src/app/pages/${route}/${route}.html`;
        let pageStyles = `src/app/pages/${route}/${route}.css`;

        const response = await fetch(pageTemplate);
        const html = /** @type {string} */ (await response.text());
        appContent.innerHTML = html;

        location.hash.substring(2) !== route && history.replaceState(null, null, `#/${ROUTE_MAP[route]}`);

        let existingLink = document.getElementById(STYLE_ENTRYPOINT);
        existingLink && existingLink.remove();

        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = pageStyles;
        link.id = "page-specific-css";
        document.head.appendChild(link);

        highlightActiveLink();
    } catch (err) {
        console.error("Error loading page: ", err);
    }
}

/**
 * @template T
 * @param {T[]} collection
 * @returns {T[]}
 **/
function applyPagination(collection, page) {
    const filtered = [];
    const startAt = (page - 1) * ITEMS_PER_PAGE;
    const max = Math.min(startAt + ITEMS_PER_PAGE, collection.length);

    for (let i = startAt; i < max; i++) {
        filtered.push(collection[i]);
    }

    return filtered;
}

/**
 * @param {string} tableName
 * @param {string} tablePath
 * @param {number} page
 **/
async function getSettlementsTable(tableName, tablePath, page) {
    const tableRes = await fetch(tablePath);
    const tableHtml = await tableRes.text();

    const table = document.getElementById(SETTLEMENT_TABLE_ID);
    if (!table) {
        table.style.display = "none";
        return;
    }
    table.style.display = "block";
    table.innerHTML = tableHtml;
    const tableData = await fetchEntries(tableName);
    TOTAL_PAGES[TABLE_NAMES.SETTLEMENTS] = tableData.length;
    asSettlement(tableData);

    tableData.sort((a, b) => (a.status > b.status ? 1 : -1));
    const displayedData = applyPagination(tableData, page);

    const paginationLabel = document.getElementById(PAGINATION_LABEL);
    const prevPage = document.getElementById(PREV_PAGE);
    const nextPage = document.getElementById(NEXT_PAGE);

    const max = Math.min(page * ITEMS_PER_PAGE, tableData.length);
    const label = `Exibindo ${(page - 1) * ITEMS_PER_PAGE + 1}-${max} de ${tableData.length}`;
    const totalPages = Math.ceil(tableData.length / ITEMS_PER_PAGE);
    const isLastPage = page >= totalPages;
    paginationLabel.textContent = label;

    isLastPage ? nextPage.classList.add("disabled") : nextPage.classList.remove("disabled");
    page === 1 ? prevPage.classList.add("disabled") : prevPage.classList.remove("disabled");

    const getTemplate = (entry) => {
        const borderMap = {
            "Em aberto": "border-color-gray",
            Agendado: "border-color-blue",
            Pago: "border-color-green",
        };
        const colorMap = {
            "Em aberto": "color-gray",
            Agendado: "color-blue",
            Pago: "color-green",
        };
        entry["borderColor"] = borderMap[entry.status];
        entry["textColor"] = colorMap[entry.status];
        return makeSettlementsTableRow(entry);
    };

    populateTable(displayedData, getTemplate);
}

/**
 * @template T
 * @param {T[]} tableData
 * @param {(T) => string} getTemplate
 **/
function populateTable(tableData, getTemplate) {
    const entries = document.getElementById(TABLE_ENTRIES);

    let accumulator = "";
    for (const entry of tableData) {
        const template = getTemplate(entry);
        accumulator += template;
    }

    entries.innerHTML = accumulator;
}

/**
 * @param {string} tableName
 * @param {string} tablePath
 * @param {number} page
 **/
async function getEntriesTable(tableName, tablePath, page) {
    const tableRes = await fetch(tablePath);
    const tableHtml = await tableRes.text();

    const table = document.getElementById(SETTLEMENT_TABLE_ID);
    if (!table) {
        table.style.display = "none";
        return;
    }
    table.style.display = "block";

    table.innerHTML = tableHtml;
    const tableData = await fetchEntries(tableName);
    TOTAL_PAGES[TABLE_NAMES.ENTRIES] = tableData.length;
    asEntry(tableData);
    const displayedData = applyPagination(tableData, page);

    const paginationLabel = document.getElementById(PAGINATION_LABEL);
    const prevPage = document.getElementById(PREV_PAGE);
    const nextPage = document.getElementById(NEXT_PAGE);

    const max = Math.min(page * ITEMS_PER_PAGE, tableData.length);
    const label = `Exibindo ${(page - 1) * ITEMS_PER_PAGE + 1}-${max} de ${tableData.length}`;
    const totalPages = Math.ceil(tableData.length / ITEMS_PER_PAGE);
    const isLastPage = page >= totalPages;
    paginationLabel.textContent = label;

    isLastPage ? nextPage.classList.add("disabled") : nextPage.classList.remove("disabled");
    page === 1 ? prevPage.classList.add("disabled") : prevPage.classList.remove("disabled");

    const getTemplate = (entry) => {
        const borderMap = {
            Concluido: "border-color-green",
            Pendente: "border-color-yellow",
            Cancelado: "border-color-red",
        };
        const colorMap = {
            Concluido: "color-green",
            Pendente: "color-yellow",
            Cancelado: "color-red",
        };
        entry["borderColor"] = borderMap[entry.status];
        entry["textColor"] = colorMap[entry.status];
        return makeSettlementEntriesTableRow(entry);
    };

    populateTable(displayedData, getTemplate);
}

/**
 * @param {string} tableName
 * @param {string} tablePath
 **/
async function getPageTable(tableName, tablePath) {
    const params = new URLSearchParams(location.search);
    const pageStr = params.get("page") || "1";
    const page = +pageStr;

    tableName === TABLE_NAMES.ENTRIES && (await getEntriesTable(tableName, tablePath, page));
    tableName === TABLE_NAMES.SETTLEMENTS && (await getSettlementsTable(tableName, tablePath, page));
}

/**
 * @param {string} route
 * @returns {Promise<void>}
 */
async function navigateTo(route) {
    const translatedRoute = ROUTE_MAP[route];
    await hidratePage(translatedRoute);

    const result = TABLE_BY_ROUTE[translatedRoute];
    if (!result) {
        maybeHideTable();
        return;
    }
    const [tableName, tablePath] = result;
    tablePath && getPageTable(tableName, tablePath);
}

/**
 * @param {Settlement[] | Entry[]} data
 * @returns {asserts data is Settlement[]}
 */
function asSettlement(data) {
    if (!data.every((item) => Object.keys(item).length == 5)) {
        throw new Error("Data is not an array of settlements");
    }
}

/**
 * @param {Settlement[] | Entry[]} data
 * @returns {asserts data is Entry[]}
 */
function asEntry(data) {
    if (!data.every((item) => Object.keys(item).length >= 5)) {
        throw new Error("Data is not an array of entries");
    }
}

function prevPage() {
    const params = new URLSearchParams(location.search);
    const pageStr = params.get("page") || "1";
    const page = +pageStr;

    const prevPage = Math.max(page - 1, 1);
    params.set("page", prevPage);
    location.search = params;
}

function nextPage() {
    const params = new URLSearchParams(location.search);
    const pageStr = params.get("page") || "1";
    const page = +pageStr;

    const route = location.hash.substring(2);
    const [tableName, _] = TABLE_BY_ROUTE[ROUTE_MAP[route]];

    const nextPage = Math.min(page + 1, TOTAL_PAGES[tableName]);
    params.set("page", nextPage);
    location.search = params;
}

/**
 * @param {string} tableName
 * @returns {Promise<Settlement[] | Entry[]>}
 **/
async function fetchEntries(tableName) {
    const tableMap = {
        [TABLE_NAMES.SETTLEMENTS]: "src/data/settlements.json",
        [TABLE_NAMES.ENTRIES]: "src/data/entries.json",
    };
    const res = await fetch(tableMap[tableName]);
    return await res.json();
}

window.addEventListener("load", () => navigateTo(location.hash.substring(2)));
window.addEventListener("hashchange", () => navigateTo(window.location.hash.substring(2)));
