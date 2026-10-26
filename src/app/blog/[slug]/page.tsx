import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";
import {getPostBySlug,getAllPosts,getSettings} from "@/lib/site";
import {Schema,Breadcrumbs} from "@/components/WebsiteV3";
import WorkGallery from "@/components/WorkGallery";
import {articleImage,articleSchema,pageMetadata,webPageSchema} from "@/lib/seo";
import styles from "@/components/work.module.css";
export const dynamicParams=false;
export function generateStaticParams(){return getAllPosts().map(post=>({slug:post.slug}));}
export function generateMetadata({params}:{params:{slug:string}}):Metadata{
 const post=getPostBySlug(params.slug);if(!post)return {};
 const meta=pageMetadata(post.title+" | Pro EV Service",post.excerpt,"/blog/"+post.slug,articleImage(post));
 return {...meta,openGraph:{...meta.openGraph,type:"article",publishedTime:post.date,modifiedTime:post.updated||post.date}};
}
function PostBody({text}:{text:string}){return <div className={styles.body}>{text.split(/(https?:\/\/[^\s<>]+)/g).map((part,i)=>/^https?:\/\//.test(part)?<a key={i} href={part} target="_blank" rel="noopener noreferrer">{part}</a>:part)}</div>}
export default function Article({params}:{params:{slug:string}}){
 const post=getPostBySlug(params.slug);if(!post)notFound();
 const images=post.images?.length?post.images:post.thumbnail?[post.thumbnail]:[];
 return <article className={styles.wrap}><Schema data={articleSchema(post)}/><Schema data={webPageSchema(post.title,post.excerpt,"/blog/"+post.slug)}/><Breadcrumbs items={[{label:"บทความ",href:"/blog"},{label:post.title}]}/><Link className={styles.back} href="/blog">← บทความทั้งหมด</Link><p className={styles.eyebrow}>EV KNOWLEDGE · PRO EV SERVICE</p><h1 className={styles.detailTitle}>{post.title}</h1><div className={styles.meta}><time dateTime={post.date}>{new Date(post.date).toLocaleDateString("th-TH",{day:"numeric",month:"long",year:"numeric",timeZone:"Asia/Bangkok"})}</time><span>· ทีม Pro EV Service</span><span>· {images.length} ภาพจากโพสต์ต้นฉบับ</span></div><div className={styles.detailGrid}><div>{images.length>0&&<WorkGallery images={images} title={post.title}/>}<a className={styles.source} href={post.sourceUrl} target="_blank" rel="noopener noreferrer">เปิดบทความต้นฉบับบน Facebook ↗</a><section className={styles.cta}><h2>ต้องการปรึกษาอาการรถ?</h2><p>ส่งรุ่นรถและอาการให้ทีมงานช่วยเตรียมแนวทางเข้าตรวจ</p><a href={getSettings().line} target="_blank" rel="noopener noreferrer">ปรึกษาผ่าน LINE ↗</a></section></div><section className={styles.bodyPanel}><h2>บทความจาก Pro EV Service</h2><PostBody text={post.content}/>{!!post.videoUrls?.length&&<p className={styles.source}><a href={post.sourceUrl} target="_blank" rel="noopener noreferrer">ดูวิดีโอจากโพสต์ต้นฉบับบน Facebook ↗</a></p>}</section></div><section className={styles.cta}><h2>บริการและผลงานของอู่</h2><p><Link href="/services">ดูบริการซ่อมรถไฟฟ้า →</Link></p><p><Link href="/work">ดูผลงานซ่อมจริง →</Link></p></section></article>;
}
