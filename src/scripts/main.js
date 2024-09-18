function createDownloadButton(blob, outFile) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = outFile;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

async function downloadIssueHistory() {
    const response = await fetch("src/data/issue_history.csv");
    const blob = await response.blob();
    createDownloadButton(blob, "historico-problemas.csv");
}

async function downloadEntries() {
    const response = await fetch("src/data/entries.csv");
    const blob = await response.blob();
    createDownloadButton(blob, "lancamentos.csv");
}

async function downloadSettlements() {
    const response = await fetch("src/data/settlements.csv");
    const blob = await response.blob();
    createDownloadButton(blob, "repasses.csv");
}
