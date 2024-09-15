async function loadSidebar() {
    const sidebarContainer = document.getElementById("sidebar-container");

    try {
        const response = await fetch("src/app/components/sidebar/sidebar.html");
        const html = await response.text();
        sidebarContainer.innerHTML = html;

        attachSidebarEvents();
        highlightActiveLink();
        await loadModals();
    } catch (error) {
        console.error("Error loading sidebar:", error);
    }
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

function attachSidebarEvents() {
    const statusToggle = document.querySelector(".status-toggle");

    if (statusToggle) {
        statusToggle.addEventListener("click", function () {
            this.classList.toggle("closed");
            const statusText = this.querySelector(".button-status-app");
            const circle = this.querySelector("circle");

            if (this.classList.contains("closed")) {
                statusText.textContent = "Fechado";
                circle.setAttribute("fill", "var(--white-100, #fff)");
                showNotification("Estabelecimento fechado", "danger", "❌");
            } else {
                statusText.textContent = "Aberto";
                circle.setAttribute("fill", "#85f17c");
                showNotification("Estabelecimento aberto", "success", "✅");
            }
        });
    }

    const profileSection = document.getElementById("profile-section");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");

    if (profileSection) {
        profileSection.addEventListener("click", function () {
            if (!sidebarOverlay.classList.contains("collapsed")) {
                this.classList.toggle("expanded");
            }
        });
    }

    const arrowClose = document.querySelector(".arrow-button.arrow-close");
    const arrowOpen = document.querySelector(".arrow-button.arrow-open");
    const logoImg = document.querySelector("#sidebar-logo-container img");

    if (arrowClose) {
        arrowClose.addEventListener("click", function () {
            sidebarOverlay.classList.add("collapsed");
            if (logoImg) {
                logoImg.src = "/src/assets/icons/ifood-white-logo-mini.svg";
                logoImg.style.maxHeight = "40px";
                logoImg.style.minHeight = "30px";
            }
        });
    }

    if (arrowOpen) {
        arrowOpen.addEventListener("click", function () {
            sidebarOverlay.classList.remove("collapsed");
            if (logoImg) {
                logoImg.src = "/src/assets/icons/ifinances-logo-menu.svg";
                logoImg.style.maxHeight = "";
                logoImg.style.minHeight = "";
            }
        });
    }

    window.addEventListener("resize", handleWindowResize);

    handleWindowResize();
}

function handleWindowResize() {
    const sidebarOverlay = document.querySelector(".sidebar-overlay");
    const logoImg = document.querySelector("#sidebar-logo-container img");

    if (window.innerWidth <= 1200) {
        if (sidebarOverlay.classList.contains("collapsed")) {
            sidebarOverlay.classList.remove("collapsed");
            if (logoImg) {
                logoImg.src = "/src/assets/icons/ifinances-logo-menu.svg";
                logoImg.style.maxHeight = "";
                logoImg.style.minHeight = "";
            }
        }
    }
}

function highlightActiveLink() {
    const links = document.querySelectorAll(".sidebar-item");
    const currentHash = window.location.hash;

    links.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === currentHash) {
            link.classList.add("active");
        }
    });
}
