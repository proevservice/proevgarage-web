import Link from "next/link";
import { MessageCircle, Phone, Menu } from "lucide-react";
import { getSettings } from "@/lib/site";

export async function Navbar() {
    const settings = getSettings();

    return (
        <header className="fixed top-0 z-40 w-full bg-black/30 backdrop-blur-md shadow-sm md:sticky md:bg-white/95 dark:md:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative flex h-20 items-center justify-center px-0 py-0">
                        <img
                            src="/images/logo.png"
                            alt="Pro EV Service Logo"
                            className="h-full w-auto object-contain"
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-8 md:flex">
                    {[
                        ["หน้าแรก", "/"],
                        ["บริการของเรา", "/services"],
                        ["ขั้นตอนจองคิว", "/booking"],
                        ["ติดต่อเรา", "/contact"],
                        ["บทความ", "/blog"],
                    ].map(([label, href]) => (
                        <Link
                            key={href}
                            href={href}
                            className="group relative text-base font-medium text-white transition-colors hover:text-brand-green"
                        >
                            {label}
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-green transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* CTA + Mobile menu */}
                <div className="flex items-center gap-3">
                    <Link
                        href={settings.messenger}
                        target="_blank"
                        className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[#0084FF] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#0073e6] hover:shadow-lg"
                    >
                        <MessageCircle className="h-4 w-4" /> จองคิว
                    </Link>

                    <Link
                        href={`tel:${settings.phone}`}
                        className="hidden md:inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
                    >
                        <Phone className="h-4 w-4" /> {settings.phone}
                    </Link>

                    {/* Mobile Menu Trigger */}
                    <button
                        type="button"
                        aria-label="Open menu"
                        className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/15 active:scale-[0.98]"
                    >
                        <Menu className="h-7 w-7" />
                    </button>
                </div>
            </div>
        </header>
    );
}
