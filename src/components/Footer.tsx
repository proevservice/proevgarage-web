import Link from "next/link";
import { Facebook, MapPin, Phone, Clock } from "lucide-react";
import { getSettings } from "@/lib/site";

export async function Footer() {
    const settings = getSettings();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container px-4 py-16 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand & Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">{settings.brand_name}</h3>
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
                        <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">ติดต่อเรา</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 shrink-0 text-brand-green" />
                                <span>{settings.address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 shrink-0 text-brand-green" />
                                <a href={`tel:${settings.phone}`} className="hover:text-white">{settings.phone}</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="h-5 w-5 shrink-0 text-brand-green" />
                                <span>{settings.hours}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">เมนู</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-brand-green">หน้าแรก</Link></li>
                            <li><Link href="/services" className="hover:text-brand-green">บริการทั้งหมด</Link></li>
                            <li><Link href="/booking" className="hover:text-brand-green">ขั้นตอนการจอง</Link></li>
                            <li><Link href="/blog" className="hover:text-brand-green">บทความ & ความรู้</Link></li>
                        </ul>
                    </div>

                    {/* Areas */}
                    <div>
                        <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">พื้นที่ให้บริการ</h4>
                        <div className="flex flex-wrap gap-2">
                            {settings.service_areas?.map((area) => (
                                <span key={area} className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400">
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between border-t border-gray-800 pt-8 text-xs text-gray-500 sm:flex-row">
                    <p>© {new Date().getFullYear()} Pro EV Service. All rights reserved.</p>
                    <p>Designed for Performance.</p>
                </div>
            </div>
        </footer>
    );
}
