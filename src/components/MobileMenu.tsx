"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import { Settings } from "@/lib/site";

interface MobileMenuProps {
    settings: Settings;
    navItems: string[][];
}

export function MobileMenu({ settings, navItems }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            {/* Toggle Button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/15 active:scale-[0.98] transition-all"
            >
                <Menu className="h-7 w-7" />
            </button>

            {/* Portal Overlay & Drawer */}
            {mounted &&
                createPortal(
                    isOpen && (
                        <div className="fixed inset-0 z-[100] flex justify-end md:hidden">
                            {/* Backdrop */}
                            <div
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                                onClick={() => setIsOpen(false)}
                            />

                            {/* Drawer Panel */}
                            <div className="relative w-full max-w-xs bg-surface h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col p-6 border-l border-border">
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-lg font-bold text-text">
                                        เมนู
                                    </span>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-full hover:bg-bg transition-colors"
                                        aria-label="Close menu"
                                    >
                                        <X className="h-6 w-6 text-muted hover:text-text" />
                                    </button>
                                </div>

                                {/* Navigation Links */}
                                <nav className="flex flex-col gap-2">
                                    {navItems.map(([label, href]) => {
                                        const isActive = pathname === href;
                                        return (
                                            <Link
                                                key={href}
                                                href={href}
                                                onClick={() => setIsOpen(false)}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                                    ? "bg-accent/10 text-accent font-semibold"
                                                    : "text-muted hover:bg-bg hover:text-text"
                                                    }`}
                                            >
                                                <span className="text-base">
                                                    {label}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </nav>

                                {/* Contact Actions */}
                                <div className="mt-auto pt-6 border-t border-border flex flex-col gap-3">
                                    <Link
                                        href={settings.messenger || "#"}
                                        target="_blank"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#0084FF] px-4 py-3 text-white font-bold shadow-sm active:scale-[0.98]"
                                    >
                                        <MessageCircle className="h-5 w-5" />{" "}
                                        จองคิวผ่านแชท
                                    </Link>

                                    <Link
                                        href={`tel:${settings.phone}`}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center gap-2 w-full rounded-xl border border-border bg-bg px-4 py-3 text-text font-bold hover:bg-accent hover:text-white hover:border-transparent active:scale-[0.98]"
                                    >
                                        <Phone className="h-5 w-5" />{" "}
                                        {settings.phone}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ),
                    document.body
                )}
        </>
    );
}
