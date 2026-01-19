"use client";
import { MobileSaveContactBtn } from "@/components/MobileSaveContactBtn";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Phone,
    MessageCircle,
    Wrench,
    CheckCircle2,
    MapPin,
    Clock,
    Battery,
    ThermometerSnowflake,
    CarFront,
    AlertTriangle,
    ShieldCheck
} from "lucide-react";
import { sendLeadEvent } from "@/lib/tracking";
import { SectionTitle, FeatureCard, ServiceCard, CaseCard, FaqItem } from "./LandingComponents";


// --- Configuration ---
const LINKS = {
    FB_MESSENGER: "https://m.me/proevservice",
    LINE: "https://line.me/R/ti/p/@869msrge",
    PHONE: "0989794116",
    MAP: "https://maps.app.goo.gl/h21RDsTBUFH5fH9z7"
};

export default function EvRepairLandingPage() {
    // Scroll tracking for sticky bar visibility
    const [showStickyBar, setShowStickyBar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowStickyBar(window.scrollY > 500);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleConversion = (type: "facebook_chat" | "line_chat" | "phone_call" | "navigation", location: string) => {
        sendLeadEvent(type, location);
    };

    return (
        <div className="min-h-screen bg-bg text-text pb-24 md:pb-0">
            {/* 1. HERO SECTION */}
            <section className="relative overflow-hidden
    bg-bg border-b border-border
    flex items-center
    min-h-[100dvh]
    pt-20 pb-10
    md:pt-24 md:pb-24">
                {/* Background Image / Pattern */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero-garage.jpg"
                        alt="Background"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                    {/* Dark Overlay (Gradient matching main site) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent"></div>
                </div>

                <div className="container relative z-10 px-4 text-center md:text-left">
                    <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
                        <div className="max-w-4xl">
                            <div className="mb-6 inline-flex items-center rounded-full bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent border border-accent/20 backdrop-blur-sm">
                                <span className="mr-2 h-2 w-2 rounded-full bg-accent animate-pulse"></span>
                                ให้บริการในพื้นที่ ปากเกร็ด / นนทบุรี / กรุงเทพฯ
                            </div>
                            <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl leading-[1.1]">
                                <span className="font-outline-2 text-transparent">Pro </span>
                                <span className="text-accent">EV </span>
                                <span className="text-white">Service</span>
                            </h1>
                            <h2 className="mb-2 text-3xl font-extrabold leading-tight tracking-tight text-text sm:text-6xl lg:text-6xl">
                                ซ่อมรถไฟฟ้า EV โดยเฉพาะ <br className="hidden md:block" />
                            </h2>
                            <h3 className="mb-4 text-xl font-bold leading-tight tracking-tight text-accent sm:text-2xl lg:text-3xl">
                                จบปัญหาระบบไฟ-แอร์-ช่วงล่าง ด้วยมาตรฐานความปลอดภัยสูงสุด
                            </h3>
                            <p className="mb-8 text-lg text-muted md:text-xl md:max-w-2xl font-light">
                                ศูนย์บริการเฉพาะทาง EV แห่งแรกในปากเกร็ด วิเคราะห์ปัญหาด้วย Software ตรงรุ่น เช็คค่า SOH แบตเตอรี่แรงดันสูงละเอียดทุก Cell ไม่เปลี่ยนอะไหล่มั่ว
                            </p>


                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start mb-10">
                                <a
                                    href={LINKS.FB_MESSENGER}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleConversion("facebook_chat", "hero")}
                                    className="group flex items-center justify-center gap-3 rounded-full bg-[#0084FF]/10 border border-[#0084FF]/70 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#0073e6] hover:border-transparent hover:scale-105 active:scale-95 sm:bg-[#0084FF] sm:border-none"
                                >
                                    <MessageCircle className="h-6 w-6 fill-current" />
                                    ทักแชทปรึกษาช่าง
                                </a>
                                <a
                                    href={`tel:${LINKS.PHONE}`}
                                    onClick={() => handleConversion("phone_call", "hero")}
                                    className="flex items-center justify-center gap-3 rounded-full border border-border bg-white/5 px-6 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-accent hover:scale-105 active:scale-95"
                                >
                                    <Phone className="h-6 w-6" />
                                    โทรสอบถาม
                                </a>
                                {/* Mobile Save Contact Button (Mobile Only) */}
                                <MobileSaveContactBtn />
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted md:justify-start">
                                <div className="flex items-center">
                                    <CheckCircle2 className="mr-1.5 h-4 w-4 text-accent" />
                                    รับประกันงานซ่อม
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle2 className="mr-1.5 h-4 w-4 text-accent" />
                                    อะไหล่แท้/เทียบเกรด A
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. PAIN POINTS */}
            <section className="py-16 md:py-20 bg-surface border-b border-border">
                <div className="container px-4">
                    <SectionTitle subtitle="Common Problems" align="center">
                        รถของคุณมีอาการเหล่านี้อยู่ไหม?
                    </SectionTitle>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-xl bg-card p-6 shadow-sm border border-border/50 border-l-4 border-l-red-500">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500 font-bold">!</div>
                            <h3 className="text-xl font-bold mb-2 text-text">แอร์ไม่เย็น / มีแต่ลม</h3>
                            <p className="text-muted">ปัญหายอดฮิตรถ EV ระบบทำความเย็นรวน คอมแอร์เสียงดัง เราเช็คละเอียดด้วยเครื่องมือเฉพาะ</p>
                        </div>
                        <div className="rounded-xl bg-card p-6 shadow-sm border border-border/50 border-l-4 border-l-orange-500">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 font-bold">!</div>
                            <h3 className="text-xl font-bold mb-2 text-text">ช่วงล่างดัง / ย้วย</h3>
                            <p className="text-muted">ลูกหมากเสื่อม โช๊คอัพมีปัญหา ส่งผลต่อความปลอดภัยและการทรงตัว แก้ไขให้ขับนุ่มหนึบเหมือนใหม่</p>
                        </div>
                        <div className="rounded-xl bg-card p-6 shadow-sm border border-border/50 border-l-4 border-l-yellow-500">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500 font-bold">!</div>
                            <h3 className="text-xl font-bold mb-2 text-text">ระบบไฟแจ้งเตือน</h3>
                            <p className="text-muted">ไฟรูปเต่าโชว์ ชาร์จไม่เข้า หรือระบบแบตเตอรี่ 12V เสื่อมสภาพ วิเคราะห์โค้ดแม่นยำ</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. TRUST & PROCESS */}
            <section className="py-16 md:py-20 bg-bg">
                <div className="container px-4">
                    <div className="grid gap-12 md:grid-cols-2 items-center">
                        <div>
                            <SectionTitle subtitle="Why Choose Us" align="left">
                                ทำไมต้อง Pro EV Service?
                            </SectionTitle>
                            <div className="space-y-8">
                                <div className="flex">
                                    <div className="mr-6 flex-shrink-0">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface border border-border text-accent shadow-sm">
                                            <Wrench className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-text mb-2">เชี่ยวชาญระบบ HV Battery & Safety</h4>
                                        <p className="text-muted leading-relaxed">ช่างผ่านการอบรม Safety Level 3 สำหรับงานซ่อมระบบไฟแรงดันสูง 400V-800V เข้าใจโครงสร้างแบตเตอรี่และระบบ Inverter</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="mr-6 flex-shrink-0">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface border border-border text-accent shadow-sm">
                                            <ShieldCheck className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-text mb-2">วิเคราะห์ด้วย Diagnostic Tool ตรงรุ่น</h4>
                                        <p className="text-muted leading-relaxed">ใช้เครื่องสแกนอ่านค่าลึกถึงระดับ Cell Voltage และ Module Temp ไม่ใช่แค่ดูโค้ดพื้นฐาน ทำให้แก้ปัญหาได้ตรงจุด</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="mr-6 flex-shrink-0">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface border border-border text-accent shadow-sm">
                                            <Clock className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-text mb-2">ซ่อมไว รอรับได้ (งานด่วน)</h4>
                                        <p className="text-muted leading-relaxed">สำหรับงานตรวจเช็คทั่วไปและเปลี่ยนถ่ายของเหลว มีห้องรับรองสะดวกสบาย</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl bg-surface border border-border shadow-2xl">
                            {/* Placeholder Image */}
                            <Image
                                src="/images/service-diagnostics.jpg"
                                alt="Workshop Atmosphere"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SERVICE GROUPS */}
            <section className="py-16 md:py-20 bg-surface border-y border-border">
                <div className="container px-4">
                    <SectionTitle subtitle="Our Services" align="center">
                        บริการของเรา
                    </SectionTitle>
                    <div className="grid gap-6 md:grid-cols-3">
                        <ServiceCard
                            title="ระบบทำความเย็น EV"
                            image="/images/service-ac.jpg"
                            items={[
                                "ล้างแอร์ (แบบถอดตู้/ไม่ถอดตู้)",
                                "ซ่อมคอมเพรสเซอร์แอร์ไฟฟ้า",
                                "เปลี่ยนไส้กรอง HEPA PM2.5",
                                "เช็ครั่วระบบน้ำยาแอร์"
                            ]}
                        />
                        <ServiceCard
                            title="ช่วงล่าง & เบรค"
                            image="/images/service-suspension.jpg"
                            items={[
                                "เปลี่ยนบูชปีกนก / ลูกหมาก",
                                "เปลี่ยนโช๊คอัพ / สปริง",
                                "เจียรจานเบรค / เปลี่ยนผ้าเบรค",
                                "ตั้งศูนย์ล้อ 3D"
                            ]}
                        />
                        <ServiceCard
                            title="แบตเตอรี่ & ระบบไฟ"
                            image="/images/service-battery.jpg"
                            items={[
                                "เปลี่ยนแบตเตอรี่ 12V (GS/FB/Bosch)",
                                "ตรวจเช็คค่า SOH แบตเตอรี่ HV",
                                "แก้ไขระบบไฟชาร์จ (OBC)",
                                "สแกนโค้ดวิเคราะห์ปัญหา"
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* 5. REAL CASES */}
            <section className="py-16 md:py-20 bg-bg">
                <div className="container px-4">
                    <SectionTitle subtitle="Our Works" align="center">
                        ตัวอย่างเคสงานซ่อมจริง
                    </SectionTitle>
                    <div className="grid gap-6 md:grid-cols-3">
                        <CaseCard
                            title="Neta V รถขับไม่ได้ ขึ้นรูปเต่า ไม่ต้องเปลี่ยนแบตยกแพ็ก"
                            image="/images/neta_v_battery_repair.jpg"
                            problem="รถขับไม่ได้ ขึ้นรูปเต่า ระบบแจ้งเตือนแบตเตอรี่แรงดันสูง ขับต่อไม่ได้ เสี่ยงถูกประเมินเปลี่ยนแบตทั้งแพ็ก"
                            fix="ถอดตรวจเช็กแบตเตอรี่แรงดันสูงทั้งแพ็ก วิเคราะห์แรงดันทีละโมดูล พร้อมตรวจระบบควบคุม BCU/BMS พบว่ายังไม่เสียทั้งก้อน ซ่อมและแก้ไขเฉพาะจุด รถกลับมาใช้งานได้ปกติ ประหยัดค่าใช้จ่ายได้มาก"
                        />

                        <CaseCard
                            title="MG EP แอร์ไม่เย็น จากจุดอ่อนท่อแอร์ประจำรุ่น"
                            image="/images/mg_ep_ac_pipe.jpg"
                            problem="แอร์ไม่เย็น หรือเย็นบ้างไม่เย็นบ้าง เติมน้ำยาแล้วหายไม่นาน คอมแอร์ทำงานหนักผิดปกติ"
                            fix="ตรวจพบปัญหาท่อแอร์รั่วจากตำแหน่งและการสั่นสะเทือน แก้ไขโดยเปลี่ยนท่อแอร์แท้ศูนย์พาสใหม่ ฟลัชชิ่งระบบแอร์ และเปลี่ยนน้ำมันคอมเพรสเซอร์ใหม่ ลดความเสี่ยงเสียซ้ำและปัญหาระบบไฟแรงดันสูง"
                        />

                        <CaseCard
                            title="Neta V ชาร์จ AC ไม่เข้า พร้อมอาการแอร์ไม่เย็น"
                            image="/images/neta_v_cdu_repair.jpg"
                            problem="รถชาร์จไฟ AC ไม่เข้า แอร์เป่าลมออกมาแต่ไม่เย็น ระบบทำงานผิดปกติพร้อมกัน"
                            fix="ทีมช่างตรวจเช็กระบบไฟและระบบปรับอากาศ พบความผิดปกติที่ชุด CDU ทำการซ่อมและทดสอบใหม่ทั้งระบบ หลังซ่อมชาร์จ AC ได้ปกติ และแอร์กลับมาเย็นตามสเปก"
                        />
                    </div>
                    <div className="mt-12 text-center">
                        <a
                            href="https://www.facebook.com/proevservice"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleConversion("facebook_chat", "cases_cta")}
                            className="inline-flex items-center gap-2 rounded-full border border-[#0084FF] px-6 py-3 font-bold text-text hover:bg-surface hover:border-accent transition-colors"
                        >
                            <MessageCircle className="h-5 w-5 text-[#0084FF]" />
                            ดูผลงานเพิ่มเติมบน Facebook
                        </a>
                    </div>
                </div>
            </section>

            {/* 6. SERVICE AREA & FINAL CTA */}
            <section className="py-20 bg-card text-text border-t border-border">
                <div className="container px-4 text-center">
                    <h2 className="mb-6 text-3xl font-extrabold md:text-5xl">พร้อมจบปัญหารถ EV ของคุณวันนี้</h2>
                    <p className="mb-10 text-muted max-w-2xl mx-auto text-lg">
                        เรารับประกันความพึงพอใจ ปรึกษาอาการเสียได้ฟรี ไม่ซ่อมไม่ว่ากัน
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-16">
                        <a
                            href={LINKS.FB_MESSENGER}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleConversion("facebook_chat", "final_cta")}
                            className="group w-full sm:w-auto flex h-14 items-center justify-center rounded-full bg-[#0084FF] px-8 text-lg font-bold text-white hover:bg-[#0073e6] shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                            <MessageCircle className="mr-2 h-6 w-6" />
                            ทักแชทจองคิว
                        </a>
                        <a
                            href={LINKS.LINE}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleConversion("line_chat", "final_cta")}
                            className="w-full sm:w-auto flex h-14 items-center justify-center rounded-full bg-[#06C755] px-8 text-lg font-bold text-white hover:bg-[#05b34c] shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded bg-white text-[10px] text-[#06C755] font-black">L</div>
                            ทักไลน์
                        </a>
                    </div>

                    <div className="rounded-3xl bg-surface border border-border p-8 text-left md:flex md:items-center md:justify-between shadow-sm">
                        <div className="mb-6 md:mb-0">
                            <h3 className="mb-2 text-xl font-bold flex items-center text-text">
                                <MapPin className="mr-2 h-6 w-6 text-red-500" />
                                Pro EV Service อู่ซ่อมรถไฟฟ้า ปากเกร็ด
                            </h3>
                            <p className="text-muted text-lg">
                                เมเจอร์ ฮอลลีวู้ด ตำบลปากเกร็ด อำเภอปากเกร็ด นนทบุรี 11120 <br />
                                (แยกปากเกร็ด)
                            </p>
                        </div>
                        <a
                            href="https://maps.app.goo.gl/h21RDsTBUFH5fH9z7"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleConversion("navigation", "footer_map")}
                            className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-8 py-4 font-bold text-text hover:bg-surface hover:border-text transition-colors"
                        >
                            ดูแผนที่ร้าน
                        </a>
                    </div>
                </div>
            </section>

            {/* 7. MOBILE STICKY BAR */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-50 transform border-t border-border bg-surface pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 md:hidden ${showStickyBar ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                <div className="grid h-16 grid-cols-3">
                    <a
                        href={LINKS.FB_MESSENGER}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleConversion("facebook_chat", "sticky_bar")}
                        className="flex flex-col items-center justify-center border-r border-border hover:bg-bg active:bg-blue-50/50"
                    >
                        <MessageCircle className="mb-1 h-6 w-6 text-[#0084FF]" />
                        <span className="text-xs font-bold text-muted">แชท FB</span>
                    </a>
                    <a
                        href={LINKS.LINE}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleConversion("line_chat", "sticky_bar")}
                        className="flex flex-col items-center justify-center border-r border-border hover:bg-bg active:bg-green-50/50"
                    >
                        <div className="mb-1 flex h-6 w-6 items-center justify-center rounded bg-[#06C755] text-white shadow-sm">
                            <span className="text-[10px] font-black">L</span>
                        </div>
                        <span className="text-xs font-bold text-muted">ไลน์</span>
                    </a>
                    <a
                        href={`tel:${LINKS.PHONE}`}
                        onClick={() => handleConversion("phone_call", "sticky_bar")}
                        className="flex flex-col items-center justify-center hover:bg-bg active:bg-gray-100/50"
                    >
                        <Phone className="mb-1 h-6 w-6 text-text" />
                        <span className="text-xs font-bold text-muted">โทรเลย</span>
                    </a>
                </div>
            </div>

            <style jsx global>{`
                .pb-safe {
                    padding-bottom: env(safe-area-inset-bottom);
                }
            `}</style>
        </div>
    );
}
