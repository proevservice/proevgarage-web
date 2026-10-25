import type { Metadata } from "next";
import Link from "next/link";
import { problems,SITE_URL } from "@/lib/website-v3";
import { PageHeader,ContactCta,MobileContact } from "@/components/WebsiteV3";
import s from "@/components/v3.module.css";
export const metadata:Metadata={title:"ค้นหาบริการตามอาการเสียรถไฟฟ้า | Pro EV Service",description:"แอร์ไม่เย็น ชาร์จไม่เข้า รถไม่ READY ไฟเตือน หรือช่วงล่างดัง ดูข้อมูลที่ควรเตรียมก่อนเข้าตรวจ",alternates:{canonical:SITE_URL+"/problems"}};
export default function Problems(){return <div className={s.page}><div className={s.wrap}><PageHeader title="เริ่มจากอาการที่คุณพบ" description="เลือกอาการเพื่อดูบริการที่เกี่ยวข้องและข้อมูลที่ควรเตรียม ก่อนให้ทีมงานตรวจวิเคราะห์รถจริง" items={[{label:"อาการเสีย"}]}/><div className={s.grid}>{problems.map((p,i)=><Link className={s.card} href={"/problems/"+p.slug} key={p.slug}><div className={s.cardBody}><span className={s.number}>SYMPTOM / 0{i+1}</span><h2 style={{fontSize:22}}>{p.title}</h2><p>{p.intro}</p><span className={s.textLink}>ดูแนวทางเข้าตรวจ ↗</span></div></Link>)}</div><ContactCta/></div><MobileContact/></div>}
