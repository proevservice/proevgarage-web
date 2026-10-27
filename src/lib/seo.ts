import type { Metadata } from "next";
import type { Settings, Post } from "./site";
import { services, SITE_URL } from "./website-v3";
export const BUSINESS_ID=SITE_URL+"/#business";
export const WEBSITE_ID=SITE_URL+"/#website";
export const absoluteUrl=(path:string)=>new URL(path,SITE_URL).href;
export function pageMetadata(title:string,description:string,path:string,image="/images/service-diagnostics.jpg"):Metadata{
 const url=absoluteUrl(path);
 return {title,description,alternates:{canonical:url},openGraph:{type:"website",locale:"th_TH",siteName:"Pro EV Service",title,description,url,images:[{url:absoluteUrl(image),alt:title}]},twitter:{card:"summary_large_image",title,description,images:[absoluteUrl(image)]}};
}
export function businessGraph(settings:Settings){
 return {"@context":"https://schema.org","@graph":[
 {"@type":"AutoRepair","@id":BUSINESS_ID,name:settings.brand_name,url:SITE_URL,description:"อู่ซ่อมรถไฟฟ้า ปากเกร็ด นนทบุรี ตรวจระบบแอร์ แบตเตอรี่ ระบบชาร์จ ระบบไฟ ช่วงล่าง และบำรุงรักษา",telephone:"+66"+settings.phone.replace(/\D/g,"").replace(/^0/,""),image:absoluteUrl("/images/hero-garage.jpg"),logo:absoluteUrl("/images/logo.png"),
 address:{"@type":"PostalAddress",streetAddress:settings.address,addressLocality:"ปากเกร็ด",addressRegion:"นนทบุรี",postalCode:"11120",addressCountry:"TH"},
 hasMap:settings.maps,sameAs:[settings.facebook,settings.line],
 areaServed:settings.service_areas.map(name=>({"@type":"Place",name})),
 openingHoursSpecification:settings.opening_hours?[{"@type":"OpeningHoursSpecification",dayOfWeek:settings.opening_hours.days,opens:settings.opening_hours.opens,closes:settings.opening_hours.closes}]:undefined,
 hasOfferCatalog:{"@type":"OfferCatalog",name:"บริการซ่อมรถไฟฟ้า",itemListElement:services.map(item=>({"@type":"Offer",itemOffered:{"@type":"Service","@id":absoluteUrl("/services/"+item.slug)+"#service",name:item.title,url:absoluteUrl("/services/"+item.slug),provider:{"@id":BUSINESS_ID}}}))}},
 {"@type":"WebSite","@id":WEBSITE_ID,url:SITE_URL,name:"Pro EV Service",inLanguage:"th-TH",publisher:{"@id":BUSINESS_ID}}
 ]};
}
export function webPageSchema(name:string,description:string,path:string,type="WebPage"){
 const url=absoluteUrl(path);return {"@context":"https://schema.org","@type":type,"@id":url+"#webpage",url,name,description,inLanguage:"th-TH",isPartOf:{"@id":WEBSITE_ID},about:{"@id":BUSINESS_ID}};
}
export function faqSchema(items:{question:string;answer:string}[],path:string){
 return {"@context":"https://schema.org","@type":"FAQPage","@id":absoluteUrl(path)+"#faq",inLanguage:"th-TH",mainEntity:items.map(item=>({"@type":"Question",name:item.question,acceptedAnswer:{"@type":"Answer",text:item.answer}}))};
}
export function serviceSchema(item:typeof services[number]){
 const url=absoluteUrl("/services/"+item.slug);return {"@context":"https://schema.org","@type":"Service","@id":url+"#service",name:item.title,serviceType:item.title,description:item.description,url,image:absoluteUrl(item.image),provider:{"@id":BUSINESS_ID},mainEntityOfPage:{"@id":url+"#webpage"},areaServed:["ปากเกร็ด","นนทบุรี"]};
}
export function serviceQuestions(item:typeof services[number]){return [
 {question:item.title+" รับตรวจอะไรบ้าง?",answer:item.description+" รายการตรวจที่เกี่ยวข้อง ได้แก่ "+item.checks.join(" · ")},
 {question:"นัดหมาย"+item.title+" ต้องเตรียมข้อมูลอะไร?",answer:"แจ้งรุ่นรถ ปีรถ ระยะทาง อาการที่พบ และประวัติการซ่อม พร้อมภาพไฟเตือนหรือคลิปถ้ามี ติดต่อทีมงานผ่าน LINE โทร หรือ Facebook เพื่อยืนยันคิวก่อนเข้ารับบริการ"},
 {question:"ค่า"+item.title+" เท่าไร?",answer:"ค่าใช้จ่ายขึ้นอยู่กับรุ่นรถ อาการ และผลตรวจ ทีมงานจะแจ้งขอบเขตงาน รายการอะไหล่ และค่าใช้จ่ายให้พิจารณาก่อนอนุมัติดำเนินงาน"}
 ];}
export function articleImage(post:Post){return post.thumbnail||"/images/service-diagnostics.jpg";}
export function articleSchema(post:Post){const url=absoluteUrl("/blog/"+post.slug);return {"@context":"https://schema.org","@type":"BlogPosting","@id":url+"#article",headline:post.title,description:post.excerpt,image:(post.images?.length?post.images:post.thumbnail?[post.thumbnail]:[]).map(absoluteUrl),datePublished:post.date,dateModified:post.updated||post.date,author:{"@id":BUSINESS_ID},publisher:{"@id":BUSINESS_ID},isBasedOn:post.sourceUrl,inLanguage:"th-TH",mainEntityOfPage:{"@id":url+"#webpage"},isPartOf:{"@id":WEBSITE_ID}};}
