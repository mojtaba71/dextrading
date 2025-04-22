export default function formatDate(
  date?: Date,
  symbol?: "dash" | "slash"
): string {
  const dateObj = date || new Date();
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const pMonth = month.toString().padStart(2, "0");
  const pDay = day.toString().padStart(2, "0");
  const seperator = symbol == "dash" ? "-" : "/";
  const newPaddedDate = `${year}${seperator}${pMonth}${seperator}${pDay}`;
  return newPaddedDate;
}

export function getPastDate(month: number) {
  var date = new Date();
  date.setMonth(date.getMonth() - month);
  return date;
}

export function getDayBefore() {
  var date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}

export function convertIsoToDate(isoDate: string): Date {
  const date = new Date(isoDate.substring(0, 10));
  return date;
}
