function leadZero(num) {
  return (num < 10 ? '0' : '') + num;
}

export default function formatTime(time) {
  const allSeconds = Math.round(time);
  const seconds = allSeconds % 60;
  const allMinutes = Math.floor(allSeconds / 60);
  const minutes = allMinutes % 60;
  const hours = Math.floor(allMinutes / 60);

  const hh = leadZero(hours);
  const mm = leadZero(minutes);
  const ss = leadZero(seconds);

  return hours > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
}
