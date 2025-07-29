import Image from "next/image";
import whatsAppImg from "@/public/whatsapp.png";
import Link from "next/link";

const WhatsAppMessenger = () => {
  return (
    <Link
      href="https://wa.me/message/KCIRDJO4JKVCI1"
      target="_blank"
      className="fixed z-50 bottom-8 right-8 bg-white shadow-xl border flex items-center justify-center h-16 w-16 rounded-full p-2">
      <Image src={whatsAppImg} alt="WhatsApp Image" />
    </Link>
  );
};

export default WhatsAppMessenger;
