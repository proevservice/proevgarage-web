import type { Metadata } from "next";
import Link from "@/components/Link";
import { SITE_URL, splitBrands } from "@/lib/website-v3";
import { vehicles } from "@/lib/vehicles";
import { PageHeader,ContactCta,MobileContact } from "@/components/WebsiteV3";
import s from "@/components/v3.module.css";
export const metadata:Metadata={title:"บริการซ่อม EV ตามยี่ห้อรถ | Pro EV Service",description:"บริการซ่อมและเช็คระยะรถไฟฟ้าตามยี่ห้อ BYD MG NETA DEEPAL AION ORA JAECOO Geely ZEEKR XPENG Tesla และยี่ห้ออื่นๆ ที่ขายในไทย",alternates:{canonical:SITE_URL+"/vehicles"}};
export default function Vehicles(){const {popular,others}=splitBrands(vehicles);return <div className={s.page}><div className={s.wrap}><PageHeader title="ดูบริการตามยี่ห้อรถ" description="เลือกยี่ห้อเพื่อดูบริการและผลงานที่เกี่ยวข้อง แจ้งรุ่นย่อยและปีรถก่อนนัดหมายเพื่อให้ทีมงานตรวจสอบขอบเขตงาน" items={[{label:"ยี่ห้อรถ"}]}/><h2 style={{margin:"8px 0 24px"}}>ยี่ห้อยอดนิยม</h2><div className={s.grid}>{popular.map(v=><Link key={v.slug} className={s.card} href={"/vehicles/"+v.slug}><div className={s.cardBody}><span className={s.number}>EV SERVICE</span><h2>{v.name}</h2><p>{v.models.join(" · ")}</p><span className={s.textLink}>ดูบริการและผลงาน ↗</span></div></Link>)}</div><details className={s.faq} style={{marginTop:32}}><summary>ยี่ห้ออื่นๆ ({others.length} ยี่ห้อ)</summary><div className={s.chips} style={{marginTop:20}}>{others.map(v=><Link key={v.slug} className={s.chip} href={"/vehicles/"+v.slug}>{v.name} ↗</Link>)}</div></details><ContactCta/></div><MobileContact/></div>}
