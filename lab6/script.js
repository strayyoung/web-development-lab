/* =========================================
   STUDENT HUB - LAB 6
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

/* 1. Dark mode тохиргоо */

function setTheme(theme) {
    root.dataset.theme = theme;

    const isDark = theme === "dark";

    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeIcon.textContent = isDark ? "☀" : "☾";
    themeText.textContent = isDark ? "Light mode" : "Dark mode";

    try {
        localStorage.setItem("studentHubTheme", theme);
    } catch (error) {
        // Browser хадгалах боломжгүй байсан ч theme ажиллана.
    }
}

/* <head> доторх скрипт тохируулсан theme-ийг эхлэлийн утга болгоно */

let savedTheme = root.dataset.theme || "light";

try {
    savedTheme = localStorage.getItem("studentHubTheme") || savedTheme;
} catch (error) {
    // localStorage ашиглах боломжгүй
}

setTheme(savedTheme);

/* Theme солих товч */

themeToggle.addEventListener("click", function () {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
});

/* 2. 3D Flip Card */

flipToggle.addEventListener("click", function () {
    const isFlipped = flipCard.classList.toggle("is-flipped");

    flipToggle.setAttribute("aria-pressed", String(isFlipped));

    // Харагдахгүй байгаа талыг screen reader-аас нууна
    frontFace.setAttribute("aria-hidden", String(isFlipped));
    backFace.setAttribute("aria-hidden", String(!isFlipped));

    if (isFlipped) {
        flipToggle.textContent = "Буцааж эргүүлэх";
        flipStatus.textContent = "Картын ар тал харагдаж байна.";
    } else {
        flipToggle.textContent = "Картыг эргүүлэх";
        flipStatus.textContent = "Картын урд тал харагдаж байна.";
    }
});