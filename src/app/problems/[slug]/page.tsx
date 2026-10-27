import type { Metadata } from "next";
import {webPageSchema,pageMetadata} from "@/lib/seo";
import { notFound } from "next/navigation";
import { problems,relatedServices,SITE_URL } from "@/lib/website-v3";
import { PageHeader,Schema,ServiceCards,ContactCta,MobileContact } from "@/components/WebsiteV3";
import s from "@/components/v3.module.css";
export function generateStaticParams(){return problems.map(i=>({slug:i.slug}));}
export function generateMetadata({params}:{params:{slug:string}}):Metadata{const item=problems.find(i=>i.slug===params.slug);return item?pageMetadata(item.title+" | Pro EV Service ปากเกร็ด",item.intro,"/problems/"+item.slug):{};}
export default function Problem({params}:{params:{slug:string}}){const item=problems.find(i=>i.slug===params.slug);if(!item)notFound();return <div className={s.page}><div className={s.wrap}><Schema data={webPageSchema(item.title,item.intro,"/problems/"+item.slug)}/><PageHeader title={item.title} description={item.intro} items={[{label:"อาการเสีย",href:"/problems"},{label:item.title}]}/><article className={s.article}><h2>ข้อมูลที่ช่วยให้ตรวจอาการได้ตรงขึ้น</h2><ul>{item.prepare.map(p=><li key={p}>{p}</li>)}</ul><p className={s.note}>อาการเดียวกันอาจเกิดได้จากหลายสาเหตุ ข้อมูลหน้านี้ใช้เพื่อเตรียมเข้าตรวจ การวินิจฉัยและราคาซ่อมต้องอาศัยผลตรวจรถจริง</p></article><section className={s.section}><h2>บริการที่เกี่ยวข้อง</h2><ServiceCards items={relatedServices(item.slug)}/></section><ContactCta/></div><MobileContact/></div>}
