import { Countdown } from "../components/Countdown.js";
import { DigitalClock } from "../components/DigitalClock.js";
import { TotalCountdown } from "../components/TotalCountdown.js";
import { getNextYearDate } from "../utils/date.js";

export class ClockApp {
    #container;
    #realTargetDate;
    #clock;
    #countdown;
    #totalCountdown;
    #isSimulating;

    constructor(containerId) {
        this.#container = document.getElementById(containerId);
        this.#isSimulating = false;
    }

    init() {
        if (!this.#container) {
            throw new Error("No se encontro el contenedor principal.");
        }

        this.#container.className = "app-shell";
        this.#container.replaceChildren();

        this.#realTargetDate = getNextYearDate();
        this.#clock = new DigitalClock(this.#container);
        this.#countdown = new Countdown(this.#container, this.#realTargetDate);
        this.#totalCountdown = new TotalCountdown(this.#container, this.#realTargetDate);

        this.#clock.render();
        this.#countdown.render();
        this.#totalCountdown.render();

        this.#renderControls();

        this.#clock.start();
        this.#countdown.start();
        this.#totalCountdown.start();
    }

    #renderControls() {
        const controls = document.createElement("div");
        controls.className = "sim-controls";

        const simBtn = document.createElement("button");
        simBtn.className = "sim-btn";
        simBtn.type = "button";
        simBtn.textContent = "🎉 Probar animación de Fin de Año";

        simBtn.addEventListener("click", () => {
            this.#isSimulating = !this.#isSimulating;
            if (this.#isSimulating) {
                simBtn.classList.add("active");
                simBtn.textContent = "⏱️ Volver a cuenta regresiva real";
                const simulatedDate = new Date(Date.now() - 1000);
                this.#countdown.setTargetDate(simulatedDate);
                this.#totalCountdown.setTargetDate(simulatedDate);
            } else {
                simBtn.classList.remove("active");
                simBtn.textContent = "🎉 Probar animación de Fin de Año";
                this.#countdown.setTargetDate(this.#realTargetDate);
                this.#totalCountdown.setTargetDate(this.#realTargetDate);
            }
        });

        controls.appendChild(simBtn);
        this.#container.appendChild(controls);
    }
}
