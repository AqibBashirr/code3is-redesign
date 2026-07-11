"use client";

interface WhatsAppButtonProps {
  MobileNumber?:string;
  initialMessage?: string; 
}

export default function WhatsAppButton({
  MobileNumber,
  initialMessage = "Hello! I am looking for details regarding your services.",
}: WhatsAppButtonProps) {
  
  const phoneNumber = MobileNumber??process.env.NEXT_PUBLIC_WHATSAPP_PHONE;

  // If the environment variable is missing, don't render the button
  if (!phoneNumber) {
    console.warn(
      "WhatsAppButton: NEXT_PUBLIC_WHATSAPP_PHONE is not defined in your environment variables."
    );
    return null;
  }

  // Encode message for URL safety
  const encodedMessage = encodeURIComponent(initialMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-(--padding-x) md:right-6 (z-50 pointer-events-auto">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(37,211,102,0.4)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] active:scale-95"
      >
        {/* Subtle background pulse aura on hover */}
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-0 transition-opacity duration-300 group-hover:opacity-20 group-hover:duration-1000" />

        {/* Premium Tooltip */}
        <span className="absolute right-full mr-3 scale-95 rounded-lg bg-secondary-background px-3 py-1.5 text-xs font-inter text-off-white-color opacity-0 shadow-lg border border-white/5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap">
          Chat with us
        </span>

        {/* SVG WhatsApp Clean Icon */}
        <svg
          className="h-7 w-7 transition-transform duration-300 group-hover:rotate-[8deg]"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}