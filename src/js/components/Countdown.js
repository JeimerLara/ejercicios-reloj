import { getTimeParts } from "../utils/date.js";

const COUNTDOWN_ITEMS = [
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

    constructor(root, targetDate) {
        this.#root = root;
        this.#targetDate = targetDate;
        this.#items = new Map();
        this.#intervalId = null;
        this.#subtitleElement = document.createElement("p");
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
            this.#items.set(key, value);
        });

        section.append(title, this.#subtitleElement, grid);
        this.#root.appendChild(section);
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

    #update() {
        const difference = Math.max(this.#targetDate.getTime() - Date.now(), 0);

        if (difference === 0) {
            this.#subtitleElement.textContent = "El nuevo año ya inicio";
            this.stop();
        }

        const timeParts = getTimeParts(difference);

        Object.entries(timeParts).forEach(([key, value]) => {
            this.#paint(key, value);
        });
    }

    #paint(key, value) {
        const element = this.#items.get(key);
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
