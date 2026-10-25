import type { Metadata } from "next";
import { DesignBlogIndex } from "@/components/designs/DesignPages";
export const metadata:Metadata={title:"บทความดูแลรถไฟฟ้า | Pro EV Service",description:"ข้อมูลการดูแลรถไฟฟ้าและอาการที่ควรรู้ก่อนเข้ารับบริการ",alternates:{canonical:"https://www.proevgarage.com/blog"}};
export default function Blog(){return <DesignBlogIndex/>}
