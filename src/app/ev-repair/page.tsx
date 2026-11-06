import Image from "next/image";
import Link from "@/components/Link";
import d from "@/components/designs/designs.module.css";
import {MobileSaveContactBtn} from "@/components/MobileSaveContactBtn";
import {getSettings} from "@/lib/site";
import {getRepairCases} from "@/lib/repair-cases";
import {services, problems} from "@/lib/website-v3";
import {LeadLink, StickyBar} from "./LeadLink";
import {LINKS} from "./links";
import {HeroCopy, OpenStatus} from "./HeroCopy";
import s from "./landing.module.css";

// Google Ads landing page, styled with the Version 3 design system.
// The nine tracked CTAs (destination, lead type, click location) are unchanged:
// hero ×2, cases_cta, final_cta ×2, footer_map, sticky_bar ×3.

const trust = [
 {title: "ตรวจวิเคราะห์ก่อนซ่อม", text: "อ่านค่าจากกล่องควบคุมด้วยเครื่องมือวิเคราะห์ ร่วมกับการตรวจอาการจริงของรถ เพื่อหาสาเหตุก่อนเปลี่ยนอะไหล่"},
 {title: "แจ้งรายการและค่าใช้จ่ายก่อนเริ่มงาน", text: "อธิบายผลตรวจ แนวทางซ่อม อะไหล่ และค่าใช้จ่ายให้พิจารณา เริ่มงานเมื่อเจ้าของรถอนุมัติเท่านั้น"},
 {title: "ดูแลระบบแรงดันสูงอย่างระมัดระวัง", text: "งานแบตเตอรี่ BCU/BMS ระบบชาร์จ และแอร์ไฟฟ้า ประเมินตามรุ่นรถและอาการ พร้อมแจ้งขอบเขตงานก่อนนัดหมาย"},
];

const promises = [
 {title: "ตรวจเช็คเบื้องต้นฟรี", text: "หากต้องตรวจวิเคราะห์เชิงลึกและมีค่าใช้จ่าย หักเป็นค่าซ่อมได้เมื่อซ่อมกับเรา"},
 {title: "ซ่อมด่วน รอรับได้", text: "ทักแชทแจ้งรุ่นรถและอาการไว้ก่อน ทีมงานช่วยจัดคิวให้"},
 {title: "มีการรับประกันงานซ่อม", text: "เงื่อนไขการรับประกันขึ้นอยู่กับประเภทงาน ทีมงานแจ้งให้ทราบก่อนเริ่มซ่อม"},
];

const faqs = [
 {q: "ตรวจเช็คมีค่าใช้จ่ายไหม?", a: "ตรวจเช็คเบื้องต้นฟรี หากรถต้องตรวจวิเคราะห์เชิงลึกและมีค่าใช้จ่าย ทีมงานจะแจ้งก่อน และหักเป็นค่าซ่อมได้เมื่อซ่อมกับเรา"},
 {q: "ซ่อมนานไหม รอรับได้หรือเปล่า?", a: "รับงานซ่อมด่วน รอรับได้ ระยะเวลาจริงขึ้นอยู่กับอาการและอะไหล่ ทักแชทแจ้งรุ่นรถและอาการเพื่อให้ทีมงานประเมินและจัดคิวให้"},
 {q: "มีรับประกันงานซ่อมไหม?", a: "มีการรับประกันงานซ่อม เงื่อนไขขึ้นอยู่กับประเภทงาน ทีมงานจะแจ้งให้ทราบก่อนเริ่มซ่อม"},
 {q: "ถ้าตรวจแล้วไม่ซ่อมได้ไหม?", a: "ได้ ทีมงานแจ้งผลตรวจ แนวทางซ่อม และค่าใช้จ่ายให้พิจารณาก่อน จะเริ่มงานเมื่อเจ้าของรถอนุมัติเท่านั้น"},
 {q: "รถขับมาไม่ได้ ทำอย่างไร?", a: "ทักแชทหรือโทรแจ้งอาการก่อน ทีมงานช่วยประเมินว่าควรขับมาหรือควรใช้รถสไลด์ เพื่อความปลอดภัยของรถและระบบแรงดันสูง"},
];

