import { MessageCircle } from "lucide-react";
import { SITE } from "../data/site";

export function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with us on WhatsApp at ${SITE.phone}`}
      className="group fixed bottom-5 left-5 z-[63] flex items-center rounded-full bg-[#25d366] p-3.5 text-white shadow-xl shadow-ink/25 transition-transform duration-300 hover:scale-105 active:scale-95"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2.2} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:ml-2 group-hover:max-w-40">
        WhatsApp us
      </span>
      <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-cream bg-caramel" />
    </a>
  );
}
