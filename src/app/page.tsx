import type { Metadata } from "next";
import DesignHome from "@/components/designs/DesignHome";
export const metadata:Metadata={
 title:"อู่ซ่อมรถไฟฟ้า ปากเกร็ด นนทบุรี | Pro EV Service",
 description:"ตรวจวิเคราะห์และซ่อมรถไฟฟ้า แอร์ EV แบตเตอรี่ BCU/BMS ระบบชาร์จ ระบบไฟ และช่วงล่าง พร้อมผลงานซ่อมจริง โทร 098-9794116",
 alternates:{canonical:"https://www.proevgarage.com"},
 openGraph:{title:"Pro EV Service | อู่ซ่อมรถไฟฟ้า ปากเกร็ด",description:"ดูบริการและผลงานซ่อมจริง ก่อนนัดหมายเข้าตรวจ",url:"https://www.proevgarage.com",images:["/images/service-diagnostics.jpg"]}
};
export default function Home(){return <DesignHome id="1"/>}
