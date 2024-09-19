document.addEventListener("DOMContentLoaded", function () {
    const dataInicio = document.getElementById("dataInicio");
    const dataFim = document.getElementById("dataFim");
    const tipoLancamento = document.getElementById("tipoLancamento");

    dataInicio.addEventListener("input", function () {
        if (dataInicio.value) {
            tipoLancamento.value = "manual";
        }
    });

    tipoLancamento.addEventListener("change", function () {
        if (tipoLancamento.value !== "manual" && !dataInicio.value) {
            dataInicio.disabled = true;
            dataFim.disabled = true;
        } else {
            dataInicio.disabled = false;
            dataFim.disabled = false;
        }
    });

    $("#metaModal").on("show.bs.modal", function () {
        dataInicio.disabled = false;
        dataFim.disabled = false;
        dataInicio.value = "";
        dataFim.value = "";
        tipoLancamento.value = "";
    });
});
