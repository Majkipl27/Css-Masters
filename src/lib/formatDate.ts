export default function formatDate(inputDate: Date, time?: boolean): string {
  const isoDate = new Date(inputDate);

  const day = String(isoDate.getDate()).padStart(2, "0");
  const month = String(isoDate.getMonth() + 1).padStart(2, "0");
  const year = isoDate.getFullYear();

  const hours = String(isoDate.getHours()).padStart(2, "0");
  const minutes = String(isoDate.getMinutes()).padStart(2, "0");

  const formattedDate = `${day}.${month}.${year}`;
  const formattedTime = ` ${hours}:${minutes}`;

  return time ? formattedDate + formattedTime : formattedDate;
}

