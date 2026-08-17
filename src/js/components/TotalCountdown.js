import { getTotalTimeParts } from "../utils/date.js";

const TOTAL_ITEMS = [
    ["days", "Días"],
    ["hours", "Horas"],
    ["minutes", "Minutos"],
    ["seconds", "Segundos"],
];

const numberFormatter = new Intl.NumberFormat("es-CO");

export class TotalCountdown {
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
        section.className = "panel total-panel";
        section.setAttribute("aria-label", "Tiempo restante total acumulado");

        const title = document.createElement("h2");
        title.textContent = "Tiempo restante";

        this.#subtitleElement.className = "total-subtitle";
        this.#subtitleElement.textContent = `Total acumulado hacia el ${this.#targetDate.getFullYear()}`;

        const grid = document.createElement("div");
        grid.className = "total-grid";

        TOTAL_ITEMS.forEach(([key, label]) => {
            const item = document.createElement("article");
            item.className = "total-item";

            const value = document.createElement("span");
            value.className = "total-value";
            value.textContent = "0";

            const text = document.createElement("span");
            text.className = "total-label";
            text.textContent = label;

            item.append(value, text);
            grid.appendChild(item);
            this.#items.set(key, { item, value });
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

        const timeParts = getTotalTimeParts(new Date(), this.#targetDate);

        TOTAL_ITEMS.forEach(([key]) => {
            this.#paint(key, timeParts[key]);
        });
    }

    #paint(key, value) {
        const element = this.#items.get(key).value;
        const text = numberFormatter.format(value);

        if (element.textContent === text) {
            return;
        }

        element.textContent = text;
        element.classList.remove("flip");
        void element.offsetWidth;
        requestAnimationFrame(() => element.classList.add("flip"));
    }
}
