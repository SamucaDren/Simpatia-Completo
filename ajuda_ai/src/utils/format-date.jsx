export const formatDate = (ts) => {
    
  if (!ts) return "";

  let date;

  if (ts instanceof Date) {
    date = ts;
  }
  else if (typeof ts === "number") {
    date = new Date(ts);
  }
  else if (typeof ts === "string") {
    const asNum = Number(ts);
    date = !Number.isNaN(asNum) ? new Date(asNum) : new Date(ts);
  }
  else if (ts && typeof ts.toDate === "function") {
    date = ts.toDate();
  }
  else {
    date = new Date(ts);
  }

  if (isNaN(date.getTime())) return "Data inválida";

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
