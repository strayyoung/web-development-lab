/* =========================================
   STUDENT HUB - LAB 8 TAILWIND
   ========================================= */

const root = document.documentElement;

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

const flipCard = document.getElementById("flipCard");
const flipToggle = document.getElementById("flipToggle");
const flipStatus = document.getElementById("flipStatus");

/* 1. DARK MODE: Bootstrap-д data-bs-theme, энд <html class="dark"> */

function setTheme(theme) {
    const isDark = theme === "dark";

    root.classList.toggle("dark", isDark);

    if (themeToggle) themeToggle.setAttribute("aria-pressed", String(isDark));
    if (themeIcon) themeIcon.textContent = isDark ? "☀" : "☾";
    if (themeText) themeText.textContent = isDark ? "Light mode" : "Dark mode";

    try {
        localStorage.setItem("studentHubTheme", theme);
    } catch (error) {
        // Theme ajillana.
    }
}

let savedTheme = "light";

try {
    savedTheme = localStorage.getItem("studentHubTheme") || "light";
} catch (error) {
    savedTheme = "light";
}

setTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        setTheme(root.classList.contains("dark") ? "light" : "dark");
    });
}

/* 2. MAIN 3D FLIP CARD */

if (flipToggle && flipCard) {
    const frontFace = flipCard.children[0];
    const backFace = flipCard.children[1];

    flipToggle.addEventListener("click", function () {
        const isFlipped = flipCard.dataset.flipped !== "true";

        flipCard.dataset.flipped = String(isFlipped);
        flipToggle.setAttribute("aria-pressed", String(isFlipped));

        if (frontFace) frontFace.setAttribute("aria-hidden", String(isFlipped));
        if (backFace) backFace.setAttribute("aria-hidden", String(!isFlipped));

        flipToggle.textContent = isFlipped ? "Буцааж эргүүлэх" : "Картыг эргүүлэх";

        if (flipStatus) {
            flipStatus.textContent = isFlipped
                ? "Картын ар тал харагдаж байна."
                : "Картын урд тал харагдаж байна.";
        }
    });
}

/* 3. GALLERY 3D FLIP CARDS (aria-pressed-ийг CSS уншиж эргүүлнэ) */

document.querySelectorAll("[data-flip]").forEach(function (card) {
    card.addEventListener("click", function () {
        const isFlipped = card.getAttribute("aria-pressed") !== "true";
        card.setAttribute("aria-pressed", String(isFlipped));
    });
});

/* 4. FORM VALIDATION (Bootstrap-тай ижил .was-validated логик) */

document.querySelectorAll(".needs-validation").forEach(function (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add("was-validated");
            return;
        }

        form.classList.add("was-validated");

        const formStatus = document.getElementById("formStatus");

        if (formStatus) {
            formStatus.textContent = "Мэдээлэл амжилттай шалгагдлаа.";
        }

        form.reset();
        form.classList.remove("was-validated");
    });
});