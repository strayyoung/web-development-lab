/* =========================================
   STUDENT HUB - LAB 8 BOOTSTRAP
   JavaScript interactions
   ========================================= */

const root = document.documentElement;

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

const flipCard = document.getElementById("flipCard");
const flipToggle = document.getElementById("flipToggle");
const flipStatus = document.getElementById("flipStatus");

const frontFace = document.querySelector(".flip-front");
const backFace = document.querySelector(".flip-back");

/* 1. DARK MODE */

function setTheme(theme) {
    root.setAttribute("data-bs-theme", theme);

    const isDark = theme === "dark";

    if (themeToggle) {
        themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    if (themeIcon) {
        themeIcon.textContent = isDark ? "☀" : "☾";
    }

    if (themeText) {
        themeText.textContent = isDark ? "Light mode" : "Dark mode";
    }

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
        const nextTheme =
            root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";

        setTheme(nextTheme);
    });
}

/* 2. MAIN 3D FLIP CARD */

if (flipToggle && flipCard) {
    flipToggle.addEventListener("click", function () {
        const isFlipped = flipCard.classList.toggle("is-flipped");

        flipToggle.setAttribute("aria-pressed", String(isFlipped));

        if (frontFace) {
            frontFace.setAttribute("aria-hidden", String(isFlipped));
        }

        if (backFace) {
            backFace.setAttribute("aria-hidden", String(!isFlipped));
        }

        flipToggle.textContent = isFlipped
            ? "Буцааж эргүүлэх"
            : "Картыг эргүүлэх";

        if (flipStatus) {
            flipStatus.textContent = isFlipped
                ? "Картын ар тал харагдаж байна."
                : "Картын урд тал харагдаж байна.";
        }
    });
}

/* 3. GALLERY 3D FLIP CARDS */

const photoCards = document.querySelectorAll(".photo-flip");

photoCards.forEach(function (card) {
    card.addEventListener("click", function () {
        const isFlipped = card.classList.toggle("is-flipped");

        card.setAttribute("aria-pressed", String(isFlipped));
    });
});

/* 4. BOOTSTRAP FORM VALIDATION */

const forms = document.querySelectorAll(".needs-validation");

forms.forEach(function (form) {
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