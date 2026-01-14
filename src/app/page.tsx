import { getSettings } from "@/lib/site";
import { MessageCircle, CheckCircle, Shield, Award, Wrench, ArrowRight, Clock, Battery, Zap, Phone } from "lucide-react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";

export default function Home() {
    const settings = getSettings();
    const servicesList = require("@/lib/site").getAllLegacyServices();

    return (
        <div>
            {/* 
        PREMIUM HERO SECTION - FULL WIDTH V3
        - No top spacing (pt-0)
        - Full Height (min-h-[90vh])
        - Left Aligned
        - Branding Colors strict (Pro=White, EV=Green, Service=White+Outline)
        - Thai Text = All Green
      */}
            <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-gray-900 border-b border-gray-800">
                {/* Background Image - Full Bleed */}
                <div className="absolute inset-0 z-0 select-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/hero-bg-2.jpg"
                        alt="Pro EV Service Garage Atmosphere"
                        className="h-full w-full object-cover"
                        style={{ objectPosition: "center 65%" }}
                    />
                    {/* Dark Overlay (60%) */}
                    <div className="absolute inset-0 bg-black/60 mix-blend-multiply"></div>
                    {/* Left->Right Gradient for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
                </div>

                <div className="container relative z-10 mx-auto px-4 max-w-7xl">
                    <div className="max-w-4xl">
                        {/* HEADLINE */}
                        <h1 className="mb-4 font-extrabold leading-tight tracking-tight text-4xl md:text-6xl lg:text-8xl">
                            {/* Line 1: Pro EV Service */}
                            <span className="block mb-2 leading-tight">
                                {/* Pro: black fill + white outline */}
                                <span
                                    className="font-semibold text-black"
                                    style={{
                                        WebkitTextStroke: "1px #fff",
                                        textShadow:
                                            "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
                                    }}
                                >
                                    Pro{" "}
                                </span>

                                {/* EV: green */}
                                <span className="text-[#00A651] font-semibold">EV </span>

                                {/* Service: white fill, no outline */}
                                <span className="font-semibold text-white">
                                    Service
                                </span>
                            </span>
                            {/* Line 2: Thai Text - ALL GREEN per request */}
                            <span className="block text-3xl md:text-5xl lg:text-7xl font-extrabold text-[#00A651]">
                                อู่ซ่อมรถไฟฟ้า ปากเกร็ด
                            </span>
                        </h1>

                        <ul className="mb-6 space-y-3 text-base text-gray-200 md:text-lg font-light leading-relaxed max-w-2xl drop-shadow-md">
                            <li className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                                <span>ดูแลรถยนต์ไฟฟ้าด้วยมาตรฐานงานเฉพาะทาง</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                                <span>ตรวจ วิเคราะห์ และซ่อมอย่างเป็นระบบ ด้วยเครื่องมือเฉพาะทาง</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                                <span>มั่นใจได้ว่ารถคุณถูกดูแลอย่างถูกต้อง</span>
                            </li>
                        </ul>

                        {/* CTA Buttons - Desktop Only (Mobile uses Sticky Bar) */}
                        <div className="hidden md:flex flex-row gap-4 mb-12">
                            <Link
                                href={settings.messenger}
                                target="_blank"
                                className="group flex items-center justify-center gap-3 rounded-full bg-[#0084FF] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#0073e6] hover:scale-105 active:scale-95"
                            >
                                <MessageCircle className="h-6 w-6 fill-current" /> แชท Facebook
                            </Link>
                            <Link
                                href={settings.line}
                                target="_blank"
                                className="group flex items-center justify-center gap-3 rounded-full bg-[#06C755] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#05b64d] hover:scale-105 active:scale-95"
                            >
                                {/* Simple L icon */}
                                <span className="flex h-6 w-6 items-center justify-center rounded bg-white text-[10px] font-black text-[#06C755]">L</span>
                                แอด LINE OA
                            </Link>
                            <Link
                                href={`tel:${settings.phone}`}
                                className="flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
                            >
                                <Phone className="h-5 w-5" /> โทร 0989794116
                            </Link>
                        </div>

                        {/* Operating Info (Pills) */}
                        <div className="flex flex-col sm:flex-row gap-4 text-sm font-medium">
                            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 py-2.5 backdrop-blur-md text-white">
                                <Clock className="h-4 w-4 text-brand-green" />
                                <span>เวลาทำการ: 09:00 - 19:00 น.</span>
                            </div>
                            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 py-2.5 backdrop-blur-md text-white">
                                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                                <span>วันหยุดประจำสัปดาห์: ทุกวันพุธ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES SECTION */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">บริการของเรา</h2>
                        <div className="mt-4 h-1 w-20 bg-brand-green mx-auto rounded-full"></div>
                        <p className="mt-4 text-xl text-gray-600">เราเชี่ยวชาญด้านระบบไฟฟ้า EV โดยเฉพาะ</p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {servicesList.map((service: any, idx: number) => {
                            const Icon = (LucideIcons as any)[service.icon] || LucideIcons.Wrench;
                            return (
                                <div key={idx} className="group relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors duration-300 shadow-inner">
                                        <Icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-brand-green transition-colors">{service.title}</h3>
                                    <p className="mb-6 text-gray-600 line-clamp-3 leading-relaxed">{service.description}</p>
                                    <Link href="/services" className="inline-flex items-center font-bold text-gray-900 hover:text-brand-green transition-colors">
                                        ดูรายละเอียด <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* TRUST / WHY CHOOSE US */}
            <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-gray-800"></div>

                <div className="container relative z-10 mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-8 md:text-4xl">ทำไมลูกค้ากว่า 100+ คัน<br />ไว้วางใจ Pro EV Service</h2>
                            <div className="space-y-8">
                                {[
                                    { title: "วิเคราะห์ตรงจุด", desc: "ใช้เครื่องมือ Diagnostic Tools รุ่นล่าสุดสำหรับ EV แบรนด์จีนและยุโรป", icon: Shield },
                                    { title: "โปร่งใสทุกขั้นตอน", desc: "ถ่ายรูปให้ดูทุกจุดที่เสีย อธิบายก่อนซ่อม และส่งงานด้วยภาพหลังซ่อม", icon: CheckCircle },
                                    { title: "ช่างมืออาชีพ", desc: "ทีมงานผ่านการอบรมระบบไฟฟ้าแรงสูง (HV) ปลอดภัย 100%", icon: Award }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="shrink-0 h-12 w-12 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center border border-brand-green/20">
                                            <item.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                            <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            {/* Supported Models Cloud */}
                            <div className="rounded-3xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm">
                                <h3 className="text-xl font-bold mb-6 text-center text-gray-200">รุ่นรถที่เรารับซ่อมประจำ</h3>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {settings.models?.map((model: string) => (
                                        <span key={model} className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 font-medium text-sm border border-gray-600 hover:border-brand-green hover:text-white transition-colors cursor-default">
                                            {model}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ & MAP SECTION */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* LEFT: FAQ */}
                        <div>
                            <div className="mb-10 text-left">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">คำถามที่พบบ่อย (FAQ)</h2>
                                <p className="text-gray-600">รวบรวมคำถามยอดฮิตเกี่ยวกับการซ่อมรถยนต์ไฟฟ้า</p>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { q: "ซ่อมแอร์รถไฟฟ้าใช้นานไหม?", a: "ปกติใช้เวลา 2-4 ชั่วโมง ขึ้นอยู่กับความยากง่ายและอาการของรถครับ" },
                                    { q: "เช็คอาการเสียค่าใช้จ่ายไหม?", a: "ปรึกษาอาการเบื้องต้นผ่านแชทฟรีครับ หากนำรถเข้ามาเช็คหน้างาน ทางเราจะแจ้งค่าบริการก่อนเริ่มงานเสมอ" },
                                    { q: "ต้องจองคิวล่วงหน้าไหม?", a: "แนะนำให้จองคิวล่วงหน้าผ่าน Facebook หรือโทรศัพท์ เพื่อความสะดวกและรวดเร็วครับ" }
                                ].map((item, i) => (
                                    <div key={i} className="group rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:border-brand-green/30 transition-colors">
                                        <h3 className="mb-2 text-lg font-bold text-gray-900 flex items-center justify-between">
                                            {item.q}
                                            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-brand-green transition-colors" />
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: MAP */}
                        <div className="h-[500px] w-full rounded-3xl overflow-hidden shadow-lg border border-gray-200 bg-gray-200 relative">
                            <iframe
                                src="https://www.google.com/maps?cid=12415469945169781142&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Pro EV Service Map"
                                className="absolute inset-0 h-full w-full"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
            {/* SEO/GEO SECTION */}
            <section className="py-16 bg-white border-b">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">พื้นที่ให้บริการครอบคลุม</h2>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                        {settings.service_areas?.map((area: string) => (
                            <div key={area} className="flex items-center gap-2 text-gray-600 font-medium">
                                <div className="h-2 w-2 rounded-full bg-brand-green"></div>
                                {area}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
