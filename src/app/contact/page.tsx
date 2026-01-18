import { getSettings } from "@/lib/content";
import { MessageCircle, Phone, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { MapEmbed } from "@/components/MapEmbed";
import { MobileSaveContactBtn } from "@/components/MobileSaveContactBtn";

export default function ContactPage() {
    const settings = getSettings();

    return (
        <main className="min-h-screen bg-bg">
            <div className="bg-surface pt-24 pb-16 text-center text-text border-b border-border">
                <h1 className="mb-4 text-3xl font-bold md:text-4xl">ติดต่อเรา</h1>
                <p className="text-muted">สะดวกรวดเร็ว ไม่ต้องรอนาน</p>
            </div>
            <div className="container px-4 py-12">
                <div className="grid gap-12 md:grid-cols-2">
                    {/* Info Side */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="mb-4 text-2xl font-bold text-accent">Pro EV Service</h2>
                            <p className="flex items-start gap-3 text-lg text-muted">
                                <MapPin className="mt-1 h-6 w-6 shrink-0 text-accent" />
                                <span className="text-text">{settings.address}</span>
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Clock className="h-6 w-6 text-accent" />
                                <div>
                                    <p className="font-bold text-text">เวลาทำการ</p>
                                    <p className="text-muted">09:00 - 19:00 น. (หยุดทุกวันพุธ)</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="h-6 w-6 text-accent" />
                                <div>
                                    <p className="font-bold text-text">โทรศัพท์</p>
                                    <a href={`tel:${settings.phone}`} className="text-muted hover:text-accent transition-colors">{settings.phone}</a>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                            <Link
                                href={settings.messenger}
                                target="_blank"
                                className="flex items-center justify-center gap-2 rounded-lg bg-[#0084FF] px-6 py-3 font-medium text-white transition-colors hover:bg-accent-hover"
                            >
                                <MessageCircle className="h-5 w-5" /> ทักแชท Facebook
                            </Link>
                            <Link
                                href={settings.line}
                                target="_blank"
                                className="flex items-center justify-center gap-2 rounded-lg bg-[#06C755] px-6 py-3 font-medium text-white transition-colors hover:bg-[#05b64d]"
                            >
                                {/* We can keep brand colors for Social Media buttons as they are specific brands */}
                                แอด LINE สอบถาม
                            </Link>
                        </div>

                    </div>

                    {/* Areas Side */}
                    <div className="rounded-2xl bg-card p-8 border border-border shadow-lg">
                        <h3 className="mb-4 text-xl font-bold text-text">พื้นที่ให้บริการ</h3>
                        <ul className="grid grid-cols-2 gap-2 text-muted">
                            <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-accent" /> ปากเกร็ด</li>
                            <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-accent" /> แจ้งวัฒนะ</li>
                            <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-accent" /> ราชพฤกษ์</li>
                            <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-accent" /> งามวงศ์วาน</li>
                            <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-accent" /> หลักสี่</li>
                            <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-accent" /> นนทบุรี</li>
                        </ul>

                        <div className="mt-8">
                            <h3 className="mb-4 text-xl font-bold text-text">รุ่นรถที่ให้บริการประจำ</h3>
                            <div className="flex flex-wrap gap-2">
                                {["NETA V", "BYD Dolphin", "BYD Atto 3", "MG EP", "MG ZS EV", "GAC AION Y", "ORA Good Cat"].map(car => (
                                    <span key={car} className="rounded-full bg-surface px-3 py-1 text-sm shadow-sm ring-1 ring-border text-muted hover:text-accent hover:ring-accent transition-all cursor-default">
                                        {car}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Below */}
                <div className="mt-12 overflow-hidden rounded-2xl border border-border shadow-lg">
                    <MapEmbed />
                </div>
            </div>
        </main>
    );
}
