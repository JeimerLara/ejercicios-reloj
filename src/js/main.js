import { ClockApp } from "./core/ClockApp.js";

document.addEventListener("DOMContentLoaded", () => {
    const app = new ClockApp("container");
    app.init();
});
