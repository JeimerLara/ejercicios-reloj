export class DigitalClock {
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
