class DigitalClock {
    #root;
    #timeElement;
    #dateElement;
    #intervalId;

    constructor(root) {
        this.#root = root;
        this.#timeElement = document.createElement("p");
        this.#dateElement = document.createElement("p");
        this.#intervalId = null;
    }

    render() {
        const section = document.createElement("section");
        section.className = "panel clock-panel";
        section.setAttribute("aria-label", "Reloj digital en tiempo real");

        const title = document.createElement("h1");
        title.textContent = "Reloj digital";

        this.#timeElement.className = "clock-time";
        this.#dateElement.className = "clock-date";

        section.append(title, this.#timeElement, this.#dateElement);
        this.#root.appendChild(section);
    }

    start() {
        if (this.#intervalId) {
            return;
        }

        this.#update();
        this.#intervalId = setInterval(() => this.#update(), 1000);
    }

    #update() {
        const now = new Date();

        this.#timeElement.textContent = now.toLocaleTimeString("es-CO", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        this.#dateElement.textContent = now.toLocaleDateString("es-CO", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        this.#timeElement.classList.remove("tick");
        void this.#timeElement.offsetWidth;
        requestAnimationFrame(() => this.#timeElement.classList.add("tick"));
    }
}

class Countdown {
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

        [
            ["days", "Días"],
            ["hours", "Horas"],
            ["minutes", "Minutos"],
            ["seconds", "Segundos"],
        ].forEach(([key, label]) => {
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
        const now = new Date();
        const difference = Math.max(this.#targetDate.getTime() - now.getTime(), 0);

        if (difference === 0) {
            this.#subtitleElement.textContent = "El nuevo año ya inicio";
            this.stop();
        }
        const totalSeconds = Math.floor(difference / 1000);
        const seconds = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const minutes = totalMinutes % 60;
        const totalHours = Math.floor(totalMinutes / 60);
        const hours = totalHours % 24;
        const days = Math.floor(totalHours / 24);

        this.#paint("days", days);
        this.#paint("hours", hours);
        this.#paint("minutes", minutes);
        this.#paint("seconds", seconds);
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

class ClockApp {
    #container;

    constructor(containerId) {
        this.#container = document.getElementById(containerId);
    }

    init() {
        if (!this.#container) {
            throw new Error("No se encontro el contenedor principal.");
        }

        this.#container.className = "app-shell";
        this.#container.replaceChildren();

        const nextYear = new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0);

        const clock = new DigitalClock(this.#container);
        const countdown = new Countdown(this.#container, nextYear);

        clock.render();
        countdown.render();
        clock.start();
        countdown.start();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const app = new ClockApp("container");
    app.init();
});
