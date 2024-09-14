document.addEventListener('DOMContentLoaded', function () {
    const sidebarContainer = document.getElementById("sidebar-container");

    const arrowClose = document.querySelector(".arrow-close");
    const arrowOpen = document.querySelector(".arrow-open");

    if (arrowClose) {
        arrowClose.addEventListener("click", function () {
            sidebarContainer.classList.add("collapsed");
        });
    }

    if (arrowOpen) {
        arrowOpen.addEventListener("click", function () {
            sidebarContainer.classList.remove("collapsed");
        });
    }

    loadSidebar();
});

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
        document.addEventListener("click", function(event) {
        const sidebar = document.getElementById("sidebar-container");
        if (!sidebar.contains(event.target) && !document.getElementById("arrow-close").contains(event.target)) {
            sidebar.classList.add("closed"); // Adicione uma classe para esconder a sidebar
        }
    });
}

async function loadModals() {
    await loadModal("notifications-modal");
    await loadModal("help-modal");
}

async function loadModal(modalName) {
    const modalContainer = document.createElement("div");
    document.body.appendChild(modalContainer);

    try {
        const modalHtmlResponse = await fetch(`src/app/components/modals/${modalName}/${modalName}.html`);
        const modalHtml = await modalHtmlResponse.text();
        modalContainer.innerHTML = modalHtml;

        const modalCssLink = document.createElement("link");
        modalCssLink.rel = "stylesheet";
        modalCssLink.href = `src/app/components/modals/${modalName}/${modalName}.css`;
        document.head.appendChild(modalCssLink);
    } catch (error) {
        console.error(`Error loading ${modalName}:`, error);
    }
}

async function loadCollapsedSidebar() {
    const sidebarContainer = document.getElementById("sidebar-container");

    try {
        const response = await fetch("src/app/components/sidebar/sidebar_collapsed.html");
        const html = await response.text();
        sidebarContainer.innerHTML = html;

        attachCollapsedSidebarEvents(); 
    } catch (error) {
        console.error("Error loading collapsed sidebar:", error);
    }
}

function attachSidebarEvents() {
    const statusToggle = document.querySelector(".status-toggle");
    const arrowClose = document.querySelector(".arrow-close");
    if (statusToggle) {
        statusToggle.addEventListener("click", function () {
            this.classList.toggle("closed");
            const statusText = this.querySelector(".button-status-app");
            const circle = this.querySelector("circle");

            if (this.classList.contains("closed")) {
                statusText.textContent = "Fechado";
                circle.setAttribute("fill", "var(--white-100, #fff)");
            } else {
                statusText.textContent = "Aberto";
                circle.setAttribute("fill", "#85f17c");
            }
        });
    }

    if (arrowClose) {
        arrowClose.addEventListener("click", function () {
            const sidebarContainer = document.getElementById("sidebar-container");
            sidebarContainer.classList.add("collapsed");
            loadCollapsedSidebar(); 
        });
    }
    const profileSection = document.getElementById("profile-section");
    if (profileSection) {
        profileSection.addEventListener("click", function () {
            this.classList.toggle("expanded");
        });
    }
}

function attachCollapsedSidebarEvents() {
    
    const arrowOpen = document.querySelector(".arrow-open");

    if (arrowOpen) {
        arrowOpen.addEventListener("click", function () {
            const sidebarContainer = document.getElementById("sidebar-container");
            sidebarContainer.classList.remove("collapsed");
            loadSidebar(); 
        });
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
loadSidebar();