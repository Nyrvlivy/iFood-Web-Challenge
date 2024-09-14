function navigateTo(route) {
    const appContent = document.getElementById("app-content");
    let pageUrl = `src/app/pages/${route}/${route}.html`;
    let cssUrl = `src/app/pages/${route}/${route}.css`;

    fetch(pageUrl)
        .then((response) => response.text())
        .then((html) => {
            appContent.innerHTML = html;

            if (window.location.hash !== `#${route}`) {
                window.location.hash = `#${route}`;
            }

            let existingLink = document.getElementById("page-specific-css");
            if (existingLink) {
                existingLink.remove();
            }

            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = cssUrl;
            link.id = "page-specific-css";
            document.head.appendChild(link);

            highlightActiveLink();
        })
        .catch((error) => {
            console.error("Error loading page:", error);
        });
}

window.addEventListener("load", () => {
    const path = window.location.hash.substring(1) || "dashboard";
    navigateTo(path);
});

window.addEventListener("hashchange", () => {
    const path = window.location.hash.substring(1);
    navigateTo(path);
});
