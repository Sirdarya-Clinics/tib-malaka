import Link from "next/link";
import Image from "next/image";
import en from "../../public/eng.png";
import ru from "../../public/ru.png";
import uz from "../../public/uz.png";

export function LanguageChanger() {
  return (
    <div className=" flex flex-row gap-4">
      <Link href="/">
        <Image src={uz} alt={"uz"} />
      </Link>
      <Link href="/ru">
        <Image src={ru} alt={"ru"} />
      </Link>
      <Link href="/en">
        <Image src={en} alt={"en"} />
      </Link>
    </div>
  );
}
