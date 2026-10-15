import Image from "next/image";
import portrait from "../../public/images/profile/portrait.png";

export function Portrait({ small = false }: { small?: boolean }) {
  return <div className={`portrait-frame${small ? " portrait-frame-small" : ""}`}><Image src={portrait} alt="Portrait of Zakharias Priya" sizes={small ? "(max-width: 680px) 220px, (max-width: 900px) 260px, 280px" : "(max-width: 680px) 240px, (max-width: 900px) 320px, 360px"} className="portrait-image object-contain" /></div>;
}
