import type { Metadata } from "next";
import {webPageSchema,pageMetadata} from "@/lib/seo";
import { notFound } from "next/navigation";
import { vehicles,SITE_URL } from "@/lib/website-v3";
import { PageHeader,Schema,ServiceCards,RelatedWork,ContactCta,MobileContact } from "@/components/WebsiteV3";
import s from "@/components/v3.module.css";
export function generateStaticParams(){return vehicles.map(i=>({slug:i.slug}));}
export function generateMetadata({params}:{params:{slug:string}}):Metadata{const item=vehicles.find(i=>i.slug===params.slug);return item?pageMetadata("บริการซ่อม "+item.name+" ปากเกร็ด | Pro EV Service","ดูบริการและผลงานซ่อม "+item.models.join(", ")+" พร้อมเตรียมข้อมูลก่อนนัดหมายเข้าตรวจ","/vehicles/"+item.slug):{};}
export default function Vehicle({params}:{params:{slug:string}}){const item=vehicles.find(i=>i.slug===params.slug);if(!item)notFound();return <div className={s.page}><div className={s.wrap}><Schema data={webPageSchema("บริการสำหรับ "+item.name,"แจ้งรุ่นย่อย ปีรถ และอาการเพื่อตรวจสอบขอบเขตงาน","/vehicles/"+item.slug)}/><PageHeader title={"ดูแลรถ "+item.name+" ของคุณ"} description={"บริการสำหรับ "+item.models.join(" · ")+" — แจ้งรุ่นย่อย ปีรถ และอาการ เพื่อให้ทีมงานตรวจสอบขอบเขตงานและอะไหล่ก่อนนัดหมาย"} items={[{label:"ยี่ห้อรถ",href:"/vehicles"},{label:item.name}]}/><section className={s.section}><h2>บริการที่สอบถามได้</h2><p className={s.muted} style={{marginBottom:24}}>รายการที่รับดำเนินการขึ้นอยู่กับรุ่นรถ อาการ และผลตรวจ ไม่ใช่ทุกรายการจะใช้กับรถทุกรุ่น</p><ServiceCards/></section><RelatedWork keywords={item.keywords}/><ContactCta/></div><MobileContact/></div>}
