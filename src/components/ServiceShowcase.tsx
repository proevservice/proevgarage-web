import Link from "@/components/Link";
import {mediaCount} from "@/components/FacebookVideo";
import Image from "next/image";
import { services } from "@/lib/website-v3";
import { getRepairCases } from "@/lib/repair-cases";
import { casesForService } from "@/lib/service-work.mjs";
import s from "./service-stories.module.css";

export function ServiceShowcase() {
  const cases = getRepairCases();
  return <div className={s.stories}>
    {services.map((service, index) => {
      const related = casesForService(cases, service.slug);
      const featured = related[0];
      const photo = featured?.image || service.image;
      const destination = featured ? "/work/" + featured.slug : "/services/" + service.slug;
      return <section id={service.slug} key={service.slug} className={s.story} aria-labelledby={"service-" + service.slug}>
        <div className={s.storyContent}>
          
          <h2 id={"service-" + service.slug}>{service.title}</h2>
          <div className={s.tags}>{service.short.split(" · ").map(tag => <span key={tag}>{tag}</span>)}</div>
          <p className={s.description}>{service.description}</p>
          
          <div className={s.storyActions}>
            <Link className={s.primaryLink} href={"/services/" + service.slug}>รายละเอียดบริการ </Link>
            {featured && <Link className={s.serviceLink} href={"/work/" + featured.slug}>ดูเคสซ่อมจริง </Link>}
          </div>
          {related.length > 1 && <Link className={s.moreLink} href={"/services/" + service.slug + "#related-work"}>ดูผลงานในบริการนี้ทั้งหมด {related.length} งาน →</Link>}
        </div>
        <Link className={s.storyVisual} href={destination} aria-label={featured ? "ดูผลงาน: " + featured.title : "รายละเอียด: " + service.title}>
          <Image src={photo} alt={featured?.title || service.title} fill quality={90} sizes="(max-width:700px) 92vw, (max-width:1280px) 44vw, 575px" priority={index === 0} />
          <div className={s.visualShade} />
          <span className={s.photoLabel}>{featured ? "ผลงานซ่อมจริงจากอู่" : "บริการของ PRO EV"}</span>
          {featured ? <div className={s.photoCaption}>
            <p className={s.photoMeta}>{mediaCount(featured)}จากโพสต์ต้นฉบับ</p>
            <h3>ดูเรื่องราวและภาพงานซ่อม</h3>
            <span className={s.photoArrow}></span>
          </div> : <span className={s.visualCorner}></span>}
        </Link>
      </section>;
    })}
  </div>;
}
