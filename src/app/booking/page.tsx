import type { Metadata } from "next";
import { DesignBooking } from "@/components/designs/DesignPages";
export const metadata:Metadata={title:"นัดหมายเข้าตรวจรถไฟฟ้า | Pro EV Service",description:"แจ้งรุ่นรถและอาการ นัดหมายเข้าตรวจผ่านโทร LINE หรือ Facebook กับ Pro EV Service ปากเกร็ด",alternates:{canonical:"https://www.proevgarage.com/booking"}};
export default function Booking(){return <DesignBooking/>}