const steps = [
 {title: "ทักแชทหรือโทรแจ้งอาการ", text: "บอกรุ่นรถ ปี ระยะทาง และส่งภาพไฟเตือนหรือคลิปประกอบ"},
 {title: "นัดเข้าตรวจรถจริง", text: "ทีมงานยืนยันวันเวลา แล้วตรวจข้อมูลระบบร่วมกับอาการจริง"},
 {title: "รับทราบรายการก่อนซ่อม", text: "แจ้งสาเหตุ แนวทางซ่อม และค่าใช้จ่ายให้ตัดสินใจ"},
 {title: "ซ่อมและทดสอบ", text: "ดำเนินงานตามที่อนุมัติ และทดสอบระบบก่อนส่งมอบรถ"},
];

export default function EvRepairLandingPage() {
 const settings = getSettings();
 const cases = getRepairCases().filter(c => c.image).slice(0, 2);
 const models = settings.models?.length ? settings.models : ["NETA V", "BYD Atto 3", "BYD Dolphin", "MG EP", "MG ZS EV", "Deepal", "GAC AION"];
 const rating = settings.google_rating;
 const reviewCount = settings.google_review_count;
 const reviewsUrl = settings.google_reviews_url || "https://www.google.com/maps?cid=12415469945169781142";
 const areas = settings.service_areas?.length ? settings.service_areas : ["ปากเกร็ด", "นนทบุรี", "กรุงเทพฯ"];

 return <div className={`${d.home} ${s.page}`}>
  {/* 1. Hero */}
  <section className={d.cinematic}>
   <Image src="/images/service-diagnostics.jpg" alt="งานตรวจวิเคราะห์รถไฟฟ้าที่ Pro EV Service ปากเกร็ด" fill priority sizes="100vw"/>
   <div className={d.cinematicShade}/>
   <div className={d.heroCopy}>
    <p className={d.eyebrow}>ปากเกร็ด · นนทบุรี · กรุงเทพฯ</p>
    <HeroCopy/>
    <div className={`${d.actions} ${s.heroActions}`}>
     <LeadLink type="facebook_chat" location="hero" href={LINKS.FB_MESSENGER} className={s.fb}>ทักแชทปรึกษาช่าง ↗</LeadLink>
     <LeadLink type="phone_call" location="hero" href={`tel:${LINKS.PHONE}`} className={d.secondary}>โทร {settings.phone || "098-9794116"}</LeadLink>
    </div>
    <div className={s.saveContact}><MobileSaveContactBtn/></div>
    <OpenStatus className={s.openStatus} dotOpen={s.dotOpen} dotClosed={s.dotClosed}/>
    <ul className={s.heroFacts}>
     <li>ตรวจเช็คเบื้องต้นฟรี</li>
     <li>ซ่อมด่วน รอรับได้</li>
     <li>มีการรับประกันงานซ่อม</li>
     {rating ? <li>★ {rating} จาก {reviewCount} รีวิวบน Google</li> : null}
    </ul>
   </div>
  </section>

  <div className={d.inner}>
   {/* 2. Symptoms */}
   <section className={d.section}>
    <div className={d.sectionHeading}><div><p className={d.eyebrow}>COMMON PROBLEMS</p><h2>รถของคุณมีอาการเหล่านี้อยู่ไหม?</h2></div><Link href="/problems">ดูอาการทั้งหมด ↗</Link></div>
    <div className={d.problems}>{problems.map(p => <Link key={p.slug} href={"/problems/" + p.slug}>{p.title}<span>↗</span></Link>)}</div>
   </section>

   {/* 2b. Offer + reviews */}
   <section className={d.section}>
    <div className={s.offer}>
     <div className={s.promises}>{promises.map(p => <div key={p.title}><h3>{p.title}</h3><p>{p.text}</p></div>)}</div>
     {rating ? <a className={s.reviews} href={reviewsUrl} target="_blank" rel="noopener noreferrer">
      <strong>{rating}</strong>
      <span className={s.stars} aria-hidden="true">★★★★★</span>
      <span>จาก {reviewCount} รีวิวบน Google Maps</span>
      <em>อ่านรีวิวจากลูกค้าจริง ↗</em>
     </a> : null}
    </div>
   </section>

   {/* 3. Why us */}
   <section className={d.section}>
    <div className={d.sectionHeading}><div><p className={d.eyebrow}>WHY PRO EV SERVICE</p><h2>เริ่มจากหาสาเหตุ<br/>ก่อนตัดสินใจซ่อม</h2></div></div>
    <div className={s.trust}>{trust.map((t, i) => <div key={t.title}><span>0{i + 1}</span><h3>{t.title}</h3><p>{t.text}</p></div>)}</div>
    <div className={s.models}><p>รุ่นที่ดูแลเป็นประจำ</p><ul>{models.map(m => <li key={m}>{m}</li>)}</ul></div>
   </section>

   {/* 4. Services */}
   <section className={d.section}>
    <div className={d.sectionHeading}><div><p className={d.eyebrow}>OUR SERVICES</p><h2>บริการของเรา</h2></div><Link href="/services">รายละเอียดทุกบริการ ↗</Link></div>
    <div className={d.serviceIndex}>{services.map((item, i) => <Link href={"/services/" + item.slug} key={item.slug}><span>0{i + 1}</span><h3>{item.title}<small className={s.serviceShort}>{item.short}</small></h3><span>↗</span></Link>)}</div>
   </section>

   {/* 5. Real cases */}
   <section className={d.section}>
    <div className={d.sectionHeading}><div><p className={d.eyebrow}>REAL REPAIRS</p><h2>ตัวอย่างงานซ่อมจริงจากอู่</h2></div><Link href="/work">ดูผลงานทั้งหมด ↗</Link></div>
    <div className={d.caseGrid}>{cases.map(c => <Link key={c.slug} href={"/work/" + c.slug} className={d.caseCard}>
     <div className={d.casePhoto}><Image src={c.image!} alt={c.title} fill quality={85} sizes="(max-width:520px) 92vw, (max-width:1280px) 44vw, 575px"/><span>{c.images?.length || 1} ภาพจากงานจริง</span></div>
     <h3>{c.title}</h3>
    </Link>)}</div>
    <div className={s.caseCta}>
     <LeadLink type="facebook_chat" location="cases_cta" href={LINKS.FB_PAGE} className={d.secondary}>ดูผลงานเพิ่มเติมบน Facebook ↗</LeadLink>
    </div>
   </section>

   {/* 6. Process */}
   <section className={d.section}>
    <div className={d.sectionHeading}><div><p className={d.eyebrow}>HOW IT WORKS</p><h2>ขั้นตอนเข้ารับบริการ</h2></div></div>
    <div className={d.process}>{steps.map((st, i) => <div key={st.title}><span>0{i + 1}</span><h3>{st.title}</h3><p>{st.text}</p></div>)}</div>
   </section>

   {/* 6b. FAQ */}
   <section className={d.section}>
    <div className={d.sectionHeading}><div><p className={d.eyebrow}>FAQ</p><h2>คำถามที่พบบ่อยก่อนเข้ารับบริการ</h2></div></div>
    <div>{faqs.map(f => <details key={f.q} className={d.faq}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({"@type": "Question", name: f.q, acceptedAnswer: {"@type": "Answer", text: f.a}}))}).replace(/</g, "\\u003c")}}/>
   </section>

   {/* 7. Final CTA + location */}
   <section className={d.closing}>
    <p className={d.eyebrow}>BOOK AN INSPECTION</p>
    <h2>บอกรุ่นรถและอาการ<br/>แล้วให้เราช่วยวางแผนเข้าตรวจ</h2>
    <p>ตรวจเช็คเบื้องต้นฟรี · แจ้งค่าใช้จ่ายก่อนเริ่มงาน · ซ่อมด่วน รอรับได้</p>
    <OpenStatus className={s.openStatus} dotOpen={s.dotOpen} dotClosed={s.dotClosed}/>
    <div className={`${d.actions} ${s.finalActions}`}>
     <LeadLink type="facebook_chat" location="final_cta" href={LINKS.FB_MESSENGER} className={s.fb}>ทักแชทจองคิว ↗</LeadLink>
     <LeadLink type="line_chat" location="final_cta" href={LINKS.LINE} className={d.button}>ทักไลน์ ↗</LeadLink>
    </div>
    <div className={s.location}>
     <div>
      <h3>Pro EV Service อู่ซ่อมรถไฟฟ้า ปากเกร็ด</h3>
      <p>{settings.address || "เมเจอร์ ฮอลลีวู้ด ตำบลปากเกร็ด อำเภอปากเกร็ด นนทบุรี 11120"}</p>
      <p>{settings.hours || "09:00 - 19:00 (หยุดวันพุธ)"}</p>
      <p className={s.areas}>พื้นที่ใกล้เคียง: {areas.join(" · ")}</p>
     </div>
     <LeadLink type="navigation" location="footer_map" href={LINKS.MAP} className={d.secondary}>ดูแผนที่ร้าน ↗</LeadLink>
    </div>
   </section>
  </div>

  {/* 8. Mobile sticky bar */}
  <StickyBar/>
 </div>;
}
