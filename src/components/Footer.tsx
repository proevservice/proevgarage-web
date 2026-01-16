import Link from "next/link";
import { Facebook, MapPin, Phone, Clock } from "lucide-react";
import { getSettings } from "@/lib/site";

export async function Footer() {
    const settings = getSettings();

    return (
        <footer className="bg-bg text-muted border-t border-border">
            <div className="container px-4 py-16">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand & Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-text">{settings.brand_name}</h3>
                        <p className="text-sm leading-relaxed text-gray-400">
                            ศูนย์บริการซ่อมรถยนต์ไฟฟ้าครบวงจร มาตรฐานมืออาชีพ ดูแลโดยทีมงานผู้เชี่ยวชาญเฉพาะทาง
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a href={settings.facebook} target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href={settings.line} target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-700 text-[10px] font-bold">OA</div>
                            </a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-text">ติดต่อเรา</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 shrink-0 text-accent" />
                                <span>{settings.address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 shrink-0 text-accent" />
                                <a href={`tel:${settings.phone}`} className="hover:text-text transition-colors">{settings.phone}</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="h-5 w-5 shrink-0 text-accent" />
                                <span>{settings.hours}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-text">เมนู</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-accent">หน้าแรก</Link></li>
                            <li><Link href="/services" className="hover:text-accent">บริการทั้งหมด</Link></li>
                            <li><Link href="/booking" className="hover:text-accent">ขั้นตอนการจอง</Link></li>
                            <li><Link href="/blog" className="hover:text-accent">บทความ & ความรู้</Link></li>
                        </ul>
                    </div>

                    {/* Areas */}
                    <div>
                        <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-text">พื้นที่ให้บริการ</h4>
                        <div className="flex flex-wrap gap-2">
                            {settings.service_areas?.map((area) => (
                                <span key={area} className="rounded-full bg-card border border-border px-3 py-1 text-xs text-muted">
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between border-t border-border pt-8 text-xs text-muted sm:flex-row">
                    <p>© {new Date().getFullYear()} Pro EV Service. All rights reserved.</p>
                    <p>Designed for Performance.</p>
                </div>
            </div>
        </footer>
    );
}
