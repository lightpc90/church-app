
const getNextSunday = () => {
    const today = new Date();
    const day = today.getDay();
    const nextSunday = new Date(
        today.getTime() + ((7 - day + 7) % 7) * 24 * 60 * 60 * 1000
    );
    // the next sunday at 6am
    nextSunday.setHours(6, 0, 0, 0);
    return nextSunday;
    };

export default getNextSunday