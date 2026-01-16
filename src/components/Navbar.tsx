import { getSettings } from "@/lib/site";
import { NavbarClient } from "@/components/NavbarClient";

export function Navbar() {
    const settings = getSettings();
    const navItems = [
        ["หน้าแรก", "/"],
        ["บริการของเรา", "/services"],
        ["ขั้นตอนจองคิว", "/booking"],
        ["ติดต่อเรา", "/contact"],
        ["บทความ", "/blog"],
    ];

    return <NavbarClient settings={settings} navItems={navItems} />;
}
