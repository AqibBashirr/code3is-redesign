"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

import {
  Linkedin,
  Facebook,
  X as XIcon,
  Whatsapp as MessageCircle,
} from "@/components/icons";

interface BlogShareProps {
  title: string;
  description?: string;
  url: string;
}

export default function BlogShare({
  title,
  description = "",
  url,
}: BlogShareProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const socialLinks = [
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url,
      )}`,
      icon: Linkedin,
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url,
      )}&text=${encodeURIComponent(title)}`,
      icon: XIcon,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url,
      )}`,
      icon: Facebook,
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      icon: MessageCircle,
    },
  ];

  const handleShare = async () => {
    if (
      typeof navigator !== "undefined" &&
      "share" in navigator &&
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    ) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });

        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
      }
    }

    setOpen((prev) => !prev);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1800);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div ref={wrapperRef} className="relative mt-6 inline-flex">
      <button
        onClick={handleShare}
        aria-expanded={open}
        aria-haspopup="menu"
        className="group inline-flex items-center gap-2 rounded-full border border-[#3A3B3A] bg-card-color px-5 py-2.5 text-sm font-medium text-highlight-text-color transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-color hover:bg-primary-color/10 hover:text-offBlack-color"
      >
        <Share2 className="h-4 w-4 text-highlight-color transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-primary-color" />
        Share
      </button>

      <div
        role="menu"
        aria-hidden={!open}
        className={`absolute left-0 top-full z-50 mt-4 w-72 origin-top-left overflow-hidden rounded-2xl border border-white/10 bg-card-color/95 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <div className="absolute -top-2 left-8 h-4 w-4 rotate-45 border-l border-t border-white/10 bg-card-color" />

        <div className="border-b border-white/10 px-5 py-4">
          <h4 className="text-sm font-semibold text-highlight-text-color">
            Share this article
          </h4>

          <p className="mt-1 text-xs text-gray-400">
            Help others discover this content.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4">
          {socialLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary-color/40 hover:bg-primary-color/10"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 transition-all duration-300 group-hover:bg-primary-color">
                  <Icon className="h-5 w-5 text-highlight-text-color transition-all duration-300 group-hover:text-offBlack-color" />
                </div>

                <span className="text-xs font-medium text-highlight-text-color">
                  {item.name}
                </span>
              </a>
            );
          })}
        </div>

        <div className="border-t border-white/10" />

        <div className="p-4">
          <button
            onClick={handleCopy}
            className="flex w-full items-center justify-between rounded-xl bg-primary-color px-4 py-3 font-medium text-offBlack-color transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center gap-3 text-off-white-text-color">
              {copied ? (
                <Check className="h-5 w-5" />
              ) : (
                <Copy className="h-5 w-5" />
              )}

              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </div>

            <span className="text-xs text-off-white-text-color opacity-70">
              {copied ? "✓" : "⌘"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
