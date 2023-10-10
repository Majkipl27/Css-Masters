export default function formatDate(inputDate: string): string {
  const isoDate = new Date(inputDate);

  const day = String(isoDate.getDate()).padStart(2, "0");
  const month = String(isoDate.getMonth() + 1).padStart(2, "0");
  const year = isoDate.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  return formattedDate;
}

