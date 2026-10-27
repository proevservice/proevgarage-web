import type {Metadata} from "next";
import {notFound} from "next/navigation";
import EnglishPages from "@/components/EnglishPages";
import {englishPaths,englishServices,englishProblems,englishVehicles,englishWork,englishPosts} from "@/lib/english";
const base="https://www.proevgarage.com";
type Props={params:{path?:string[]}};
export const dynamicParams=false;
export function generateStaticParams(){return englishPaths().map(path=>({path:path?path.split("/"):[]}));}
function details(path:string){
 const [section,slug]=path.split("/");
 if(slug){const item=section==="services"?englishServices.find(i=>i.slug===slug):section==="problems"?englishProblems.find(i=>i.slug===slug):section==="vehicles"?englishVehicles.find(i=>i.slug===slug):section==="work"?englishWork().find(i=>i.slug===slug):section==="blog"?englishPosts().find(i=>i.slug===slug):null;
 if(item){const title="title" in item?item.title:item.name+" EV repair";const description="description" in item?item.description:"intro" in item?item.intro:"summary" in item?item.summary:"excerpt" in item?item.excerpt:"EV services, diagnostics and repairs. Contact our team to confirm the scope for your model.";return {title,description};}}
 const titles:Record<string,string>={"":"EV repair in Pak Kret, Nonthaburi",services:"Electric vehicle services",problems:"EV symptoms and inspection",vehicles:"EV services by vehicle brand",work:"Real EV repair stories",blog:"EV knowledge and workshop articles",contact:"Contact Pro EV Service",booking:"Book an EV inspection","ev-repair":"EV repair and diagnostics in Pak Kret"};
 return {title:titles[path]||"Page not found",description:"Pro EV Service in Pak Kret, Nonthaburi. EV air conditioning, batteries, charging, electrical diagnostics, suspension and maintenance. Call 098-9794116."};
}
export function generateMetadata({params}:Props):Metadata{
 const path=(params.path||[]).join("/");if(!englishPaths().includes(path))return {title:"Page not found",robots:{index:false,follow:false}};
 const {title,description}=details(path);const url=base+"/en"+(path?"/"+path:"");const thai=base+(path?"/"+path:"/");
 return {title:title+" | Pro EV Service",description,keywords:["EV repair","electric vehicle workshop","Pak Kret","Nonthaburi","EV air conditioning","EV battery diagnostics"],alternates:{canonical:url,languages:{th:thai,en:url,"x-default":thai}},openGraph:{type:"website",locale:"en_GB",alternateLocale:"th_TH",siteName:"Pro EV Service",title,description,url,images:[{url:base+"/images/service-diagnostics.jpg",alt:"Pro EV Service workshop"}]},twitter:{card:"summary_large_image",title,description,images:[base+"/images/service-diagnostics.jpg"]}};
}
export default function EnglishPage({params}:Props){
 const path=(params.path||[]).join("/");if(!englishPaths().includes(path))notFound();const {title,description}=details(path);const url=base+"/en"+(path?"/"+path:"");
 const schema={"@context":"https://schema.org","@type":"WebPage",name:title,description,url,inLanguage:"en",isPartOf:{"@id":base+"/#website"},about:{"@id":base+"/#business"}};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/><EnglishPages path={params.path||[]}/></>;
}
