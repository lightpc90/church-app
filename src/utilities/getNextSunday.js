
// const getNextSunday = () => {
//     const today = new Date();
//     const day = today.getDay();
//     const nextSunday = new Date(
//         ((7 - day + 7) % 7) * 24 * 60 * 60 * 1000
//     );
//     // the next sunday at 6am
//     nextSunday.setHours(6, 0, 0, 0);
//     return nextSunday;
//     };

// export default getNextSunday

export default function getNextSunday() {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const daysUntilNextSunday = currentDay === 0 ? 0 : 7 - currentDay;

  // Clone the current date and set it to the next Sunday
  const nextSunday = new Date(currentDate);
  nextSunday.setDate(currentDate.getDate() + daysUntilNextSunday);

  // Set the time to midnight (00:00:00) for accurate comparison
  nextSunday.setHours(6, 0, 0, 0);

  return nextSunday;
}
