import { IBookingDates } from "../../../../../../types/classroom";

export const getLockDates = (datatimes: IBookingDates[]) => {
    const dates = []
    const datetimes: Record<string, number> = {}

    for (const day of datatimes) {
        if (!day.start_time && !day.end_time) {
            const lastLockDay = new Date(day.date_end).getTime();
            let firstLockDay = new Date(day.date_start).getTime();

            for (firstLockDay; firstLockDay <= lastLockDay; firstLockDay += (1000 * 60 * 60 * 24)) {
                dates.push(new Date(firstLockDay));
            }
        } else {
            if (!datetimes[day.date_start]) {
                datetimes[day.date_start] = 0
            }
            datetimes[day.date_start] += new Date(`${day.date_start}T${day.end_time}`).getTime() - new Date(`${day.date_start}T${day.start_time}`).getTime()
        }

        if (datetimes[day.date_start] >= (1000 * 60 * 60 * 10)) {
            dates.push(new Date(day.date_start));
        }
    }

    return dates;
}

export const getLockTimes = (datatimes: IBookingDates[], date: string) => {
    const timesLocked: string[] = []
    const times: string[] = []

    const datetimesItem = datatimes.filter(item => item.date_start === date)

    if (datetimesItem.length) {
        for (const day of datetimesItem) {
            if (day.start_time && day.end_time) {
                const startTime = parseInt(day.start_time.split(":")[0])
                const endTime = parseInt(day.end_time.split(":")[0])
                for (let hours = startTime; hours <= endTime; hours += 1) {
                    timesLocked.push(`${hours}:00`)
                }
            }
        }

        for (const day of datetimesItem) {
            if (day.start_time && day.end_time) {
                for (let hours = 10; 10 <= hours && hours <= 22; hours += 1) {
                    if (!timesLocked.includes(`${hours}:00`) && !times.includes(`${hours}:00`)) {
                        times.push(`${hours}:00`)
                    }
                }
            }
        }
    } else {
        for (let hours = 10; 10 <= hours && hours <= 22; hours += 1) {
            times.push(`${hours}:00`)
        }
    }

    return { freeTimes: times, lockTimes: timesLocked };
}