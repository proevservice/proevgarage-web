import type { Metadata } from "next";
import Link from "@/components/Link";
import {webPageSchema,pageMetadata} from "@/lib/seo";
import { notFound } from "next/navigation";
import { services } from "@/lib/website-v3";
import { vehicles } from "@/lib/vehicles";
import { PageHeader,Schema,ServiceCards,RelatedWork,ContactCta,MobileContact } from "@/components/WebsiteV3";
import {AnswerList} from "@/components/SearchAnswers";
import {ShopOffer,NearYou} from "@/components/ShopHighlights";
import s from "@/components/v3.module.css";

// Brand pages answer searches like "เช็คระยะ neta v" / "ร้านซ่อมรถ mg" / "ศูนย์ byd":
// people looking for an independent alternative to the dealer.
const popular=["ev-maintenance","ev-ac-cleaning","ev-air-conditioning","ev-battery-bms","ev-charging","ev-suspension"];

function brandFaqs(name:string){return [
 {question:`รับเช็คระยะ ${name} นอกศูนย์ไหม?`,answer:`รับเช็คระยะ ${name} ตามรายการของรุ่นรถและระยะทาง ทั้งของเหลว ไส้กรอง แบตเตอรี่ 12V และระบบที่ควรตรวจตามรอบ แจ้งรายการและค่าใช้จ่ายก่อนเริ่มงาน หากรถยังอยู่ในประกันศูนย์ แนะนำให้ตรวจเงื่อนไขประกันของรถก่อน`},
 {question:`${name} แอร์ไม่เย็น ต้องล้างแอร์หรือซ่อม?`,answer:"ขึ้นอยู่กับอาการ หากลมเบาหรือมีกลิ่น การล้างแอร์ช่วยได้ หากเย็นน้อยลงหรือคอมแอร์ไม่ทำงาน ควรตรวจระบบแอร์ไฟฟ้าและการรั่วก่อน ทีมงานตรวจเช็คเบื้องต้นให้ฟรี"},
 {question:`ซ่อม ${name} ใช้เวลานานไหม?`,answer:"รับงานซ่อมด่วน รอรับได้ ระยะเวลาจริงขึ้นอยู่กับอาการและอะไหล่ แจ้งรุ่นย่อย ปีรถ และอาการล่วงหน้าเพื่อให้ทีมงานจัดคิวและเตรียมอะไหล่"},
];}

export function generateStaticParams(){return vehicles.map(i=>({slug:i.slug}));}
export function generateMetadata({params}:{params:{slug:string}}):Metadata{const item=vehicles.find(i=>i.slug===params.slug);return item?pageMetadata("ซ่อม / เช็คระยะ "+item.name+" นอกศูนย์ ปากเกร็ด | Pro EV Service","อู่ซ่อมรถไฟฟ้า ปากเกร็ด ดูแล "+item.models.join(", ")+" เช็คระยะ ล้างแอร์ ซ่อมแอร์ แบตเตอรี่ ระบบชาร์จ ช่วงล่าง ตรวจเช็คเบื้องต้นฟรี แจ้งค่าใช้จ่ายก่อนเริ่มงาน","/vehicles/"+item.slug):{};}

export default function Vehicle({params}:{params:{slug:string}}){
 const item=vehicles.find(i=>i.slug===params.slug);if(!item)notFound();
 const jobs=popular.map(slug=>services.find(x=>x.slug===slug)!).filter(Boolean);
 return <div className={s.page}><div className={s.wrap}>
  <Schema data={webPageSchema("ซ่อม / เช็คระยะ "+item.name+" นอกศูนย์","ดูแล "+item.models.join(", ")+" ที่ Pro EV Service ปากเกร็ด","/vehicles/"+item.slug)}/>
  <PageHeader title={"ซ่อม / เช็คระยะ "+item.name+" นอกศูนย์"} description={"ดูแล "+item.models.join(" · ")+" ทั้งเช็คระยะ ล้างแอร์ ซ่อมแอร์ แบตเตอรี่ ระบบชาร์จ และช่วงล่าง ตรวจวิเคราะห์ก่อนซ่อม แจ้งรายการและค่าใช้จ่ายก่อนเริ่มงาน"} items={[{label:"ยี่ห้อรถ",href:"/vehicles"},{label:item.name}]}/>
  <section className={s.section}><ShopOffer/></section>
  <section className={s.section}>
   <h2>งานที่เจ้าของ {item.name} ใช้บริการบ่อย</h2>
   <p className={s.muted} style={{marginBottom:24}}>รายการที่รับดำเนินการขึ้นอยู่กับรุ่นรถ อาการ และผลตรวจ</p>
   <div className={s.problemGrid}>{jobs.map(j=><Link key={j.slug} className={s.problem} href={"/services/"+j.slug}><span>{j.title}<br/><small className={s.muted}>{j.short}</small></span></Link>)}</div>
  </section>
  <RelatedWork keywords={item.keywords}/>
  <section className={s.section}><h2>คำถามเกี่ยวกับ {item.name}</h2><AnswerList items={brandFaqs(item.name)} path={"/vehicles/"+item.slug}/></section>
  <section className={s.section}><NearYou headingClass={s.sectionHead} eyebrowClass={s.eyebrow}/></section>
  <section className={s.section}><h2>บริการทั้งหมด</h2><ServiceCards/></section>
  <ContactCta/>
 </div><MobileContact/></div>;
}
