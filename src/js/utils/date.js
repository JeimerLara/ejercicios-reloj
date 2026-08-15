export function getNextYearDate(date = new Date()) {
    return new Date(date.getFullYear() + 1, 0, 1, 0, 0, 0);
}

export function getTimeParts(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const days = Math.floor(totalHours / 24);

    return {
        days,
        hours,
        minutes,
        seconds,
    };
}
