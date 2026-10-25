import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { designOptions } from "@/lib/design-options";
import s from "@/components/designs/designs.module.css";
export const metadata:Metadata={title:"5 แนวทางเว็บไซต์ PRO EV SERVICE",robots:{index:false,follow:false}};
const fallback=["/images/hero-bg-2.jpg","/images/service-battery.jpg","/images/service-ac.jpg","/images/service-diagnostics.jpg","/images/service-suspension.jpg"];
const images=designOptions.map((d,i)=>fs.existsSync(path.join(process.cwd(),"public","design-previews","design-"+d.id+".png"))?"/design-previews/design-"+d.id+".png":fallback[i]);
export default function DesignGallery(){return <div className={s.theme}><div className={s.galleryIntro}><p className={s.eyebrow}>PRO EV SERVICE / WEBSITE DIRECTIONS</p><h1>เลือกหน้าตาเว็บที่เหมาะกับ Pro EV</h1><p>ทั้ง 5 แบบเปิดดูได้หลายหน้า: หน้าแรก บริการ ผลงาน บทความ ติดต่อ และนัดหมาย<br/>ใช้โครงสร้างบริการ–ผลงานที่อนุมัติแล้ว พร้อมภาพและเนื้อหาจริง</p><div className={s.optionGrid}>{designOptions.map((d,i)=><article key={d.id} className={s.optionTile}><Link href={"/designs/"+d.id} className={s.optionCover} style={{display:"block"}}><Image src={images[i]} alt={"แบบ "+d.id+" "+d.name} fill sizes="(max-width:700px) 100vw, 50vw"/><span>0{d.id} / {d.name}</span></Link><div className={s.optionInfo}><p className={s.eyebrow}>{d.thai}</p><h2>{d.name}</h2><p>{d.description}</p><Link href={"/designs/"+d.id}>เปิดดูแบบ {d.id} ↗</Link></div></article>)}</div></div></div>}
