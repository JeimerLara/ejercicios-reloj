import { launchConfetti, createCelebrationBanner } from "../utils/celebration.js";

export class FinalCountdown {
    #root;
    #targetDate;
    #section;
    #titleElement;
    #subtitleElement;
    #valueElement;
    #labelElement;
    #bannerElement;
    #intervalId;
    #isFinished;

    constructor(root, targetDate) {
        this.#root = root;
        this.#targetDate = targetDate;
        this.#section = null;
        this.#titleElement = null;
        this.#subtitleElement = null;
        this.#valueElement = null;
        this.#labelElement = null;
        this.#bannerElement = null;
        this.#intervalId = null;
        this.#isFinished = false;
    }

    render() {
        this.#section = document.createElement("section");
        this.#section.className = "panel final-panel";
        this.#section.setAttribute("aria-label", "Cuenta final de segundos");
        this.#section.hidden = true;

        this.#titleElement = document.createElement("h2");
        this.#titleElement.textContent = `¡Cuenta regresiva final ${this.#targetDate.getFullYear()}!`;

        this.#subtitleElement = document.createElement("p");
        this.#subtitleElement.className = "final-subtitle";
        this.#subtitleElement.textContent = "Faltan menos de 60 segundos para el inicio del nuevo año ⏳";

        const card = document.createElement("div");
        card.className = "final-card";

        this.#valueElement = document.createElement("span");
        this.#valueElement.className = "final-value";
        this.#valueElement.textContent = "00";

        this.#labelElement = document.createElement("span");
        this.#labelElement.className = "final-label";
        this.#labelElement.textContent = "Segundos restantes";

        card.append(this.#valueElement, this.#labelElement);
        this.#section.append(this.#titleElement, this.#subtitleElement, card);
        this.#root.appendChild(this.#section);
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

    setVisible(visible) {
        if (this.#section) {
            this.#section.hidden = !visible;
        }
    }

    setTargetDate(targetDate) {
        this.#targetDate = targetDate;
        this.#isFinished = false;
        if (this.#bannerElement) {
            this.#bannerElement.remove();
            this.#bannerElement = null;
        }
        this.#section?.classList.remove("critical");
        this.#subtitleElement.textContent = "Faltan menos de 60 segundos para el inicio del nuevo año ⏳";
        this.#titleElement.textContent = `¡Cuenta regresiva final ${this.#targetDate.getFullYear()}!`;
        this.start();
    }

    #update() {
        const difference = Math.max(this.#targetDate.getTime() - Date.now(), 0);
        const remainingSeconds = Math.ceil(difference / 1000);

        if (difference === 0) {
            this.#subtitleElement.textContent = "🎉 ¡El año nuevo ya inició! 🥂";
            this.#section?.classList.remove("critical");
            this.#paint(0);
            if (!this.#isFinished) {
                this.#isFinished = true;
                this.#showCelebration();
            }
            this.stop();
            return;
        }

        if (remainingSeconds <= 10) {
            this.#section?.classList.add("critical");
            this.#subtitleElement.textContent = "🔥 ¡ÚLTIMOS 10 SEGUNDOS! 🔥";
        } else {
            this.#section?.classList.remove("critical");
            this.#subtitleElement.textContent = "Faltan menos de 60 segundos para el inicio del nuevo año ⏳";
        }

        this.#paint(remainingSeconds);
    }

    #showCelebration() {
        if (!this.#bannerElement && this.#section) {
            this.#bannerElement = createCelebrationBanner(this.#targetDate.getFullYear());
            this.#section.appendChild(this.#bannerElement);
            launchConfetti(60);
        }
    }

    #paint(value) {
        if (!this.#valueElement) return;

        const text = String(value).padStart(2, "0");
        if (this.#valueElement.textContent === text) {
            return;
        }

        this.#valueElement.textContent = text;
        this.#valueElement.classList.remove("flip");
        void this.#valueElement.offsetWidth;
        requestAnimationFrame(() => this.#valueElement.classList.add("flip"));
    }
}
