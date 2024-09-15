const routeMap = {
    "dashboard": "dashboard",
    "settlements": "repasses",
    "entries": "lancamentos",
    "performance": "desempenho",
    "operation-health": "saude-operacional",
    "goals-and-projections": "metas-e-projecoes",
};

function getRouteInEnglish(route) {
    return Object.keys(routeMap).find((key) => routeMap[key] === route) || route;
}

function getRouteInPortuguese(route) {
    return routeMap[route] || route;
}

function navigateTo(route) {
    const appContent = document.getElementById("app-content");

    let routeInEnglish = getRouteInEnglish(route);
    let pageUrl = `src/app/pages/${routeInEnglish}/${routeInEnglish}.html`;
    let cssUrl = `src/app/pages/${routeInEnglish}/${routeInEnglish}.css`;

    fetch(pageUrl)
        .then((response) => response.text())
        .then((html) => {
            appContent.innerHTML = html;

            const newHash = getRouteInPortuguese(routeInEnglish);
            if (window.location.hash !== `#/${newHash}`) {
                window.history.replaceState(null, null, `#/${newHash}`);
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
    const path = getRouteInEnglish(window.location.hash.substring(2)) || "dashboard";
    navigateTo(path);
});

window.addEventListener("hashchange", () => {
    const path = getRouteInEnglish(window.location.hash.substring(2));
    navigateTo(path);
});
