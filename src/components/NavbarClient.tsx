"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { Settings } from "@/lib/site";
import { MobileMenu } from "@/components/MobileMenu";

interface NavbarClientProps {
    settings: Settings;
    navItems: string[][];
}

export function NavbarClient({ settings, navItems }: NavbarClientProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrolled]);

    return (
        <header
            className={`fixed top-0 z-40 w-full transition-all duration-300 ${scrolled
                ? "bg-surface/90 backdrop-blur-md shadow-lg border-b border-border"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto flex h-14 items-center justify-between px-4 md:h-20">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2 md:gap-3 group">
                    <div className="relative flex h-10 items-center justify-center px-0 py-0 md:h-20 transition-transform group-hover:scale-105">
                        <img
                            src="/images/logo.png"
                            alt="Pro EV Service Logo"
                            className="h-full w-auto object-contain"
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-8 md:flex">
                    {navItems.map(([label, href]) => (
                        <Link
                            key={href}
                            href={href}
                            className={`group relative text-base font-medium transition-colors ${scrolled
                                ? "text-text hover:text-accent"
                                : "text-text/90 hover:text-accent"
                                }`}
                        >
                            {label}
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* CTA + Mobile menu */}
                <div className="flex items-center gap-2 md:gap-3">
                    <Link
                        href={settings.messenger}
                        target="_blank"
                        className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[#0084FF] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#0073e6] hover:shadow-lg"
                    >
                        <MessageCircle className="h-4 w-4" /> จองคิว
                    </Link>

                    <Link
                        href={`tel:${settings.phone}`}
                        className={`hidden md:inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition-all ${scrolled
                            ? "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                            : "border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                            }`}
                    >
                        <Phone className="h-4 w-4" /> {settings.phone}
                    </Link>

                    {/* Mobile Menu Trigger */}
                    <MobileMenu settings={settings} navItems={navItems} />
                </div>
            </div>
        </header>
    );
}
