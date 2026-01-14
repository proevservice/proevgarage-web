"use client";

import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

interface CtaBarProps {
    fbLink: string;
    messengerLink: string;
    lineLink: string;
    phone: string;
}

export function CtaBar({ fbLink, messengerLink, lineLink, phone }: CtaBarProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex border-t bg-white pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.1)] md:hidden">
            <Link
                href={messengerLink}
                target="_blank"
                className="flex flex-1 flex-col items-center justify-center py-3 text-xs font-bold text-gray-600 active:bg-gray-50 hover:bg-blue-50 transition-colors border-r"
            >
                <MessageCircle className="mb-1 h-6 w-6 text-[#0084FF]" />
                <span className="text-[#0084FF]">แชท FB</span>
            </Link>
            <Link
                href={lineLink}
                target="_blank"
                className="flex flex-1 flex-col items-center justify-center py-3 text-xs font-bold text-gray-600 active:bg-gray-50 hover:bg-green-50 transition-colors border-r"
            >
                <div className="mb-1 flex h-6 w-6 items-center justify-center rounded bg-[#06C755] text-white shadow-sm">
                    <span className="text-[10px] font-black">L</span>
                </div>
                <span className="text-[#06C755]">LINE</span>
            </Link>
            <Link
                href={`tel:${phone}`}
                className="flex flex-1 flex-col items-center justify-center py-3 text-xs font-bold text-gray-600 active:bg-gray-50 hover:bg-gray-100 transition-colors"
            >
                <Phone className="mb-1 h-6 w-6 text-gray-800" />
                <span className="text-gray-900">โทรเลย</span>
            </Link>
            <style jsx global>{`
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
        </div>
    );
}
