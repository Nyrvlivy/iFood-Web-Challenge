function loadNavbar() {
    const navbarContainer = document.getElementById("navbar-container");

    fetch("src/app/components/navbar/navbar.html")
        .then((response) => response.text())
        .then((html) => {
            navbarContainer.innerHTML = html;
            attachNavbarEvents();
        })
        .catch((error) => {
            console.error("Error loading navbar:", error);
        });
}

function attachNavbarEvents() {
    const navbarToggle = document.getElementById("navbar-toggle");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");

    if (navbarToggle && sidebarOverlay) {
        navbarToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            sidebarOverlay.classList.toggle("sidebar-visible");

            const icon = navbarToggle.querySelector(".material-symbols-outlined");
            if (sidebarOverlay.classList.contains("sidebar-visible")) {
                icon.textContent = "close";
            } else {
                icon.textContent = "menu";
            }
        });

        document.addEventListener("click", function (event) {
            const isClickInsideSidebar = sidebarOverlay.contains(event.target);
            const isClickOnNavbarToggle = navbarToggle.contains(event.target);

            if (sidebarOverlay.classList.contains("sidebar-visible") && !isClickInsideSidebar && !isClickOnNavbarToggle) {
                sidebarOverlay.classList.remove("sidebar-visible");
                navbarToggle.querySelector(".material-symbols-outlined").textContent = "menu";
            }
        });
    }
}
