export function getNextYearDate(date = new Date()) {
    return new Date(date.getFullYear() + 1, 0, 1, 0, 0, 0);
}

export function getTimeParts(startDate, targetDate) {
    const start = new Date(startDate);
    const target = new Date(targetDate);

    if (target <= start) {
        return {
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    let months = (target.getFullYear() - start.getFullYear()) * 12;
    months += target.getMonth() - start.getMonth();

    let cursor = addMonths(start, months);

    if (cursor > target) {
        months -= 1;
        cursor = addMonths(start, months);
    }

    const remainingMilliseconds = target.getTime() - cursor.getTime();
    const totalSeconds = Math.floor(remainingMilliseconds / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const days = Math.floor(totalHours / 24);

    return {
        months,
        days,
        hours,
        minutes,
        seconds,
    };
}

function addMonths(date, months) {
    const result = new Date(date);
    const day = result.getDate();

    result.setDate(1);
    result.setMonth(result.getMonth() + months);

    const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
    result.setDate(Math.min(day, lastDay));

    return result;
}

export function getTotalTimeParts(startDate, targetDate) {
    const start = new Date(startDate);
    const target = new Date(targetDate);

    if (target <= start) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    const remainingMilliseconds = target.getTime() - start.getTime();
    const totalSeconds = Math.floor(remainingMilliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    return {
        days: totalDays,
        hours: totalHours,
        minutes: totalMinutes,
        seconds: totalSeconds,
    };
}

