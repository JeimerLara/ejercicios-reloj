const CONFETTI_COLORS = [
    "#f4b860", // gold
    "#62d2a2", // emerald
    "#5bc0be", // cyan
    "#ff6b6b", // coral
    "#ffd166", // yellow
    "#06d6a0", // mint
    "#e056fd", // purple
    "#ffffff", // white
];

export function launchConfetti(count = 60) {
    let container = document.querySelector(".confetti-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "confetti-container";
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti-piece";

        const size = Math.random() * 8 + 6;
        const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
        const startX = Math.random() * 100 + "vw";
        const endX = (Math.random() * 120 - 10) + "vw";
        const duration = (Math.random() * 2 + 2.5) + "s";
        const delay = (Math.random() * 1.2) + "s";
        const isCircle = Math.random() > 0.5;

        piece.style.setProperty("--size", `${size}px`);
        piece.style.setProperty("--color", color);
        piece.style.setProperty("--x-start", startX);
        piece.style.setProperty("--x-end", endX);
        piece.style.setProperty("--duration", duration);
        piece.style.animationDelay = delay;
        piece.style.left = startX;
        if (isCircle) {
            piece.style.setProperty("--radius", "50%");
        }

        fragment.appendChild(piece);
    }

    container.appendChild(fragment);

    setTimeout(() => {
        if (container && container.children.length > count * 2) {
            container.replaceChildren();
        }
    }, 6000);
}

export function createCelebrationBanner(year) {
    const banner = document.createElement("div");
    banner.className = "celebration-banner";
    banner.setAttribute("role", "alert");

    const icon = document.createElement("span");
    icon.className = "celebration-icon";
    icon.textContent = "🎆 🍾 ✨";

    const title = document.createElement("p");
    title.className = "celebration-title";
    title.textContent = `¡Feliz Año Nuevo ${year}!`;

    const text = document.createElement("p");
    text.className = "celebration-text";
    text.textContent = "¡Te deseamos un año lleno de salud, prosperidad, éxitos y metas cumplidas!";

    banner.append(icon, title, text);
    return banner;
}
