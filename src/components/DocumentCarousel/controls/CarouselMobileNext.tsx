"use client";

import { Arrow2 } from "@/components/icons";

interface Props {
  disabled?: boolean;
  onClick: () => void;
}

export default function CarouselMobileNext({ disabled, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="absolute right-0 top-1/2 z-30 flex h-8 w-8 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded bg-[#1a1c18] shadow-md transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30 lg:hidden"
    >
      <Arrow2 className="w-3 text-highlight-text-color" />
    </button>
  );
}
