import { getSettings } from "@/lib/site";
import { NavbarClient } from "@/components/NavbarClient";

export function Navbar() {
    const settings = getSettings();
    const navItems = [
        ["หน้าแรก", "/"],
        ["บริการของเรา", "/services"],
        ["ผลงาน", "/work"],
        ["อาการเสีย", "/problems"],
        ["ติดต่อเรา", "/contact"],
        ["บทความ", "/blog"],
    ];

    return <NavbarClient settings={settings} navItems={navItems} />;
}
