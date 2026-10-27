"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { designOptions, designNav } from "@/lib/design-options";
import type { Settings } from "@/lib/site";
import s from "./designs.module.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function DesignShell({id,settings,children,review=true}:{id:string;settings:Settings;children:React.ReactNode;review?:boolean}) {
 const pathname=usePathname();const router=useRouter();const [open,setOpen]=useState(false);
 const english=pathname==="/en"||pathname.startsWith("/en/");
 const prefix=review?"/designs/"+id:english?"/en":"";
 const translatedNav:Record<string,string>={"":"Home",services:"Services",work:"Our work",blog:"Articles",contact:"Contact"};
 const currentPath=pathname===prefix||pathname===prefix+"/"?"":pathname.slice(prefix.length);
 const option=designOptions.find(d=>d.id===id)!;
 function handleLink(event:React.MouseEvent<HTMLDivElement>) {
  if(!review||event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  const anchor=(event.target as Element).closest("a");
  const href=anchor?.getAttribute("href");
  if(!href||!href.startsWith("/")||href.startsWith("//")||href.startsWith("/designs")||anchor?.target==="_blank"||anchor?.hasAttribute("download"))return;
  event.preventDefault();setOpen(false);router.push(prefix+href);
 }
 return <div className={s.theme} data-design={id} data-compact={!review&&["/contact","/booking"].includes(currentPath)} onClickCapture={handleLink}>
  {review&&<div className={s.reviewBar}><Link href="/designs">ตัวเลือกดีไซน์</Link><div className={s.choices}>{designOptions.map(d=><Link aria-label={"ดูแบบ "+d.id+": "+d.name} aria-current={id===d.id?"page":undefined} key={d.id} href={"/designs/"+d.id+currentPath}>{d.id}<span> {d.name}</span></Link>)}</div><span className={s.previewLabel}>PREVIEW</span></div>}
  <header className={s.siteHeader}>
   <a href={prefix||"/"} className={s.logo} aria-label={english?"PRO EV SERVICE home":"PRO EV SERVICE หน้าแรก"}><Image src="/images/logo.png" alt="PRO EV SERVICE" width={180} height={60} priority/></a>
   <button className={s.menuButton} aria-expanded={open} aria-controls="design-navigation" onClick={()=>setOpen(!open)}>{english?(open?"Close":"Menu +"):(open?"ปิดเมนู":"เมนู +")}</button>
   <nav id="design-navigation" className={s.navigation} data-open={open}>{designNav.map(item=><a key={item.path} href={prefix+(item.path?"/"+item.path:"")||"/"} aria-current={currentPath===(item.path?"/"+item.path:"")?"page":undefined} onClick={()=>setOpen(false)}>{english?(translatedNav[item.path]||item.label):item.label}</a>)}<a href={prefix+"/booking"} onClick={()=>setOpen(false)}>{english?"Book a visit":"นัดหมาย"}</a></nav>
   <a className={s.headerCall} href={"tel:"+settings.phone}>{settings.phone}</a>
   {!review&&<LanguageSwitcher/>}
   <div className={s.sidebarNote}><p>EV DIAGNOSTIC<br/>& REPAIR</p><span>{english?"Pak Kret · Nonthaburi":"ปากเกร็ด · นนทบุรี"}</span><span>{settings.hours}</span></div>
  </header>
  <div className={s.content}>{children}</div>
  <footer className={s.footer}><div><p className={s.eyebrow}>PRO EV SERVICE</p><h2>{english?"Let us help care for your EV":"ให้เราช่วยดูแลรถ EV ของคุณ"}</h2><p>{settings.address}</p><p>{settings.hours}</p></div><div className={s.footerContact}><a href={"tel:"+settings.phone}>{english?"Call":"โทร"} {settings.phone}</a><a href={settings.line} target="_blank" rel="noopener noreferrer">{english?"Book via LINE ↗":"นัดหมายผ่าน LINE ↗"}</a><a href={settings.messenger} target="_blank" rel="noopener noreferrer">Facebook Messenger ↗</a><a href={settings.maps} target="_blank" rel="noopener noreferrer">{english?"Workshop directions ↗":"แผนที่ร้าน ↗"}</a></div><div className={s.footerBottom}><span>© PRO EV SERVICE</span><Link href={prefix+"/services"}>{english?"Services":"บริการ"}</Link><Link href={prefix+"/work"}>{english?"Our work":"ผลงานจริง"}</Link>{review&&<span>{option.name}</span>}</div></footer>
  {pathname!=="/ev-repair"&&pathname!=="/en/ev-repair"&&<div className={s.mobileActions}><a href={"tel:"+settings.phone}>{english?"Call us":"โทรหาร้าน"}</a><a href={settings.line} target="_blank" rel="noopener noreferrer">{english?"LINE booking":"นัดหมาย LINE"}</a><a href={settings.messenger} target="_blank" rel="noopener noreferrer">{english?"Facebook chat":"แชท Facebook"}</a></div>}
 </div>;
}
