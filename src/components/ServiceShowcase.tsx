import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/website-v3";
import { getRepairCases } from "@/lib/repair-cases";
import { casesForService } from "@/lib/service-work.mjs";
import s from "./v3.module.css";

export function ServiceShowcase() {
  const cases = getRepairCases();
  return <div className={s.grid}>
    {services.map((service, index) => {
      const related = casesForService(cases, service.slug);
      return <article key={service.slug} className={s.serviceCard} aria-labelledby={"service-" + service.slug}>
        <Link href={"/services/" + service.slug} className={s.serviceMain}>
          <div className={s.photo}>
            <Image src={service.image} alt={service.title} fill sizes="(max-width:520px) 100vw, (max-width:800px) 50vw, 33vw" />
          </div>
          <div className={s.cardBody}>
            <span className={s.number}>SERVICE / 0{index + 1}</span>
            <h2 id={"service-" + service.slug}>{service.title}</h2>
            <p>{service.short}</p>
            <span className={s.textLink}>รายละเอียดบริการ <ArrowUpRight size={16} /></span>
          </div>
        </Link>
        {related.length > 0 && <div className={s.serviceProof}>
          <p className={s.proofHeading}><span aria-hidden="true" /> ผลงานจริงในบริการนี้ <span className={s.proofCount}>{related.length} งาน</span></p>
          {related.slice(0, 2).map(item => <Link href={"/work/" + item.slug} key={item.slug} className={s.proofLink}>
            {item.image && <div className={s.proofImage}><Image src={item.image} alt="" fill sizes="76px" /></div>}
            <div className={s.proofText}>
              <h3>{item.title}</h3>
              <p>{item.images?.length || (item.image ? 1 : 0)} ภาพ · อ่านเรื่องราวการซ่อม</p>
            </div>
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>)}
          {related.length > 2 && <Link href={"/services/" + service.slug + "#related-work"} className={s.textLink}>ดูผลงานที่เกี่ยวข้องทั้งหมด →</Link>}
        </div>}
      </article>;
    })}
  </div>;
}
