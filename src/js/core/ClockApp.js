import { Countdown } from "../components/Countdown.js";
import { DigitalClock } from "../components/DigitalClock.js";
import { getNextYearDate } from "../utils/date.js";

export class ClockApp {
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

        const clock = new DigitalClock(this.#container);
        const countdown = new Countdown(this.#container, getNextYearDate());

        clock.render();
        countdown.render();
        clock.start();
        countdown.start();
    }
}
