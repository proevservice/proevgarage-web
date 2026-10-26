import type { Metadata } from "next";
import {pageMetadata,serviceSchema,webPageSchema,serviceQuestions} from "@/lib/seo";
import {AnswerList} from "@/components/SearchAnswers";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { services,problems,SITE_URL } from "@/lib/website-v3";
import { PageHeader,Schema,RelatedWork,ContactCta,MobileContact } from "@/components/WebsiteV3";
import s from "@/components/v3.module.css";
export function generateStaticParams(){return services.map(i=>({slug:i.slug}));}
export function generateMetadata({params}:{params:{slug:string}}):Metadata{const item=services.find(i=>i.slug===params.slug);return item?pageMetadata(item.title+" ปากเกร็ด นนทบุรี | Pro EV Service",item.description,"/services/"+item.slug,item.image):{};}
export default function Detail({params}:{params:{slug:string}}){const item=services.find(i=>i.slug===params.slug);if(!item)notFound();return <div className={s.page}><div className={s.wrap}><Schema data={serviceSchema(item)}/><Schema data={webPageSchema(item.title,item.description,"/services/"+item.slug)}/><PageHeader title={item.title} description={item.description} items={[{label:"บริการ",href:"/services"},{label:item.title}]}/><article className={s.article}><div className={s.articlePhoto}><Image src={item.image} alt={item.title} fill priority sizes="(max-width:840px) 100vw, 840px"/></div><h2>รายการตรวจที่เกี่ยวข้อง</h2><ul>{item.checks.map(c=><li key={c}>{c}</li>)}</ul><div className={s.note}>รายการตรวจและแนวทางซ่อมจริงขึ้นอยู่กับรุ่นรถ อาการ และผลตรวจ ทีมงานจะแจ้งขอบเขตงาน ค่าใช้จ่าย และเงื่อนไขอะไหล่ให้พิจารณาก่อนดำเนินงาน</div><h2>อาการที่พบบ่อยในบริการนี้</h2><div className={s.chips}>{problems.filter(p=>item.problems.includes(p.slug)).map(p=><Link className={s.chip} href={"/problems/"+p.slug} key={p.slug}>{p.title} ↗</Link>)}</div><h2>ก่อนนัดหมาย ควรเตรียมอะไร?</h2><p className={s.muted}>แจ้งรุ่นรถ ระยะทาง ประวัติการซ่อม และอาการที่เกิดขึ้น พร้อมภาพไฟเตือนหรือคลิปถ้ามี เพื่อให้ทีมงานประเมินแนวทางเข้าตรวจ</p><Link className={s.textLink} href="/booking">ดูขั้นตอนนัดหมาย →</Link></article><section className={s.section}><h2>คำถามเกี่ยวกับ{item.title}</h2><AnswerList items={serviceQuestions(item)} path={"/services/"+item.slug}/></section><RelatedWork keywords={item.keywords} serviceSlug={item.slug}/><ContactCta/></div><MobileContact/></div>}
