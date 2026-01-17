import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
//import { CtaBar } from "@/components/CtaBar";
import { getSettings } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

const prompt = Prompt({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["thai", "latin"],
    variable: "--font-prompt",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Pro EV Service อู่ซ่อมรถไฟฟ้า ปากเกร็ด | ซ่อมแอร์ ช่วงล่าง แบตเตอรี่",
    description: "อู่เฉพาะทางรถยนต์ไฟฟ้า Pro EV Service ปากเกร็ด นนทบุรี บริการตรวจเช็กระบบไฟ ซ่อมแอร์ ช่วงล่าง เปลี่ยนแบตเตอรี่ 12V จองคิวผ่านแชทได้เลย",
    openGraph: {
        type: "website",
        locale: "th_TH",
        url: "https://proevgarage.com",
        title: "Pro EV Service อู่ซ่อมรถไฟฟ้า ปากเกร็ด",
        description: "เช็คอาการรถไฟฟ้าฟรี ปรึกษาช่างผู้เชี่ยวชาญ",
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
            <body className="flex min-h-screen flex-col font-sans antialiased text-text bg-bg">
                <Navbar />
                <main className="flex-1 w-full">
                    {children}
                </main>
                <Footer />
                {/*} <CtaBar
                    fbLink={settings.facebook}
                    messengerLink={settings.messenger}
                    lineLink={settings.line}
                    phone={settings.phone}
                />*/}
                <JsonLd settings={settings} />
            </body>
        </html>
    );
}
