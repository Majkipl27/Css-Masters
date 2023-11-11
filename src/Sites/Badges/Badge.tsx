import formatDate from "../../lib/formatDate";
import Image1 from "./assets/1.svg";
import Image2 from "./assets/2.svg";
import Image3 from "./assets/3.svg";
import Image4 from "./assets/4.svg";
import Image5 from "./assets/5.svg";

export default function Badge({
  badgeId,
  size,
  badgeName,
  description,
  gotAt,
}: {
  badgeId: number;
  size: string;
  badgeName: string;
  description: string;
  gotAt?: Date;
}) {
  const images = [Image1, Image2, Image3, Image4, Image5];

  return (
    <img
      style={{ width: size, height: size }}
      src={images[badgeId - 1]}
      title={`${
        gotAt && "Unlocked: " + formatDate(gotAt, true) + " |"
      } ${badgeName} | ${description}`}
    />
  );
}
