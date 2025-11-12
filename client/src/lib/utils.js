export const formatDateTime = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const options = { weekday: "short", year: "numeric", month: "short", day: "2-digit" };
  const datePart = d.toLocaleDateString(undefined, options);
  const timePart = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  return `${datePart} • ${timePart}`;
};
