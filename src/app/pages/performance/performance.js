let initialFormData = {};

function captureInitialFormData() {
    const formElements = document.querySelectorAll("input, select");
    formElements.forEach((element) => {
        initialFormData[element.name || element.id] = element.value;
    });
}

function isFormChanged() {
    const formElements = document.querySelectorAll("input, select");
    let formChanged = false;

    formElements.forEach((element) => {
        if (initialFormData[element.name || element.id] !== element.value) {
            formChanged = true;
        }
    });

    return formChanged;
}

function showNotification(message, type, emoji) {
    const notificationContainer = document.getElementById("notification-container");

    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = "alert";
    alertDiv.innerHTML = `
        ${emoji} ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    notificationContainer.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.classList.remove("show");
        alertDiv.classList.add("hide");

        setTimeout(() => {
            alertDiv.remove();
        }, 200);
    }, 3000);
}

function updatePerformanceMap(imagePath) {
    const performanceMapImage = document.querySelector(".performance-chart-image");
    performanceMapImage.src = imagePath;
}

function handleApplyButtonClick() {
    if (isFormChanged()) {
        showNotification("Filtros aplicados com sucesso!", "success", "✅");
        updatePerformanceMap("src/assets/charts/performance-map-2.svg");
    } else {
        showNotification("Nenhuma alteração detectada.", "info", "ℹ️");
    }
}

function handleCancelButtonClick() {
    if (isFormChanged()) {
        showNotification("Filtros limpos!", "warning", "⚠️");
        updatePerformanceMap("src/assets/charts/performance-map-1.svg");
        resetForm();
    } else {
        showNotification("Nenhuma alteração detectada.", "info", "ℹ️");
    }
}

function resetForm() {
    const formElements = document.querySelectorAll("input, select");
    formElements.forEach((element) => {
        if (element.type === "checkbox" || element.type === "radio") {
            element.checked = false;
        } else {
            element.value = initialFormData[element.name || element.id];
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    captureInitialFormData();
});
