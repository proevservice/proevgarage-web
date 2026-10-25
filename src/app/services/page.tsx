import type { Metadata } from "next";
import Link from "next/link";
import { services,problems,vehicles,SITE_URL } from "@/lib/website-v3";
import { ServiceCards, PageHeader, VehicleLinks, ContactCta, MobileContact } from "@/components/WebsiteV3";
import ServiceSearch from "@/components/ServiceSearch";
import s from "@/components/v3.module.css";
export const metadata:Metadata={title:"บริการซ่อมรถไฟฟ้า แอร์ แบตเตอรี่ ระบบชาร์จ | Pro EV Service",description:"เลือกบริการซ่อม EV ตามอาการและรุ่นรถ พร้อมรายละเอียดการตรวจและผลงานจริง",alternates:{canonical:SITE_URL+"/services"}};
export default function Services(){const items=[...services.map(i=>({title:i.title,href:"/services/"+i.slug,type:"บริการ",keywords:i.short+" "+i.keywords.join(" ")})),...problems.map(i=>({title:i.title,href:"/problems/"+i.slug,type:"อาการ",keywords:i.intro})),...vehicles.map(i=>({title:i.name,href:"/vehicles/"+i.slug,type:"ยี่ห้อรถ",keywords:i.models.join(" ")}))];return <div className={s.page}><div className={s.wrap}><PageHeader title="บริการที่เหมาะกับรถของคุณ" description="ค้นหาจากบริการ อาการ หรือยี่ห้อรถ เพื่อดูรายละเอียดก่อนนัดหมายเข้าตรวจ" items={[{label:"บริการ"}]}/><ServiceSearch items={items}/><section className={s.section}><ServiceCards/></section><section className={s.section}><h2>เริ่มจากอาการที่พบ</h2><div className={s.problemGrid}>{problems.map(p=><Link className={s.problem} href={"/problems/"+p.slug} key={p.slug}>{p.title}<span>↗</span></Link>)}</div></section><section className={s.section}><h2>เลือกตามยี่ห้อรถ</h2><VehicleLinks/></section><ContactCta/></div><MobileContact/></div>}
