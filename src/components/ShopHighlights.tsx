// Shared trust blocks used on the home page, the /ev-repair landing page and
// brand pages: shop promises, Google rating, and the "near you" location block.
// Contact links here are plain links; tracked CTAs live on each page.
import {getSettings} from "@/lib/site";
import OpenStatus from "./OpenStatus";
import s from "./shop.module.css";

export const promises = [
 {title: "ตรวจเช็คเบื้องต้นฟรี", text: "หากต้องตรวจวิเคราะห์เชิงลึกและมีค่าใช้จ่าย หักเป็นค่าซ่อมได้เมื่อซ่อมกับเรา"},
 {title: "ซ่อมด่วน รอรับได้", text: "ทักแชทแจ้งรุ่นรถและอาการไว้ก่อน ทีมงานช่วยจัดคิวให้"},
 {title: "มีการรับประกันงานซ่อม", text: "เงื่อนไขการรับประกันขึ้นอยู่กับประเภทงาน ทีมงานแจ้งให้ทราบก่อนเริ่มซ่อม"},
];

export function HeroFacts({promisesShown = true}: {promisesShown?: boolean} = {}) {
 const settings = getSettings();
 return <>
  <OpenStatus/>
  <ul className={s.heroFacts}>
   {promisesShown ? promises.map(p => <li key={p.title}>{p.title}</li>) : null}
   {settings.google_rating ? <li>★ {settings.google_rating} จาก {settings.google_review_count} รีวิวบน Google</li> : null}
  </ul>
 </>;
}

export function ShopOffer() {
 const settings = getSettings();
 const url = settings.google_reviews_url || "https://www.google.com/maps?cid=12415469945169781142";
 return <div className={s.offer}>
  <div className={s.promises}>{promises.map(p => <div key={p.title}><h3>{p.title}</h3><p>{p.text}</p></div>)}</div>
  {settings.google_rating ? <a className={s.reviews} href={url} target="_blank" rel="noopener noreferrer">
   <strong>{settings.google_rating}</strong>
   <span className={s.stars} aria-hidden="true">★★★★★</span>
   <span>จาก {settings.google_review_count} รีวิวบน Google Maps</span>
   <em>อ่านรีวิวจากลูกค้าจริง</em>
  </a> : null}
 </div>;
}

export function NearYou({headingClass, eyebrowClass}: {headingClass: string; eyebrowClass: string}) {
 const settings = getSettings();
 const areas = settings.service_areas?.length ? settings.service_areas : ["ปากเกร็ด", "นนทบุรี", "กรุงเทพฯ"];
 const maps = settings.maps || "https://maps.app.goo.gl/h21RDsTBUFH5fH9z7";
 return <>
  <div className={headingClass}><div><p className={eyebrowClass}>NEAR YOU</p><h2>อู่อยู่ปากเกร็ด<br/>ใกล้เมเจอร์ ฮอลลีวู้ด</h2></div><a href={maps} target="_blank" rel="noopener noreferrer">นำทางด้วย Google Maps</a></div>
  <div className={s.near}>
   <iframe title="แผนที่ Pro EV Service ปากเกร็ด" src="https://maps.google.com/maps?cid=12415469945169781142&output=embed&hl=th&z=15" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/>
   <div>
    <h3>Pro EV Service อู่ซ่อมรถไฟฟ้า ปากเกร็ด</h3>
    <p>{settings.address || "เมเจอร์ ฮอลลีวู้ด ตำบลปากเกร็ด อำเภอปากเกร็ด นนทบุรี 11120"}</p>
    <p>เปิด {settings.hours || "09:00 - 19:00 (หยุดวันพุธ)"}</p>
    <OpenStatus/>
    <p className={s.nearLabel}>สะดวกสำหรับลูกค้าจาก</p>
    <ul className={s.chips}>{areas.map(a => <li key={a}>{a}</li>)}</ul>
   </div>
  </div>
 </>;
}
