import { getSettings } from "@/lib/site";
import { MessageCircle, CheckCircle, Shield, Award, Wrench, ArrowRight, Clock, Battery, Zap, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import * as LucideIcons from "lucide-react";

export default function Home() {
    const settings = getSettings();
    const servicesList = require("@/lib/site").getAllLegacyServices();

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "AutoRepair",
                "@id": "https://proevgarage.com/#organization",
                "name": settings.brand_name,
                "url": "https://proevgarage.com",
                "logo": "https://proevgarage.com/logo.png",
                "image": "https://proevgarage.com/uploads/cover.jpg",
                "description": "อู่ซ่อมรถไฟฟ้า Pro EV Service ปากเกร็ด บริการซ่อมช่วงล่าง แอร์ แบตเตอรี่รถ EV ทุกรุ่น",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": settings.address,
                    "addressLocality": "Pak Kret",
                    "addressRegion": "Nonthaburi",
                    "postalCode": "11120",
                    "addressCountry": "TH"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 13.9130,
                    "longitude": 100.5020
                },
                "telephone": settings.phone,
                "priceRange": "$$",
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        "opens": "09:00",
                        "closes": "19:00"
                    }
                ],
                "review": [
                    {
                        "@type": "Review",
                        "author": { "@type": "Person", "name": "คุณวิชัย" },
                        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                        "reviewBody": "บริการดีมากครับ วิเคราะห์อาการตรงจุด ซ่อมจบไว ราคาเป็นกันเอง แนะนำเลยครับสำหรับคนใช้ EV"
                    },
                    {
                        "@type": "Review",
                        "author": { "@type": "Person", "name": "คุณอารดา" },
                        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                        "reviewBody": "ช่างมีความรู้จริง อธิบายละเอียดมาก รถมีปัญหาเรื่องระบบไฟ เข้ามาที่นี่วันเดียวหาย ประทับใจมากค่ะ"
                    },
                    {
                        "@type": "Review",
                        "author": { "@type": "Person", "name": "คุณสมชาย" },
                        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                        "reviewBody": "หาอู่ซ่อมรถไฟฟ้ายากมาก มาเจอที่นี่อุ่นใจเลยครับ เครื่องมือครบ ทีมงานมืออาชีพ"
                    }
                ],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "บริการหลัก",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "วิเคราะห์ระบบไฟ EV",
                                "description": "ไล่วงจร/กล่องควบคุม/อาการเตือน ด้วยเครื่องมือเฉพาะทาง"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "ซ่อมแบตเตอรี่ & BCU/BMS",
                                "description": "ตรวจเช็ค-ซ่อม-รีแฟร์ พร้อมแจ้งแนวทางก่อนทำ"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "ซ่อมแอร์ EV",
                                "description": "แก้ปัญหาแอร์ไม่เย็น เสียงดัง ระบบระบายความร้อนแบตเตอรี่"
                            }
                        }
                    ]
                }
            },
            {
                "@type": "WebPage",
                "@id": "https://proevgarage.com/#webpage",
                "url": "https://proevgarage.com",
                "name": "Pro EV Service - อู่ซ่อมรถไฟฟ้า ปากเกร็ด",
                "isPartOf": { "@id": "https://proevgarage.com/#website" },
                "about": { "@id": "https://proevgarage.com/#organization" },
                "primaryImageOfPage": { "@id": "https://proevgarage.com/#primaryimage" },
                "image": {
                    "@id": "https://proevgarage.com/#primaryimage",
                    "@type": "ImageObject",
                    "url": "https://proevgarage.com/images/hero-bg-2.jpg",
                    "width": 1200,
                    "height": 630
                }
            }
        ]
    };

    return (
        <div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* 
        PREMIUM HERO SECTION - FULL WIDTH V3
        - No top spacing (pt-0)
        - Full Height (min-h-[90vh])
        - Left Aligned
        - Branding Colors strict (Pro=White, EV=Green, Service=White+Outline)
        - Thai Text = All Green
      */}
            <section id="hero" aria-label="Hero Section" className="relative w-full flex min-h-[90vh] md:min-h-screen items-start md:items-center overflow-hidden bg-bg border-b border-border pt-20 md:pt-0">
                {/* Background Image - Full Bleed */}
                <div className="absolute inset-0 z-0 select-none">
                    <Image
                        src="/images/hero-bg-2.jpg"
                        alt="Pro EV Service Garage Atmosphere"
                        fill
                        priority
                        fetchPriority="high"
                        className="object-cover object-center opacity-30"
                        sizes="100vw"
                    />
                    {/* Dark Overlay (Gradient) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent"></div>
                </div>

                <div className="container relative z-10 px-4">
                    <div className="max-w-4xl">

                        {/* HEADLINE */}
                        <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl leading-[1.1]">
                            <span className="font-outline-2 text-transparent">Pro </span>
                            <span className="text-accent">EV </span>
                            <span className="text-white">Service</span>
                        </h1>

                        <h2 className="mb-6 text-2xl font-extrabold text-white md:text-accent sm:text-5xl lg:text-5xl md:mb-8">
                            อู่ซ่อมรถไฟฟ้า ปากเกร็ด
                        </h2>

                        {/* Bullet Points - Refined for Desktop */}
                        <ul className="mb-8 space-y-2 text-base text-muted md:text-xl font-light leading-snug max-w-3xl md:mb-12 md:space-y-4">
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgba(34,197,94,0.8)] md:mt-2.5 md:h-2 md:w-2" />
                                <span>ดูแลรถยนต์ไฟฟ้าด้วยมาตรฐานงานเฉพาะทาง</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgba(34,197,94,0.8)] md:mt-2.5 md:h-2 md:w-2" />
                                <span>ตรวจ วิเคราะห์ และซ่อมอย่างเป็นระบบ ด้วยเครื่องมือเฉพาะทาง</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgba(34,197,94,0.8)] md:mt-2.5 md:h-2 md:w-2" />
                                <span>มั่นใจได้ว่ารถคุณถูกดูแลอย่างถูกต้อง</span>
                            </li>
                        </ul>

                        {/* CTA Buttons - Unified Row */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-10 md:gap-4 md:mb-12">
                            {/* Facebook - Order 3 on Mobile, Default on Desktop */}
                            <Link
                                href={settings.messenger}
                                target="_blank"
                                className="order-1 sm:order-none group flex items-center justify-center gap-3 rounded-full bg-[#0084FF]/10 border border-[#0084FF]/70 px-6 py-3 text-base font-bold text-white shadow-lg transition-all hover:bg-[#0073e6] hover:border-transparent hover:scale-105 active:scale-95 sm:bg-[#0084FF] sm:border-none md:text-lg md:px-8 md:py-4"
                            >
                                <MessageCircle className="h-5 w-5 fill-current md:h-6 md:w-6" /> แชท Facebook
                            </Link>

                            {/* LINE OA - Order 1 on Mobile, Default on Desktop (Primary) */}
                            <Link
                                href={settings.line}
                                target="_blank"
                                className="order-2 sm:order-none group flex items-center justify-center gap-3 rounded-full bg-[#06C755]/70 px-6 py-3 text-base font-bold text-white shadow-[0_0_20px_rgba(6,199,85,0.3)] transition-all hover:bg-[#05b64d] hover:scale-105 active:scale-95 md:text-lg md:px-8 md:py-4"
                            >
                                {/* Simple L icon */}
                                <span className="flex h-5 w-5 items-center justify-center rounded bg-white text-[10px] font-black text-[#06C755] md:h-6 md:w-6">L</span>
                                แอด LINE OA
                            </Link>

                            {/* Phone - Order 2 on Mobile, Default on Desktop */}
                            <Link
                                href={`tel:${settings.phone}`}
                                className="order-3 sm:order-none flex items-center justify-center gap-3 rounded-full border border-border bg-white/5 px-6 py-3 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-accent hover:scale-105 active:scale-95 md:text-lg md:px-8 md:py-4"
                            >
                                <Phone className="h-5 w-5" /> โทร 098-9794116
                            </Link>
                        </div>

                        {/* Operating Info (Pills) */}
                        <div className="flex flex-col sm:flex-row gap-4 text-sm font-medium mb-8 md:mb-0 pb-[env(safe-area-inset-bottom)]">
                            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 py-2.5 backdrop-blur-md text-gray-300">
                                <Clock className="h-4 w-4 text-accent" />
                                <span>เปิดทุกวัน : 09:00 - 19:00 </span>
                                <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></div>
                                <span className="text-white/60">(ยกเว้นวันพุธ)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOP SERVICES (MOBILE FIRST) - Already hidden on desktop, so full dark mode */}
            {/* TOP SERVICES (MOBILE FIRST) - Strict Dark Mode */}
            <section id="top-services" aria-label="Primary Services" className="bg-bg py-16 md:hidden">
                <div className="container px-4">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-extrabold text-text">บริการหลักของเรา</h2>
                        <div className="mt-3 h-1 w-16 bg-accent mx-auto rounded-full"></div>
                    </div>
                    <div className="grid gap-4">
                        {[
                            { title: "วิเคราะห์ระบบไฟ EV", desc: "ไล่วงจร/กล่องควบคุม/อาการเตือน ด้วยเครื่องมือเฉพาะทาง", icon: Zap },
                            { title: "ซ่อมแบตเตอรี่ & BCU/BMS", desc: "ตรวจเช็ค-ซ่อม-รีแฟร์ พร้อมแจ้งแนวทางก่อนทำ", icon: Battery },
                            { title: "ซ่อมแอร์ EV", desc: "แอร์ไม่เย็น/เสียงดัง/ระบบระบายความร้อนแบตฯ", icon: LucideIcons.ThermometerSnowflake || LucideIcons.Fan },
                        ].map((item, i) => (
                            <Link href="/services" key={i} className="flex items-start gap-4 rounded-xl bg-card p-5 shadow-lg border border-border active:scale-[0.98] transition-transform">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-accent border border-border">
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-text mb-1">{item.title}</h3>
                                    <p className="text-sm text-muted leading-snug">{item.desc}</p>
                                    <div className="mt-3 flex items-center text-xs font-bold text-accent">
                                        ดูรายละเอียด <ArrowRight className="ml-1 h-3 w-3" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* TRUST BAR */}
            {/* TRUST BAR */}
            {/* TRUST BAR */}
            <section id="trust" aria-label="Trust Indicators" className="border-b border-border bg-bg py-16">
                <div className="container px-4">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { icon: Clock, title: "รวดเร็ว ทันใจ", desc: "วิเคราะห์อาการแม่นยำ แจ้งจบงานไว" },
                            { icon: Wrench, title: "เครื่องมือเฉพาะทาง", desc: "Diagnostic Tool ตรงรุ่น EV 100%" },
                            { icon: Shield, title: "ปลอดภัยสูงสุด", desc: "มาตรฐาน Safety HV System (High Voltage)" },
                            { icon: CheckCircle, title: "รับประกันงานซ่อม", desc: "มั่นใจได้ในคุณภาพงานบริการของเรา" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-card border border-border text-accent">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-text">{item.title}</h3>
                                    <p className="text-sm text-muted">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED SERVICES (6 ITEMS) */}
            {/* FEATURED SERVICES (6 ITEMS) */}
            {/* FEATURED SERVICES (6 ITEMS) */}
            <section id="all-services" aria-label="Service Catalog" className="bg-surface py-20">
                <div className="container px-4">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-extrabold text-text md:text-4xl text-shadow-sm">บริการยอดนิยม</h2>
                        <div className="mt-4 h-1.5 w-20 bg-accent mx-auto rounded-full"></div>
                        <p className="mt-4 text-muted">ดูแลรถยนต์ไฟฟ้าของคุณแบบครบวงจร</p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {servicesList.slice(0, 6).map((service: any, idx: number) => {
                            const Icon = (LucideIcons as any)[service.icon] || LucideIcons.Wrench;
                            return (
                                <Link href="/services" key={idx} className="group flex flex-col rounded-2xl bg-card p-6 border border-border shadow-lg transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-accent/10 h-full">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-surface border border-border text-accent transition-colors group-hover:bg-accent group-hover:text-white group-hover:border-transparent">
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-text group-hover:text-accent transition-colors">{service.title}</h3>
                                    <p className="line-clamp-2 text-sm text-muted flex-1">{service.description}</p>
                                    <div className="mt-4 flex items-center text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                                        ดูรายละเอียด <ArrowRight className="ml-1 h-4 w-4" />
                                    </div>
                                </Link>
                            )
                        })}
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/services" className="btn-outline border-border text-text hover:bg-accent hover:text-white hover:border-transparent">
                            ดูบริการทั้งหมด <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* PROCESS STEPS */}
            {/* PROCESS STEPS */}
            {/* PROCESS STEPS */}
            <section id="process" aria-label="Service Process" className="bg-bg py-20 overflow-hidden">
                <div className="container px-4">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-extrabold text-text md:text-4xl">ขั้นตอนการให้บริการ</h2>
                        <div className="mt-4 h-1.5 w-20 bg-accent mx-auto rounded-full"></div>
                        <p className="mt-4 text-muted">ขั้นตอนมาตรฐานระดับศูนย์บริการ</p>
                    </div>

                    <div className="relative grid gap-12 md:gap-8 md:grid-cols-4">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-border -z-10" />

                        {[
                            { step: "01", title: "นัดหมาย/จองคิว", desc: "ทักแชทหรือโทรจองคิวล่วงหน้า" },
                            { step: "02", title: "นำรถเข้าตรวจ", desc: "นำรถเข้ามาเช็คอาการที่อู่" },
                            { step: "03", title: "เสนอราคา/ซ่อม", desc: "แจ้งค่าใช้จ่ายก่อนเริ่มงาน" },
                            { step: "04", title: "รับรถ/ชำระเงิน", desc: "ตรวจสอบความเรียบร้อยและรับรถ" },
                        ].map((item, i) => (
                            <div key={i} className="relative flex flex-col items-center text-center bg-transparent">
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-card border-2 border-accent text-2xl font-bold text-accent shadow-lg shadow-accent/20 ring-8 ring-bg">
                                    {item.step}
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-text">{item.title}</h3>
                                <p className="text-sm text-muted max-w-[200px]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SUPPORTED MODELS */}
            <section id="models" aria-label="Supported Vehicles" className="bg-brand-black py-20 text-white relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none" />
                <div className="container px-4 text-center relative z-10">
                    <h2 className="mb-10 text-3xl font-bold">รุ่นรถที่เรารับซ่อมประจำ</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {settings.models?.map((model: string) => (
                            <span key={model} className="cursor-default rounded-full border border-white/10 bg-white/5 px-6 py-3 text-lg font-medium transition-all hover:border-brand-green hover:bg-brand-green hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-brand-green/20">
                                {model}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            {/* TESTIMONIALS */}
            <section id="reviews" aria-label="Customer Reviews" className="bg-brand-dark py-20">
                <div className="container px-4">
                    <div className="mb-14 text-center">
                        <h2 className="text-3xl font-extrabold text-brand-text md:text-4xl">เสียงจากลูกค้า</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            { text: "บริการดีมากครับ วิเคราะห์อาการตรงจุด ซ่อมจบไว ราคาเป็นกันเอง แนะนำเลยครับสำหรับคนใช้ EV", name: "คุณวิชัย", car: "NETA V" },
                            { text: "ช่างมีความรู้จริง อธิบายละเอียดมาก รถมีปัญหาเรื่องระบบไฟ เข้ามาที่นี่วันเดียวหาย ประทับใจมากค่ะ", name: "คุณอารดา", car: "ORA Good Cat" },
                            { text: "หาอู่ซ่อมรถไฟฟ้ายากมาก มาเจอที่นี่อุ่นใจเลยครับ เครื่องมือครบ ทีมงานมืออาชีพ", name: "คุณสมชาย", car: "BYD Atto 3" },
                        ].map((review, i) => (
                            <div key={i} className="flex flex-col justify-between rounded-3xl bg-brand-card p-8 border border-brand-border shadow-lg transition-shadow hover:shadow-xl h-full">
                                <div>
                                    <div className="mb-6 flex text-yellow-500">
                                        {[...Array(5)].map((_, stars) => (
                                            <LucideIcons.Star key={stars} className="h-4 w-4 fill-yellow-500 stroke-yellow-500" />
                                        ))}
                                    </div>
                                    <p className="mb-6 text-brand-muted leading-relaxed font-light">"{review.text}"</p>
                                </div>
                                <div className="mt-auto flex items-center gap-4 pt-6 border-t border-brand-border">
                                    <div className="h-10 w-10 rounded-full bg-brand-black border border-brand-border flex items-center justify-center text-brand-green font-bold">
                                        {review.name[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-brand-text text-sm">{review.name}</div>
                                        <div className="text-xs text-brand-green font-medium">{review.car}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICE AREA TEASER & FINAL CTA */}
            {/* SERVICE AREA TEASER & FINAL CTA */}
            <section id="location" aria-label="Location and Contact" className="bg-brand-black py-20">
                <div className="container px-4">
                    <div className="overflow-hidden rounded-[2.5rem] bg-brand-card shadow-2xl ring-1 ring-brand-border md:grid md:grid-cols-2">
                        <div className="flex flex-col justify-center p-12 lg:p-16">

                            <h2 className="mb-6 text-3xl font-extrabold text-brand-text leading-tight">พร้อมดูแลรถ EV ของคุณ<br /><span className="text-brand-green">มาตรฐานมืออาชีพ</span></h2>
                            <p className="mb-8 text-brand-muted text-lg">เราตั้งอยู่ย่านแจ้งวัฒนะ-ปากเกร็ด เดินทางสะดวก เครื่องมือครบครัน พร้อมทีมช่างผู้เชี่ยวชาญ</p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/contact" className="btn-primary">
                                    ติดต่อเรา
                                </Link>
                                <Link href="/booking" className="btn-outline border-brand-border text-brand-text hover:border-brand-green">
                                    จองคิวทันที
                                </Link>
                            </div>
                        </div>
                        <div className="relative h-80 md:h-auto bg-brand-dark">
                            <iframe
                                src="https://www.google.com/maps?cid=12415469945169781142&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 h-full w-full"
                            ></iframe>
                            {/* Overlay Badge */}
                            <div className="absolute bottom-6 right-6 bg-brand-black/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg text-xs font-bold text-brand-text border border-brand-border">
                                📍 ปากเกร็ด, นนทบุรี
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div >
    );
}
