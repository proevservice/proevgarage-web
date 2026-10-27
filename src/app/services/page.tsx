import type { Metadata } from "next";
import Link from "next/link";
import { services, problems, vehicles, SITE_URL } from "@/lib/website-v3";
import { ServiceShowcase } from "@/components/ServiceShowcase";
import { getRepairCases } from "@/lib/repair-cases";
import { Schema, Breadcrumbs, VehicleLinks, ContactCta, MobileContact } from "@/components/WebsiteV3";
import {webPageSchema} from "@/lib/seo";
import ServiceSearch from "@/components/ServiceSearch";
import s from "@/components/v3.module.css";
import design from "@/components/service-stories.module.css";

export const metadata: Metadata = {
  title: "บริการซ่อมรถไฟฟ้า แอร์ แบตเตอรี่ ระบบชาร์จ | Pro EV Service",
  description: "รู้จักบริการของ Pro EV Service ผ่านภาพงานซ่อมจริง แอร์ EV แบตเตอรี่ ระบบชาร์จ ระบบไฟ ช่วงล่าง และเช็กระยะ",
  alternates: { canonical: SITE_URL + "/services" }
};
const categoryLabels = ["แอร์รถไฟฟ้า", "แบตเตอรี่ / BMS", "ระบบชาร์จ", "ระบบไฟ / ไฟเตือน", "ช่วงล่าง", "เช็กระยะ / 12V"];

export default function Services() {
  const cases = getRepairCases();
  const items = [
    ...services.map(i => ({ title: i.title, href: "/services/" + i.slug, type: "บริการ", keywords: i.short + " " + i.keywords.join(" ") })),
    ...problems.map(i => ({ title: i.title, href: "/problems/" + i.slug, type: "อาการ", keywords: i.intro })),
    ...vehicles.map(i => ({ title: i.name, href: "/vehicles/" + i.slug, type: "ยี่ห้อรถ", keywords: i.models.join(" ") })),
    ...cases.map(i => ({ title: i.title, href: "/work/" + i.slug, type: "ผลงานจริง", keywords: i.model + " " + i.title }))
  ];
  return <div className={s.page}><div className={s.wrap}>
    <Schema data={webPageSchema("บริการซ่อมรถไฟฟ้า","บริการแอร์ แบตเตอรี่ ระบบชาร์จ ระบบไฟ ช่วงล่าง และบำรุงรักษา พร้อมผลงานจริง","/services","CollectionPage")}/><header className={design.intro}>
      <Breadcrumbs items={[{ label: "บริการของเรา" }]} />
      <div className={design.introGrid}>
        <div><p className={design.kicker}>PRO EV SERVICE / SERVICES</p><h1>บริการซ่อมรถไฟฟ้า</h1></div>
        <div><p className={design.introText}>เลือกบริการตามอาการรถ ดูรายละเอียดและผลงานจริงของอู่ ก่อนติดต่อทีมงานเพื่อนัดหมาย</p><Link href="/work" className={s.textLink}>เปิดดูผลงานทั้งหมด ↗</Link></div>
      </div>
      <details className={design.searchDrawer}><summary>ค้นหาบริการ อาการ รุ่นรถ หรือผลงาน</summary><ServiceSearch items={items}/></details>
    </header>
    <nav className={design.catalogNav} aria-label="เลือกหมวดบริการ">{services.map((service, i) => <a href={"#" + service.slug} key={service.slug}><small>0{i + 1}</small>{categoryLabels[i]}</a>)}</nav>
    <ServiceShowcase />
    <details className={design.helpDrawer}><summary>ไม่แน่ใจว่าควรเลือกบริการไหน? ดูตามอาการหรือยี่ห้อรถ</summary><section className={s.section}><div className={s.sectionHead}><div><p className={s.eyebrow}>NOT SURE WHERE TO START?</p><h2>เริ่มจากอาการที่คุณพบ</h2></div><Link href="/problems" className={s.textLink}>ดูอาการทั้งหมด ↗</Link></div><div className={s.problemGrid}>{problems.map(p => <Link className={s.problem} href={"/problems/" + p.slug} key={p.slug}>{p.title}<span>↗</span></Link>)}</div></section>
    <section className={s.section}><h2>หรือเลือกตามยี่ห้อรถ</h2><VehicleLinks/></section>
    </details><ContactCta />
  </div><MobileContact/></div>;
}
