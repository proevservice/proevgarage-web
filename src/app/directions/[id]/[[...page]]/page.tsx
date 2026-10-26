import { notFound } from "next/navigation";
import Direction from "@/components/directions/Direction";
export const metadata={title:"3 แนวทางออกแบบ | Pro EV Service",robots:{index:false,follow:false}};
export default function Page({params}:{params:{id:string;page?:string[]}}){
 if(!["1","2","3"].includes(params.id)||((params.page?.length||0)>1)|| (params.page?.[0]&&!["services","work","blog"].includes(params.page[0])))notFound();
 return <Direction id={params.id} page={params.page?.[0]||"home"}/>;
}
