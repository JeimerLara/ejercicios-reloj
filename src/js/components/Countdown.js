import { getTimeParts } from "../utils/date.js";
import { launchConfetti, createCelebrationBanner } from "../utils/celebration.js";

const COUNTDOWN_ITEMS = [
    ["months", "Meses"],
    ["days", "Dias"],
    ["hours", "Horas"],
    ["minutes", "Minutos"],
    ["seconds", "Segundos"],
];

export class Countdown {
    #root;
    #targetDate;
    #items;
    #intervalId;
    #subtitleElement;
    #containerSection;
    #bannerElement;
    #isFinished;

    constructor(root, targetDate) {
        this.#root = root;
        this.#targetDate = targetDate;
        this.#items = new Map();
        this.#intervalId = null;
        this.#subtitleElement = document.createElement("p");
        this.#containerSection = null;
        this.#bannerElement = null;
        this.#isFinished = false;
    }

    render() {
        const section = document.createElement("section");
        section.className = "panel countdown-panel";
        section.setAttribute("aria-label", "Cuenta regresiva para el proximo año");

        const title = document.createElement("h2");
        title.textContent = `Cuenta regresiva ${this.#targetDate.getFullYear()}`;

        this.#subtitleElement.className = "countdown-subtitle";
        this.#subtitleElement.textContent = "Tiempo restante para iniciar el proximo año";

        const grid = document.createElement("div");
        grid.className = "countdown-grid";

        COUNTDOWN_ITEMS.forEach(([key, label]) => {
            const item = document.createElement("article");
            item.className = "countdown-item";

            const value = document.createElement("span");
            value.className = "countdown-value";
            value.textContent = "00";

            const text = document.createElement("span");
            text.className = "countdown-label";
            text.textContent = label;

            item.append(value, text);
            grid.appendChild(item);
            this.#items.set(key, { item, value });
        });

        section.append(title, this.#subtitleElement, grid);
        this.#root.appendChild(section);
        this.#containerSection = section;
    }

    start() {
        if (this.#intervalId) {
            return;
        }

        this.#update();
        this.#intervalId = setInterval(() => this.#update(), 1000);
    }

    stop() {
        clearInterval(this.#intervalId);
        this.#intervalId = null;
    }

    setTargetDate(targetDate) {
        this.#targetDate = targetDate;
        this.#isFinished = false;
        if (this.#bannerElement) {
            this.#bannerElement.remove();
            this.#bannerElement = null;
        }
        this.#subtitleElement.textContent = "Tiempo restante para iniciar el proximo año";
        this.start();
    }

    #update() {
        const difference = Math.max(this.#targetDate.getTime() - Date.now(), 0);

        if (difference === 0) {
            this.#subtitleElement.textContent = "🎉 ¡El año nuevo ya inició! 🥂";
            if (!this.#isFinished) {
                this.#isFinished = true;
                this.#showCelebration();
            }
            this.stop();
        }

        const timeParts = getTimeParts(new Date(), this.#targetDate);
        const visibleKeys = this.#getVisibleKeys(timeParts);

        this.#syncVisibleItems(visibleKeys);

        COUNTDOWN_ITEMS.forEach(([key]) => {
            this.#paint(key, timeParts[key]);
        });
    }

    #showCelebration() {
        if (!this.#bannerElement && this.#containerSection) {
            this.#bannerElement = createCelebrationBanner(this.#targetDate.getFullYear());
            this.#containerSection.appendChild(this.#bannerElement);
            launchConfetti(50);
        }
    }

    #getVisibleKeys(timeParts) {
        const firstVisibleIndex = COUNTDOWN_ITEMS.findIndex(([key]) => timeParts[key] > 0);
        const startIndex = firstVisibleIndex === -1 ? COUNTDOWN_ITEMS.length - 1 : firstVisibleIndex;

        return COUNTDOWN_ITEMS.slice(startIndex).map(([key]) => key);
    }

    #syncVisibleItems(visibleKeys) {
        const visibleSet = new Set(visibleKeys);

        this.#items.forEach(({ item }, key) => {
            item.hidden = !visibleSet.has(key);
        });
    }

    #paint(key, value) {
        const element = this.#items.get(key).value;
        const text = String(value).padStart(2, "0");

        if (element.textContent === text) {
            return;
        }

        element.textContent = text;
        element.classList.remove("flip");
        void element.offsetWidth;
        requestAnimationFrame(() => element.classList.add("flip"));
    }
}
