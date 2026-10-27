import type { Metadata } from "next";
import Link from "next/link";
import { vehicles,SITE_URL } from "@/lib/website-v3";
import { PageHeader,ContactCta,MobileContact } from "@/components/WebsiteV3";
import s from "@/components/v3.module.css";
export const metadata:Metadata={title:"บริการซ่อม EV ตามยี่ห้อรถ | Pro EV Service",description:"ค้นหาบริการและผลงานสำหรับ NETA BYD MG ORA DEEPAL และ AION",alternates:{canonical:SITE_URL+"/vehicles"}};
export default function Vehicles(){return <div className={s.page}><div className={s.wrap}><PageHeader title="ดูบริการตามยี่ห้อรถ" description="เลือกยี่ห้อเพื่อดูบริการและผลงานที่เกี่ยวข้อง แจ้งรุ่นย่อยและปีรถก่อนนัดหมายเพื่อให้ทีมงานตรวจสอบขอบเขตงาน" items={[{label:"ยี่ห้อรถ"}]}/><div className={s.grid}>{vehicles.map(v=><Link key={v.slug} className={s.card} href={"/vehicles/"+v.slug}><div className={s.cardBody}><span className={s.number}>EV SERVICE</span><h2>{v.name}</h2><p>{v.models.join(" · ")}</p><span className={s.textLink}>ดูบริการและผลงาน ↗</span></div></Link>)}</div><ContactCta/></div><MobileContact/></div>}
