import {DesignContact} from "@/components/designs/DesignPages";
import {Schema} from "@/components/WebsiteV3";
import {pageMetadata,webPageSchema} from "@/lib/seo";
const title="ติดต่อ Pro EV Service ปากเกร็ด | โทร LINE และแผนที่",description="ติดต่ออู่ Pro EV Service ปากเกร็ด โทร 098-9794116 นัดหมายผ่าน LINE หรือ Facebook พร้อมแผนที่และเวลาทำการ";
export const metadata=pageMetadata(title,description,"/contact");
export default function Contact(){return <><Schema data={webPageSchema(title,description,"/contact","ContactPage")}/><DesignContact/></>}
