import { Countdown } from "../components/Countdown.js";
import { DigitalClock } from "../components/DigitalClock.js";
import { FinalCountdown } from "../components/FinalCountdown.js";
import { TotalCountdown } from "../components/TotalCountdown.js";
import { getNextYearDate } from "../utils/date.js";

export class ClockApp {
    #container;
    #realTargetDate;
    #currentTargetDate;
    #clock;
    #countdown;
    #totalCountdown;
    #finalCountdown;
    #intervalId;

    constructor(containerId) {
        this.#container = document.getElementById(containerId);
        this.#realTargetDate = null;
        this.#currentTargetDate = null;
        this.#intervalId = null;
    }

    init() {
        if (!this.#container) {
            throw new Error("No se encontro el contenedor principal.");
        }

        this.#container.className = "app-shell";
        this.#container.replaceChildren();

        this.#realTargetDate = getNextYearDate();
        this.#currentTargetDate = this.#realTargetDate;

        this.#clock = new DigitalClock(this.#container);
        this.#countdown = new Countdown(this.#container, this.#currentTargetDate);
        this.#totalCountdown = new TotalCountdown(this.#container, this.#currentTargetDate);
        this.#finalCountdown = new FinalCountdown(this.#container, this.#currentTargetDate);

        this.#clock.render();
        this.#countdown.render();
        this.#totalCountdown.render();
        this.#finalCountdown.render();

        this.#renderControls();

        this.#clock.start();
        this.#countdown.start();
        this.#totalCountdown.start();
        this.#finalCountdown.start();

        this.#syncVisibility();
        this.#intervalId = setInterval(() => this.#syncVisibility(), 500);
    }

    #syncVisibility() {
        const difference = Math.max(this.#currentTargetDate.getTime() - Date.now(), 0);
        const isFinalMode = difference <= 60000;

        if (isFinalMode) {
            this.#countdown.setVisible(false);
            this.#totalCountdown.setVisible(false);
            this.#finalCountdown.setVisible(true);
        } else {
            this.#countdown.setVisible(true);
            this.#totalCountdown.setVisible(true);
            this.#finalCountdown.setVisible(false);
        }
    }

    #setTargetDate(newDate) {
        this.#currentTargetDate = newDate;
        this.#countdown.setTargetDate(newDate);
        this.#totalCountdown.setTargetDate(newDate);
        this.#finalCountdown.setTargetDate(newDate);
        this.#syncVisibility();
    }

    #renderControls() {
        const controls = document.createElement("div");
        controls.className = "sim-controls";

        const btnReal = document.createElement("button");
        btnReal.className = "sim-btn active";
        btnReal.type = "button";
        btnReal.textContent = "🔄 Tiempo Real";
        btnReal.addEventListener("click", () => {
            this.#setActiveButton(btnReal, controls);
            this.#setTargetDate(this.#realTargetDate);
        });

        const btn60s = document.createElement("button");
        btn60s.className = "sim-btn";
        btn60s.type = "button";
        btn60s.textContent = "⏱️ Probar cuenta 60s";
        btn60s.addEventListener("click", () => {
            this.#setActiveButton(btn60s, controls);
            this.#setTargetDate(new Date(Date.now() + 59000));
        });

        const btn10s = document.createElement("button");
        btn10s.className = "sim-btn";
        btn10s.type = "button";
        btn10s.textContent = "🔥 Probar últimos 10s";
        btn10s.addEventListener("click", () => {
            this.#setActiveButton(btn10s, controls);
            this.#setTargetDate(new Date(Date.now() + 10000));
        });

        const btnCelebration = document.createElement("button");
        btnCelebration.className = "sim-btn";
        btnCelebration.type = "button";
        btnCelebration.textContent = "🎉 Probar Fin de Año";
        btnCelebration.addEventListener("click", () => {
            this.#setActiveButton(btnCelebration, controls);
            this.#setTargetDate(new Date(Date.now() - 1000));
        });

        controls.append(btnReal, btn60s, btn10s, btnCelebration);
        this.#container.appendChild(controls);
    }

    #setActiveButton(activeBtn, container) {
        container.querySelectorAll(".sim-btn").forEach((btn) => btn.classList.remove("active"));
        activeBtn.classList.add("active");
    }
}
