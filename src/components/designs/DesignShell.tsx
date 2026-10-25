"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { designOptions, designNav } from "@/lib/design-options";
import type { Settings } from "@/lib/site";
import s from "./designs.module.css";

export default function DesignShell({id,settings,children,review=true}:{id:string;settings:Settings;children:React.ReactNode;review?:boolean}) {
 const pathname=usePathname();const router=useRouter();const [open,setOpen]=useState(false);
 const prefix=review?"/designs/"+id:"";
 const currentPath=pathname===prefix||pathname===prefix+"/"?"":pathname.slice(prefix.length);
 const option=designOptions.find(d=>d.id===id)!;
 function handleLink(event:React.MouseEvent<HTMLDivElement>) {
  if(!review||event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  const anchor=(event.target as Element).closest("a");
  const href=anchor?.getAttribute("href");
  if(!href||!href.startsWith("/")||href.startsWith("//")||href.startsWith("/designs")||anchor?.target==="_blank"||anchor?.hasAttribute("download"))return;
  event.preventDefault();setOpen(false);router.push(prefix+href);
 }
 return <div className={s.theme} data-design={id} onClickCapture={handleLink}>
  {review&&<div className={s.reviewBar}><Link href="/designs">ตัวเลือกดีไซน์</Link><div className={s.choices}>{designOptions.map(d=><Link aria-label={"ดูแบบ "+d.id+": "+d.name} aria-current={id===d.id?"page":undefined} key={d.id} href={"/designs/"+d.id+currentPath}>{d.id}<span> {d.name}</span></Link>)}</div><span className={s.previewLabel}>PREVIEW</span></div>}
  <header className={s.siteHeader}>
   <Link href={prefix||"/"} className={s.logo} aria-label="PRO EV SERVICE หน้าแรก"><Image src="/images/logo.png" alt="PRO EV SERVICE" width={180} height={60} priority/></Link>
   <button className={s.menuButton} aria-expanded={open} aria-controls="design-navigation" onClick={()=>setOpen(!open)}>{open?"ปิดเมนู":"เมนู +"}</button>
   <nav id="design-navigation" className={s.navigation} data-open={open}>{designNav.map(item=><Link key={item.path} href={prefix+(item.path?"/"+item.path:"")||"/"} aria-current={currentPath===(item.path?"/"+item.path:"")?"page":undefined} onClick={()=>setOpen(false)}>{item.label}</Link>)}<Link href={prefix+"/booking"} onClick={()=>setOpen(false)}>นัดหมาย</Link></nav>
   <a className={s.headerCall} href={"tel:"+settings.phone}>{settings.phone}</a>
   <div className={s.sidebarNote}><p>EV DIAGNOSTIC<br/>& REPAIR</p><span>ปากเกร็ด · นนทบุรี</span><span>{settings.hours}</span></div>
  </header>
  <div className={s.content}>{children}</div>
  <footer className={s.footer}><div><p className={s.eyebrow}>PRO EV SERVICE</p><h2>ให้เราช่วยดูแลรถ EV ของคุณ</h2><p>{settings.address}</p><p>{settings.hours}</p></div><div className={s.footerContact}><a href={"tel:"+settings.phone}>โทร {settings.phone}</a><a href={settings.line} target="_blank" rel="noopener noreferrer">นัดหมายผ่าน LINE ↗</a><a href={settings.messenger} target="_blank" rel="noopener noreferrer">Facebook Messenger ↗</a><a href={settings.maps} target="_blank" rel="noopener noreferrer">แผนที่ร้าน ↗</a></div><div className={s.footerBottom}><span>© PRO EV SERVICE</span><Link href={prefix+"/services"}>บริการ</Link><Link href={prefix+"/work"}>ผลงานจริง</Link>{review&&<span>{option.name}</span>}</div></footer>
  <div className={s.mobileActions}><a href={"tel:"+settings.phone}>โทรหาร้าน</a><a href={settings.line} target="_blank" rel="noopener noreferrer">นัดหมาย LINE</a><a href={settings.messenger} target="_blank" rel="noopener noreferrer">แชท Facebook</a></div>
 </div>;
}
