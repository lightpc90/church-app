

const countdownTimer = (targetDate) => {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const total = target - now;

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);

  return { total, days, hours, minutes, seconds };
};
export default countdownTimer