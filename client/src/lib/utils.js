// src/utils/formatDate.js
export const formatDateTime = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  // Example: Sat Nov 08 2025 · 10:20 PM
  const options = { weekday: "short", year: "numeric", month: "short", day: "2-digit" };
  const datePart = d.toLocaleDateString(undefined, options);
  const timePart = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  return `${datePart} • ${timePart}`;
};
