export default function formatRunTime(time) {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  const ans = `${hours}h ${mins}m`;
  return ans;
}
