import {Schema} from "@/components/WebsiteV3";
import DesignHome from "@/components/designs/DesignHome";
import {pageMetadata,webPageSchema} from "@/lib/seo";
const title="อู่ซ่อมรถไฟฟ้า ปากเกร็ด นนทบุรี | Pro EV Service";
const description="ตรวจวิเคราะห์และซ่อมรถไฟฟ้า แอร์ EV แบตเตอรี่ BCU/BMS ระบบชาร์จ ระบบไฟ และช่วงล่าง พร้อมผลงานซ่อมจริง โทร 098-9794116";
export const metadata=pageMetadata(title,description,"/");
export default function Home(){return <><Schema data={webPageSchema(title,description,"/")}/><DesignHome id="1"/></>}
