import { getSettings } from "@/lib/content";
import { MessageCircle, Phone, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { MapEmbed } from "@/components/MapEmbed";

export default function ContactPage() {
    const settings = getSettings();

    return (
        <main className="min-h-screen">
            <div className="container px-4 py-16">
                <h1 className="mb-8 text-center text-4xl font-bold">ติดต่อเรา</h1>

                <div className="grid gap-12 md:grid-cols-2">
                    {/* Info Side */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="mb-4 text-2xl font-bold text-green-700">Pro EV Service</h2>
                            <p className="flex items-start gap-3 text-lg text-gray-600">
                                <MapPin className="mt-1 h-6 w-6 shrink-0 text-green-600" />
                                {settings.address}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Clock className="h-6 w-6 text-green-600" />
                                <div>
                                    <p className="font-bold">เวลาทำการ</p>
                                    <p className="text-gray-600">09:00 - 19:00 น. (หยุดทุกวันพุธ)</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="h-6 w-6 text-green-600" />
                                <div>
                                    <p className="font-bold">โทรศัพท์</p>
                                    <a href={`tel:${settings.phone}`} className="text-gray-600 hover:text-green-600">{settings.phone}</a>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                            <Link
                                href={settings.messenger}
                                target="_blank"
                                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                            >
                                <MessageCircle className="h-5 w-5" /> ทักแชท Facebook
                            </Link>
                            <Link
                                href={settings.line}
                                target="_blank"
                                className="flex items-center justify-center gap-2 rounded-lg bg-[#06C755] px-6 py-3 font-medium text-white transition-colors hover:bg-[#05b64d]"
                            >
                                แอด LINE สอบถาม
                            </Link>
                        </div>
                    </div>

                    {/* Areas Side */}
                    <div className="rounded-2xl bg-gray-50 p-8">
                        <h3 className="mb-4 text-xl font-bold">พื้นที่ให้บริการ</h3>
                        <ul className="grid grid-cols-2 gap-2 text-gray-600">
                            <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-green-500" /> ปากเกร็ด</li>
                            <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-green-500" /> แจ้งวัฒนะ</li>
                            <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-green-500" /> ราชพฤกษ์</li>
                            <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-green-500" /> งามวงศ์วาน</li>
                            <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-green-500" /> หลักสี่</li>
                            <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-green-500" /> นนทบุรี</li>
                        </ul>

                        <div className="mt-8">
                            <h3 className="mb-4 text-xl font-bold">รุ่นรถที่ให้บริการประจำ</h3>
                            <div className="flex flex-wrap gap-2">
                                {["NETA V", "BYD Dolphin", "BYD Atto 3", "MG EP", "MG ZS EV", "GAC AION Y", "ORA Good Cat"].map(car => (
                                    <span key={car} className="rounded-full bg-white px-3 py-1 text-sm shadow-sm ring-1 ring-gray-200">
                                        {car}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Below */}
            <MapEmbed />
        </main>
    );
}
