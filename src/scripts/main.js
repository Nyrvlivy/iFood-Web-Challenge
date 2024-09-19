"use strict";

(async () => {
    const aboutEntrypoint = document.getElementById("about-modal");

    async function fetchTemplate(path) {
        const res = await fetch(path);
        const template = await res.text();
        return template;
    }

    const aboutModal = await fetchTemplate("src/app/components/modals/about/about.html");
    aboutEntrypoint.innerHTML = aboutModal;
})();
