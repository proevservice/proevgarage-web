import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
//import { CtaBar } from "@/components/CtaBar";
import { getSettings } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/GoogleTagManager";

const prompt = Prompt({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["thai", "latin"],
    variable: "--font-prompt",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Pro EV Service ซ่อมรถไฟฟ้า Neta BYD MG - แอร์ แบตเตอรี่ ช่วงล่าง (ปากเกร็ด)",
    description: "ศูนย์ซ่อมรถไฟฟ้าครบวงจร ปากเกร็ด นนทบุรี. เชี่ยวชาญระบบแอร์ EV แบตเตอรี่ High Voltage ระบบไฟโชว์ ช่วงล่าง. ซ่อมโดยช่างเทคนิคเฉพาะทาง เครื่องมือวิเคราะห์ตรงรุ่น. โทร 098-979-4116",
    keywords: ["ซ่อมรถไฟฟ้า", "อู่ซ่อม EV", "ซ่อมแอร์รถไฟฟ้า", "ซ่อมแบตเตอรี่ EV", "Neta V", "BYD Atto 3", "MG ZS EV", "ปากเกร็ด", "นนทบุรี"],
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        type: "website",
        locale: "th_TH",
        url: "https://proevgarage.com",
        title: "Pro EV Service ซ่อมรถไฟฟ้า ปากเกร็ด - แอร์ แบต ช่วงล่าง",
        description: "จบทุกปัญหารถไฟฟ้า แอร์ไม่เย็น แบตเตอรี่มีปัญหา ช่วงล่างดัง. วิเคราะห์ตรงจุดด้วยเครื่องมือมาตรฐาน. รับประกันงานซ่อม.",
        siteName: "Pro EV Service",
        images: ["/images/hero-garage.jpg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const settings = getSettings();

    return (
        <html lang="th" className={`${prompt.variable} dark`}>
            <head>
                <GoogleTagManager />
                <JsonLd settings={settings} />
            </head>
            <body className="flex min-h-screen flex-col font-sans antialiased text-text bg-bg">
                <GoogleTagManagerNoScript />
                <Navbar />
                <main className="flex-1 w-full">
                    {children}
                </main>
                <Footer />
                {/* <CtaBar
          fbLink={settings.facebook}
          messengerLink={settings.messenger}
          lineLink={settings.line}
          phone={settings.phone}
        /> */}
            </body>
        </html>
    );
}
