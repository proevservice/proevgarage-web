import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import SiteFrame from "@/components/SiteFrame";
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
    metadataBase: new URL("https://www.proevgarage.com"),
    title: "Pro EV Service ซ่อมรถไฟฟ้า Neta BYD MG - แอร์ แบตเตอรี่ ช่วงล่าง (ปากเกร็ด)",
    description: "อู่ซ่อมรถไฟฟ้า ปากเกร็ด นนทบุรี ตรวจระบบแอร์ แบตเตอรี่ BCU/BMS ระบบชาร์จ ระบบไฟ และช่วงล่าง พร้อมผลงานซ่อมจริงและข้อมูลนัดหมาย โทร 098-9794116",
    keywords: ["ซ่อมรถไฟฟ้า", "อู่ซ่อม EV", "ซ่อมแอร์รถไฟฟ้า", "ซ่อมแบตเตอรี่ EV", "Neta V", "BYD Atto 3", "MG ZS EV", "ปากเกร็ด", "นนทบุรี"],
    robots: {
        index: process.env.VERCEL_ENV !== "preview",
        follow: process.env.VERCEL_ENV !== "preview",
    },
    openGraph: {
        type: "website",
        locale: "th_TH",
        url: "https://www.proevgarage.com",
        title: "Pro EV Service ซ่อมรถไฟฟ้า ปากเกร็ด - แอร์ แบต ช่วงล่าง",
        description: "ตรวจวิเคราะห์และซ่อมรถไฟฟ้า แอร์ แบตเตอรี่ ระบบชาร์จ ระบบไฟ และช่วงล่าง ดูผลงานจริงและนัดหมายเข้าตรวจที่ Pro EV Service ปากเกร็ด",
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
                <SiteFrame settings={settings} legacyHeader={<Navbar />} legacyFooter={<Footer />}>
                    {children}
                </SiteFrame>
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
